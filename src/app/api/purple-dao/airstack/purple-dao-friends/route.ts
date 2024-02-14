import { init, fetchQueryWithPagination } from "@airstack/node";
import { NextRequest } from "next/server";
import {
  PurpleDaoFriendsQuery,
  PurpleDaoFriendsQueryVariables,
} from "@/graphql/types";
import { FetchQuery } from "@airstack/node/dist/types/types";

init(process?.env.AIRSTACK_API_KEY ?? "");

interface PurpleDaoFriendsResponse {
  data: PurpleDaoFriendsQuery;
  error: any;
  hasNextPage: boolean;
  getNextPage: () => Promise<FetchQuery | null>;
}

const query = /* GraphQL */ `
  query PurpleDaoFriends($farcasterUser: Identity!) {
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

export async function GET(req: NextRequest): Promise<Response> {
  let res;
  let allFriends: any[] = [];
  const fid = req.nextUrl.searchParams.get("fid") ?? "";
  while (true) {
    if (!res) {
      const variables: PurpleDaoFriendsQueryVariables = {
        farcasterUser: `fc_fid:${fid}`,
      };
      res = await fetchQueryWithPagination(query, variables);
    }

    const { data, error, hasNextPage, getNextPage }: PurpleDaoFriendsResponse =
      res ?? {};
    if (error) {
      return Response.json({ error }, { status: 500 });
    } else {
      allFriends = [
        ...allFriends,
        ...((data?.TokenBalances?.TokenBalance ?? [])
          ?.map(
            ({ owner }) =>
              owner?.socialFollowings?.Following?.[0]?.followingAddress
                ?.socials?.[0]
          )
          // Filter out any null results
          ?.filter(Boolean) ?? []),
        // Filter out any duplicates
      ].filter((v, i, a) => a.findIndex((t) => t.userId === v.userId) === i);
      if (hasNextPage) {
        res = await getNextPage();
      } else {
        break;
      }
    }
  }
  return Response.json({ data: allFriends }, { status: 200 });
}

export const dynamic = "force-dynamic";
