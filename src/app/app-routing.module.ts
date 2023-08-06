import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MyordersComponent } from './myorders/myorders.component';
import { OrdersDataComponent } from './orders-data/orders-data.component';
import { ProductDetialsComponent } from './product-detials/product-detials.component';
import { SearchpageComponent } from './searchpage/searchpage.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'seller-auth',
    component:SellerAuthComponent
  },

  {
    path :'seller-home',
    component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-add-product',
    component: SellerAddProductComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate:[AuthGuard]

  },

  {
    path:'search/:query',
    component :SearchpageComponent
},

{

  path:'product-details/:id',
  component : ProductDetialsComponent

},


{
  path:'user-auth',
  component:UserAuthComponent
}

,{

   path: 'cart-page',
    component:CartPageComponent

},
{

  path:'checkout',
  component:CheckoutComponent
},

{
  path:'my-order',
  component:MyordersComponent
}
,{

  path:'user-order',
  component:OrdersDataComponent

}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
