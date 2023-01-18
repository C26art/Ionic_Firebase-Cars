import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Carros } from '../models/carros';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  carrosList!: Carros[];
  searchFG!: FormGroup;

  @ViewChild('searchFGD') searchFGD!: FormGroupDirective;

  constructor(
    private toastController: ToastController,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchFG = new FormGroup({
      marca: new FormControl('', Validators.required),
    });
  }

  search(carro: any) {
    this.firebaseService.findByName(carro.marca).subscribe({
      next: (result) => {
        if (!result) {
          this.presentToast(`Marca not found: ${carro.marca}`);
        }
        this.carrosList = result as Carros[];
      },
      error: (err) => {
        console.log(err);
        this.presentToast(`Service unavailable`);
      },
    });
    this.searchFG.reset();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500,
      position: 'middle',
    });
    await toast.present();
  }

  editCarro(id: string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }
}
