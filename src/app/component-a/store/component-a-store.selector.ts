import { createFeatureSelector, createSelector } from '@ngrx/store';

import { State, componentAStoreFeatureKey } from './component-a-store.reducer';

const getState = createFeatureSelector<State>(componentAStoreFeatureKey);

export const getList = createSelector(getState, state => state.list);

