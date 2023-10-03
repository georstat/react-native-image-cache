import React from 'react';
import CachedImageAnimated from './CachedImageAnimated';
import CachedImageStatic from './CachedImageStatic';
import { IProps } from './types';
export { default as CacheManager } from './CacheManager';

type CachedImageProps = IProps;
type WrapperProps = CachedImageProps & { animated?: boolean };

const CachedImageWrapper = ({ animated = true, ...rest }: WrapperProps) => {
  return animated ? (
    <CachedImageAnimated {...rest} />
  ) : (
    <CachedImageStatic {...rest} />
  );
};

const CachedImage = React.memo(CachedImageWrapper);

export default CachedImage;
