export interface signUp
{

   name :String,
   password:String,
   email:String

}


export interface loginUp
{
  email:String
  password:String,

}

export interface product{

  name :string;
  price:number;
  color:string;
  catagory:string;
  descreption:string;
  image:string;
  id:number;
  quantity:undefined|number;
  productId:undefined|number;


}


export interface cart{

  name :string;
  price:number;
  color:string;
  catagory:string;
  descreption:string;
  image:string;
  id:undefined | number ;
  quantity:undefined|number;
  userId:number;
  productId:number;

}

export interface priceSummary{

price :number,
discount:number,
tax:number,
delivery:number,
total:number

}

export interface order {
  name :string,
  email:String,
  address:string,
  contact:string,

}

export interface orderData {
  name :string,
  email:String,
  address:string,
  contact:string,
  totalprice:number,
  userId:number,
  id:undefined|number

}

