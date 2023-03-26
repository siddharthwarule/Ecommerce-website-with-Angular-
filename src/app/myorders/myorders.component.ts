import { Component, OnInit } from '@angular/core';
import { order,orderData } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orderData :orderData[]|undefined

  constructor(private product:ProductService) { }

  ngOnInit(): void {

   this.getOrderList()

  }

  cancelOrder(orderId:number|undefined){

    orderId && this.product.deleteOrder(orderId).subscribe((result)=>{

        if(result){
          this.getOrderList()
        }


    })

  }

  getOrderList(){

    this.product.orderList().subscribe((result)=>{

      this.orderData = result;

    })


  }

}
