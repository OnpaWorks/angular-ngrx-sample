import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as componentAReducer from './component-a-store.reducer';

export interface State {
  [componentAReducer.componentAStoreFeatureKey]: componentAReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  [componentAReducer.componentAStoreFeatureKey]: componentAReducer.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('action', action);
    console.log('state', result);
    console.groupEnd();
    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [logger];
