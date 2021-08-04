import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public nombre = "";
  public apellidos = "";
  constructor(private router: Router, public session: SessionService) {
    if (this.session.getToken() == "") {
      this.router.navigate(['/'])
    }
    this.nombre = this.session.getnombre();
    this.apellidos = this.session.getapellidos();

  }
  ngOnInit(): void {



  }

  ocultar() {
    console.log(screen.width);
    if (screen.width < 614) {
      var menu = document.getElementById("menu");
      if (menu.style.display == "none") {
        menu.style.display = "block";
      } else {
        menu.style.display = "none";

      }
    }
  }
}
