import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Feather from 'feather-icons';
import { OrganizationService } from '../services/organization.service';
import { Empresa, Vacantes } from "../models/empresa"
import { count } from 'rxjs-compat/operator/count';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ConstantPool } from '@angular/compiler';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from "../models/proyectos"
import { Subject } from 'rxjs';
import { ReportesService } from '../services/reportes.service';
import { DashboardService } from '../services/dashboard.service';
import { Estadisticas, EstadisticasModalidadesTrabajo, EstadisticasEdades, EstadisticasGraduacion, EstadisticasPlazasHoras, EstadisticasAlumnosCarrera, EstadisticasODS, EstadisticasAsignacionPlazas } from '../models/estadisticas';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { MultiDataSet, Label } from 'ng2-charts';
import { SessionService } from '../services/session.service';
import { ConvocatoriaServices } from '../services/convocatoria.service';
import { Periodos } from '../models/periodo';

declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {

  // Doughnut
  public doughnutChartLabels: Label[] = ['Externas', 'Internas'/*, 'Mail-Order Sales'*/];
  public doughnutChartData: MultiDataSet = [
    [0, 0],/* 100],
    [50, 150, 120],
    [250, 130, 70],*/
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartLabelsEconomicaActivos: Label[] = ['Sí', 'No'/*, 'Mail-Order Sales'*/];
  public doughnutChartDataEconomicaActivos: MultiDataSet = [[0, 0],];
  public doughnutChartLabelsEsquemaTrabajo: Label[] = ['Tiempo Completo', 'Medio Tiempo', 'Por proyecto', 'Freelance', 'Aún no trabajo'];
  public doughnutChartDataEsquemaTrabajo: MultiDataSet = [[0, 0, 0, 0, 0],];
  public doughnutChartLabelsPlazas: Label[] = ['480', '240'/*, 'Mail-Order Sales'*/];
  public doughnutChartDataPlazas: MultiDataSet = [[0, 0],];
  public doughnutChartLabelsEdad: Label[] = ['Externas', 'Internas'/*, 'Mail-Order Sales'*/];
  public doughnutChartDataEdad: MultiDataSet = [[0, 0],];
  public doughnutChartLabelsASUA: Label[] = ['Sí', 'No'/*, 'Mail-Order Sales'*/];
  public doughnutChartDataASUA: MultiDataSet = [[0, 0],];
  public doughnutChartLabelsGraduacion: Label[] = ['2021', '2022'/*, 'Mail-Order Sales'*/];
  public doughnutChartDataGraduacion: MultiDataSet = [[0, 0],];
  public doughnutChartLabelsODS: Label[] = [''];
  public doughnutChartDataODS: MultiDataSet = [[0],];


  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //console.log(event, active);
  }

  /*Barras start*/
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [/*'2006', '2007', '2008', '2009', '2010', '2011', '2012'*/];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: [0], label: 'Alumnos' },
    /*{ data: [65], 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28], 48, 40, 19, 86, 27, 90], label: 'Series B' }*/
  ];
  
  /*Barras End*/

  public empresa: Empresa[] = [];
  public empresacantidad: number;
  public empresapermisos: Empresa[] = [];
  public vacantes: Vacantes[] = [];

  public empresaactiva: Empresa[] = [];
  public empresadesaciva: Empresa[] = [];
  public d: Date = new Date();

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger = new Subject<any>();

  public estadisticas: Estadisticas = new Estadisticas();
  public estadisticasModalidadesTrabajo: EstadisticasModalidadesTrabajo[] = [];
  public estadisticasEdades: EstadisticasEdades[] = [];
  public estadisticasGraduacion: EstadisticasGraduacion[] = [];
  public estadisticasPlazasHoras: EstadisticasPlazasHoras[] = [];
  public estadisticasAlumnosCarrera: EstadisticasAlumnosCarrera[] = [];
  public estadisticasODS: EstadisticasODS[] = [];
  public estadisticasAsignacionPlazas: EstadisticasAsignacionPlazas[] = [];
  public estadisticasAsignacionPlazasInternas: EstadisticasAsignacionPlazas[] = [];
  public estadisticasAsignacionPlazasExternas: EstadisticasAsignacionPlazas[] = [];
  public totalExternasAutorizadas: number = 0;
  public totalExternasOcupadas: number = 0;
  public totalPorcentajeExternasOcupadas: number = 0;
  public totalInternasAutorizadas: number = 0;
  public totalInternasOcupadas: number = 0;
  public totalPorcentajeInternasOcupadas: number = 0;

  public periodos: Periodos[] = [];
  public idPeriodo:number = 0;

  constructor(private dashboardService: DashboardService,
    private organizacionService: OrganizationService,
    private reportesService: ReportesService,
    private convocatoriasService: ConvocatoriaServices,
    public session: SessionService) {

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      paging: false,
      language: { url: '//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json' }
    };

    this.idPeriodo =Number(this.session.getPeriodo());

    this.empresa = [];
    this.empresacantidad = 0;
    this.empresaactiva = [];
    this.empresadesaciva = [];
    this.vacantes = [];

    this.obtenerPeriodos();

    this.obtenervacantes();
    this.obtenerpermisos();
    this.obtenerempresa();
    this.obtenerEstadisticas();

  }

  ngAfterViewInit() {
    Feather.replace();
  }

  obtenerempresa() {

    this.organizacionService.getAll(this.session.getCampus()).subscribe((res: any[]) => {

      this.empresacantidad = res.length;
      this.empresa = res;


      for (var i = 0; i < this.empresacantidad; i++) {

        if (this.empresa[i].idEstadoOrganizacion == 3) {
          this.empresaactiva.push(this.empresa[i]);
        }
        if (this.empresa[i].idEstadoOrganizacion == 1 || this.empresa[i].idEstadoOrganizacion == 2) {
          this.empresadesaciva.push(this.empresa[i]);


        }

      }
      //console.log(this.empresa);

    })

  }

  obtenerpermisos() {
    return this.organizacionService
      .getempresapermiso(this.session.getCampus())
      .subscribe((empresapermisos: Empresa[]) => this.empresapermisos = empresapermisos);
  }

  obtener() {
    return this.organizacionService
      .getempresapermiso(this.session.getCampus())
      .subscribe((empresapermisos: Empresa[]) => {
        this.empresapermisos = empresapermisos;


      });
  }


  subeArchivo(id) {

    this.organizacionService.cambiarestado(id).subscribe(data => {
      $('#abrirsubir-' + id).modal('hide');
      $('#success-modal-preview-file').modal('show');
      //console.log(data);
    }, error => {
      //console.log(error);
    });
  }
  abrirsubir(id) {

    //console.log("dfdsfdsfds" + id);
    $('#abrirsubir-' + id).modal('show');

  }
  obtenervacantes() {
    return this.organizacionService
      .getvacantes(this.session.getPeriodo(), this.session.getCampus())
      .subscribe((vacantes: Vacantes[]) => {
        this.vacantes = vacantes;
        //console.log(this.vacantes);
        this.dtTrigger.next();

      });
  }

  reportealumnos() {
    return this.reportesService
      .getalumnosreport()
      .subscribe((res) => {


      });
  }
  reporteinstituciones() {
    return this.reportesService
      .getinstitucionesreport()
      .subscribe((res) => {


      });
  }

  obtenerEstadisticas() {
    this.dashboardService.getEstadisticas(this.session.getPeriodo(), this.session.getCampus()).subscribe((res: any) => {
      this.estadisticas = res['estadistica0'];
      this.estadisticasModalidadesTrabajo = res['estadisticaModalidadTrabajo'];
      this.estadisticasEdades = res['estadisticaEdades'];
      this.estadisticasGraduacion = res['estadisticaGraduacion'];
      this.estadisticasPlazasHoras = res['estadisticaPlazasHoras'];
      this.estadisticasAlumnosCarrera = res['estadisticasAlumnosCarrera'];
      this.estadisticasODS = res['estadisticasObjetivosOnu'];
      this.estadisticasAsignacionPlazas = res['estadisticasAsignacionPlazas'];

      //console.log("estadisticas")
      //console.log(res)
      // Doughnut
      this.doughnutChartLabels = ['Externas', 'Internas'/*, 'Mail-Order Sales'*/];
      this.doughnutChartData = [
        [this.estadisticas.plazas_ocupadas_externas, this.estadisticas.plazas_ocupadas_internas]
      ];

      this.doughnutChartDataEconomicaActivos = [[this.estadisticas.alumnos_trabajan, this.estadisticas.alumnos_no_trabajan],];
      this.doughnutChartDataASUA = [[this.estadisticas.alumnos_participan_asua, this.estadisticas.alumnos_no_participan_asua],];

      var aux = [];
      var i = 0;
      for (i = 0; i < this.estadisticasModalidadesTrabajo.length; i++) {
        aux.push(this.estadisticasModalidadesTrabajo[i]['modalidad']);
      }
      this.doughnutChartLabelsEsquemaTrabajo = aux;

      aux = [];
      for (i = 0; i < this.estadisticasModalidadesTrabajo.length; i++) {
        aux.push(this.estadisticasModalidadesTrabajo[i]['cantidad']);
      }
      this.doughnutChartDataEsquemaTrabajo = aux;

      aux = [];
      for (i = 0; i < this.estadisticasEdades.length; i++) {
        aux.push(this.estadisticasEdades[i]['edad']);
      }
      this.doughnutChartLabelsEdad = aux;

      aux = [];
      for (i = 0; i < this.estadisticasEdades.length; i++) {
        aux.push(this.estadisticasEdades[i]['cantidad']);
      }
      this.doughnutChartDataEdad = aux;

      aux = [];
      for (i = 0; i < this.estadisticasGraduacion.length; i++) {
        aux.push(this.estadisticasGraduacion[i]['year']);
      }
      this.doughnutChartLabelsGraduacion = aux;

      aux = [];
      for (i = 0; i < this.estadisticasGraduacion.length; i++) {
        aux.push(this.estadisticasGraduacion[i]['cantidad']);
      }
      this.doughnutChartDataGraduacion = aux;

      aux = [];
      for (i = 0; i < this.estadisticasPlazasHoras.length; i++) {
        aux.push(this.estadisticasPlazasHoras[i]['noHoras']);
      }
      this.doughnutChartLabelsPlazas = aux;

      aux = [];
      for (i = 0; i < this.estadisticasPlazasHoras.length; i++) {
        aux.push(this.estadisticasPlazasHoras[i]['cantidad']);
      }
      this.doughnutChartDataPlazas = aux;

      aux = [];
      for (i = 0; i < this.estadisticasAlumnosCarrera.length; i++) {
        aux.push(this.estadisticasAlumnosCarrera[i]['carrera']);
      }
      this.barChartLabels = aux;

      aux = [];
      for (i = 0; i < this.estadisticasAlumnosCarrera.length; i++) {
        aux.push(this.estadisticasAlumnosCarrera[i]['cantidad']);
      }
      this.barChartData = [
        { data: aux, label: 'Alumnos' },
      ];

      aux = [];
      //console.log("ods");
      //console.log(this.estadisticasODS);
      for (i = 0; i < this.estadisticasODS.length; i++) {
        aux.push(this.estadisticasODS[i]['objetivoOnu']);
      }
      this.doughnutChartLabelsODS = aux;

      aux = [];
      var total = 0;
      for (i = 0; i < this.estadisticasODS.length; i++) {
        total += this.estadisticasODS[i]['cantidad'];
      }
      
      for (i = 0; i < this.estadisticasODS.length; i++) {
        if (total > 0) {
          aux.push(this.estadisticasODS[i]['cantidad'] * 100 / total);
        } else {
          aux.push(0);
        }
      }
      this.doughnutChartDataODS = aux;

      aux = [];
      
      for (i = 0; i < this.estadisticasAsignacionPlazas.length; i++) {
        if (this.estadisticasAsignacionPlazas[i].externa) {
          this.estadisticasAsignacionPlazasExternas.push(this.estadisticasAsignacionPlazas[i]);
          this.totalExternasAutorizadas += this.estadisticasAsignacionPlazas[i].autorizadas;
          this.totalExternasOcupadas += this.estadisticasAsignacionPlazas[i].ocupadas;
          this.totalPorcentajeExternasOcupadas += this.estadisticasAsignacionPlazas[i].porcentajeOcupacion;
        } else {
          this.estadisticasAsignacionPlazasInternas.push(this.estadisticasAsignacionPlazas[i]);
          this.totalInternasAutorizadas += this.estadisticasAsignacionPlazas[i].autorizadas;
          this.totalInternasOcupadas += this.estadisticasAsignacionPlazas[i].ocupadas;
          this.totalPorcentajeInternasOcupadas += this.estadisticasAsignacionPlazas[i].porcentajeOcupacion;
        }
      }
      if (this.totalInternasAutorizadas > 0) {
         this.totalPorcentajeInternasOcupadas=this.totalInternasOcupadas * 100 / this.totalInternasAutorizadas 
      }
      if (this.totalExternasAutorizadas > 0) {
        this.totalPorcentajeExternasOcupadas = this.totalExternasOcupadas * 100 / this.totalExternasAutorizadas
      }
      
    });
  }
  
  porcentaje(valor) {
    return isNaN(valor) ? valor : parseFloat(valor).toFixed(2);
  }
  obtenerPeriodos() {

    return this.convocatoriasService
      .getPeriodo()
      .subscribe((periodos: Periodos[]) => this.periodos = periodos);

  }
  cambiaPeriodo() {
    console.log(this.idPeriodo);
    this.session.setPeriodo(this.idPeriodo);
    location.reload();
  }

}
