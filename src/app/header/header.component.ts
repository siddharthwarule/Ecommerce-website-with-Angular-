import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // searchDatas:product[];

  constructor(private route: Router, private product: ProductService) { }

  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  cartItem: number = 0;

  searchResults: undefined | product[];

  //search logo
  searchSymbol = faSearch;

  ngOnInit(): void {
    // change nav bar logic
    // 8if any change in routes EVENT get ex
    this.route.events.subscribe((val: any) => {
      console.log(val.url);

      // this is to set the menutype
      if (val.url) {
        if (val.url.includes('seller')) {
          this.menuType = 'sellerLogin';
        }

        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log('into the seller area');
          this.menuType = 'seller';

          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller');

            // here to get the seller name it can check the if the data is present or not and then parse it into the json object
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');

          // data presents in the localstorage is in the stringify format we want into json format that why parse into the json format

          let userData = userStore && JSON.parse(userStore);

          this.userName = userData.name;

          let users = localStorage.getItem('user');

          let userId = users && JSON.parse(users).id;

          this.product.getCartList(userId);

          this.menuType = 'user';
        } else {
          console.log('outside seller');
          this.menuType = 'default';
        }
      }
    });

    //to set the cart data

    let cartData = localStorage.getItem('localCart');

    if (cartData) {
      this.cartItem = JSON.parse(cartData).length;

      //this is set but without refresh the page it not display the value
      //thats why we take event amite on product service file
    }

    //thats why emitin data from adding cart service

    this.product.cartsDatas.subscribe((item) => {
      this.cartItem = item.length;

      console.log('called called');
    });
  }

  logOutSeller() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);

    this.product.cartsDatas.emit([]);
  }

  // this is for the aoto searching data get form the server

  searchData(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;

      this.product.getAutoSearch(element.value).subscribe((data) => {
        //only 5 product shown
        if (data.length > 5) {
          data.length = 5;
        }

        this.searchResults = data;
      });
    }
  }

  hideSearch() {
    this.searchResults = undefined;
  }

  submitSearch(val: string) {
    console.log(val);

    this.route.navigate([`search/${val}`]);
  }

  redirectToDetails(id: number) {
    this.route.navigate([`product-details/${id}`]);
  }
}
