import { Component, OnInit } from '@angular/core';
import { FileItems } from 'src/app/models/file-items';
import { SliderModel } from 'src/app/models/slider-model';
import { SlidersService } from 'src/app/services/sliders.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  sliders:SliderModel[]=[];
  imagenes:FileItems[]=[];
  imgURL = '../../../assets/noimage.png';
  file:any;

  constructor(private sliderSvc:SlidersService) { }

  ngOnInit(): void {
    this.sliderSvc.getSliders().subscribe(res=>{
      this.sliders = [];
      res.forEach((element:SliderModel)=>{
        this.sliders.push({
          ...element
        })
      })
      console.log(this.sliders)
    })
  }

}
