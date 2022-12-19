import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
import {ContactoModel} from '../models/contacto-model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class ContactosService {


  private contactosCollection:AngularFirestoreCollection<ContactoModel>

  constructor(private db:AngularFirestore) {
    this.contactosCollection= db.collection<ContactoModel>('contactos');
  }

  getContactos():Observable<ContactoModel[]>{

    return this.contactosCollection.snapshotChanges().pipe(

      map(actions =>

        actions.map(a=>{

          const data = a.payload.doc.data() as ContactoModel;
          const id = a.payload.doc.id;

          return {id, ...data}

        })

      )

    )
  }

  cargarContactoFirebase(contactos:ContactoModel){

    this.guardarContacto({

        nombre:contactos.nombre,
        correo:contactos.correo,
        mensaje:contactos.mensaje

    })

  }

  async guardarContacto(contacto:{nombre:string, correo:string, mensaje:string}):Promise<any> {

    try {

      Swal.fire({
        icon: 'success',
        title: 'Su mensaje fue enviado correctamente, en un momento se le respondera',
        confirmButtonText: 'Aceptar',
        allowOutsideClick:false,
        
      })

    return await this.db.collection('contactos').add(contacto)

    } catch (error) {

        console.log(error);
    }

  }

  public eliminarContacto(id:string, ContactoNom:string):Promise<any>{

    const storage = getStorage();

    const desertRef = ref(storage,`${ContactoNom.replace(/ /g, "")}`);

    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO', 'El mensaje se elimino correctamente', 'success');
    }).catch((error)=>{
      console.error(error);
    });

    return this.contactosCollection.doc(id).delete();
  }



}


