export class HabitacionModel{
  id?: String;
  tipoHabitacion: string;
  precioHabitacion: string;
  hotelHabitacion: string;
  imgURL: string;


  constructor(tipoHabitacion: string, precioHabitacion: string, hotelHabitacion: string, imgURL: string){
      this.tipoHabitacion = tipoHabitacion;
      this.precioHabitacion = precioHabitacion;
      this.hotelHabitacion = hotelHabitacion;
      this.imgURL = imgURL;
  }
}
