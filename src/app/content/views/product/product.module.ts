import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

import { ProductComponent } from './product.component';
import { ModalModule } from '../../components/modal/modal.module';
import { ProductModifierComponent } from './product-modifier/product-modifier.component';
import { ProductRemoveComponent } from './product-remove/product-remove.component';


const route: Routes = [
  {
    path: "",
    component: ProductComponent,
    canActivate: []
  }
]

@NgModule({
  declarations: [
    ProductComponent,
    ProductModifierComponent,
    ProductRemoveComponent
  ],
  imports: [
    NgbModule,
    ModalModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
  ],
  exports: [
    ProductModifierComponent,
    ProductRemoveComponent
  ]
})
export class ProductModule { }
