import {
  getFrameHtml,
  Frame,
  FrameActionPayload,
  validateFrameMessage,
  FrameButtonsType,
} from "frames.js";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest) {
  let fid = 5650; // Test FID – Only for development
  let buttonIndex = 1;
  const page = Number(req.nextUrl.searchParams.get("page"));
  // To indicate whether the request come from the 1st frame
  const first = req.nextUrl.searchParams.get("first") === "true";
  if (process.env.NODE_ENV === "production") {
    const body: FrameActionPayload = await req?.json();
    const { isValid, message } = await validateFrameMessage(body);
    if (!isValid || !message) {
      return new Response("Invalid message", { status: 400 });
    }
    // Override FID for production from Signature Packet
    fid = message?.data?.fid;
    buttonIndex = message?.data?.frameActionBody?.buttonIndex;
  }

  if (first && buttonIndex === 2) {
    // Fetch data from Airstack of the user's Farcaster Details
    const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/airstack/farcaster-details?fid=${fid}`
    ).then((res) => res?.json());
    const { profileName, followingCount, followerCount } =
      data?.Socials?.Social?.[0] ?? {};
    return NextResponse.redirect(
      `https://explorer.airstack.xyz/token-balances?address=fc_fid%3A${fid}&rawInput=%23%E2%8E%B1fc_fid%3A${fid}%E2%8E%B1%28fc_fid%3A${fid}++ethereum+null%29&inputType=&tokenType=&activeView=&activeTokenInfo=&activeSnapshotInfo=&tokenFilters=&activeViewToken=&activeViewCount=&blockchainType=&sortOrder=&spamFilter=&mintFilter=&resolve6551=&activeSocialInfo=farcaster%E2%94%82${profileName}%E2%94%82${fid}%E2%94%820%E2%94%82${followerCount}%E2%94%82%E2%94%82%E2%94%82${followingCount}%E2%94%82%E2%94%82%23%E2%8E%B10xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60%E2%8E%B1%280xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60+ADDRESS+ethereum+null%29`,
      { status: 302 }
    );
  } else {
    // Fetch data from Airstack of all Purple DAO Friends
    const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/airstack/purple-dao-friends?fid=${fid}`
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
        ...data
          ?.slice(3 * page, 3 * (page + 1))
          // @ts-ignore
          ?.map(({ profileName, userId }) => {
            return {
              action: "link",
              label: `@${profileName}`,
              target: `https://explorer.airstack.xyz/token-balances?address=fc_fid%3A${userId}&rawInput=%23%E2%8E%B1fc_fid%3A${userId}%E2%8E%B1%28fc_fid%3A${userId}++ethereum+null%29&inputType=ADDRESS`,
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
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
