import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cart, order, orderData, product } from '../data-type';
import { map } from 'rxjs/operators';
// import { json } from 'express';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartsDatas = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) { }

  // to adding the product in server

  addproduct(data: any) {
    console.log('service called');

    // return this.http.post('http://localhost:5000/product', data);

    return this.http.post('http://localhost:3000/product', data);


  }

  //to get the product from server for seller home page list call by seller home
  getProducts() {
    return this.http.get<product[]>('http://localhost:3000/product');

    // let getProduct= this.http.get<product[]>('http://localhost:5000/');

    // return getProduct;


  }

  // for delete the product call by seller home
  deleteProducts(id: number) {
    // console.log(id);

    return this.http.delete(`http://localhost:3000/product/${id}`);

    // return this.http.delete(`http://localhost:5000/${id}`);


  }

  // get product for populated into the form called by seller-update-product component
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }

  // this is for the update the product list use in seller-update-product component
  // put method use to update the data

  //put method get the id and object

  updateProduct(product: product) {
    return this.http.put<product>( `http://localhost:3000/product/${product.id}`,product);
  }

  // get some products for showing crowser in home-component called by  home-component

  getLimitProduct() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=4');
  }

  // this is all products getting service and show in the home component called by the home-componant

  getTrendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=8');
  }

  // this service is use for aoto suggestion functionality in search function called in header-component

  getAutoSearch(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/product?q=${query}`);
  }

  getProductById(id: string) {
    return this.http.get<product>(`http://localhost:3000/product/${id}`);

    // return this.http.get(`http://localhost:5000/product/${id}`);

  }

  //this add to cart functionality where called by product-detials-componant

  localAddToCart(data: product) {
    let cartData = [];
    let localCarts = localStorage.getItem('localCart');

    if (!localCarts) {
      // if not any data presents in local storage
      localStorage.setItem('localCart', JSON.stringify([data]));

    this.cartsDatas.emit([data]);

    } else {
      //if data is presents then add the before presents data in localstroage cart and
      cartData = JSON.parse(localCarts);
      cartData.push(data);

      localStorage.setItem('localCart', JSON.stringify(cartData));

      this.cartsDatas.emit(cartData);
    }

  }


  // remove to cart functionality called by product-detials-componant


  removeToCart(productId: number) {

    let cartData = localStorage.getItem('localCart')


    if (cartData) {

      let item: product[] = JSON.parse(cartData)

      item = item.filter((item: product) => productId !== item.id)


      localStorage.setItem('localCart', JSON.stringify(item));


      // console.log(item)

      // update the headers
      this.cartsDatas.emit(item);

    }

  }



    // add to cart in database called by product  details componants

    addToCartInRemote(cartData:cart){

    return this.http.post('http://localhost:3000/cart', cartData);


    // this.cartsDatas.emit();

    }


    //service for getting the cart list by id called by the user auth components


    getCartList(userId:number){

      this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`,{observe:'response'}).subscribe((result)=>{

           if(result && result.body){

            this.cartsDatas.emit(result.body)

            console.log(result)

           }
      });

    }


    //remove item from data base or remote cart

    removeToRemoteCart(cartId:number){

      // console.log("ssxsxsxzxzx0"+cartId)
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);



    }

    //this is for the cart data called by cart-page components
    currentCart(){
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);

    }


    //this is for order data called by checkout component.ts

    orderNow(data:orderData){

      return this.http.post('http://localhost:3000/orders',data);

    }


    //this is for gatting the total price in myorder components

    orderList(){

      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      return this.http.get<orderData[]>('http://localhost:3000/orders?userId=' + userData.id)

    }

    //this is remove or empty rhe cart after placed order called in checkout components

    deleteCartItems(cartId:any){

    return this.http.delete(`http://localhost:3000/cart/${cartId}`,{observe:'response'}).subscribe((result)=>{

    if(result){
      this.cartsDatas.emit([])
    }

    });


    }

    //this is delete order for button in my-order components

    deleteOrder(orderId:number){

      return this.http.delete(`http://localhost:3000/orders/${orderId}`)


    }
}
