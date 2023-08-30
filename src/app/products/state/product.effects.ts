import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as productActions from "./product.action";
import { mergeMap, map, catchError} from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class ProductEffects {
    constructor(private actions$:Actions , private productService : ProductService){

    }
    //create effect will return new action
    //loadProducts is an observable
    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(ofType(productActions.loadProduct),
        mergeMap(() => this.productService.getProducts()
        .pipe(map(products => productActions.loadProductSuccess({products}),
        catchError((error) => of(productActions.loadProductfail({error})))
        ))))

    })

}