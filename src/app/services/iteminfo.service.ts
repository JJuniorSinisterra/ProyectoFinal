import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
import { FileItems } from '../models/file-items';
import {IteminfoModel} from '../models/iteminfo-model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class IteminfosService {

  private CARTETA_IMAGENES = 'img';

  private iteminfosCollection:AngularFirestoreCollection<IteminfoModel>

  constructor(private db:AngularFirestore) {
    this.iteminfosCollection= db.collection<IteminfoModel>('iteminfos');
  }

  getIteminfos():Observable<IteminfoModel[]>{

    return this.iteminfosCollection.snapshotChanges().pipe(

      map(actions =>

        actions.map(a=>{

          const data = a.payload.doc.data() as IteminfoModel;
          const id = a.payload.doc.id;

          return {id, ...data}

        })

      )

    )
  }

  cargarIteminfoFirebase(imagenes:FileItems[], iteminfos:IteminfoModel){

    const storage = getStorage();

    for(const item of imagenes){

      let iteminfoTrim = iteminfos.tituloItem;

      const storageRef = ref(storage,`${this.CARTETA_IMAGENES}/${iteminfoTrim.replace(/ /g, "")}`);

      const uploadTask = uploadBytesResumable(storageRef, item.archivo);

      uploadTask.on('state_changed', (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;

      },(err)=>{

          console.log('error al subir el archivo');

      },()=>{

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

            item.url = downloadURL;

            this.guardarIteminfo({

              tituloItem:iteminfos.tituloItem,
              textoItem:iteminfos.textoItem,
              ladoItem:iteminfos.ladoItem,
              imgURL:item.url

            })

          })
      })
    }
  }

  async guardarIteminfo(iteminfo:{tituloItem:string, textoItem:string, ladoItem:string, imgURL:string}):Promise<any> {

    try {

      Swal.fire({
        icon: 'success',
        title: 'El archivo se subio correctamente',
        confirmButtonText: 'Aceptar',
        allowOutsideClick:false,

      }).then((result) => {

        if(result.value){
          $('#exampleModal').modal('hide');
        }

      })

    return await this.db.collection('iteminfos').add(iteminfo)

    } catch (error) {

        console.log(error);
    }

  }

  public eliminarIteminfo(id:string, iteminfoTitulo:string):Promise<any>{

    const storage = getStorage();

    const desertRef = ref(storage,`${this.CARTETA_IMAGENES}/${iteminfoTitulo.replace(/ /g, "")}`);

    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO', 'El Item se elimino correctamente', 'success');
    }).catch((error)=>{
      console.error(error);
    });

    return this.iteminfosCollection.doc(id).delete();
  }

}
