import { FrameRequest } from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import { init, fetchQuery } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY ?? "");

const query = /* GraphQL */ `
  query MyQuery($upFid: String!, $downFid: String!) {
    up: Socials(
      input: {
        filter: { userId: { _eq: $upFid }, dappName: { _eq: farcaster } }
        blockchain: ethereum
      }
    ) {
      Social {
        profileName
        profileImageContentValue {
          image {
            medium
          }
        }
      }
    }
    down: Socials(
      input: {
        filter: { userId: { _eq: $downFid }, dappName: { _eq: farcaster } }
        blockchain: ethereum
      }
    ) {
      Social {
        profileName
        profileImageContentValue {
          image {
            medium
          }
        }
      }
    }
  }
`;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  //   const { fid } = body?.untrustedData ?? {};
  //   const res = await fetchQuery(query, { upFid, downFid });
  return new NextResponse(`
        <!DOCTYPE html>
          <html>
            <head>
              <meta property="fc:frame" content="vNext" />
              <meta property="fc:frame:image" content="https://gateway.ipfs.io/ipfs/QmSho42fWi25oBWp5MrrFH9zUGFvnspxVHvcymNJoe3DEZ/output.png" />
              <meta name="fc:frame:button:1" content="Try again?" />
              <meta name="fc:frame:button:1:action" content="link" />
              <meta name="fc:frame:button:1:target" content="https://airstack.xyz" />
          </head>
        </html>
    `);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
