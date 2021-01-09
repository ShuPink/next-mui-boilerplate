import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import { ThreeDots } from 'components/svgs';
import useImageLoaded from 'lib/imageLoaded';
import s from './image.module.scss';

// for more props go to the documentation
// https://nextjs.org/docs/api-reference/next/image
export default function ResponsiveImage({
  height, width, sizes, ...props
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
    <div
      className={clsx(s.imageContainer)}
      style={{ height, width }}
    >
      <Image
        onLoad={onLoad}
        height={height}
        width={width}
        sizes={sizes}
        className={clsx(s.image, opacity)}
        layout="responsive"
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

ResponsiveImage.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  sizes: PropTypes.string,
};

ResponsiveImage.defaultProps = {
  sizes: '(max-width: 600px) 600px, (max-width: 960px) 960px, (max-width: 1280px) 1280px, (max-height: 1440px) 1920px, 3440px',
};
