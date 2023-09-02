import {
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
  currentProductId: number | null;
  products: Product[];
  error: string;
}

//Initial product state when application loads
export const ProductInitialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
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

export const getcurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getcurrentProduct = createSelector(
  getProductFeatureState,
  getcurrentProductId,
  (state, currentProductId) => {
    if (currentProductId == 0) {
      return {
        id: 0,
        productCode: 'new',
        productName: '',
        description: '',
        starRating: 3,
      };
    } else {
      return currentProductId
        ? state.products.find((product) => product.id == currentProductId)
        : null;
    }
  }
);

export const getproducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getErrorWhilefetchingProduct = createSelector(
  getProductFeatureState,
  (state) => state.error
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
      currentProductId: action.currentProductId,
    };
  }),
  on(productActions.clearedCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(productActions.InitializedCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(productActions.loadProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      //when after subsequent request whenwe get response cleared the error
      error: '',
    };
  }),
  on(productActions.loadProductfail, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(productActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProductList = state.products.map((item) =>
      item.id == action.product.id ? action.product : item
    );
    return {
      ...state,
      products: updatedProductList,
      //when after subsequent request whenwe get response cleared the error
      error: '',
    };
  }),
  on(productActions.updateProductfail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  })
);
