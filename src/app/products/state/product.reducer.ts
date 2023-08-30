import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from '../product';
import * as appState from '../../state/app.state';
import * as productActions from './product.action';

//as product us feature module
//so we extended the global state by adding state of product
export interface State extends appState.State {
  Products: ProductState;
}

//shape of product state
export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

//Initial product state when application loads
export const ProductInitialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
};

//Building selector
//getProductFeatureState- "selector" for particular slice from store in these case it is products slice
const getProductFeatureState = createFeatureSelector<ProductState>('Products');

//create selector
//getShowProductCode = "selector" for showproductcode
export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getcurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);

export const getproducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

//reducer function return-- product state
export const productReducer = createReducer<ProductState>(
  ProductInitialState,
  on(productActions.toggleProductCode, (state) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(productActions.currentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProduct: action.product,
    };
  }),
  on(productActions.clearedCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: null,
    };
  }),
  on(productActions.InitializedCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productCode: 'NB-TR',
        productName: null,
        description: '',
        starRating: 3,
      },
    };
  })
);
