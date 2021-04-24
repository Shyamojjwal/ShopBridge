import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  retriveAllInventories = (_limit:any, _pageNo: any) => {
    return this.httpClient.get(`product/get-product-list?limit=${_limit}&page=${_pageNo}`)
  }

  retriveAnInventory = (_itemId:any = null) => {
    return this.httpClient.get(`product/modify-product?itemId=${_itemId}`)
  }

  modifyInventory = (_formValues: any, isCreate: boolean = false) => {
    if(isCreate) {
      return this.httpClient.post('product/modify-product', _formValues);
    } else {
      return this.httpClient.patch('product/modify-product', _formValues);
    }
  }

  deleteInventory = (_itemId: any) => {
    return this.httpClient.delete(`product/remove-product/${_itemId}`);
  }
}
