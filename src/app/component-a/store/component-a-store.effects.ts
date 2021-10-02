import { LocalStorageManagerService } from '../../service/local-storage-manager.service';
import { Store } from '@ngrx/store';
import { State, ComponentAItem } from './component-a-store.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ComponentAStoreSelectors from './component-a-store.selector';
import * as ComponentAStoreActions from './component-a-store.actions';
import * as ComponentAStoreRecuder from './component-a-store.reducer';
import { EMPTY, forkJoin, generate, of } from 'rxjs';
import { tap, map, mergeMap, concatMap, switchMap, take, catchError, delay, subscribeOn, switchMapTo, takeUntil, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class ComponentAStoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,

    private lsManager: LocalStorageManagerService,
  ) {}

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComponentAStoreActions.getItems),
      // withLatestFrom(ComponentAStoreSelectors.getAvailable), // ex. If you want to retrieve different data in the store
      mergeMap(action =>
        this.lsManager.getItems<ComponentAItem>(ComponentAStoreRecuder.componentAStoreFeatureKey).pipe(
          map(result => ComponentAStoreActions.getItemsSuccess({list: result})),
          catchError(error => {
            this.store.dispatch(ComponentAStoreActions.error({error}))
            throw error
          })
        )
      ),
  ));

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComponentAStoreActions.addItem),
      // withLatestFrom(ComponentAStoreSelectors.getAvailable), // ex. If you want to retrieve different data in the store
      mergeMap(action =>
        this.lsManager.getItems<ComponentAItem>(ComponentAStoreRecuder.componentAStoreFeatureKey).pipe(
          mergeMap(list => {
            const latestId = list ? list.reduce((id, item) => id = Math.max(id, item.id), 0) : 0;
            const item = {...action.item, id: latestId+1};
            const newList = [...list, item];
            return this.lsManager.setItems<ComponentAItem>(ComponentAStoreRecuder.componentAStoreFeatureKey, newList).pipe(
              map(result => ComponentAStoreActions.getItems()),
              catchError(error => {
                this.store.dispatch(ComponentAStoreActions.error({error}))
                throw error
              })
            )
          }),
          catchError(error => {
            this.store.dispatch(ComponentAStoreActions.error({error}))
            throw error
          })
        )

      ),
  ));

  revmoveItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComponentAStoreActions.removeItem),
      // withLatestFrom(ComponentAStoreSelectors.getAvailable), // ex. If you want to retrieve different data in the store
      mergeMap(action =>
        this.lsManager.getItems<ComponentAItem>(ComponentAStoreRecuder.componentAStoreFeatureKey).pipe(
          mergeMap(list => {
            const newList = list.filter(n => n.id !== action.item.id);
            return this.lsManager.setItems<ComponentAItem>(ComponentAStoreRecuder.componentAStoreFeatureKey, newList).pipe(
              map(result => ComponentAStoreActions.getItems()),
              catchError(error => {
                this.store.dispatch(ComponentAStoreActions.error({error}))
                throw error
              })
            )
          }),
          catchError(error => {
            this.store.dispatch(ComponentAStoreActions.error({error}))
            throw error
          })
        )

      ),
  ));

}
