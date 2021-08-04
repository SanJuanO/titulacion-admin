  import { Component, OnInit,ViewChild,OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { UsuarioServices } from '../services/usuario.service';
import { Usuario } from "../models/usuario"
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

declare var $: any;

@Component({
  selector: 'app-convocatorias',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })

  dtElement: DataTableDirective;
  public usuarios: Usuario[] = [];
  dtTrigger  = new Subject<any>();
  dtOptions: DataTables.Settings = {};

  constructor(private usuariosService:UsuarioServices ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language:{url:'//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json'}
    }
    this.obtenerUsuarios()
  }

  ngAfterViewInit() {
    Feather.replace()
  }
  obtenerUsuarios() {
    return this.usuariosService
      .getUsuarios()
      .subscribe((usuarios: Usuario[]) =>{ this.usuarios = usuarios;
        this.dtTrigger.next()
      })
  }

  eliminar(id) {
    this.usuariosService.eliminar(id).subscribe((res: any) => {
      //location.reload();
      this.rerender()
   }, error=>{
     alert(error.error)
   })
         
 }

 ngOnDestroy():void{
  this.dtTrigger.unsubscribe();
 }

 modaleliminar(id) {
   
   $('#delete-modal-preview-'+id).modal('show');

 }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {

      // Destroy the table first
      dtInstance.destroy();

      this.usuariosService
        .getUsuarios()
        .subscribe((usuarios: Usuario[]) => {
          this.usuarios = usuarios;

          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        });


    });
  }

}
