import Navigation from 'components/navigation';
import Head from 'next/head';
import ImageScaled from 'components/images/imageScaled';
import s from './image.module.scss';

export default function Home() {
  const myImage = {
    src: '/images/k423-wHTF67sV04k-unsplash-3440-lq.jpg',
    alt: 'succulent',
    width: 3440,
    height: 2296,
  };

  return (
    <div className={s.container}>
      <Head>
        <title>Image</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navigation />
      <main className={s.main}>
        <ImageScaled
          image={myImage}
          containerClass={s.imageContainer}
          wrapperClass={s.imageWrapper}
        />
      </main>
    </div>
  );
}
