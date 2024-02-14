import { init, fetchQuery } from "@airstack/node";
import { NextRequest } from "next/server";
import {
  FarcasterUserDetailsQuery,
  FarcasterUserDetailsQueryVariables,
} from "@/graphql/types";

interface FarcasterUserDetailsResponse {
  data: FarcasterUserDetailsQuery;
  error: any;
}

init(process?.env.AIRSTACK_API_KEY ?? "");

const query = /* GraphQL */ `
  query FarcasterUserDetails($fid: String!) {
    Socials(
      input: {
        filter: { userId: { _eq: $fid } }
        blockchain: ethereum
        limit: 200
      }
    ) {
      Social {
        profileName
        followerCount
        followingCount
      }
    }
  }
`;

export async function GET(req: NextRequest): Promise<Response> {
  const fid = req.nextUrl.searchParams.get("fid") ?? "";
  const variables: FarcasterUserDetailsQueryVariables = { fid };
  const { data, error }: FarcasterUserDetailsResponse = await fetchQuery(
    query,
    variables
  );
  if (!error) {
    return Response.json({ data }, { status: 200 });
  } else {
    return Response.json({ error }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
