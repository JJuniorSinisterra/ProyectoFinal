import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject, updateMetadata, StorageReference} from 'firebase/storage';
import { FileItems } from '../models/file-items';
import {HabitacionModel} from '../models/habitacion-model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  private CARTETA_IMAGENES = 'img';

  private habitacionesCollection:AngularFirestoreCollection<HabitacionModel>

  constructor(private db:AngularFirestore) {
    this.habitacionesCollection= db.collection<HabitacionModel>('habitaciones');
  }

  getHabitaciones():Observable<HabitacionModel[]>{

    return this.habitacionesCollection.snapshotChanges().pipe(

      map(actions =>

        actions.map(a=>{

          const data = a.payload.doc.data() as HabitacionModel;
          const id = a.payload.doc.id;

          return {id, ...data}

        })

      )

    )
  }

  cargarHabitacionFirebase(imagenes:FileItems[], habitaciones:HabitacionModel ){

    const storage = getStorage();

    for(const item of imagenes){

      let habitacionTrim = habitaciones.tipoHabitacion;

      const storageRef = ref(storage,`${this.CARTETA_IMAGENES}/${habitacionTrim.replace(/ /g, "")}`);

      const uploadTask = uploadBytesResumable(storageRef, item.archivo);

      uploadTask.on('state_changed', (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;

      },(err)=>{

          console.log('error al subir el archivo');

      },()=>{

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

            item.url = downloadURL;

            this.guardarHabitacion({

              tipoHabitacion:habitaciones.tipoHabitacion,
              precioHabitacion:habitaciones.precioHabitacion,
              hotelHabitacion:habitaciones.hotelHabitacion,
              imgURL:item.url

            })

          })
      })
    }
  }

  async guardarHabitacion(habitacion:{tipoHabitacion:string, precioHabitacion:string, hotelHabitacion:string, imgURL:string}):Promise<any> {

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

    return await this.db.collection('habitaciones').add(habitacion)

    } catch (error) {

        console.log(error);
    }

  }

  public eliminarHabitacion(id:string, habitacionTipo:string):Promise<any>{

    const storage = getStorage();

    const desertRef = ref(storage,`${this.CARTETA_IMAGENES}/${habitacionTipo.replace(/ /g, "")}`);

    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO', 'El hotel se elimino correctamente', 'success');
    }).catch((error)=>{
      console.error(error);
    });

    return this.habitacionesCollection.doc(id).delete();
  }

  

}





