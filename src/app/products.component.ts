import {Component, OnDestroy, OnInit} from "@angular/core";
import {ProductsService} from "./products.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = 'A Book';
  isDisabled = true;
  products = [];
  private productsSubscription : Subscription;

  constructor(private productsService: ProductsService) {
    setTimeout(() => {
      this.isDisabled = false;
      // this.productName = 'A Tree!'
    },3000);
  }

  ngOnInit(): void {
    this.products = this.productsService.getProducts();
    this.productsSubscription = this.productsService.productsUpdated.subscribe(() => {
      this.products = this.productsService.getProducts();
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  onAddProduct(form) {
    // this.products.push(this.productName);
    // console.log(form);
    if (form.valid) {
      // this.products.push(form.value.productName);
      this.productsService.addProduct(form.value.productName);
    }
  }

  onRemoveProduct(productName: string) {
    this.products = this.products.filter(p => p !== productName);
  }
}
