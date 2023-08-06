import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { orderData } from '../data-type';
import {formatDate } from '@angular/common';



@Component({
  selector: 'app-orders-data',
  templateUrl: './orders-data.component.html',
  styleUrls: ['./orders-data.component.css']
})
export class OrdersDataComponent implements OnInit {

  orderData:orderData[]|undefined;



  constructor(private product:ProductService) { }

  ngOnInit(): void {



       this.product.orderList().subscribe((result)=>{

         this.orderData=result;




       })


  }

}
