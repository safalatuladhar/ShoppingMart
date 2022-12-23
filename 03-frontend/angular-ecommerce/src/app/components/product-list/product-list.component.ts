import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  categoryId: number = 1;

  //pagination
  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotalElements: number = 0;

  previousKeyword: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getAllProducts();
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.categoryId = +categoryId;
    }

    // this.route.paramMap.subscribe(() => {
    //   this.listProducts();
    // });

    this.getProductByCat(this.categoryId);
  }

  // getAllProducts() {
  //   this
  //   this.productService.products$$$.subscribe(
  //     (products) => (this.products = products)
  //   );
  //   this.productService.getAllProduct();
  // }

  getProductByCat(categoryId: number): void {
    this.productService.getProductByCategory(categoryId);
    this.productService.products$$$.subscribe({
      next: (response) => {
        this.products = response;
        console.log(response);
      },
    });
  }

  goToDetails(productId): void {
    this.router.navigate(['/product', productId]).then();
  }

  getdetails(productId: number) {
    this.router.navigate(['product', productId]);
  }
  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if diff keyword set pg no. to 1

    if (this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

    //search using keyword

    this.productService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        theKeyword
      )
      .subscribe(this.processResult());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }

    //pagination
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    //products for given category id
    this.productService
      .getProductListPaginate(
        this.thePageNumber,
        this.thePageSize,
        this.currentCategoryId
      )
      .subscribe(this.processResult());
  }

  processResult() {
    return (data: any) => {
      this.products = data.id.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    //main cart

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
