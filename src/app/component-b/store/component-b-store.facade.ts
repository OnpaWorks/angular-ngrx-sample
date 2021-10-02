import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from './component-b-store.reducer';
import * as ComponentBStoreSelectors from './component-b-store.selector';
import * as ComponentBStoreActions from './component-b-store.actions';
import { ComponentBStoreModule } from './component-b-store.module';

@Injectable({
  providedIn: ComponentBStoreModule,
})
export class ComponentBStoreFacade {
    constructor(private store: Store<State>){}

    list$ = this.store.pipe(select(ComponentBStoreSelectors.getList));

    init() { this.store.dispatch(ComponentBStoreActions.init()) }
    getItems() { this.store.dispatch(ComponentBStoreActions.getItems()) }
    addItem(item) { this.store.dispatch(ComponentBStoreActions.addItem({item})) }
    removeItem(item) { this.store.dispatch(ComponentBStoreActions.removeItem({item})) }
}
