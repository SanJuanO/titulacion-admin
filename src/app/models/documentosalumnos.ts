import { Binary } from '@angular/compiler';

export class DocumentosRequeridosAlumnos {
  public documento: string;
  public id: number;
  constructor(
  ) { }
}

export class DocumentosSubidosRequeridos {
  public idEstado: number;
  public idAlumno: number;
  public idDocumento: number;
  public ruta: string;
  public estado: string;
  public idDocumentoRequerido: number;
  public documento: string;
  public file: any;
  constructor(
  ) { }
}

export class DocumentosAlumno {
  public idEstado: number;
  public idAlumno: number;
  public iddocumento: number;
  public ruta: string;
  public Estado: string;
  public file: any;
  constructor(
  ) { }
}

export class Documentosfile {
  public file: any
  constructor(
  ) { }
}

