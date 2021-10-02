import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from './component-a-store.reducer';
import * as ComponentAStoreSelectors from './component-a-store.selector';
import * as ComponentAStoreActions from './component-a-store.actions';
import { ComponentAStoreModule } from './component-a-store.module';

@Injectable({
  providedIn: ComponentAStoreModule,
})
export class ComponentAStoreFacade {
    constructor(private store: Store<State>){}

    list$ = this.store.pipe(select(ComponentAStoreSelectors.getList));

    init() { this.store.dispatch(ComponentAStoreActions.init()) }
    getItems() { this.store.dispatch(ComponentAStoreActions.getItems()) }
    addItem(item) { this.store.dispatch(ComponentAStoreActions.addItem({item})) }
    removeItem(item) { this.store.dispatch(ComponentAStoreActions.removeItem({item})) }
}
