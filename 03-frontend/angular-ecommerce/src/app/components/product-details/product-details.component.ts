import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
   product!: Product;
   productId: number;
  

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productId = +productId;
      
    }
    this.getProductDetails(this.productId);
  }

  getProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        this.product = response;
      },
    });

  }


  handleProductDetails() {
    //get "id" param string

    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductByCategory(theProductId);
    this.productService.products$$$.subscribe((data) => {
      // this.product = data;
    });
  }

  addToCart(){

    console.log( `Adding to cart; ${this.product.name}, ${this.product.unitPrice}`);

    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);

  }
}
