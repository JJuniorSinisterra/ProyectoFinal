import { Component, OnInit } from '@angular/core';
import { FileItems } from 'src/app/models/file-items';
import { IteminfoModel } from 'src/app/models/iteminfo-model';
import { IteminfosService } from 'src/app/services/iteminfo.service';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {

  iteminfos:IteminfoModel[]=[];
  imagenes:FileItems[]=[];
  imgURL = '../../../assets/noimage.png';
  file:any;

  constructor(private iteminfoSvc:IteminfosService) { }

  ngOnInit(): void {
    this.iteminfoSvc.getIteminfos().subscribe(res=>{
      this.iteminfos = [];
      res.forEach((element:IteminfoModel)=>{
        this.iteminfos.push({
          ...element
        })
      })
      console.log(this.iteminfos)
    })
  }

}
