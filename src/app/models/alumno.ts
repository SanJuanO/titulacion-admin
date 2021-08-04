export class Alumno {
  constructor(
    public nombre: string,
    public paterno: string,
    public materno: string,
    public matricula: string,
    public id_universidad: number,
    public id_facultad: number,
    public id_carrera: number,
    public activo: boolean,
    public id_plan?: number,
    public id?: number,
    public universidad?: string,
    public facultad?: string,
    public carrera?: string,
    public nombre_plan?:string,
  ) { }

}

export class AlumnoProyecto {
    constructor(
        public fechaCreacion:string,
        public alumno: string,
        public proyectoNombre: string,
        public idProyecto: number,
        public idAlumno: number,
        public id: number
    ) { }

}

export class AlumnosActividades {
  public idAlumnoProyectoAsignado: number;
  public titulo: string;
  public actividad: string;
  public validaEmpresa?: boolean;
  public id?: number;
  public fechaCreacion?: string;
  public activo?: boolean;
  public archivo?: string;
  public ruta?: string;
  constructor() { }
}

export class AreasVidaUniversitaria{
    constructor(
      public areaVidaUniversitaria: string,
        public activo: boolean,
        public id: number
    ) { }

}
export class AlumnosAreasVidaUniversitariaParticipado {
    constructor(
      public idAreaVidaUniversitaria:number,
      public activo: boolean,
      public alumno?: string,
      public areaVidaUniversitaria?: string,
      public id?: number,
        public idAlumno?: number,

    ) { }

}
export class AlumnosAreasVidaUniversitariaActuales {
  constructor(
    public idAreaVidaUniversitaria: number,
    public activo: boolean,
    public alumno?: string,
    public areaVidaUniversitaria?: string,
    public id?: number,
    public idAlumno?: number,
    ) { }

}

export class ModalidadesTrabajo {
  constructor(
    public modalidad: number,
    public activo: boolean,
    public id: number,
    ) { }
}

export class Reporte {
  constructor(
    public activo: boolean,
    ) { }
}

export class AlumnosProyectosAsignados {
  public id: number;
  public idAlumno: number;
  public idProyecto: number;
  public idEstado: number;

  public proyectoNombre?: string;
  public matricula?: string;

  public correo?: string;
  public celular?: string;
  public carrera?: string;
  public facultad?: string;
  public universidad?: string;
  public idOrganizacion?: string;
  public organizacion?: string;
  public estado?: string;
  public alumno?: string;
  public noHoras?: number;
  public horasRegistradas?: number;
  public rutaCartaInicio?: string;
  public rutaCartaTermino?: string;
  public archivoCartaInicio?: string;
  public archivoCartaTermino?: string;
  public validaCartaInicio?: string;
  public validaCartaTermino?: string;
  public estadoValidaCartaInicio?: string;
  public estadoValidaCartaTermino?: string;
  public fechaInicioInstitucion?: string;

  constructor() { }
}

export class alumnohoras {
  public id?: number;
  public idAlumnosProyectosAsignacion: number;
  public idProyecto: number;

  public noHoras: number;
  public activo: boolean = true;
  public fechaCreacion: string;
  constructor(


  ) { }

}

export class RespuestasAlumnosOrganizaciones {
  constructor(
    public idAlumnoProyectoAsignado: number,
    public idAlumno: number,
    public idOrganizacion: number,
    public idPregunta: number,
    public activo: boolean = true,
    public respuesta: string,
    public version: number,
    public pregunta?: string,


  ) { }

}

export class AlumnoRequisitos {
  public pago?: boolean;
  public junta?: boolean;
  public cartaInicio?: boolean;
  public reportesMensuales?: boolean;
  public cartaTermino?: boolean;
  public evaluacionSS?: boolean;
  public horasSS?: boolean;
  public eventoSS?: boolean;

  constructor() { }

}



