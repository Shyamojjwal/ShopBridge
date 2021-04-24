import { Component, OnInit } from '@angular/core';
import { RestApiService } from "src/app/content/services/rest-api.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public selectedProId: any = null;

  public isCreateItem: boolean = false;

  public showItemModifyDialog: boolean = false;

  public showItemRemoveDialog: boolean = false;

  public updateItemId: any = null;

  public productList: any = []

  public limit: number = 10;

  public crntPage: number = 1;

  public totalPage: number = 1;

  public totalRecords: number = 1;

  constructor(
    private apiServices: RestApiService
  ) { }

  ngOnInit(): void {
    this.getAllProductList()
  }

  getAllProductList = () => {
    this.apiServices.retriveAllInventories(this.limit, this.crntPage).subscribe(
      (res: any) => {
        this.productList = res.itemList;
        this.totalPage = res.totalPages
        this.totalRecords = res.totalRecords
      },
      (err: any) => {
        console.log("error: ", err)
      }
    )
  }

  litingPageChanges = (_pageNo: any) => {
    this.crntPage = _pageNo
    this.getAllProductList();
  }

  createProduct = () => {
    this.isCreateItem = true;
    this.showItemModifyDialog = !this.showItemModifyDialog;
  }
  
  updateProduct = (itemId:any) => {
    this.isCreateItem = false;
    this.updateItemId = itemId;
    this.showItemModifyDialog = !this.showItemModifyDialog;
  }

  removeProduct = (itemId:any) => {
    this.updateItemId = itemId;
    this.showItemRemoveDialog = !this.showItemRemoveDialog;
  }

  successResponse =() => {
    this.getAllProductList();
    this.updateItemId = null;
    this.showItemModifyDialog = false;
    this.showItemRemoveDialog = false;
  }

}
