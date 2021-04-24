import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { RestApiService } from "src/app/content/services/rest-api.service";

@Component({
  selector: 'app-product-remove',
  templateUrl: './product-remove.component.html',
  styleUrls: ['./product-remove.component.css']
})
export class ProductRemoveComponent implements OnInit, OnChanges {

  @Input() itemId: any = null;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public itemTitle: string = '';

  public isFormSubmitted: boolean = false;

  constructor(private apiService: RestApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(_changes: SimpleChanges): void {
    console.log("_changes: ", _changes)
    for(const _propName in _changes) {
      if(_changes.hasOwnProperty(_propName)){
        switch (_propName){
          case "itemId":
            if(_changes.itemId.currentValue != null) {
              this.loadINventoryDetails();
            } else {
              this.itemId = null;
            }
            break;
        }
      }
    }
  }

  loadINventoryDetails = () => {
    this.apiService.retriveAnInventory(this.itemId).subscribe(
      (res:any) => {
        let _proDetails = res.itemDetails
        
        this.itemTitle = _proDetails.title;
      },
      (error) => {
        console.log(error)
      },
    )
  }

  confirmDelete = () => {
    this.apiService.deleteInventory(this.itemId).subscribe(
      (res: any) => {
        console.log("Response: ", res)
        this.itemId = null;
        this.close.emit();
      },
      (err: any) => {
        console.log("Error: ", err)
      },
    );
  }

}
