import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {

  addProductMassage:string|undefined;

  constructor( private product :ProductService)  { }

  ngOnInit(): void {

  }

  addProducts(data:product){

     console.log(data);

    

     this.product.addproduct(data).subscribe((result)=>
     {
       console.log(result);

       if(result){

       this.addProductMassage="Product Added Successfully";



      }

      setTimeout(()=>this.addProductMassage=undefined,3000);

     })



  }

}
