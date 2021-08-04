export class vicerrectorias {
    public vicerrectoria: string;
    public id: number;

    constructor(
    ) { }
  }
  export class cordinaciones {
    public cordinacion: string;
    public id: number;

    constructor(
    ) { }
  }
  export class escueladirecciones {
    public direccion: string;
    public id: number;

    constructor(
    ) { }
  }
  export class Empresa {
    constructor(
      public noAtiendeOtro:number,
      public areaOtro:string,
      public atiendeOtro:string,
  
      public vision:string,
        public descripcionArea:string,
  
        public vicerrectoria:string,
        public direccion:string,
        public cordinacion:string,
        public idCordinacion:number,
        public idDireccion:number,
        public idVicerrectoria:number,
  
  
        public IdResponsable: number,
  
        public ImagenArchivo: string,
        public Imagen: string,
  
        public facebook: string,
        public instagram: string,
        public youtube: string,
        public tiktok: string,
  
        public antiguedad: number,
  
        public estadoOrganizacion: string,
        public universidad:  string,
        public organizacion: string,
        public nombreComun: string,
        public razon: string,
        public reconocimiento: string,
  
        public mision: string,
        public objetivo: string,
        public logros: string,
        public descripcion: string,
        public web: string,
        public cp: string,
        public pais: string,
        public estado: string,
        public municipio:string,
        public ciudad:string,
        public colonia: string,
        public calle: string,
        public noExt: string,
        public noInt: string,
        public activo: boolean,
        public configuracion: number,
        public observaciones: string,
        public id:number,
        public legionario: boolean=false,
        public idEstadoOrganizacion: number,
        public idUniversidad: number,
        public idTipoOrganizacion: number,
        public idGiroOrganizacion: number,
        public idClasificacionOrganizacion: number,
        public indigenas: number,
        public jovenes: number,
        public mujeres: number,
        public ninos: number,
  
        public ancianos: number,
        public discapacitados: number,
  public listaAreasAccion:any,
  public listaRubros: any,
  public Responsable:any
  
  //   { "nombre": "" ,"apellidos": "","genero": "",
  //   "puesto": "","departamento": "",  "disponible": false,"usuario": "","contrasena": true ,
  //   "telefono": "",  "correo": false,"id": 0,"activo": true,"fechaCreacion":"" }
  
  
  
  
  
    ) { }
  
  
    
  
  }
export class estadoActualizar {
    constructor(
        public idEstado: number,
        public observaciones: string,
        public idOrganizacion: number

        
    ) { }    

}
export class Vacantes {
  constructor(
      public carrera: string,
      public plazasDisponibles: number,


      
  ) { }    

}

export class listaRubrosModel {
    constructor(
        public idRubro: number,
        public activo: boolean,

        
    ) { }    

}
export class Responsablemodel {
    constructor(
        public nombreCompletoResponsable: string,

        public nombreCompletoDirector: string,

        public correo: string,
        public departamento: string,
        public telefono: string,
        public puesto: string,
        public usuario: string,
        public contrasena: string,
        public activo: boolean,

        public externa: boolean,
        public extension?:string

        
    ) { }    

}

export class listaAreasModel {
    constructor(
        public idAreaAccion: number,
        public activo: boolean,

        
    ) { }    

}
export class check {
    constructor(
        public jerarquia: string,
        public disponible: string,

        
    ) { }    

}

export class OrganizacionesSucesosModel {
  public id: number;
  public idOrganizacion: number;
  public observaciones: string;
  public fechaCreacion: string;
  public activo: boolean;
  constructor(
  ) { }
}

export class createwhitimage {
    public organizacion: any;
    public id: number;

    constructor(
    ) { }
  }
  export class direcciones {
    public cp: string;
    public colonia: string;
    public municipio: string;
    public estado: string;
    public ciudad: string;
    public pais: string;


    constructor(
    ) { }
  }


export class Empresa2 {
  constructor(
    public estadoOrganizacion: string,
    public universidad: string,
    public imagen: string,
    public organizacion: string,
    public mision: string,
    public objetivo: string,
    public logros: string,
    public descripcion: string,
    public reconocimiento: string,
    public web: string,
    public cp: string,
    public pais: string,
    public estado: string,
    public municipio: string,
    public ciudad: string,
    public colonia: string,
    public calle: string,
    public noExt: string,
    public noInt: string,
    public activo: boolean,
    public configuracion: number,
    public observaciones: string,
    public id: number,
    public legionario: Boolean = false,
    public disponible: boolean,
    public idEstadoOrganizacion: number,
    public idUniversidad: number,
    public idTipoOrganizacion: number,
    public idGiroOrganizacion: number,
    public idClasificacionOrganizacion: number,
    public indigenas: number,
    public jovenes: number,
    public mujeres: number,
    public ninos: number,

    public ancianos: number,
    public discapacitados: number,
    public listaAreasAccion: any,
    public listaRubros: any,
    public responsable: any,
    public vision?: any,
    public razon?: any,


    //   { "nombre": "" ,"apellidos": "","genero": "",
    //   "puesto": "","departamento": "",  "disponible": false,"usuario": "","contrasena": true ,
    //   "telefono": "",  "correo": false,"id": 0,"activo": true,"fechaCreacion":"" }





  ) { }




}
