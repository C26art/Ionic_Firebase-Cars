import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Carros } from '../models/carros';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  carros!: Observable<Carros[]>

  constructor(private firebaseService: FirebaseService,
    private router: Router) {
    this.carros = this.firebaseService.list();
  }

  newCarros() {
    this.router.navigateByUrl('/tabs/register');
  }

  editCarro(id:string) {
    this.router.navigateByUrl(`/tabs/details/${id}`);
  }

}
