import { FullOrder, OrderFilter } from '@airswap/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { AppThunkApiConfig } from '../../store';
import { getOrdersFromIndexers } from '../indexer/indexerHelpers';
import { setOffset } from './collectionSlice';

export const getCollectionOrders = createAsyncThunk<
FullOrder[],
Pick<OrderFilter, 'limit' | 'offset'>,
AppThunkApiConfig
>('collection/getCollectionOrders', async (filter, { dispatch, getState }) => {
  const { config, indexer } = getState();

  const { collectionToken, currencyToken } = config;

  dispatch(setOffset(filter.limit + filter.offset));

  return getOrdersFromIndexers({
    ...filter,
    signerTokens: [collectionToken],
    senderTokens: [currencyToken],
  }, indexer.urls);
});
