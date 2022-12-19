import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
import { FileItems } from '../models/file-items';
import {HotelModel} from '../models/hotel-model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  private CARTETA_IMAGENES = 'img';

  private hotelesCollection:AngularFirestoreCollection<HotelModel>

  constructor(private db:AngularFirestore) {
    this.hotelesCollection= db.collection<HotelModel>('hoteles');
  }

  getHoteles():Observable<HotelModel[]>{

    return this.hotelesCollection.snapshotChanges().pipe(

      map(actions =>

        actions.map(a=>{

          const data = a.payload.doc.data() as HotelModel;
          const id = a.payload.doc.id;

          return {id, ...data}

        })

      )

    )
  }

  cargarHotelFirebase(imagenes:FileItems[], hoteles:HotelModel){

    const storage = getStorage();

    for(const item of imagenes){

      let hotelTrim = hoteles.nomHotel;

      const storageRef = ref(storage,`${this.CARTETA_IMAGENES}/${hotelTrim.replace(/ /g, "")}`);

      const uploadTask = uploadBytesResumable(storageRef, item.archivo);

      uploadTask.on('state_changed', (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;

      },(err)=>{

          console.log('error al subir el archivo');

      },()=>{

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

            item.url = downloadURL;

            this.guardarHotel({

              nomHotel:hoteles.nomHotel,
              direccionHotel:hoteles.direccionHotel,
              estrellasHotel:hoteles.estrellasHotel,
              imgURL:item.url

            })

          })
      })
    }
  }

  async guardarHotel(hotel:{nomHotel:string, direccionHotel:string, estrellasHotel:string, imgURL:string}):Promise<any> {

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

    return await this.db.collection('hoteles').add(hotel)

    } catch (error) {

        console.log(error);
    }

  }

  public eliminarHotel(id:string, HotelNom:string):Promise<any>{

    const storage = getStorage();

    const desertRef = ref(storage,`${this.CARTETA_IMAGENES}/${HotelNom.replace(/ /g, "")}`);

    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO', 'El hotel se elimino correctamente', 'success');
    }).catch((error)=>{
      console.error(error);
    });

    return this.hotelesCollection.doc(id).delete();
  }


 


}
