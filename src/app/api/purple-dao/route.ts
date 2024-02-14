import {
  getFrameHtml,
  Frame,
  FrameActionPayload,
  validateFrameMessage,
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

  // Use the frame message to build the frame
  const frame: Frame = {
    version: "vNext",
    image: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/generated?fid=${fid}&page=${page}`,
    buttons: [
      {
        action: "post",
        label: `Next`,
      },
      {
        action: "link",
        label: "Download CSV",
        target: `https://explorer.airstack.xyz/token-balances?address=fc_fid%3A${fid}&rawInput=%23%E2%8E%B1fc_fid%3A${fid}%E2%8E%B1%28fc_fid%3A${fid}++ethereum+null%29&inputType=&tokenType=&activeView=&activeTokenInfo=&activeSnapshotInfo=&tokenFilters=&activeViewToken=&activeViewCount=&blockchainType=&sortOrder=&spamFilter=&mintFilter=&resolve6551=&activeSocialInfo=farcaster%E2%94%82vitalik.eth%E2%94%825650%E2%94%820%E2%94%82135744%E2%94%82%E2%94%82%E2%94%8272%E2%94%82%E2%94%82%23%E2%8E%B10xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60%E2%8E%B1%280xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60+ADDRESS+ethereum+null%29`,
      },
    ],
    ogImage: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/generated?fid=${fid}&page=${page}`,
    postUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao?page=${
      page + 1
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
