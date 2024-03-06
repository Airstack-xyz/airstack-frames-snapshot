import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [{ label: "Validate Frames!", action: "post" }],
  image: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/first`,
  post_url: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/test`,
});

export const metadata: Metadata = {
  title: "Airstack Snapshot Frames",
  description: "Airstack Snapshot Frames",
  openGraph: {
    title: "Airstack Snapshot Frames",
    description: "Airstack Snapshot Frames",
    images: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/first`,
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Airstack Frames</h1>
    </>
  );
}
