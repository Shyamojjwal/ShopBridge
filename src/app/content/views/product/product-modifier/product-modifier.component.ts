import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { RestApiService } from "src/app/content/services/rest-api.service";
import { checkFormValidation, makeAllFormControlAsDirty } from "src/app/shared/shared-functions";
import { validationMessages } from "src/app/shared/validation-messages";


@Component({
  selector: 'app-product-modifier',
  templateUrl: './product-modifier.component.html',
  styleUrls: ['./product-modifier.component.css']
})
export class ProductModifierComponent implements OnInit, OnChanges {

  @Input() isOpen = false;
  @Input() isCreateDilog = false;
  @Input() itemId: any = null;

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>();

  public inventoryForm: FormGroup;

  public validationErrors: any = {};

  public isFormSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: RestApiService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    for(const _propName in _changes) {
      if(_changes.hasOwnProperty(_propName)){
        switch (_propName){
          case "itemId":
            if(_changes.itemId.currentValue != null) {
              this.loadINventoryDetails();
            }
            break;

          // case "isOpen":
          //   if(_changes.isOpen.currentValue == false) {
          //     this.inventoryForm.reset();
          //   }
          //   break;
        }
      }
    }
  }

  initForm = () => {
    this.inventoryForm = this.fb.group({
      title: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get f() { return this.inventoryForm.controls; }

  markFieldAsDirty = (_field:any) => {
    _field.markAsDirty();
  }

  checkValidation = () => {
    this.validationErrors = checkFormValidation(this.inventoryForm, validationMessages);
  }

  loadINventoryDetails = () => {
    this.apiService.retriveAnInventory(this.itemId).subscribe(
      (res:any) => {
        let _proDetails = res.itemDetails
        
        this.inventoryForm.get("title").setValue(_proDetails.title);
        this.inventoryForm.get("brand").setValue(_proDetails.brand);
        this.inventoryForm.get("price").setValue(_proDetails.price);
        this.inventoryForm.get("description").setValue(_proDetails.description);
      },
      (error) => {
        console.log(error)
      },
    )
  }

  inventorySubmitted = () => {
    if(this.inventoryForm.valid) {
      this.isFormSubmitted = true;

      let _formValues: any = {
        title: this.inventoryForm.value.title,
        brand: this.inventoryForm.value.brand,
        price: this.inventoryForm.value.price,
        description: this.inventoryForm.value.description,
      }
      if(!this.isCreateDilog) {
        _formValues.id = this.itemId
      }

      this.apiService.modifyInventory(_formValues, this.isCreateDilog).subscribe(
        (res: any) => {
          this.inventoryForm.reset();
          this.isFormSubmitted = false;
          this.itemId = null;
          this.close.emit();
        },
        (err: any) => {
          console.log(err)
        }
      );
    } else {
      makeAllFormControlAsDirty(this.inventoryForm);
      this.checkValidation();
    }
  }

}
