import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-S206FJJDH7"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S206FJJDH7');
          `
        }} />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="sN6PbI5xAl9w5Mw0202LwMrmGDZCBbkcr6UgdWLYupI" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
