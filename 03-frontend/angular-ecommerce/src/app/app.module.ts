import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import '@angular/localize/init';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './crudProduct/edit/edit.component';
import { AddComponent } from './crudProduct/add/add.component';
import { ListComponent } from './crudProduct/list/list.component';
import { AddProductComponent } from './crudProduct2/add-product/add-product.component';
import { EditProductComponent } from './crudProduct2/edit-product/edit-product.component';
import { ListProductComponent } from './crudProduct2/list-product/list-product.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'product', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'categories', component: ProductListComponent },
  { path: 'admin/category', component: ListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/category/add', component: AddComponent },
  { path: 'admin/category/edit/:id', component: EditComponent },
  { path: 'admin/product', component: ListProductComponent },
  { path: 'admin/product/add', component: AddProductComponent },
  { path: 'admin/product/edit/:id', component: EditProductComponent },
  { path: '**', redirectTo: '/product', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    EditComponent,
    AddComponent,
    ListComponent,
    AddComponent,
    AddProductComponent,
    EditProductComponent,
    ListProductComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
