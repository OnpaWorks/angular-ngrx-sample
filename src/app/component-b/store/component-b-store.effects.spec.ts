import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ComponentBStoreEffects } from './component-b-store.effects';

describe('ListEffects', () => {
  let actions$: Observable<any>;
  let effects: ComponentBStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComponentBStoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ComponentBStoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
