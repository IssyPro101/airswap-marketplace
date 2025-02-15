import React, {
  FC,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TokenInfo } from '@airswap/types';

import SearchInput from '../../../../components/SearchInput/SearchInput';
import { INDEXER_ORDERS_OFFSET } from '../../../../constants/indexer';
import OrdersContainer from '../../../../containers/OrdersContainer/OrdersContainer';
import { filterCollectionTokenBySearchValue } from '../../../../entities/CollectionToken/CollectionTokenHelpers';
import useCollectionTokens from '../../../../hooks/useCollectionTokens';
import useScrollToBottom from '../../../../hooks/useScrollToBottom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { getCollectionOrders } from '../../../../redux/stores/collection/collectionApi';
import { reset } from '../../../../redux/stores/collection/collectionSlice';
import CollectionPortrait from '../CollectionPortrait/CollectionPortrait';

interface ConnectedCollectionWidgetProps {
  currencyTokenInfo: TokenInfo;
  className?: string;
}

const ConnectedCollectionWidget: FC<ConnectedCollectionWidgetProps> = ({ currencyTokenInfo, className = '' }) => {
  const dispatch = useAppDispatch();

  const scrolledToBottom = useScrollToBottom();
  const { collectionImage, collectionToken, collectionName } = useAppSelector((state) => state.config);
  const {
    isLoading,
    isTotalOrdersReached,
    offset,
    orders,
  } = useAppSelector((state) => state.collection);

  const [searchValue, setSearchValue] = useState<string>('');

  const getOrders = () => {
    if (isLoading || isTotalOrdersReached) {
      return;
    }

    dispatch(getCollectionOrders({
      offset,
      limit: INDEXER_ORDERS_OFFSET,
    }));
  };

  useEffect((): () => void => {
    getOrders();

    return () => dispatch(reset());
  }, []);

  useEffect(() => {
    if (scrolledToBottom) {
      getOrders();
    }
  }, [scrolledToBottom]);

  const tokenIds = useMemo(() => orders.map(order => +order.signer.id), [orders]);
  const [tokens] = useCollectionTokens(collectionToken, tokenIds);
  const filteredOrders = useMemo(() => (
    orders.filter(order => {
      const orderToken = tokens.find(token => token.id === +order.signer.id);

      return orderToken ? filterCollectionTokenBySearchValue(orderToken, searchValue) : true;
    })), [orders, tokens, searchValue]);

  return (
    <div className={`collection-widget ${className}`}>
      <CollectionPortrait
        backgroundImage={collectionImage}
        subTitle="By Sjnivo"
        title={collectionName}
        className="collection-widget__portrait"
      />
      <div className="collection-widget__content">
        <SearchInput
          placeholder="Search Collection"
          onChange={e => setSearchValue(e.target.value)}
          value={searchValue || ''}
          className="collection-widget__search-input"
        />
        <h2 className="collection-widget__subtitle">NFTs for sale</h2>
        <OrdersContainer
          isEndOfOrders={isTotalOrdersReached}
          isLoading={isLoading}
          currencyTokenInfo={currencyTokenInfo}
          orders={filteredOrders}
          tokens={tokens}
          className="collection-widget__nfts-container"
        />
      </div>
    </div>
  );
};

export default ConnectedCollectionWidget;
