import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  //this is for the all products products get
  allProduct :undefined|product[];


  //this is for the trendy products get
  trendyProducts :undefined|product[];

// this is for the crouser products get for crousers
  crouserImg :undefined|product[];

  constructor(private product :ProductService) { }

  ngOnInit(): void {

  this.product.getLimitProduct().subscribe((data)=>{

    console.log(data);

    this.crouserImg=data;

  })


  this.product.getTrendyProducts().subscribe((data)=>{

    console.log(data);

    this.trendyProducts = data;
  })


  this.product.getProducts().subscribe((data)=>{

    console.log(data);

    this.allProduct = data;
  })




  }


}
