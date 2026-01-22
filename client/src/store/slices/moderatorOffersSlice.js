import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { decorateAsyncThunk } from '../store';

const MODERATOR_OFFERS_SLICE = 'moderatorOffers';

const initialState = {
  offers: [],
  page: 1,
  totalPages: 1,
  isFetching: false,
  error: null,
};

export const getModeratorOffers = decorateAsyncThunk({
  key: `${MODERATOR_OFFERS_SLICE}/getOffers`,
  thunk: async ({ page = 1 }) => {
    const { data } = await restController.getOffers({
      page,
      limit: 5,
    });
    return data;
  },
});

export const moderateOffer = decorateAsyncThunk({
  key: `${MODERATOR_OFFERS_SLICE}/moderateOffer`,
  thunk: async ({ offerId, status }) => {
    await restController.moderateOffer(offerId, status);
    return offerId;
  },
});

const extraReducers = (builder) => {
  builder.addCase(getModeratorOffers.pending, (state) => {
    state.isFetching = true;
    state.error = null;
  });
  builder.addCase(getModeratorOffers.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.offers = payload.offers;
    state.page = payload.page;
    state.totalPages = payload.totalPages;
  });
  builder.addCase(getModeratorOffers.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
  });

  builder.addCase(moderateOffer.pending, (state) => {
    state.error = null;
  });
  builder.addCase(moderateOffer.fulfilled, (state, { payload: offerId }) => {
    state.offers = state.offers.filter((offer) => offer.id !== offerId);
  });
  builder.addCase(moderateOffer.rejected, (state, { payload }) => {
    state.error = payload;
  });
};

export const moderatorOffersSlice = createSlice({
  name: MODERATOR_OFFERS_SLICE,
  initialState,
  reducers: {},
  extraReducers,
});

export default moderatorOffersSlice.reducer;
