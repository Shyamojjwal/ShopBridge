import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HeaderModule } from './layouts/header/header.module';
import { FooterModule } from './layouts/footer/footer.module';


@NgModule({
  declarations: [
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    ContentRoutingModule,
  ]
})
export class ContentModule { }
