import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private firestore: Firestore) {}

  save(login: Login): Promise<void> {
    const document = doc(collection(this.firestore, 'login'));
    return setDoc(document, login);
  }
  list(): Observable<Login[]> {
    const loginsCollection = collection(this.firestore, 'logins');

    return collectionData(loginsCollection, { idField: 'id' }).pipe(
      map((result) => result as Login[])
    );
  }
  findUsuario(user: string): Observable<Login[]> {
    const listaDeUsuarios = this.list();

    return listaDeUsuarios.pipe(
      map((usuarios) =>
        usuarios.filter((usuario) => {
          const nome = usuario.username;

          return nome.match(user);
        })
      )
    );
  }

  findEmail(mail: string): Observable<Login[]> {
    const listaDeUsuarios = this.list();

    return listaDeUsuarios.pipe(
      map((usuario) =>
        usuario.filter((login) => {
          const nome = login.email;
          return nome.match(mail);
        })
      )
    );
  }
}
