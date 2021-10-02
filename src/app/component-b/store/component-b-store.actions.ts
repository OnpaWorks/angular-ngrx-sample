import { ComponentAItem } from './../../component-a/store/component-a-store.reducer';
import { ComponentBItem } from './component-b-store.reducer';
import { createAction, props } from '@ngrx/store';

export const key = '[Component B Store] ';

export const error = createAction(key + 'Error', props<{ error: any }>());
export const init = createAction(key + 'init');

export const getItems = createAction(key + 'get items');
export const getItemsSuccess = createAction(key + 'get items success', props<{ list: ComponentAItem[]|ComponentBItem[] }>());

export const addItem = createAction(key + 'add item', props<{ item: ComponentBItem }>());
export const removeItem = createAction(key + 'remove item', props<{ item: ComponentBItem }>());
