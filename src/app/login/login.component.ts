import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from '../services/login.service';
import { SessionService } from '../services/session.service';
import { RecaptchaModule } from "ng-recaptcha";

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public mensaje = "";
  public validado = false;

  constructor(public session: SessionService, private router: Router, private loginservice: LoginServices) { }

  ngOnInit(): void {
    this.session.Signoff();
  }

  onSubmit(data) {

    this.session.setToken('id');
    this.session.setnombre('nombre');
    this.session.setapellidos('apellidos');
    this.session.setCampus('idUniversidad');
    this.session.setPeriodo('idPeriodo');
    this.router.navigate(['/alumnos']);


    /*
    console.log("login");
    if (this.validado) {
      console.log(data);
      var user = $('#email').val();
      var pass = $('#contraseña').val();
      this.loginservice.login(user, pass).subscribe((res: any) => {
        if (res['resultado'] == 1) {
          var datosvalue = res['datos'];
          this.session.setToken(datosvalue['id']);

          this.session.setnombre(datosvalue['nombre']);
          this.session.setapellidos(datosvalue['apellidos']);
          this.session.setCampus(datosvalue['idUniversidad']);
          this.session.setPeriodo(datosvalue['idPeriodo']);

          this.router.navigate(['/dashboard']);

        } else {
          this.mensaje = res['mensaje'];
          $('#success-modal-preview').modal('show');

        }

      }, error => {
          alert(error.message)
          //console.log(error)
      })


    } else {
      this.mensaje = ("Falta el captcha");
      var x = document.getElementById("alerta");
      x.style.display = "block";

    }
    */

  }

  resolved(captchaResponse: string) {
    this.validado = true;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  ocultar() {
    var x = document.getElementById("alerta");
    x.style.display = "none";
  }

}
