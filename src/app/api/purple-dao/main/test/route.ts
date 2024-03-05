import { NextRequest, NextResponse } from "next/server";
import {
  ValidateFramesMessageInput,
  init,
  validateFramesMessage,
} from "@airstack/frames";

async function getResponse(req: NextRequest) {
  const body: ValidateFramesMessageInput = await req.json();
  let fid = 6806; // Test FID – Only for development
  init(process.env.AIRSTACK_API_KEY ?? "");
  const res = await validateFramesMessage(body);
  console.log(res);
  return NextResponse.json({ ...res }, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
