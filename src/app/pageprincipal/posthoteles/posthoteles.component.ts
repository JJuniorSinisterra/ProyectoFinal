import { Component, OnInit } from '@angular/core';
import { FileItems } from 'src/app/models/file-items';
import { HotelModel } from 'src/app/models/hotel-model';
import { HotelesService } from 'src/app/services/hoteles.service';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { HabitacionModel } from 'src/app/models/habitacion-model';


@Component({
  selector: 'app-posthoteles',
  templateUrl: './posthoteles.component.html',
  styleUrls: ['./posthoteles.component.css']
})
export class PosthotelesComponent implements OnInit {

  hoteles:HotelModel[]=[];
  habitaciones:HabitacionModel[]=[];
  imagenes:FileItems[]=[];

 constructor( private hotelSvc:HotelesService, private habitacionSvc:HabitacionesService) { }

  ngOnInit(): void {

    this.hotelSvc.getHoteles().subscribe(res=>{
      this.hoteles = [];
      res.forEach((element:HotelModel)=>{
        this.hoteles.push({
          ...element
        })
      })
      console.log(this.hoteles)
    }),

    this.habitacionSvc.getHabitaciones().subscribe(res=>{
      this.habitaciones = [];
      res.forEach((element:HabitacionModel)=>{
        this.habitaciones.push({
          ...element
        })
      })
      console.log(this.habitaciones)
    })


  }



}
