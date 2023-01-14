import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Carros } from '../models/carros';
import { CorreiosService } from '../services/correios.service';
import { FirebaseService } from '../services/firebase.service';
import { Endereco } from '../models/endereco.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  carroFormGroup!: FormGroup;
  @ViewChild('carroFormGroupDirective') carroFormGroupDirective!: FormGroupDirective;

  constructor(private firebaseService: FirebaseService, private correiosService: CorreiosService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
      this.carroFormGroup = new FormGroup({
        'marca': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
        'modelo': new FormControl('', Validators.required),
        'ano': new FormControl('', Validators.required),
        'categoria': new FormControl('', Validators.required),
        'concessionaria': new FormControl('', Validators.required),
        'cep': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]),
        'logradouro': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        'numero': new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(6), Validators.pattern(/^[0-9]+$/)]),
        'bairro': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        'localidade': new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      });
  }


  createCarro(values: any) {
    let newCarro: Carros = {...values};
    this.firebaseService.save(newCarro);
    console.log(newCarro);
    this.carroFormGroupDirective.reset();
  }

  loadEndereco() {
    const cep:string = this.carroFormGroup.get('cep')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result:Endereco) => {
        this.carroFormGroup.patchValue({
          cep: result.cep,
          logradouro: result.logradouro,
          bairro: result.bairro,
          localidade: result.localidade,
        });
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

}
