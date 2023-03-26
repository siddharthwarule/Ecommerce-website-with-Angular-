import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { cart, order, orderData } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:undefined|number;
  cartData: undefined|cart[];
  orderMsg:string|undefined;

  constructor(private product:ProductService,private router:Router) { }

  ngOnInit(): void {

    this.product.currentCart().subscribe((result) => {
      let price = 0;
      let price2 = 0;

      this.cartData=result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * item.quantity;

        }

        this.cartData?.forEach((item)=>{

          let id=Number(item.id)
          this.product.deleteCartItems(id)

        })


      });

      this.totalPrice=price + price / 10 + 100 - price / 10;

    });


  }

  orderNow(data:order){

    console.log(data)

    let user = localStorage.getItem('user')

    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){

      let orderData:orderData={

        ...data,
      totalprice : this.totalPrice,
        userId,
        id:undefined

      }
      this.product.orderNow(orderData).subscribe((result)=>{

        if(result){


          // this.cartData=result

          // alert("Your Order Has Been Placed")

          this.orderMsg="Your Order Has Been Placed..."

          setTimeout(()=>{
            this.router.navigate(['/my-order'])

            this.orderMsg=undefined;

          },3000)





        }

      })

    }



  }

}
