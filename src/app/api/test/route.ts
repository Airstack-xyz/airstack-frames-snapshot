import { NextRequest, NextResponse } from "next/server";
import {
  ValidateFramesMessageInput,
  init,
  validateFramesMessage,
} from "@airstack/frames";

async function getResponse(req: NextRequest) {
  try {
    const body: ValidateFramesMessageInput = await req.json();
    init(process.env.AIRSTACK_API_KEY ?? "");
    const res = await validateFramesMessage(body);
    console.log(res);
    return NextResponse.json({ test: 2 }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ e }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
