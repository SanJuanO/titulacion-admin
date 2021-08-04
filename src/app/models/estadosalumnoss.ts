export class Estadosalumnos {

    constructor(
        public estado: string,
        public fechaCreacion: string,
        public activo: boolean,
        public id?: number







  ) { }
}

export class Estadosalumnoscambio {
    public idAlumno: number;
    public idProyecto: number;
    public idEstado: number;

    public observaciones: string

    constructor(
     


        
    ) { }
}

export class EstadosDocumentosAlumnos {
  public id: number;
  public estado: number;
  public fecha_creacion: string;
  public activo: boolean;

  constructor(
  ) { }
}
