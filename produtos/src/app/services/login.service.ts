import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private firestore: Firestore ) { }

  save(login: Login): Promise<void> {
    const document = doc (collection(this.firestore, 'login'));
    return setDoc(document, login);
  } 
 
}
