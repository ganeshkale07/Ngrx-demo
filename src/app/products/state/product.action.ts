import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle product code');

export const currentProduct = createAction(
  '[Product] set current product',
  props<{ product: Product }>()
);

export const clearedCurrentProduct = createAction(
  '[Product] clear current product'
);

export const InitializedCurrentProduct = createAction(
  '[Product] Initialize current product'
);
