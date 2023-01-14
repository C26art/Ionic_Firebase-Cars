import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarroDetailsPageRoutingModule } from './carro-details-routing.module';

import { CarroDetailsPage } from './carro-details.page';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseService } from 'src/app/services/firebase.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    CarroDetailsPageRoutingModule
  ],
  declarations: [CarroDetailsPage],
  providers:[FirebaseService]
})
export class CarroDetailsPageModule {}
