import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentAStoreEffects } from './component-a-store.effects';
import * as fromComponentAReducer from './component-a-store.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromComponentAReducer.componentAStoreFeatureKey, fromComponentAReducer.reducer),
    EffectsModule.forFeature([ComponentAStoreEffects])
  ]
})
export class ComponentAStoreModule { }
