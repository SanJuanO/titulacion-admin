import { Component, OnInit,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnDestroy, OnInit {
  dtTrigger  = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }
  ngAfterViewInit() {
    Feather.replace();
  }

}
