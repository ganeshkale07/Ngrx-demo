import { Component, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import {
  State,
  getErrorWhilefetchingProduct,
  getcurrentProduct,
  getproducts,
} from '../state/product.reducer';

import { getShowProductCode } from '../state/product.reducer';
import * as productActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage$: Observable<string>;

  sub: Subscription;
  products$: Observable<Product[]>;
  displayCode$: Observable<boolean>;
  selectedProduct$: Observable<Product>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    /** We do not need service call and store that value in local variable as our store has all products */
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => (this.products = products),
    //   error: (err) => (this.errorMessage = err),
    // });

    //get products from store
    this.products$ = this.store.select(getproducts);

    //dispatch - to get all products
    this.store.dispatch(productActions.loadProduct());

    this.selectedProduct$ = this.store.select(getcurrentProduct);

    //fetching value from store
    this.displayCode$ = this.store.select(getShowProductCode);

    //get error
    this.errorMessage$ = this.store.select(getErrorWhilefetchingProduct);

    this.errorMessage$.subscribe((val) => console.log(val));
  }

  checkChanged(): void {
    //After User clicked on button
    //dispatch the action
    //reducer execute the action realted store changes
    //store is replaced with new state
    this.store.dispatch(productActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(productActions.InitializedCurrentProduct());
  }

  productSelected(product: Product): void {
    //this.productService.changeSelectedProduct(product);
    this.store.dispatch(
      productActions.currentProduct({ currentProductId: product.id })
    );
  }
}
