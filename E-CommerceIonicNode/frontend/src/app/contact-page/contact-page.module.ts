import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPagePageRoutingModule } from './contact-page-routing.module';

import { ContactPagePage } from './contact-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactPagePageRoutingModule
  ],
  declarations: [ContactPagePage]
})
export class ContactPagePageModule {}
