import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { now } from 'mongoose';
import { reduce } from 'rxjs';
import { cart, order, orderData } from '../data-type';
import { ProductService } from '../services/product.service';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice:undefined|number;
  cartData: undefined|cart[];
  orderMsg:string|undefined;
  Now:any

  today= new Date();
  jstoday = '';

  constructor(private product:ProductService,private router:Router) {

    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

  }

  ngOnInit(): void {

     this.Now =new Date()

    console.log(now);

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
        id:undefined,
        date:this.jstoday



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
