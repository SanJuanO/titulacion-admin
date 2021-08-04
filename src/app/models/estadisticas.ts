export class Estadisticas {

  public total_organizaciones: number;
  public total_externas: number;
  public total_internas: number;
  public total_proyectos: number;
  public proyectos_externos: number;
  public proyectos_internos: number;
  public plazas_ocupadas_externas: number;
  public plazas_ocupadas_internas: number;
  public plazas_ocupadas_total: number;
  public plazas_autorizadas_externas: number;
  public plazas_autorizadas_internas: number;
  public plazas_autorizadas_total: number;
  public alumnos_trabajan: number;
  public alumnos_no_trabajan: number;
  public alumnos_participan_asua: number;
  public alumnos_no_participan_asua: number;
  constructor(
  ) { }

}

export class EstadisticasModalidadesTrabajo {

  public idModalidadTrabajo: number;
  public modalidad: number;
  public cantidad: number;
  constructor(
  ) { }

}

export class EstadisticasEdades  {

  public edad: number;
  public cantidad: number;
  constructor(
  ) { }

}

export class EstadisticasGraduacion  {

  public year: number;
  public cantidad: number;
  constructor(
  ) { }

}

export class EstadisticasPlazasHoras {

  public noHoras: number;
  public cantidad: number;
  constructor(
  ) { }

}

export class EstadisticasAlumnosCarrera {

  public idCarrera: number;
  public carrera: string;
  public cantidad: number;
  constructor(
  ) { }
}
export class EstadisticasODS{

  public idObjetivoOnu: number;
  public objetivoOnu: string;
  public cantidad: number;
  constructor(
  ) { }

}
export class EstadisticasAsignacionPlazas{

  public idOrganizacion: number;
  public organizacion: string;
  public autorizadas: number;
  public ocupadas: number;
  public externa: boolean;
  public porcentajeOcupacion: number;
  constructor(
  ) { }

}
