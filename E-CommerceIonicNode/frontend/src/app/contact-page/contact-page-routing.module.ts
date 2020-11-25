import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactPagePage } from './contact-page.page';

const routes: Routes = [
  {
    path: '',
    component: ContactPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactPagePageRoutingModule {}
