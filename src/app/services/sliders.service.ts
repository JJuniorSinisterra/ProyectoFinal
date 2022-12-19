import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
import { FileItems } from '../models/file-items';
import {SliderModel} from '../models/slider-model';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Action } from 'rxjs/internal/scheduler/Action';

declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class SlidersService {

  private CARTETA_IMAGENES = 'img';

  private slidersCollection:AngularFirestoreCollection<SliderModel>

  constructor(private db:AngularFirestore) {
    this.slidersCollection= db.collection<SliderModel>('sliders');
  }

  getSliders():Observable<SliderModel[]>{

    return this.slidersCollection.snapshotChanges().pipe(

      map(actions =>

        actions.map(a=>{

          const data = a.payload.doc.data() as SliderModel;
          const id = a.payload.doc.id;

          return {id, ...data}

        })

      )

    )
  }

  cargarSliderFirebase(imagenes:FileItems[], sliders:SliderModel){

    const storage = getStorage();

    for(const item of imagenes){

      let sliderTrim = sliders.tituloSlider;

      const storageRef = ref(storage,`${this.CARTETA_IMAGENES}/${sliderTrim.replace(/ /g, "")}`);

      const uploadTask = uploadBytesResumable(storageRef, item.archivo);

      uploadTask.on('state_changed', (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100;

      },(err)=>{

          console.log('error al subir el archivo');

      },()=>{

          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{

            item.url = downloadURL;

            this.guardarSlider({

              tituloSlider:sliders.tituloSlider,
              textoSlider:sliders.textoSlider,
              imgURL:item.url

            })

          })
      })
    }
  }

  async guardarSlider(slider:{tituloSlider:string, textoSlider:string, imgURL:string}):Promise<any> {

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

    return await this.db.collection('sliders').add(slider)

    } catch (error) {

        console.log(error);
    }

  }

  public eliminarSlider(id:string, sliderTitulo:string):Promise<any>{

    const storage = getStorage();

    const desertRef = ref(storage,`${this.CARTETA_IMAGENES}/${sliderTitulo.replace(/ /g, "")}`);

    deleteObject(desertRef).then(()=>{
      Swal.fire('EXITO', 'El slider se elimino correctamente', 'success');
    }).catch((error)=>{
      console.error(error);
    });

    return this.slidersCollection.doc(id).delete();
  }

}
