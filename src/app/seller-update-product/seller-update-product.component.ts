import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {

  updateProductMessage:undefined|string;

//use for populate data in form
  productData:undefined|product;

  constructor(private route :ActivatedRoute ,private product:ProductService ) { }

  ngOnInit(): void {

   let productid = this.route.snapshot.paramMap.get('id');


   console.log(productid);

  productid &&  this.product.getProduct(productid).subscribe((result)=>
  {

    // console.log(result);

    this.productData = result;

  })


  }


  updateProducts(data:product){

    // console.log(data);

    //here we cant get the id becuase id created by the server
    //thats why above object is coming from the server it can have the id property thats why we can copy it in data

    if(this.productData){

      data.id=this.productData.id;
    }

    this.product.updateProduct(data).subscribe((data)=>{

     if(data){

      this.updateProductMessage="Product Updated Succesfuly"
     }

    })

    setTimeout(()=>this.updateProductMessage=undefined,3000);

  }

}
