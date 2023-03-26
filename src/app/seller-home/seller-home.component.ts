import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import {faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

 productlist :undefined|product[];

  constructor(private ProductService:ProductService,  ) { }


  deleteIcon =faTrash;

  editIcon=faEdit;

  productDeleteMassage:undefined|string;

  ngOnInit(): void {

    //  this.ProductService.getProduct().subscribe((result)=>{

    //       this.productlist= result;

    //  })

    this.plist();

  }


  // this is to difinf=d the results
  plist(){

    this.ProductService.getProducts().subscribe((result)=>{

      this.productlist=result;

    })

  }



  deleteProduct(id:number){
    // console.log(id);

    let confirms:boolean=confirm("Do You Wants To Delete This Item");

    if(confirms){

  this.ProductService.deleteProducts(id).subscribe((result)=>{

    if(result){

      this.productDeleteMassage="Product is Deleted";

           this.plist();

      // alert("product is deleted")
    }

  })

    setTimeout(()=>{
      this.productDeleteMassage=undefined;
    },4000)


    }
  }

}
