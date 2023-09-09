import Script from "next/script";

export default function GraysonsGame({ Component, pageProps }) {
  return <div>
  <h1>Grayson&apos;s Game</h1>
    <Script src="/game.js" />
  </div>;
}
