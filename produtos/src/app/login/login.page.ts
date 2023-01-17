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

  validaUserName = true
  validaEmail = true;
  type: boolean = true;
  


  constructor(private loginService: LoginService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.carroFormGroup = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email, Validators.pattern(/.+@.+\..+/)]),
      'confEmail': new FormControl('',[Validators.required, FormValidations.equalsTo('email')]),
      'password': new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[@*\.])[a-zA-Z0-9@*]{6,10}$/)]),
      'confPass': new FormControl('', [Validators.required, FormValidations.equalsTo('password')]),
    });
  }

  changeType(){
    this.type = !this.type;
  }
  

  registrar(values: any){
    let newLogin: Login = {...values};
    const logins = this.carroFormGroup.getRawValue() as Login;

    if(this.validaEmail && this.validaUserName){
      this.loginService.save(logins);   
      console.log(newLogin);   
      this.carroFormGroupDirective.reset();
      this.router.navigate(['/tabs/register'], {relativeTo: this.route});
    }
  }
  verificaUsername(){
    this.validaUserName = true
    this.loginService.findUsuario(this.username).subscribe({
      next: (resultado)=>{
        resultado.forEach(element => {


          if(this.username === element.username){
            console.log(element.username)
            console.log(this.username)
            this.validaUserName = false
          }
        });
      },
      error:(err) => console.error(err)
    })
  }
  verificaEmail(){
    this.validaEmail = true
    this.loginService.findEmail(this.email).subscribe({
      next: (resultado)=>{
        resultado.forEach(element => {


          console.log(this.validaEmail)
          if(this.email === element.email) {

            this.validaEmail = false
          }
        });
      },
      error:(err) => console.error(err)
    });
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

  get username(){ return this.carroFormGroup.get('username')?.getRawValue()}
  get email(){ return this.carroFormGroup.get('email')?.getRawValue()}
}



