import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import { ThreeDots } from 'components/svgs';
import useImageLoaded from 'lib/imageLoaded';
import s from './imageCropped.module.scss';

// for more props go to the documentation
// https://nextjs.org/docs/api-reference/next/image

/**
 * this is an image which will size to the restricting dimension
 * and crop the other dimension accordingly
 * to scale up or down an image relative to it's container use the
 * ImageContain component
 * /

 /** To scale or contain an image use the ImageContain component  */

/**
 *
 * Component overview:
 * the next/image = parent div with a child img
 * a div container to act as a reference to size/scale to
 * this needs to be position relative, otherwise the image will continue to go up the
 * hierarchy till it finds the next position: relative element
 */

/**
 * A cropped image
 * Easier understood via this codepen example:
 * https://codepen.io/ShuPink/pen/xxRZXbV
 * @param {string} objectFit - defaults to 'cover' but you can use any of the others if it suits
 * @param {image} image - required - must contain source, height and width attr
 * @param {string} containerClass- className to pass to the container
 * @param {string} sizes - One or more strings separated by commas, indicating a set of source sizes. https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes
 */
export default function ImageCropped({
  containerClass,
  sizes,
  objectFit,
  ...props
}) {
  const { isLoaded, onLoad } = useImageLoaded();

  // fade in when loaded
  let opacity;
  if (!isLoaded) {
    opacity = s.pending;
  } else {
    opacity = s.loaded;
  }

  return (
    <div className={clsx(s.imageContainer, containerClass)}>
      <Image
        onLoad={onLoad}
        sizes={sizes}
        className={clsx(s.image, opacity)}
        layout="fill"
        objectFit={objectFit}
        {...props}
      />
      {!isLoaded && (
        <div className={s.loader}>
          <ThreeDots height="50" width="50" fill="#929292" />
        </div>
      )}
    </div>
  );
}

ImageCropped.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  containerClass: PropTypes.string,
  sizes: PropTypes.string,
  objectFit: PropTypes.string,
};

ImageCropped.defaultProps = {
  height: null,
  width: null,
  containerClass: '',
  sizes:
    '(max-width: 600px) 600px, (max-width: 960px) 960px, (max-width: 1280px) 1280px, (max-height: 1440px) 1920px, 3440px',
  objectFit: 'cover',
};
