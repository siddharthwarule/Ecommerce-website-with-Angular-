import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import{Router} from '@angular/router';
import { loginUp } from '../data-type';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  //behavior subject

  isSellerLoggedIn=new BehaviorSubject<boolean>(false);

  //service emmiter

  isloginError=new EventEmitter<boolean>(false);



  constructor(private http:HttpClient,private router:Router) { }

  userSignUp(data:signUp){

    // console.log("service called")

       this.http.post('http://localhost:3000/seller',data, {observe: 'response'}).subscribe((result)=>{


      this.isSellerLoggedIn.next(true);

      localStorage.setItem('seller',JSON.stringify(result.body));

      this.router.navigate(['seller-home']);

      //  console.log('result',result);

       });

  }


  reloadSeller(){
    if (localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home']);
    }
  }


  userLogin(data:loginUp){



    this.http.get(`http://localhost:3000/seller?gmail=${data.email}&password=${data.password}`,{observe:'response'})
    .subscribe((result:any)=>
    {

      console.log(result);

      if(result && result.body && result.body.length){

          console.log("User Loggedin");
          // this.isSellerLoggedIn.next(true);

          localStorage.setItem('seller',JSON.stringify(result.body));

          this.router.navigate(['seller-home']);


      }else{
        console.log("Login Fields...");

        this.isloginError.emit(true);

      }

    })


    // console.log(data)

  }

}
