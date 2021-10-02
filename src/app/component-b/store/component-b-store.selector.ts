import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, componentBStoreFeatureKey } from './component-b-store.reducer';

const getState = createFeatureSelector<State>(componentBStoreFeatureKey);

export const getList = createSelector(getState, state => state.list);

