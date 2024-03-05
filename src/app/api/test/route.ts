import { NextRequest, NextResponse } from "next/server";
import { checkPoapAttendedByFarcasterUser, init } from "@airstack/frames";

async function getResponse(req: NextRequest) {
  let fid = 602; // Test FID – Only for development
  init(process.env.AIRSTACK_API_KEY ?? "");
  const { data } = await checkPoapAttendedByFarcasterUser({
    fid,
    eventId: [160005, 159993, 13242],
  });
  console.log(data);
  return NextResponse.json({ data }, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
