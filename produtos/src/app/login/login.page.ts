import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login.model';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  carroFormGroup!: FormGroup;
  @ViewChild('carroFormGroupDirective') carroFormGroupDirective!: FormGroupDirective; 

  type: boolean = true;


  constructor(private loginService: LoginService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carroFormGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'confEmail': new FormControl('',[Validators.required, FormValidations.equalsTo('email')]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[@*\.])[a-zA-Z0-9@*]{6,10}$/)]),
      'confPass': new FormControl('', [Validators.required, FormValidations.equalsTo('password')]),
    });
  }

  changeType(){
    this.type = !this.type;
  }

  createLogin(values: any) {
    let newLogin: Login = {...values};
    this.loginService.save(newLogin);
    console.log(newLogin);
    this.carroFormGroupDirective.reset();
    this.router.navigate(['/tabs/register'], {relativeTo: this.route});
  } 


  goToHome() {}

  facebookLogin() {}

  instagramLogin() {}

  twitterLogin() {}

  touchLogin() {}

  faceLogin() {}

  goToRegister() {}

  openSignUp() {
  }  
 
}



