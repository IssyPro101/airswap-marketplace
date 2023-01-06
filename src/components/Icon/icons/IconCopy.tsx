import React, { FC, ReactElement } from 'react';

import { SvgIconProps } from '../Icon';

const IconCopy: FC<SvgIconProps> = ({ className = '' }): ReactElement => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* eslint-disable max-len */}
    <path d="M10.6668 0.666748H2.66683C1.9335 0.666748 1.3335 1.26675 1.3335 2.00008V11.3334H2.66683V2.00008H10.6668V0.666748ZM12.6668 3.33341H5.3335C4.60016 3.33341 4.00016 3.93341 4.00016 4.66675V14.0001C4.00016 14.7334 4.60016 15.3334 5.3335 15.3334H12.6668C13.4002 15.3334 14.0002 14.7334 14.0002 14.0001V4.66675C14.0002 3.93341 13.4002 3.33341 12.6668 3.33341ZM12.6668 14.0001H5.3335V4.66675H12.6668V14.0001Z" />
  </svg>
);

export default IconCopy;
