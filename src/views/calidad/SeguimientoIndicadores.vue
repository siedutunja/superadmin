<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2 text-center">
              <h5>PLAN DE MEJORAMIENTO INSTITUCIONAL - PMI<br>RUTA DE MEJORAMIENTO INSTITUCIONAL</h5>
              <h4>SEGUIMIENTO A INDICADORES</h4>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="!pmiAprobado">
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0">ESTADO DEL SEGUIMIENTO A LOS INDICADORES DEL PMI</h5>
          </template>
          <b-card-text>
            <h2 class="text-danger">¡Lo sentimos!</h2>
            <h5 class="text-danger">En el momento no puden registrar los avances a los indicadores debido a que aún NO SE HA APROBADO EL PMI por parte de la SET.</h5>
            <h5 class="text-muted">Por favor comuníquese con el funcionario encargado del proceso en la Secretaría de Educación Territorial.</h5>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block v-b-toggle.accordion-2 variant="primary">VER INDICADORES</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <!--{{JSON.stringify(listaIndicadores)}}-->
                <div v-for="item in listaIndicadores" :key="item.id">
                  <b-card header-bg-variant="dark" header-text-variant="white">
                    <template #header>
                      <div class="float-right">
                        <CLink href="#" class="card-header-action btn-setting mx-1 text-white" @click="verIndicador(item.id,item.componente,item.proceso,item.gestion,item.id_componente)" title="Ver Ficha Indicador">
                          <CIcon name="cilZoom"/>
                        </CLink>
                      </div>
                      <p class="mb-0"><span style="font-weight: bold; font-size: 18">Indicador:<br> {{item.indicador.toUpperCase()}}</span></p>
                      <p class="mb-0"><span style="font-size: 12">Gestión: {{item.gestion.toUpperCase()}} > Proceso: {{item.proceso.toUpperCase()}} > Componente: {{item.componente.toUpperCase()}}</span></p>
                    </template>
                    <b-row>
                      <b-col lg="12">
                        <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Oportunidad de Mejoramiento:</span><br>{{item.oportunidad}}</b-alert>
                      </b-col>
                      <b-col lg="12">
                        <b-alert variant="info" show>
                          <b-row>
                            <b-col lg="4">
                              <span style="font-weight: bold; font-size: 16">Unidad de Medida:</span><br>{{item.umeta}}
                            </b-col>
                            <b-col lg="4">
                              <span style="font-weight: bold; font-size: 16">Meta:</span><br>{{item.meta}}
                            </b-col>
                            <b-col lg="4">
                              <span style="font-weight: bold; font-size: 16">Periocidad:</span><br>{{item.descPeriocidad}}
                            </b-col>
                          </b-row>
                        </b-alert>
                      </b-col>
                    </b-row>
                    <b-card no-body header-bg-variant="secondary">
                      <template #header>
                        <p class="mb-0"><span style="font-weight: bold; font-size: 16">Seguimiento Indicador - {{item.id_periocidad}}</span></p>
                      </template>
                      <b-card-body>
                        <b-row>
                          <b-col lg="6">
                            <div v-if="item.id_periocidad == 1">
                              <table class="table table-bordered table-sm">
                                <thead class="thead-light">
                                  <tr><th>Seguimiento</th><th>Cantidad</th><th>Avance</th><th></th></tr>
                                </thead>
                                <tr>
                                  <td>Seguimiento #1</td>
                                  <td>{{ item.seg1 }}</td>
                                  <td>{{ Math.round(item.seg1 > 0 ? (item.seg1 / item.meta) * 100 : 0) }}%</td>
                                  <td><span style="font-weight: bold; color: blue; cursor: pointer" @click="editarSeguimiento(item,1)" title="Editar Seguimiento" :disabled="cerrado"><CIcon name="cilPencil"/></span></td>
                                </tr>
                                <tr class="thead-light"><th>TOTAL</th><th>{{ item.seg1 }}</th><th>{{ Math.round(item.seg1 > 0 ? (item.seg1 / item.meta) * 100 : 0) }}%</th><th></th></tr>
                              </table>
                            </div>
                            <div v-else>
                              <table class="table table-bordered table-sm">
                                <thead class="thead-light">
                                  <tr><th>Seguimiento</th><th>Cantidad</th><th>Avance</th><th></th></tr>
                                </thead>
                                <tr>
                                  <td>Seguimiento #1</td>
                                  <td>{{ item.seg1 }}</td>
                                  <td>{{ Math.round(item.seg1 > 0 ? (item.seg1 / item.meta) * 100 : 0) }}%</td>
                                  <td><span style="font-weight: bold; color: blue; cursor: pointer" @click="editarSeguimiento(item,1)" title="Editar Seguimiento" :disabled="cerrado"><CIcon name="cilPencil"/></span></td>
                                </tr>
                                <tr>
                                  <td>Seguimiento #2</td>
                                  <td>{{ item.seg2 }}</td>
                                  <td>{{ Math.round(item.seg2 > 0 ? (item.seg2 / item.meta) * 100 : 0) }}%</td>
                                  <td><span style="font-weight: bold; color: blue; cursor: pointer" @click="editarSeguimiento(item,2)" title="Editar Seguimiento" :disabled="cerrado"><CIcon name="cilPencil"/></span></td>
                                </tr>
                                <tr class="thead-light"><th>TOTAL</th><th>{{ item.seg1 + item.seg2 }}</th><th>{{ Math.round(item.seg1 > 0 ? (item.seg1 / item.meta) * 100 : 0) + Math.round(item.seg2 > 0 ? (item.seg2 / item.meta) * 100 : 0) }}%</th><th></th></tr>
                              </table>
                            </div>
                          </b-col>
                          <b-col lg="6" class="text-center">
                            <b-card>
                              <h4>AVANCE INDICADOR</h4>
                              <b-progress class="mt-4" :max="100" height="2rem">
                                <b-progress-bar :value="Math.round(item.seg1 > 0 ? (item.seg1 / item.meta) * 100 : 0) + Math.round(item.seg2 > 0 ? (item.seg2 / item.meta) * 100 : 0)" variant="success"></b-progress-bar>
                              </b-progress>
                              <div>
                                <h3>{{ Math.round(item.seg1 > 0 ? (item.seg1 / item.meta) * 100 : 0) + Math.round(item.seg2 > 0 ? (item.seg2 / item.meta) * 100 : 0) }} %</h3>
                              </div>
                            </b-card>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col lg="12">
                            <div v-if="item.id_periocidad== 1">
                              <b-alert variant="secondary" show>
                                <span style="font-weight: bold; font-size: 16">Acciones o actividades realizadas para obtener el Seguimiento #1:</span><br>
                                {{item.acc1==null || item.acc1=='' ? 'Ninguna' : item.acc1}}<br><br>
                                <span style="font-weight: bold; font-size: 14">Fecha: {{item.fseg1 != null ? new Date(item.fseg1).toLocaleDateString() : ''}}</span>
                              </b-alert>
                            </div>
                            <div v-if="item.id_periocidad== 2">
                              <b-alert variant="secondary" show>
                                <span style="font-weight: bold; font-size: 16">Acciones o actividades realizadas para obtener el Seguimiento #1:</span><br>
                                {{item.acc1==null || item.acc1=='' ? 'Ninguna' : item.acc1}}<br><br>
                                <span style="font-weight: bold; font-size: 14">Fecha: {{item.fseg1 != null ? new Date(item.fseg1).toLocaleDateString() : ''}}</span>
                              </b-alert>
                              <b-alert variant="secondary" show>
                                <span style="font-weight: bold; font-size: 16">Acciones o actividades realizadas para obtener el Seguimiento #2:</span><br>
                                {{item.acc2==null || item.acc2=='' ? 'Ninguna' : item.acc2}}<br><br>
                                <span style="font-weight: bold; font-size: 14">Fecha: {{item.fseg2 != null ? new Date(item.fseg2).toLocaleDateString() : ''}}</span>
                              </b-alert>
                            </div>
                          </b-col>
                        </b-row>
                      </b-card-body>
                    </b-card>
                  </b-card>
                </div>                
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <b-modal ref="modalSeguimientoIndicador" size="lg" scrollable hide-footer title="Seguimiento Indicador" ok-only>
      <div class="mx-3">
        <div>
          <b-row>
            <b-col lg="12" md="12">
              <b-form-group label="Avance (Cantidad) Alcanzado*" label-for="cantidads" style="font-weight: bold; font-size: 16">
                <b-form-input id="cantidads" ref="cantidads" v-model.trim="$v.infoSeguimiento.cantidad.$model" :state="validateStateS('cantidad')" aria-describedby="feedCantidad" autocomplete="off" maxlength="25" @keydown="soloDecimales"></b-form-input>
                <b-form-invalid-feedback id="feedCantidad" >Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12" md="12">
              <b-form-group label="Acciones o actividades realizadas para obtener el Resultado*" label-for="accioness" style="font-weight: bold; font-size: 16">
                <b-form-textarea id="accioness" ref="accioness" v-model.trim="$v.infoSeguimiento.acciones.$model" :state="validateStateS('acciones')" aria-describedby="feedAcciones" autocomplete="off" rows="5"></b-form-textarea>
                <b-form-invalid-feedback id="feedAcciones">Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12" md="12"><hr></b-col>
            <b-col lg="12" md="12">
              <div class="float-right small text-medium-emphasis">* Campo requerido</div>
              <b-button class="small mt-1 mr-3" variant="success" @click="actualizarIndicador">Actualizar Seguimiento Indicador</b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalIndicador" size="xl" scrollable title="Datos del Indicador" ok-only>
      <div class="mx-3">
        <PlanMejoramientoI :datosEvaluacion="infoComponente"/>
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
  import { validationMixin } from "vuelidate"
  import { required } from "vuelidate/lib/validators"
  import PlanMejoramientoI from '@/views/calidad/PlanMejoramientoI'

  export default {
    name: 'seguimientoindicadores',
    mixins: [validationMixin],
    components: {
      PlanMejoramientoI
    },
    data () {
      return {
        infoSeguimiento: {
          id: null,
          cantidad: null,
          acciones: null,
          periocidad: null
        },
        listaIndicadores: [],
        cerrado: false,
        infoComponente: {
          idEvaluacion: null,
          componente: null,
          proceso: null,
          area: null,
          idGestion: null
        },
        datosGrafica: {
          Avance1: null,
          Avance2: null,
          SinAvance: null
        },
        pmiAprobado: false
      }
    },
    validations: {
      infoSeguimiento: {
        cantidad: { required },
        acciones: { required }
      }
    },
    methods: {
      async actualizarIndicador() {
        this.$v.infoSeguimiento.$touch()
        if (this.$v.infoSeguimiento.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          await axios
          .put(CONFIG.ROOT_PATH + 'calidad/indicadores/seguimiento', JSON.stringify(this.infoSeguimiento), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error) {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Seguimiento Indicador')
            } else {
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Se ha actualizado el Seguimientos del Indicador correctamente.')
              this.$refs['modalSeguimientoIndicador'].hide()
              this.cargarIndicadores()
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Seguimiento Indicador. Intente más tarde. ' + err)
          })
        }
      },
      verIndicador(idEvaluacion,componente,proceso,area,idGestion) {
        this.infoComponente.idEvaluacion = idEvaluacion
        this.infoComponente.componente = componente
        this.infoComponente.proceso = proceso
        this.infoComponente.area = area
        this.infoComponente.idGestion = idGestion
        this.$refs['modalIndicador'].show()
      },
      editarSeguimiento(datos,turno) {
        this.infoSeguimiento.id = {}
        this.infoSeguimiento.id = datos.id
        this.infoSeguimiento.periocidad = datos.id_periocidad
        if (turno == 1) {
          this.infoSeguimiento.cantidad = datos.seg1 > 0 ? datos.seg1 : ''
          this.infoSeguimiento.acciones = datos.acc1
        } else {
          this.infoSeguimiento.cantidad = datos.seg2 > 0 ? datos.seg2 : ''
          this.infoSeguimiento.acciones = datos.acc2
        }
        this.$refs['modalSeguimientoIndicador'].show()
      },
      async cargarIndicadores() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/indicadores/pmi', { params: { idPeriodo: this.$store.state.idPeriodoPmi, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Indicadores Pmi')
          } else{
            if (response.data.datos != 0) {
              this.listaIndicadores = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Indicadores Pmi. Intente más tarde. ' + err)
        })
      },
      validateStateS(name) {
        const { $dirty, $error } = this.$v.infoSeguimiento[name]
        return $dirty ? !$error : null
      },
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 190))) {
            e.preventDefault()
        }
      },
      async cargarPmiAprobado() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/aprobarpmi', { params: { idPeriodo: this.$store.state.idPeriodoPmi, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Estado Aprobación del Pmi')
          } else{
            if (response.data.datos != 0) {
              this.pmiAprobado = response.data.datos.aprobado == 1 ? true : false
              if(this.pmiAprobado) {
                this.cargarIndicadores()
              }
            } else {
              this.pmiAprobado = false
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Estado Aprobación del Pmi. Intente más tarde.' + err)
        })
      },
      iniciarVista() {
        this.cargarPmiAprobado()
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
