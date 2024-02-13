import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    { label: "BAYC", action: "post" },
    { label: "Farcaster OG", action: "post" },
    { label: "Zerion DNA 1.0", action: "post" },
    { label: "Custom Address", action: "post" },
  ],
  image:
    "https://gateway.ipfs.io/ipfs/QmSho42fWi25oBWp5MrrFH9zUGFvnspxVHvcymNJoe3DEZ/output.png",
  post_url: "https://frame-demo-seven.vercel.app/api/frame",
});

export const metadata: Metadata = {
  title: "Airstack Snapshot Frames",
  description: "Airstack Snapshot Frames",
  openGraph: {
    title: "Airstack Snapshot Frames",
    description: "Airstack Snapshot Frames",
    images:
      "https://gateway.ipfs.io/ipfs/QmSho42fWi25oBWp5MrrFH9zUGFvnspxVHvcymNJoe3DEZ/output.png",
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
