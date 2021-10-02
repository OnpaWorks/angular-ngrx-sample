import { ComponentAItem } from './component-a-store.reducer';
import { createAction, props } from '@ngrx/store';

export const key = '[Component A Store] ';

export const error = createAction(key + 'Error', props<{ error: any }>());
export const init = createAction(key + 'init');

export const getItems = createAction(key + 'get items');
export const getItemsSuccess = createAction(key + 'get items success', props<{ list: ComponentAItem[] }>());

export const addItem = createAction(key + 'add item', props<{ item: ComponentAItem }>());
export const removeItem = createAction(key + 'remove item', props<{ item: ComponentAItem }>());
