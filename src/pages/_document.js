import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* <Script src="/grayson-game/Vec.js" strategy="beforeInteractive" />
        <Script src="/grayson-game/Level.js" strategy="beforeInteractive" />
        <Script src="/grayson-game/State.js" strategy="beforeInteractive" />
        <Script src="/grayson-game/Coin.js" strategy="beforeInteractive" />
        <Script src="/grayson-game/Lava.js" strategy="beforeInteractive" />
        <Script src="/grayson-game/Monster.js" strategy="beforeInteractive" />
        <Script src="/grayson-game/Player.js" strategy="beforeInteractive" />
        <Script
          src="/grayson-game/CanvasDisplay.js"
          strategy="beforeInteractive"
        /> */}
      </body>
    </Html>
  );
}
