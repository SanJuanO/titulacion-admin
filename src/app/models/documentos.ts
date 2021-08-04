import { Binary } from '@angular/compiler';

export class Documentos {
    constructor(
        public documento: string,
        public configuracion:  number,
        public id: number,
        
  


  
    ) { }  

}

export class DocumentosSubidos {
    constructor(
        public idEstado:  number,
        public idOrganizacion: number,
        public idDocumento:  number,
        public ruta: string,
        public Estado:  string,
      public file: any
    ) { }
}

export class DocumentosSubidosRequeridos {
    constructor(
        public idEstado:  number,
        public idOrganizacion: number,
        public idDocumento:  number,
        public ruta: string,
      public Estado: string,
      public idDocumentoRequerido :number,
      public documento :string,
      public configuracion :number,

      public file: any,
      public descripcion?:string

    ) { }
}

export class DocumentosCadena {
    constructor(
        public idEstado:  number,
        public idOrganizacion: number,
        public iddocumento:  number,
        public ruta: string,
        public Estado:  string,
      public file: any
    ) { }
}

export class Documentosfile {
  public file: File;
  constructor(
    ) { }
}
export class Estadodocumento {
  constructor(
      public id: number,
      public estado: string,

      
  ) { }    

}

export class Documentoupdate {
  constructor(
      public IdOrganizacion: number,
      public IdDocumento: number,
      public IdEstado: number,
      public activo: boolean,
      public id:number,


      
  ) { }    

}