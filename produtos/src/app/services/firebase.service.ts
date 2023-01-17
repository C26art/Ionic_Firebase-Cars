import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docSnapshots,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Carros } from '../models/carros';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  save(carro: Carros): Promise<void> {
    const document = doc(collection(this.firestore, 'carros'));
    return setDoc(document, carro);
  }

  list(): Observable<Carros[]> {
    const carrosCollection = collection(this.firestore, 'carros');
    return collectionData(carrosCollection, { idField: 'id' }).pipe(
      map((result) => result as Carros[])
    );
  }

  find(id: string): Observable<Carros> {
    const document = doc(this.firestore, `carros/${id}`);
    return docSnapshots(document).pipe(
      map((doc) => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Carros;
      })
    );
  }

  findByName(marca: string): Observable<Carros[]> {
    const carroList = this.list();
    return carroList.pipe(
      map((carros) =>
        carros.filter((carro) => {
          const fullName = carro.marca.concat('', carro.modelo);
          return fullName.toLowerCase().match(marca.toLowerCase());
        })
      )
    );
  }

  update(carro: Carros): Promise<void> {
    const document = doc(this.firestore, 'carros', carro?.id);
    const { id, ...data } = carro;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void> {
    const document = doc(this.firestore, 'carros', id);
    console.log(document);
    return deleteDoc(document);
  }
}
