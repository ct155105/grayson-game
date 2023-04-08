import Script from "next/script";

export default function HelloWorld({ Component, pageProps }) {
  // return <h1>Hello World</h1>;
  return <div>
  <h1>HelloWorld</h1>
    <Script src="/game.js" />
  </div>;
}
