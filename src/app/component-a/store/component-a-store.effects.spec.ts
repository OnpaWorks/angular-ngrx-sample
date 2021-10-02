import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ComponentAStoreEffects } from './component-a-store.effects';

describe('ListEffects', () => {
  let actions$: Observable<any>;
  let effects: ComponentAStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComponentAStoreEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ComponentAStoreEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
