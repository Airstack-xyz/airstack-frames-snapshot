import { init, fetchQueryWithPagination, fetchQuery } from "@airstack/node";
import {
  validateFrameMessage,
  FrameActionPayload,
  getFrameHtml,
  Frame,
} from "frames.js";
import { NextRequest } from "next/server";

init(process?.env.AIRSTACK_API_KEY ?? "");

const query = /* GraphQL */ `
  query MyQuery($farcasterUser: Identity!) {
    TokenBalances(
      input: {
        filter: {
          tokenAddress: { _eq: "0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60" }
        }
        blockchain: ethereum
        limit: 200
      }
    ) {
      TokenBalance {
        owner {
          socialFollowings(
            input: {
              filter: {
                identity: { _eq: $farcasterUser }
                dappName: { _eq: farcaster }
              }
            }
          ) {
            Following {
              followingAddress {
                socials(input: { filter: { dappName: { _eq: farcaster } } }) {
                  profileName
                  userId
                  profileImageContentValue {
                    image {
                      medium
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function getResponse(req: NextRequest) {
  // const body: FrameActionPayload = await req?.json();
  // const { isValid, message } = await validateFrameMessage(body);
  // if (!isValid || !message) {
  //   return new Response("Invalid message", { status: 400 });
  // }
  // const { fid } = message?.data;
  const fid = 5650;
  let allFriends: any[] = [];
  let res;

  while (true) {
    if (!res) {
      res = await fetchQueryWithPagination(query, {
        farcasterUser: `fc_fid:${fid}`,
      });
    }

    // @ts-ignore
    const { data, error, hasNextPage, getNextPage } = res ?? {};
    if (error) {
      return new Response("Error fetching data", { status: 500 });
    } else {
      allFriends = [
        ...allFriends,
        ...((data?.TokenBalances?.TokenBalance ?? [])
          ?.map(
            // @ts-ignore
            ({ owner }) =>
              owner?.socialFollowings?.Following?.[0]?.followingAddress
                ?.socials?.[0]
          )
          ?.filter(Boolean) ?? []),
      ];
      if (hasNextPage) {
        res = await getNextPage();
      } else {
        break;
      }
    }
  }

  console.log(allFriends);

  const imageUrlBase = `https://picsum.photos/seed`;

  // Use the frame message to build the frame
  const frame: Frame = {
    version: "vNext",
    image: `${imageUrlBase}/1146/600`,
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
    ogImage: `${imageUrlBase}/600`,
    postUrl: `${process.env.NEXT_PUBLIC_HOST}/frames`,
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
