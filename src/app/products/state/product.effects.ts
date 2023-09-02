import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as productActions from './product.action';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { createAction } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
  //create effect will return new action
  //loadProducts is an observable
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.loadProduct),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(
            (products) => productActions.loadProductSuccess({ products }),
            catchError((error) => of(productActions.loadProductfail({ error })))
          )
        )
      )
    );
  });

  //Important ***
  //returns an observable of action which dispatch the action
  //that dispatch action then called reducer
  //inturn change the state of store
  updateProduct$ = createEffect(() => {
    return this.actions$ /** listen to all actions */
      .pipe(
        ofType(productActions.updateProduct),
        concatMap((action) =>
          this.productService.updateProduct(action.product).pipe(
            map(
              (product) => productActions.updateProductSuccess({ product }),
              catchError((error) =>
                of(productActions.updateProductfail({ error }))
              )
            )
          )
        )
      );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.createProduct),
      mergeMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => productActions.createProductSuccess({ product })),
          catchError((error) => of(productActions.createProductfail({ error })))
        )
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.deleteProduct),
      mergeMap((action) =>
        this.productService.deleteProduct(action.currentProductId).pipe(
          map(() =>
            productActions.deleteProductSuccess({
              currentProductId: action.currentProductId,
            })
          ),
          catchError((error) => of(productActions.deleteProductfail({ error })))
        )
      )
    );
  });
}
