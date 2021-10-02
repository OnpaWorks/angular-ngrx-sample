import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentBStoreEffects } from './component-b-store.effects';
import * as fromComponentBReducer from './component-b-store.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromComponentBReducer.componentBStoreFeatureKey, fromComponentBReducer.reducer),
    EffectsModule.forFeature([ComponentBStoreEffects])
  ]
})
export class ComponentBStoreModule { }
