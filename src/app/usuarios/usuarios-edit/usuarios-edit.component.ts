import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario"

import { Periodos } from "../../models/periodo"
import { Universidad } from "../../models/universidad"
import { Location } from '@angular/common';

import { Router, ActivatedRoute } from '@angular/router';


declare var $: any;
@Component({
  selector: 'app-organization-add',
  templateUrl: './usuarios-edit.component.html',
  styleUrls: ['./usuarios-edit.component.scss']
})
export class UsuariosEditComponent implements OnInit {

  public mensajevalidacion = "";

  public usuarios = new Usuario("", "", "", "", "", 1, 1, true, true);

  validar = false;

  public universidades: Universidad[] = [];
  public idobtenido = "";


  constructor(private usuarioservices: UsuarioServices, private router: Router, private activatedRoute: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    this.idobtenido = this.activatedRoute.snapshot.paramMap.get("id");
    this.usuarioservices.getUsuarioid(this.idobtenido).subscribe((usuarios: Usuario) => this.usuarios = usuarios);
  console.log(this.usuarios);
    //this.obtenerUniversidad();

  }
  obtenerUniversidad() {

    return this.usuarioservices
      .getUniversidad()
      .subscribe((universidades: Universidad[]) => this.universidades = universidades);

  }

  ngAfterViewInit() {
    Feather.replace();
  }

  update() {
  
    $('#nombre').css("border", "#dee2e6 solid 1px");
    $('#apellidos').css("border", "#dee2e6 solid 1px");
    $('#correo').css("border", "#dee2e6 solid 1px");
    $('#password').css("border", "#dee2e6 solid 1px");

    let model = this.usuarios;

    console.log(model)

    if (model.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');
      $('#nombre').css("border", "red solid 1px");


    }
    else if (!this.validarEmail(model.correo)) {
      this.mensajevalidacion = "Ingrese un correo valido"
      $('#validacion').modal('show');
      $('#correo').css("border", "red solid 1px");

    }

    else if (model.apellidos == "") {
      this.mensajevalidacion = "No puedes dejar el campo de apellidos vacío"
      $('#validacion').modal('show');
      $('#apellidos').css("border", "red solid 1px");


    }
    else if (model.correo == "") {
      this.mensajevalidacion = "No puedes dejar el campo de correo vacío"
      $('#validacion').modal('show');
      $('#correo').css("border", "red solid 1px");


    }
    else if (model.password == "") {
      this.mensajevalidacion = "No puedes dejar el campo de contraseña vacío"
      $('#validacion').modal('show');
      $('#password').css("border", "red solid 1px");


    }
    else {
      
      this.usuarioservices.updateusuarios(this.idobtenido, model).subscribe((res: any) => {
        console.log(res.message)

        $('#success-modal-preview').modal('show');

        this._location.back();
      }, error => {
        alert(error.error)
      })
    }

    //alert("Usuario editado")


  }


  validarEmail(valor) {
    var caract = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);

    if (caract.test(valor) == false) {
      return false
    } else {
      return true;
    }
  }
  mostrarpass() {
    console.log("cambioar");
    if ($('#mostrar_contrasena').is(':checked')) {
      $('#password').attr('type', 'text');
    } else {
      $('#password').attr('type', 'password');
    }

  }



}
