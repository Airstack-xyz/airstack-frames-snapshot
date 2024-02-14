import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    { label: "Purple DAO", action: "post" },
    { label: "Farcaster OG", action: "post" },
    { label: "Custom Address", action: "post" },
  ],
  input: {
    text: "Enter a token address!",
  },
  image: "https://airstack-frames-snapshot.vercel.app/api/image/first",
  post_url: "https://airstack-frames-snapshot.vercel.app/api/frame",
});

export const metadata: Metadata = {
  title: "Airstack Snapshot Frames",
  description: "Airstack Snapshot Frames",
  openGraph: {
    title: "Airstack Snapshot Frames",
    description: "Airstack Snapshot Frames",
    images: "https://airstack-frames-snapshot.vercel.app/api/image/first",
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
