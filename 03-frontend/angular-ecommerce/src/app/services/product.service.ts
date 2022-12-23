import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../common/product';
import { first, map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { Category } from '../interface/category.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/product';

  private categoryUrl = 'http://localhost:8080/category';

  private adminBaseUrl = 'http://localhost:8080';

  products$$$ = new BehaviorSubject<Product[]>([]);

  constructor(private httpClient: HttpClient) {}

  getProductByCategory(theProductId: number): void {
    const productUrl = `${this.baseUrl}/${theProductId}/category`;

    this.httpClient
      .get<Product[]>(productUrl)
      .pipe(first())
      .subscribe((product$$$) => this.products$$$.next(product$$$));
  }


  transformProductsResponse(res: GetResponseProducts[]): Product[] {
    const products: Product[] = [];
    res?.forEach((item) => {
      products.push({
        id: item.id,
        active: item.active,
        dateCreated: item.dateCreated,
        description: item.description,
        imageUrl: item.imageUrl,
        lastUpdated: item.lastUpdated,
        name: item.name,
        sku: item.sku,
        unitPrice: item.unitPrice,
        unitsInStock: item.unitsInStock,
        category: item.category,
      });
    });
    return products;
  }

  getProductById(productId: number): Observable<Product> {
    const adminproductUrl = `${this.adminBaseUrl}/product/${productId}`;

    return this.httpClient.get<Product>(adminproductUrl);
  }

  getAllProduct(): Observable<Product[]> {
    const adminproductUrl = `${this.adminBaseUrl}/product`;

    return this.httpClient.get<Product[]>(adminproductUrl);
  }

  updateProduct(product: Product): Observable<Product> {
    const adminproductUrl = `${this.adminBaseUrl}/product`;

    return this.httpClient.put<Product>(adminproductUrl, product);
  }

  addProduct(product: Product): Observable<Product> {
    const adminproductUrl = `${this.adminBaseUrl}/product`;

    return this.httpClient.post<Product>(adminproductUrl, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    const adminproductUrl = `${this.adminBaseUrl}/product/${productId}`;

    return this.httpClient.delete<Product>(adminproductUrl);
  }

  //pagination

  getProductListPaginate(
    thePage: number,
    thePageSize: number,
    theCategoryId: number
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  //searching

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  //paginate

  searchProductsPaginate(
    thePage: number,
    thePageSize: number,
    theKeyword: string
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}` +
      `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  public getProductByCatId(categoryId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      `${this.adminBaseUrl}/products/${categoryId}`
    );
  }

  public getProductDetails(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      `${this.adminBaseUrl}/products/details/${productId}`
    );
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts[]>(searchUrl)
      .pipe(map((response) => response));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response.id.productCategory));
  }
}

interface GetResponseProducts {
  id: number;
  category: Category;
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdated: Date;
}

interface GetResponseProductCategory {
  id: {
    productCategory: ProductCategory[];
  };
}
