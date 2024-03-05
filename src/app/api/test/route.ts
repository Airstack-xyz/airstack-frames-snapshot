import { NextRequest, NextResponse } from "next/server";
import {
  ValidateFramesMessageInput,
  ValidateFramesMessageOutput,
  init,
  validateFramesMessage,
} from "@airstack/frames";
import { generateCaptchaImageSvg } from "@/app/lib/svg";
import sharp from "sharp";

async function getResponse(req: NextRequest) {
  try {
    const svg = await generateCaptchaImageSvg(3, 2);
    // const body: ValidateFramesMessageInput = await req.json();
    init(process.env.AIRSTACK_API_KEY ?? "");
    const pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();

    // const res: ValidateFramesMessageOutput = await validateFramesMessage(body);
    return new NextResponse(
      `
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="${pngBuffer}" />
              <meta name="fc:frame:button:1" content="Try again?" />
              <meta name="fc:frame:button:1:action" content="link" />
              <meta name="fc:frame:button:1:target" content="https://airstack.xyz" />
          </head>
        </html>
    `,
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ e }, { status: 500 });
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
