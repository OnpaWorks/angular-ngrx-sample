import { reducers } from './../../component-a/store/index';
import { LocalStorageManagerService } from '../../service/local-storage-manager.service';
import { Store } from '@ngrx/store';
import { State, ComponentBItem } from './component-b-store.reducer';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ComponentBStoreSelectors from './component-b-store.selector';
import * as ComponentBStoreActions from './component-b-store.actions';
import * as ComponentBStoreRecuder from './component-b-store.reducer';
import * as ComponentAStoreRecuder from '../../component-a/store/component-a-store.reducer';
import { EMPTY, forkJoin, generate, of } from 'rxjs';
import { tap, map, mergeMap, concatMap, switchMap, take, catchError, delay, subscribeOn, switchMapTo, takeUntil, withLatestFrom } from 'rxjs/operators';
import { ComponentAItem } from '../../component-a/store/component-a-store.reducer';

@Injectable()
export class ComponentBStoreEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,

    private lsManager: LocalStorageManagerService,
  ) {}

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComponentBStoreActions.getItems),
      mergeMap(action =>
        forkJoin([
          this.lsManager.getItems<ComponentAItem>(ComponentAStoreRecuder.componentAStoreFeatureKey),
          this.lsManager.getItems<ComponentBItem>(ComponentBStoreRecuder.componentBStoreFeatureKey).pipe(
            map(n => n.map(item => ({...item, isComponentBItem: true})))
          )
        ]).pipe(
          map(([resultA, resultB]) => {
            const list = [...resultA, ...resultB].sort((a,b) => a.id - b.id);
            return ComponentBStoreActions.getItemsSuccess({list})
          }),
          catchError(error => {
            this.store.dispatch(ComponentBStoreActions.error({error}))
            throw error
          })
        )
      ),
  ));

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComponentBStoreActions.addItem),
      // withLatestFrom(ComponentAStoreSelectors.getAvailable), // ex. If you want to retrieve different data in the store
      mergeMap(action =>
        this.lsManager.getItems<ComponentBItem>(ComponentBStoreRecuder.componentBStoreFeatureKey).pipe(
          mergeMap(list => {
            const latestId = list ? list.reduce((id, item) => id = Math.max(id, item.id), 0) : 0;
            const item = {...action.item, id: latestId+1};
            const newList = [...list, item];
            return this.lsManager.setItems<ComponentBItem>(ComponentBStoreRecuder.componentBStoreFeatureKey, newList).pipe(
              map(result => ComponentBStoreActions.getItems()),
              catchError(error => {
                this.store.dispatch(ComponentBStoreActions.error({error}))
                throw error
              })
            )
          }),
          catchError(error => {
            this.store.dispatch(ComponentBStoreActions.error({error}))
            throw error
          })
        )

      ),
  ));

  revmoveItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ComponentBStoreActions.removeItem),
      // withLatestFrom(ComponentAStoreSelectors.getAvailable), // ex. If you want to retrieve different data in the store
      mergeMap(action =>
        this.lsManager.getItems<ComponentBItem>(ComponentBStoreRecuder.componentBStoreFeatureKey).pipe(
          mergeMap(list => {
            const newList = list.filter(n => n.id !== action.item.id);
            return this.lsManager.setItems<ComponentBItem>(ComponentBStoreRecuder.componentBStoreFeatureKey, newList).pipe(
              map(result => ComponentBStoreActions.getItems()),
              catchError(error => {
                this.store.dispatch(ComponentBStoreActions.error({error}))
                throw error
              })
            )
          }),
          catchError(error => {
            this.store.dispatch(ComponentBStoreActions.error({error}))
            throw error
          })
        )

      ),
  ));

}
