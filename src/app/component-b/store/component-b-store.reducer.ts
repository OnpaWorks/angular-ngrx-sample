import { ComponentAItem } from './../../component-a/store/component-a-store.reducer';
import { Action, createReducer, on } from '@ngrx/store';
import * as ComponentBActions from './component-b-store.actions';

export const componentBStoreFeatureKey = 'component-b';

export interface ComponentBItem extends ComponentAItem {
  id: number;
  name: string;
  description: string;

  isComponentBItem: boolean;
}

export interface State {
  list: ReadonlyArray<ComponentAItem|ComponentBItem>;
}

export const initialState: State = {
  list: [],
};

export const componentBStoreReducer = createReducer(
  initialState,

  on(ComponentBActions.init, state => ({...initialState})),
  on(ComponentBActions.getItemsSuccess, (state, {list}) => ({...initialState, list})),
);

export function reducer(state: State | undefined, action: Action): State {
  return componentBStoreReducer(state, action);
}
