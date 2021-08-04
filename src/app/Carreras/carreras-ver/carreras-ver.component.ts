import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { CarreraService } from '../../services/carrera.service';
import { FacultadService } from '../../services/facultad.service';
import { Carrera } from "../../models/carrera";
import { Facultad } from "../../models/facultad";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Binary } from '@angular/compiler';
import { NgModel } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-carreras-ver',
  templateUrl: './carreras-ver.component.html',
  styleUrls: ['./carreras-ver.component.scss']
})
export class CarrerasVerComponent implements OnInit {

  public carrera: Carrera = new Carrera("carrera", "descripcion de la carrera", 0,0)
  public idCarrera = "0"
  public carreras: Carrera[] = []

  constructor(private route: ActivatedRoute, private router: Router, private facultadService: FacultadService, private carreraService: CarreraService, private _location: Location) { }

  ngOnInit(): void {

    this.idCarrera = this.route.snapshot.paramMap.get("id")
    console.log(this.idCarrera)
    //this.obtenerUniversidades()
    //this.obtenerCarreras()
    if (this.idCarrera!= "0") {

      this.obtenerCarrera()

    }

  }

  obtenerCarrera() {

    return this.carreraService
      .getCarrera(this.idCarrera)
      .subscribe((carrera: Carrera) => this.carrera = carrera);

  }


}
