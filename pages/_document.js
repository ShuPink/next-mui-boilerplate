/* https://nextjs.org/docs/advanced-features/custom-document
A custom Document is commonly used to augment your application's <html> and <body> tags.
This is necessary because Next.js pages skip the definition of the surrounding document's markup.
*/

import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

const HOST = process.env.NEXT_PUBLIC_HOST;

export default class MyDocument extends Document {
  render() {
    const prod = process.env.NODE_ENV === 'production';
    let scriptSrc = '\'self\' ';
    scriptSrc += `${prod ? '' : "'unsafe-eval'"} `; // NextJS requires 'unsafe-eval' in dev (faster source maps);

    // https://github.com/vercel/next.js/issues/18557#issuecomment-727161142
    let csp = '';
    csp += 'base-uri \'self\';';
    csp += 'form-action \'self\';';
    csp += 'default-src \'self\';';
    csp += `script-src ${scriptSrc};`;
    csp += `script-src-elem ${scriptSrc};`;
    csp += 'style-src \'self\' https://fonts.googleapis.com \'unsafe-inline\' data:;'; // NextJS requires 'unsafe-inline'
    csp += 'img-src \'self\' data: blob:;';
    csp += 'font-src \'self\' https://fonts.gstatic.com;';
    csp += 'frame-src \'self\';';
    csp += 'media-src \'self\';';
    // csp += `worker-src 'self';`;

    return (
      <Html lang="en">
        <Head>
          {/* <!-- Fonts --> */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Yellowtail&display=swap"
            rel="stylesheet"
          />

          {/* <!-- Technical Meta Tags --> */}
          <meta httpEquiv="Content-Security-Policy" content={csp} />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#1b1a1a" />

          {/* <!-- Links --> */}
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${HOST}/icons/apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${HOST}/icons/favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`${HOST}/icons/favicon-16x16.png`}
          />
        </Head>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

/* https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_document.js
 This is taken from the next-material UI example
*/

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
