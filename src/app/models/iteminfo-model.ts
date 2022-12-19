export class IteminfoModel{
    id?: String;
    tituloItem: string;
    textoItem: string;
    ladoItem: string;
    imgURL: string;


    constructor(tituloItem: string, textoItem: string, ladoItem: string, imgURL: string){
        this.tituloItem = tituloItem;
        this.textoItem = textoItem;
        this.ladoItem = ladoItem
        this.imgURL = imgURL;
    }
}
