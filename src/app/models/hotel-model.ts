export class HotelModel{
    id?: String;
    nomHotel: string;
    direccionHotel: string;
    estrellasHotel: string;
    imgURL: string;


    constructor(nomHotel: string, direccionHotel: string, estrellasHotel: string, imgURL: string){
        this.nomHotel = nomHotel;
        this.direccionHotel = direccionHotel;
        this.estrellasHotel = estrellasHotel;
        this.imgURL = imgURL;
    }
}
