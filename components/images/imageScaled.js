import { useRef } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import { ThreeDots } from 'components/svgs';
import useImageLoaded from 'lib/imageLoaded';
import useContainerDimensions from 'lib/containerDimensions';
import s from './imageScaled.module.scss';

// for more props go to the documentation
// https://nextjs.org/docs/api-reference/next/image

/**
 * this is an image where you can size a container,
 * and specify how the image will fit to it
 * it is a responsive image with capabilities similar to object-fit: contain.
 * you can use layout="fill" with objectFit="contain"
 * however you won't be able to apply rounded corners
 * or shadows etc because there will be a gap
 * and I kept having trouble with the various forms of divs collapsing
 * /

 /** To crop an image use the ImageCropped component  */

/**
 *
 * Unfortunately, this component suffers from divitis:
 * the next/image = parent div with child div and child img
 * a div wrapper to size/scale the image according to the fit chosen
 * a div container to act as a reference to size/scale to
 */

/**
 * A sized image which scales to it's container
 * note that scaled here means maintaining aspect ratio - no stretching
 * Easier understood via this codepen example:
 * https://codepen.io/ShuPink/pen/MWbKoQE
 * @param {string} fit - 'contain', 'fillByHeight', 'fillByWidth'
 * @param {image} image - required - must contain source, height and width attr
 * @param {string} containerClass- className to pass to the container
 * @param {string} wrapperClass - className to pass to the image wrapper
 * @param {string} sizes - One or more strings separated by commas, indicating a set of source sizes. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes
 */
function ImageScaled({
  fit,
  image,
  containerClass,
  wrapperClass,
  sizes,
  ...props
}) {
  // fade in when loaded
  const { isLoaded, onLoad } = useImageLoaded();
  let opacity;
  if (!isLoaded) {
    opacity = s.pending;
  } else {
    opacity = s.loaded;
  }

  // determine / set dimensions of the image
  const ref = useRef();

  // get dimensions of the parent container
  const { frameDims } = useContainerDimensions(ref);
  const { height: frameHeight, width: frameWidth } = frameDims;
  const frameRatio = frameWidth / frameHeight;

  // get aspect ratio of the image for scaling
  const { height: imageHeight, width: imageWidth, src } = image;
  const imageRatio = imageWidth / imageHeight;

  let height;
  let width;

  const fullWidth = {
    width: frameWidth,
    height: Math.floor(frameWidth / imageRatio),
  };

  const fullHeight = {
    width: frameHeight * imageRatio,
    height: frameHeight,
  };

  if (fit === 'contain') {
    if (frameRatio < imageRatio) {
      height = fullWidth.height;
      width = fullWidth.width;
    } else {
      // frame is square or wider than image, fill to height
      height = fullHeight.height;
      width = fullHeight.width;
    }
  } else if (fit === 'fillByWidth') {
    height = fullWidth.height;
    width = fullWidth.width;
  } else if (fit === 'fillByHeight') {
    height = fullHeight.height;
    width = fullHeight.width;
  }

  return (
    <div ref={ref} className={clsx(s.imageContainerDefault, containerClass)}>
      <div
        className={wrapperClass}
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        <Image
          src={src}
          onLoad={onLoad}
          height={height}
          width={width}
          sizes={sizes}
          className={clsx(s.image, opacity)}
          layout="responsive"
          {...props}
        />
      </div>
      {!isLoaded && (
        <div className={s.loader}>
          <ThreeDots height="50" width="50" fill="#929292" />
        </div>
      )}
    </div>
  );
}

export default ImageScaled;

ImageScaled.propTypes = {
  fit: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }).isRequired,
  sizes: PropTypes.string,
  containerClass: PropTypes.string,
  wrapperClass: PropTypes.string,
};

ImageScaled.defaultProps = {
  fit: 'contain',
  containerClass: s.imageContainerDefault,
  wrapperClass: '',
  sizes:
    '(max-width: 600px) 600px, (max-width: 960px) 960px, (max-width: 1280px) 1280px, (max-height: 1440px) 1920px, 3440px',
};
