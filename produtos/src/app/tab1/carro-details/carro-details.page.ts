import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Carros } from 'src/app/models/carros';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-carro-details',
  templateUrl: './carro-details.page.html',
  styleUrls: ['./carro-details.page.scss'],
})
export class CarroDetailsPage implements OnInit {
  public carros!: Carros;
  carroFormGroup!: FormGroup;
  @ViewChild('carroFormGroupDirective')
  carroFormGroupDirective!: FormGroupDirective;

  constructor(
    private firebaseService: FirebaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.firebaseService.find(id!).subscribe({
      next: (data: Carros) => {
        if (!data) {
          this.router.navigateByUrl('/tabs/list');
        } else {
          this.carros = data;

          this.carroFormGroup = new FormGroup({
            marca: new FormControl(this.carros.marca, Validators.required),
            modelo: new FormControl(this.carros.modelo, Validators.required),
            ano: new FormControl(this.carros.ano, Validators.required),
            categoria: new FormControl(this.carros.categoria, Validators.required),
            concessionaria: new FormControl(this.carros.concessionaria, Validators.required),
            cep: new FormControl(this.carros.cep, Validators.required),
            logradouro: new FormControl(this.carros.logradouro, Validators.required),
            numero: new FormControl(this.carros.numero, Validators.required),
            bairro: new FormControl(this.carros.bairro, Validators.required),
            localidade: new FormControl(this.carros.localidade, Validators.required),
          });
        }
      },
      error: (err) => console.error(`Error on get carro data. Error: ${err}`),
    });
  }

  editCarro(values: any) {
    let updateCarros: Carros = { id: this.carros.id, ...values };
    this.firebaseService
      .update(updateCarros)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));

    this.carroFormGroupDirective.reset();
  }

  deleteCarro() {
    this.firebaseService
      .delete(this.carros.id)
      .then(() => this.router.navigateByUrl('/tabs/list'))
      .catch((err) => console.error(err));
  }
}
