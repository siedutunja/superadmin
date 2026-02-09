<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2 text-center">
              <h5>PLAN DE MEJORAMIENTO INSTITUCIONAL - PMI<br>RUTA DE MEJORAMIENTO INSTITUCIONAL</h5>
              <h4>RESUMEN DE AVANCE</h4>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-1 variant="primary">RESUMEN</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <b-row>
                    <b-col lg="4">
                      <b-card>
                        <h4 class="text-center mb-4">PMI PROYECTADOS</h4>
                        <table class="table table-bordered table-sm">
                          <thead class="thead-light">
                            <tr>
                              <th>Estado</th><th>Cantidad</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><th>Aceptados</th><td>{{ datosGrafica.numAceptados }}</td></tr>
                            <tr><th>Devueltos</th><td>{{ datosGrafica.numDevueltos }}</td></tr>
                            <tr><th>En Revision</th><td>{{ datosGrafica.numRevision }}</td></tr>
                            <tr><th>En Proceso</th><td>{{ datosGrafica.numFaltapmi }}</td></tr>
                            <tr class="thead-light">
                              <th>TOTAL</th><th>{{ datosGrafica.numTotalpmi }}</th>
                            </tr>
                          </tbody>
                        </table>
                      </b-card>
                    </b-col>
                    <b-col lg="4">
                      <b-card>
                        <GrafResumenPmi :datosGrafica="datosGrafica"/>
                      </b-card>
                    </b-col>
                    <b-col lg="4">
                      <b-card>
                        <h4 class="text-center mb-4">AVANCE PMI</h4>
                        <div v-if="pmiAbrobado">
                          <b-alert variant="success" class="text-center" show><h3 class="my-3"><b-icon icon="check2-square" aria-hidden="true"></b-icon><br>PMI APROBADO</h3></b-alert>
                          <b-button block class="mt-5" variant="success">Descargar PMI</b-button>
                        </div>
                        <div v-else class="text-center">
                          <b-progress variant="success" :value="datosGrafica.numAceptados" :max="datosGrafica.numTotalpmi" show-progress animated></b-progress>
                          <h1 class="my-3">{{ Math.round(datosGrafica.numAceptados > 0 ? (datosGrafica.numAceptados / datosGrafica.numTotalpmi) * 100 : 0) }}%</h1>
                          <p>La SET aprobará el PMI de la Institución Educativa, cuando todos los Planes de Mejoramiento proyectados estén Aceptados. </p>
                        </div>
                      </b-card>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="primary">VER COMPONENTES</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <div v-for="item in listaGestiones" :key="item.id">
                  <b-card header-bg-variant="dark" header-text-variant="white">
                    <template #header>
                      <p class="mb-0"><span style="font-weight: bold; font-size: 18">ÁREA DE {{item.gestion.toUpperCase()}}</span></p>
                    </template>
                    <b-row>
                      <b-col>
                        <div v-for="itemP in listaProcesos" :key="itemP.id">
                          <div v-if="itemP.id_gestion == item.id">
                            <h5 class="text-primary">PROCESO {{itemP.proceso.toUpperCase()}}</h5>
                            <b-table-simple class="mb-5" hover striped bordered responsive>
                              <b-thead>
                                <b-th style="width: 70%">Componente</b-th>
                                <b-th class="text-center" style="width: 10%">AutoEval</b-th>
                                <b-th class="text-center" style="width: 10%">FaCriti</b-th>
                                <b-th class="text-center" style="width: 10%">PlanMejora</b-th>
                              </b-thead>
                              <b-tbody>
                                <b-tr v-for="itemC in listaComponentes" :key="itemC.id">
                                  <b-td v-if="itemC.id_proceso == itemP.id">{{itemC.componente.toUpperCase()}}</b-td>
                                  <b-td v-if="itemC.id_proceso == itemP.id" class="text-center" :variant="itemC.rubrica == 0 ? 'danger' : itemC.rubrica > 2 || itemC.rubrica==-1 ? 'success' : 'info'">{{ itemC.rubrica==-1 ? 'N/A' : itemC.rubrica }}</b-td>
                                  <b-td v-if="itemC.id_proceso == itemP.id" class="text-center" :variant="itemC.rubrica==0 ? 'danger' : itemC.rubrica > 2 || itemC.rubrica==-1 ? 'dark' : itemC.valoracion == 0 ? 'danger' : itemC.valoracion > 9 ? 'info' : 'success'">{{itemC.rubrica==1 || itemC.rubrica==2 ? itemC.valoracion : ''}}</b-td>
                                  <b-td v-if="itemC.id_proceso == itemP.id" class="text-center" :variant="itemC.rubrica==0 ? 'danger' : itemC.rubrica > 2 || itemC.rubrica==-1 ? 'dark' : itemC.valoracion == 0 ? 'danger' : itemC.valoracion > 0 && itemC.valoracion <= 9 ? 'dark' : itemC.indicador==null ? 'danger' : itemC.estado==0 ? 'primary' : itemC.estado==1 ? 'warning' : 'success'">
                                    <span v-if="(itemC.rubrica==1 || itemC.rubrica==2) && itemC.valoracion > 9 && itemC.indicador==null">Falta PMI</span>
                                    <span v-else-if="(itemC.rubrica==1 || itemC.rubrica==2) && itemC.valoracion > 9 && itemC.indicador!=null && itemC.estado==0" style="font-weight: bold; cursor: pointer" @click="seleccionarComponente(itemC.idEvaluacion,itemC.componente,itemP.proceso,item.gestion,item.id)">En Revisión</span>
                                    <span v-else-if="(itemC.rubrica==1 || itemC.rubrica==2) && itemC.valoracion > 9 && itemC.indicador!=null && itemC.estado==1" style="font-weight: bold; cursor: pointer" @click="seleccionarComponente(itemC.idEvaluacion,itemC.componente,itemP.proceso,item.gestion,item.id)">Devuelto</span>
                                    <span v-else-if="(itemC.rubrica==1 || itemC.rubrica==2) && itemC.valoracion > 9 && itemC.indicador!=null && itemC.estado==2" style="font-weight: bold; cursor: pointer" @click="seleccionarComponente(itemC.idEvaluacion,itemC.componente,itemP.proceso,item.gestion,item.id)">Aceptado</span>
                                  </b-td>
                                </b-tr>
                              </b-tbody>
                            </b-table-simple>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </b-card>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-modal ref="modalIndicador" size="xl" scrollable title="Datos del Indicador" ok-only>
      <div class="mx-3">
        <PlanMejoramientoI :datosEvaluacion="infoComponente" @retorno="datosRecibidosPlan"/>
      </div>
      <template #modal-footer="{ cancel }">
        <b-button size="sm" variant="light" @click="cancel()">Cerrar</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import PlanMejoramientoI from '@/views/calidad/PlanMejoramientoI'
  import GrafResumenPmi from '@/views/calidad/GrafResumenPmi'

  export default {
    name: 'resumenpmi',
    components: {
      PlanMejoramientoI,
      GrafResumenPmi
    },
    data () {
      return {
        listaGestiones: [],
        listaProcesos: [],
        listaComponentes: [],
        infoComponente: {
          idEvaluacion: null,
          componente: null,
          proceso: null,
          area: null,
          idGestion: null
        },
        datosGrafica: {
          numAceptados: null,
          numDevueltos: null,
          numRevision: null,
          numFaltapmi: null,
          numTotalpmi: null
        },
        habilitarAprobar: false,
        pmiAbrobado: false
      }
    },
    methods: {
      async cargarPmiAprobado() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/aprobarpmi', { params: { idPeriodo: this.$store.state.idPeriodoPmi, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Estado Aprobación del Pmi')
          } else{
            if (response.data.datos != 0) {
              this.pmiAbrobado = response.data.datos.aprobado == 1 ? true : false
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Estado Aprobación del Pmi. Intente más tarde.' + err)
        })
      },
      datosRecibidosPlan(retorno) {
        if (retorno == 1) {
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El estado del indicador se ha actualizado correctamente.')
          this.cargarComponentes()
        }
        this.$refs['modalIndicador'].hide()
      },
      seleccionarComponente(idEvaluacion,componente,proceso,area,idGestion) {
        this.infoComponente.idEvaluacion = idEvaluacion
        this.infoComponente.componente = componente
        this.infoComponente.proceso = proceso
        this.infoComponente.area = area
        this.infoComponente.idGestion = idGestion
        this.$refs['modalIndicador'].show()
      },
      async cargarComponentes() {
        this.listaComponentes = []
        this.datosGrafica.numAceptados = 0
        this.datosGrafica.numDevueltos = 0
        this.datosGrafica.numRevision = 0
        this.datosGrafica.numFaltapmi = 0
        this.datosGrafica.numTotalpmi = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/listacomponentes/resumen', { params: { idPeriodo: this.$store.state.idPeriodoPmi, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Componentes Pmi')
          } else{
            if (response.data.datos != 0) {
              this.listaComponentes = response.data.datos
              this.listaComponentes.forEach(element => {
                if ((element.rubrica==1 || element.rubrica==2) && element.valoracion > 9 && element.indicador!=null && element.estado==2) {
                  this.datosGrafica.numAceptados++
                  this.datosGrafica.numTotalpmi++
                } else if ((element.rubrica==1 || element.rubrica==2) && element.valoracion > 9 && element.indicador!=null && element.estado==1) {
                  this.datosGrafica.numDevueltos++
                  this.datosGrafica.numTotalpmi++
                } else if ((element.rubrica==1 || element.rubrica==2) && element.valoracion > 9 && element.indicador!=null && element.estado==0) {
                  this.datosGrafica.numRevision++
                  this.datosGrafica.numTotalpmi++
                } else if ((element.rubrica == 0 || element.rubrica == 1 || element.rubrica == 2) && (element.valoracion == 0 || element.valoracion > 9)) {
                //} else if ((element.rubrica==1 || element.rubrica==2) && element.valoracion > 9 && element.indicador==null) {
                  this.datosGrafica.numFaltapmi++
                  this.datosGrafica.numTotalpmi++
                }
              })
              this.habilitarAprobar = this.datosGrafica.numAceptados == this.datosGrafica.numTotalpmi ? true : false
              this.pmiAbrobado = this.listaComponentes.aprobado == 1 ? true : false
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Componentes Pmi. Intente más tarde. ' + err)
        })
        this.cargarPmiAprobado()
      },
      async cargarProcesos() {
        this.listaProcesos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/listaprocesos')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Procesos Pmi')
          } else{
            if (response.data.datos != 0) {
              this.listaProcesos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Procesos Pmi. Intente más tarde. ' + err)
        })
      },
      async cargarGestiones() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/listagestiones')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Gestiones Pmi')
          } else{
            if (response.data.datos != 0) {
              this.listaGestiones = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Gestiones Pmi. Intente más tarde. ' + err)
        })
      },
      iniciarVista() {
        this.cargarGestiones()
        this.cargarProcesos()
        this.cargarComponentes()
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
