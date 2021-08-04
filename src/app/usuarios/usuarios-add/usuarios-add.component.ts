import { Component, OnInit } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../../services/usuario.service';
import { Usuario } from "../../models/usuario"

import { Universidad } from "../../models/universidad"
import { Location } from '@angular/common';

import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-organization-add',
  templateUrl: './usuarios-add.component.html',
  styleUrls: ['./usuarios-add.component.scss']
})
export class UsuariosAddComponent implements OnInit {
  public d: Date = new Date(); // but the type can also be inferred from "new Date()" already

  public usuarios = new Usuario("", "", "", "", "", 1, 1, true, true);
  public mensajevalidacion = "";
  public universidades: Universidad[] = [];

  validar = true;

  constructor(private usuarioservice: UsuarioServices, private router: Router, private _location: Location) { }

  ngOnInit(): void {

    //this.obtenerUniversidad();
    this.usuarios.disponible = true;

  }

  ngAfterViewInit() {
    Feather.replace();
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
    
    if ($('#mostrar_contrasena').is(':checked')) {
      $('#password').attr('type', 'text');
    } else {
      $('#password').attr('type', 'password');
    }

  }

  create() {
    
    $('#nombre').css("border", "#dee2e6 solid 1px");
    $('#apellidos').css("border", "#dee2e6 solid 1px");
    $('#email').css("border", "#dee2e6 solid 1px");
    $('#password').css("border", "#dee2e6 solid 1px");

    let model = this.usuarios;

    console.log(model)

    if (model.nombre == "") {
      this.mensajevalidacion = "No puedes dejar el campo de nombre vacío"
      $('#validacion').modal('show');
      $('#nombre').css("border", "red solid 1px");

    }
    else if (!this.validarEmail(model.email)) {
      this.mensajevalidacion = "Ingrese un correo valido"
      $('#validacion').modal('show');
      $('#email').css("border", "red solid 1px");

    }

    else if (model.apellidos == "") {
      this.mensajevalidacion = "No puedes dejar el campo de apellidos vacío"
      $('#validacion').modal('show');
      $('#apellidos').css("border", "red solid 1px");

    }
    else if (model.correo == "") {
      this.mensajevalidacion = "No puedes dejar el campo de email vacío"
      $('#validacion').modal('show');
      $('#email').css("border", "red solid 1px");

    }
    else if (model.password == "") {
      this.mensajevalidacion = "No puedes dejar el campo de contraseña vacío"
      $('#validacion').modal('show');
      $('#password').css("border", "red solid 1px");

    }
    else {

      
      this.usuarioservice.create(model).subscribe((res: any) => {

        $('#success-modal-preview').modal('show');

        this._location.back();
      }, error => {
        alert(error.error)
      })
      
    }
   // alert("usuario creado")


  }


}
