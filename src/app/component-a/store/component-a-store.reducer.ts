import { Action, createReducer, on } from '@ngrx/store';
import * as ComponentAActions from './component-a-store.actions';

export const componentAStoreFeatureKey = 'component-a';

export interface ComponentAItem {
  id: number;
  name: string;
  added: Date;
}

export interface State {
  list: ReadonlyArray<ComponentAItem>;
}

export const initialState: State = {
  list: [],
};

export const componentAStoreReducer = createReducer(
  initialState,

  on(ComponentAActions.init, state => ({...initialState})),
  on(ComponentAActions.getItemsSuccess, (state, {list}) => ({...initialState, list})),
);

export function reducer(state: State | undefined, action: Action): State {
  return componentAStoreReducer(state, action);
}
