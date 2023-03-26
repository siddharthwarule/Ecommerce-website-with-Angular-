import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})


export class SearchpageComponent implements OnInit {


  searchProducts:undefined|product[];

  constructor(private activeRoute :ActivatedRoute , private products:ProductService) { }




  ngOnInit(): void {

   let query=this.activeRoute.snapshot.paramMap.get('query')

   query && this.products.getAutoSearch(query).subscribe((result)=>{

    this.searchProducts=result;

   })

  }

}
