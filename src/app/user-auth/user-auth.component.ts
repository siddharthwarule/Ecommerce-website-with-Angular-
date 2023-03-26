import { Component, OnInit } from '@angular/core';
import { cart, loginUp, product, signUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {


  errorMassage: string = "";


  showLogin: boolean = true;

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit(): void {

    this.user.userAuthReload();

    this.user.isUserLoginError.subscribe((result) => {

      if (result) {

        this.errorMassage = "Email or Password is not correct"

      } else {
        // this.localCartToRemoteCart();
      }

    })

  }

  signUp(data: signUp) {

    // console.log(data)
    this.user.usersSignUp(data);
  }


  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {

    this.showLogin = false;

  }



  //TO GET THE LOGIN DATA
  login(data: loginUp) {

    // console.log(data)

    this.user.userLogin(data)

  this.localCartToRemoteCart();

  }







  //transfer data feom localStorage to database and then remove from the local storage


  localCartToRemoteCart() {

    console.log("methos called");

    let data = localStorage.getItem('localCart');

    let users = localStorage.getItem('user')

    let userId = users && JSON.parse(users).id;


      // console.log("this is the user id"+userId)


    if (data) {

      let cartDataList: product[] = JSON.parse(data)

      cartDataList.forEach((products: product,index) => {

        let cartData: cart = {

          ...products,
          userId,
          productId: products.id,

        }

        //id comes with the products which is deleted
        delete cartData.id;

        //then now we are ready to send data in databse

        //inside the loop we called the api and cartdata Json object is store there


        // here data is stored in very quickly json server cant handdle it thats why we use the setTime out function

        setTimeout(() => {
       this.product.addToCartInRemote(cartData).subscribe((result) => {
            if (result) {

              console.log("item added sussecfuly")
            }
          })
           //we wnt to remove this from localcart

          if(cartDataList.length===index+1){

            localStorage.removeItem('localCart');

          }

        }, 500)
      })

    }

    setTimeout(()=>{

      this.product.getCartList(userId);

      },100)


  }

}
