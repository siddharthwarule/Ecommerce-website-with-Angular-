import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { cart, priceSummary } from '../data-type';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummery: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private product: ProductService, private router:Router) {}

  ngOnInit(): void {



    this.loadDetails()


    // // quantity or total quantity handdling logic
    // this.product.currentCart().subscribe((result) => {
    //   this.cartData = result;
    //   console.warn(this.cartData);
    //   let price = 0;
    //   let price2 = 0;
    //   result.forEach((item) => {
    //     if (item.quantity) {
    //       price = price + +item.price * item.quantity;

    //       console.log(typeof price);

    //       console.log(price);
    //     }
    //   });

    //   // console.log(price2);

    //   this.priceSummery.price = price;
    //   this.priceSummery.discount = price / 10;
    //   this.priceSummery.tax = price / 10;
    //   this.priceSummery.delivery = 100;
    //   this.priceSummery.total = price + price / 10 + 100 - price / 10;
    // });

  }


  removeToCart(id:any){

    this.product.removeToRemoteCart(id).subscribe((result)=>{

      console.log(result);

      this.loadDetails();


    })
}

loadDetails(){

  this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      let price2 = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * item.quantity;

          console.log(typeof price);

          console.log(price);
        }
      });

      // console.log(price2);

      this.priceSummery.price = price;
      this.priceSummery.discount = price / 10;
      this.priceSummery.tax = price / 10;
      this.priceSummery.delivery = 100;
      this.priceSummery.total = price + price / 10 + 100 - price / 10;


            if(!this.cartData.length){

         this.router.navigate(['/'])

            }

    });



}


checkOut(){

  this.router.navigate(['/checkout'])

}


}
