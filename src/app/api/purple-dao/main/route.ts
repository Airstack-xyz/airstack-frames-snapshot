import {
  getFrameHtml,
  Frame,
  FrameActionPayload,
  validateFrameMessage,
  FrameButtonsType,
} from "frames.js";
import { NextRequest } from "next/server";

async function getResponse(req: NextRequest) {
  let fid = 5650; // Test FID – Only for development
  const page = Number(req.nextUrl.searchParams.get("page"));
  if (process.env.NODE_ENV === "production") {
    const body: FrameActionPayload = await req?.json();
    const { isValid, message } = await validateFrameMessage(body);
    if (!isValid || !message) {
      return new Response("Invalid message", { status: 400 });
    }
    // Override FID for production from Signature Packet
    fid = message?.data?.fid;
  }

  // Fetch data from Airstack
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/airstack?fid=${fid}`
  ).then((res) => res?.json());

  const hasNextPage = data?.length > (page + 1) * 3;

  // Use the frame message to build the frame
  const frame: Frame = {
    version: "vNext",
    image: `${
      process.env.NEXT_PUBLIC_HOSTNAME
    }/api/purple-dao/image/generated?page=${page}&data=${encodeURIComponent(
      JSON.stringify(data)
    )}`,
    //
    buttons: [
      // @ts-ignore
      ...data?.slice(3 * page, 3 * (page + 1))?.map(({ profileName }) => {
        return {
          action: "link",
          label: `@${profileName}`,
          target: `https://explorer.airstack.xyz/token-balances?address=fc_fid%3Avitalik.eth&rawInput=%23%E2%8E%B1fc_fid%3A${fid}%E2%8E%B1%28fc_fid%3A${fid}++ethereum+null%29&inputType=ADDRESS`,
        };
      }),
      {
        action: "post",
        label: hasNextPage ? "Next" : "Start again?",
      },
    ] as FrameButtonsType,
    ogImage: `${
      process.env.NEXT_PUBLIC_HOSTNAME
    }/api/purple-dao/image/generated?page=${page}&data=${encodeURIComponent(
      JSON.stringify(data)
    )}`,
    postUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/main?page=${
      hasNextPage ? page + 1 : 0
    }`,
  };

  // Return the frame as HTML
  const html = getFrameHtml(frame);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
    },
    status: 200,
  });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
