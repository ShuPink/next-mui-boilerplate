import Navigation from 'components/navigation';
import Head from 'next/head';
import clsx from 'clsx';
import ResponsiveImage from 'components/image';
import { useContainerDimensions } from 'lib/containerDimensions';
import { useRef } from 'react';
import s from './image.module.scss';

export default function Home() {
  const myImage = {
    src: '/images/k423-wHTF67sV04k-unsplash-3440-lq.jpg',
    alt: 'succulent',
    width: 3440,
    height: 2296,
  };

  const ref = useRef();
  const { frameDims, windowIsPortrait } = useContainerDimensions(ref);
  const { height, width } = frameDims;

  let finalHeight;
  let finalWidth;
  let aspectRatio;
  if (windowIsPortrait) {
    aspectRatio = width / myImage.width;
    finalHeight = myImage.height * aspectRatio;
    finalWidth = width;
  } else {
    aspectRatio = height / myImage.height;
    finalHeight = height;
    finalWidth = myImage.width * aspectRatio;
  }

  return (
    <div className={clsx(s.container, 'container')}>
      <Head>
        <title>Image</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Navigation />
      <main className={s.main}>
        <div className={s.imageContainer} ref={ref}>
          <ResponsiveImage
            alt={myImage.alt}
            height={finalHeight}
            width={finalWidth}
            src={myImage.src}
            loading="lazy"
          />
        </div>
      </main>
    </div>
  );
}
