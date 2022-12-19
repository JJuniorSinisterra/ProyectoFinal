export class SliderModel{
    id?: String;
    tituloSlider: string;
    textoSlider: string;
    imgURL: string;


    constructor(tituloSlider: string, textoSlider: string, imgURL: string){
        this.tituloSlider = tituloSlider;
        this.textoSlider = textoSlider;
        this.imgURL = imgURL;
    }
}
