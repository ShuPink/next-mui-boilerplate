import Navigation from 'components/navigation';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';
import s from './index.module.scss';

export default function Home() {
  return (
    <div className={clsx(s.container, 'container')}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navigation />
      <main className={s.main}>

        <p className={s.description}>
          Get started by editing
          {' '}
          <code className={s.code}>pages/index.js</code>
        </p>

        <div className={s.blurb}>
          <p>This is my personal boilerplate consisting of: </p>
          <ul>
            <li>Next.js create-next-app </li>
            <li>Material UI</li>
            <li>Configuration to import from absolute paths</li>
            <li>A responsive image example (using next/image)</li>
            <li>A hook to detect devices</li>
            <li>A simple page transition example</li>
            <li>SCSS modules with some basic utils</li>
          </ul>
        </div>

        <a
          href="https://github.com/vercel/next.js/tree/master/examples"
          className={s.card}
        >
          <h3>Examples &rarr;</h3>
          <p>The Next.js boilerplate examples should have you covered for most things.</p>
        </a>

        <Link href="/image" passHref>
          <a
            className={s.card}
          >
            <h3>Image</h3>
            <p>Example of a responsive image</p>
          </a>
        </Link>
      </main>

      <footer className={s.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={s.logo} />
        </a>
      </footer>
    </div>
  );
}
