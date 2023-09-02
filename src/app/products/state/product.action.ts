import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle product code');

export const currentProduct = createAction(
  '[Product] set current product',
  props<{ currentProductId: number }>()
);

export const clearedCurrentProduct = createAction(
  '[Product] clear current product'
);

export const InitializedCurrentProduct = createAction(
  '[Product] Initialize current product'
);

//Load product action
export const loadProduct = createAction('[Product] load Product');

export const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ products: Product[] }>()
);

export const loadProductfail = createAction(
  '[Product] Load Product Fail',
  props<{ error: string }>()
);

//Update Product action
export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductfail = createAction(
  '[Product] Update Product Fail',
  props<{ error: string }>()
);
