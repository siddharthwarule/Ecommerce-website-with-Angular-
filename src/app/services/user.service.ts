import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { loginUp, signUp } from '../data-type';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoginError=new EventEmitter<boolean>(false);


  constructor(private http:HttpClient,private router:Router) { }



  usersSignUp(user:signUp){

    // console.log(user);

    this.http.post('http://localhost:3000/users',user,{observe :'response'}).subscribe((result)=>{

    // console.log(result);


    if(result){

      localStorage.setItem('user',JSON.stringify(result.body));

      this.router.navigate(['/']);

    }

    })

    }

userAuthReload(){


  if(localStorage.getItem('user')){

    this.router.navigate(['/'])

  }

}


userLogin(data:loginUp){

 return this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,
 {observe:'response'}).subscribe((result:any)=>{

  console.log(result)

  if(result && result.body && result.body.length){

    localStorage.setItem('user',JSON.stringify(result.body[0]));


    this.router.navigate(['/']);

  }else{

    this.isUserLoginError.emit(true)


  }

 })

}

}
