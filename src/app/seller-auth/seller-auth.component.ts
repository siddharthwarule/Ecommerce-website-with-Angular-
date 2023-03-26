import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { signUp } from '../data-type';
import { loginUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  showlogin=false;

  authErorr:String="";

  constructor(private seller:SellerService,private router:Router) { }

  ngOnInit(): void {

      this.seller.reloadSeller();
  }

  signUp(data:signUp):void{

    // console.log(data);

    this.seller.userSignUp(data)

  }

    login(data:loginUp){

      this.authErorr="";

      this.seller.userLogin(data)

      // console.log(data)

      this.seller.isloginError.subscribe((result)=>{

        if(result){
          this.authErorr="Email or Password is not correct";
        }

      })



    }

  openLogin(){

      this.showlogin=true;


  }

  openSignUp(){

    this.showlogin=false;

  }

}
