import React, { FC } from 'react';

import { TokenInfo } from '@airswap/types';

import Icon from '../Icon/Icon';

import './ReviewTokenDetails.scss';

interface ReviewTokenDetailsProps {
  amount: string;
  amountMinusProtocolFee?: string;
  projectFeePercent: number;
  protocolFeePercent: number;
  title: string;
  token: TokenInfo;
  className?: string;
}

const ReviewTokenDetails: FC<ReviewTokenDetailsProps> = ({
  amount,
  amountMinusProtocolFee,
  title,
  projectFeePercent,
  protocolFeePercent,
  token,
  className = '',
}) => (
  <div className={`review-token-details ${className}`}>
    <div className="review-token-details__token-info">
      <h3 className="review-token-details__title">{title}</h3>
      <div className="review-token-details__amount-wrapper">
        <h4 className="review-token-details__amount-sub-text">{`${amount} ${token.symbol} - Fees =`}</h4>
        {amountMinusProtocolFee && <h4 className="review-token-details__amount">{`${amountMinusProtocolFee} ${token.symbol}`}</h4> }
      </div>
      <div className="review-token-details__logo-icon" style={{ backgroundImage: `url("${token.logoURI}")` }} />
    </div>
    <div className="review-token-details__fees-info">
      <h3 className="review-token-details__title">Fees</h3>
      <h4 className="review-token-details__fees-text">{`${projectFeePercent}% Project, ${protocolFeePercent}% Protocol`}</h4>
      <Icon name="information-circle-outline" className="review-token-details__information-icon" />
    </div>
  </div>
);

export default ReviewTokenDetails;
