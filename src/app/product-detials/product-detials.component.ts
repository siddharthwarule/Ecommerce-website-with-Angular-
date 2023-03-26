import { Component, IterableDiffers, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detials',
  templateUrl: './product-detials.component.html',
  styleUrls: ['./product-detials.component.css'],
})
export class ProductDetialsComponent implements OnInit {

  productRemove: boolean = false;
  productDetials: undefined | product;
  productQuantity = 1;
  cartData:product|undefined

  constructor(private routes: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productids = this.routes.snapshot.paramMap.get('id');

    console.log(productids);

    productids &&
      this.product.getProductById(productids).subscribe((data) => {
        console.log(data);
        this.productDetials = data;


        //toggle button code for add or remove cart
        let cartData = localStorage.getItem('localCart');

        if (cartData && productids) {
          let items = JSON.parse(cartData);

          items = items.filter(
            (item: product) => productids == item.id.toString()
          );

          if (items.length) {
            this.productRemove = true;
          } else {
            this.productRemove = false;
          }

        }

        let user = localStorage.getItem('user')
         if(user){

          let userId =user && JSON.parse(user).id;

          this.product.cartsDatas.subscribe((result)=>{

            if(result){

              let items = result.filter((item:product)=>productids?.toString()===item.productId?.toString())

              if(items.length){

                this.cartData=items[0]

                this.productRemove=true;

              }

            }


          })

         }



      });
  }


  getCartDetials(){


    let productids = this.routes.snapshot.paramMap.get('id');

    console.log(productids);

    productids &&
      this.product.getProductById(productids).subscribe((data) => {
        console.log(data);
        this.productDetials = data;

      })




  }

  // to handal the product quantity
  productQuantityHanddle(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }


  //remove from the cart
  RemoveToCart(id: number) {

    if(!localStorage.getItem('user')){

    this.product.removeToCart(id)


  }else{


    let user = localStorage.getItem('user')

     let userId =user && JSON.parse(user).id;



   this.cartData && this.product.removeToRemoteCart(this.cartData.id).subscribe((result)=>
   {

    if(result){

      //if its done then we wants to update the cart value in header

      this.product.getCartList(userId)

          // this.getCartDetials()

    }


   })


  }

  this.productRemove = false;


  }


  /// add to cart in localstorage
  addToCart() {
    if (this.productDetials) {
      //to insets the quantity of products

      this.productDetials.quantity = this.productQuantity;

      // to check the user is login or not

      if(!localStorage.getItem('user')) {
        //user is not login

        this.product.localAddToCart(this.productDetials);

        this.productRemove = true;
      }else{

        //user is login
        // console.log("user is logged");

        //heare we want to get the id of user we no that we store user at the localstorage

        // we want to store this cart data into the data base whwn user is logdin

        let user = localStorage.getItem('user')

        let userId = user && JSON.parse(user).id;

        console.log('user id'+userId);



        // creation of object for cart
        let cartData: cart = {

          ...this.productDetials,

          productId: this.productDetials.id,

        userId


        }
        //here the  products id is come but we make cart object thats why we want to delete the id here and make it product id

        delete cartData.id;

        //here we create another interface for cartdata


        console.log(cartData)


        this.product.addToCartInRemote(cartData).subscribe((result)=>{


          console.log(result);

          if(result){
            alert("products is added")

            this.product.getCartList(userId)
            this.productRemove=true
          }

        })



      }

    }
  }
}
