import React, { FC, ReactElement } from 'react';

import { SvgIconProps } from '../Icon';

const IconVote: FC<SvgIconProps> = ({ className = '' }): ReactElement => (
  <svg fill="none" viewBox="0 0 24 24" className={className}>
    {/* eslint-disable-next-line max-len */}
    <path d="M18 12.9993H17.32L15.32 14.9993H17.23L19 16.9993H5L6.78 14.9993H8.83L6.83 12.9993H6L3 15.9993V19.9993C3 21.0993 3.89 21.9993 4.99 21.9993H19C20.1 21.9993 21 21.1093 21 19.9993V15.9993L18 12.9993ZM19 19.9993H5V18.9993H19V19.9993ZM11.34 15.0193C11.73 15.4093 12.36 15.4093 12.75 15.0193L19.11 8.65931C19.5 8.26931 19.5 7.63931 19.11 7.24931L14.16 2.29931C13.78 1.89931 13.15 1.89931 12.76 2.28931L6.39 8.65931C6 9.04931 6 9.67931 6.39 10.0693L11.34 15.0193ZM13.46 4.40931L17 7.94931L12.05 12.8993L8.51 9.35931L13.46 4.40931Z" />
  </svg>
);

export default IconVote;
