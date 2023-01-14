import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarroDetailsPage } from './carro-details.page';

const routes: Routes = [
  {
    path: '',
    component: CarroDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarroDetailsPageRoutingModule {}
