<template>
  <div>
    <b-card v-if="infoRubrica.rubrica == 0">
      <template #header>
        <div class="float-right">
          Valoración: <b>SIN VALORACIÓN</b>
        </div>
        <p class="mb-0">Componente:<br><span style="font-weight: bold; font-size: 16">{{ datosComponente.componente.toUpperCase() }}</span></p>
      </template>
      <b-row>
        <b-col>
          <b-alert class="pt-5 pb-5 text-center" variant="danger" show>
            <b-icon icon="info-circle-fill" scale="2" variant="danger"></b-icon>
            <h2 class="pt-3">Aún no se ha evaluado este componente</h2>
            <h5>Por favor diríjase al paso de AUTOEVALUACIÓN y asigne la valoración a este componente.</h5>
          </b-alert>
        </b-col>
      </b-row>
    </b-card>
    <b-card v-if="(infoRubrica.rubrica == 1 || infoRubrica.rubrica == 2) && infoRubrica.valoracion == 0">
      <template #header>
        <div class="float-right">
          Valoración: <b>{{infoRubrica.rubrica == 1 ? '1. EXISTENCIA' : '2. PERTINENCIA'}}</b><br>Valor Factor Crítico: <b>{{infoRubrica.valoracion}}</b>
        </div>
        <p class="mb-0">Componente:<br><span style="font-weight: bold; font-size: 16">{{ datosComponente.componente.toUpperCase() }}</span></p>
      </template>
      <b-row>
        <b-col>
          <b-alert class="pt-5 pb-5 text-center" variant="warning" show>
            <b-icon icon="info-circle-fill" scale="2" variant="warning"></b-icon>
            <h2 class="pt-3">Aún no se ha priorizado este componente</h2>
            <h5>Por favor diríjase al paso de PRIORIZACIÓN y asigne la valoración a este componente.</h5>
          </b-alert>
        </b-col>
      </b-row>
    </b-card>
    <b-card v-if="infoRubrica.valoracion >= 10">
      <template #header>
        <div class="float-right">
          Valoración: <b>{{infoRubrica.rubrica == 1 ? '1. EXISTENCIA' : '2. PERTINENCIA'}}</b><br>Valor Factor Crítico: <b>{{infoRubrica.valoracion}}</b>
        </div>
        <p class="mb-0">Componente:<br><span style="font-weight: bold; font-size: 16">{{ datosComponente.componente.toUpperCase() }}</span></p>
      </template>
      <div>
        <b-row>
          <b-col lg="12">
            <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Oportunidad de Mejoramiento:</span> <br> {{ infoRubrica.oportunidad }}</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show>
              <div class="float-right" v-b-popover.hover.left="'Se refiere al punto de partida, fin principal  o logro que se pretende obtener, mejorar, ampliar, optmizar, etc.. pues direcciona el horizonte  de  todos los esfuerzos.'" title="Objetivo">
                <b-icon icon="question-circle" aria-hidden="true"></b-icon>
              </div>
              <b-form-group label="Objetivo*" label-for="objetivo" style="font-weight: bold; font-size: 16">
                <b-form-textarea id="objetivo" ref="objetivo" v-model.trim="$v.infoRubrica.objetivo.$model" placeholder="Escriba el objetivo de mejoramiento..." rows="3" max-rows="6" :state="validateState('objetivo')" aria-describedby="feedObjetivo" autocomplete="off"></b-form-textarea>
                <b-form-invalid-feedback id="feedObjetivo" >Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show>
              <div class="float-right" v-b-popover.hover.left="'El indicador es una expresión cualitativa o cuantitativa entre dos o más variables o datos que permite medir, evaluar y comparar en el tiempo el desempeño de los procesos, productos y servicios de la I.E., de acuerdo con sus objetivos estratégicos y metas propuestas en el plan de mejoramiento.'" title="Nombre de Indicador">
                <b-icon icon="question-circle" aria-hidden="true"></b-icon>
              </div>
              <b-form-group label="Nombre de Indicador*" label-for="indicador" style="font-weight: bold; font-size: 16">
                <b-form-textarea id="indicador" ref="indicador" v-model.trim="$v.infoRubrica.indicador.$model" placeholder="Escriba el indicador..." rows="3" max-rows="6" :state="validateState('indicador')" aria-describedby="feedIndicador" autocomplete="off"></b-form-textarea>
                <b-form-invalid-feedback id="feedIndicador" >Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-alert>
         </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show>
              <div class="float-right" v-b-popover.hover.left="'Descripción de la Medida de la Meta'" title="Descripción de la Medida de la Meta">
                <b-icon icon="question-circle" aria-hidden="true"></b-icon>
              </div>
              <b-form-group label="Descripción de la Medida de la Meta*" label-for="umeta" style="font-weight: bold; font-size: 16">
                <b-form-input id="umeta" ref="umeta" v-model.trim="$v.infoRubrica.umeta.$model" placeholder="Escriba la descripción de la medida de la meta..." :state="validateState('umeta')" aria-describedby="feedUMeta" autocomplete="off"></b-form-input>
                <b-form-invalid-feedback id="feedUMeta" >Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-alert>
          </b-col>
          <b-col lg="6">
            <b-alert variant="secondary" show>
              <div class="float-right" v-b-popover.hover.left="'Cantidad a alcanzar'" title="Meta">
                <b-icon icon="question-circle" aria-hidden="true"></b-icon>
              </div>
              <b-form-group label="Meta (Cantidad a alcanzar)*" label-for="meta" style="font-weight: bold; font-size: 16">
                <b-form-input id="meta" ref="meta" v-model.trim="$v.infoRubrica.meta.$model" :state="validateState('meta')" aria-describedby="feedMeta" autocomplete="off" maxlength="25" @keydown="soloDecimales"></b-form-input>
                <b-form-invalid-feedback id="feedMeta" >Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-alert>
          </b-col>
          <b-col lg="6">
            <b-alert variant="secondary" show>
              <div class="float-right" v-b-popover.hover.left="'Frecuencia de Seguimiento del Indicador'" title="Frecuencia de Seguimiento">
                <b-icon icon="question-circle" aria-hidden="true"></b-icon>
              </div>
              <b-form-group label="Frecuencia de Seguimiento del Indicador*" label-for="periocidad" style="font-weight: bold; font-size: 16">
                <b-form-select  id="periocidad" ref="periocidad" v-model="$v.infoRubrica.id_periocidad.$model" :state="validateState('id_periocidad')" :options="comboPeriocidades" aria-describedby="feedPeriocidad"></b-form-select>
                <b-form-invalid-feedback id="feedPeriocidad" >Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show>
              <div class="card-header-actions float-right">
                <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevaAccion()" title="Crear Nueva Acción">
                  <CIcon name="cilMedicalCross"/>
                </CLink>
              </div>
              <b-form-group label="Acciones de Cumplimiento" style="font-weight: bold; font-size: 16">
                <vue-good-table :columns="encabColumnas" :rows="listaAcciones" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'id'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarAccion(props.row)" title="Editar Acción"><CIcon name="cilPencil"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen acciones registradas</h5>
                  </div>
                </vue-good-table>
              </b-form-group>
            </b-alert>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <span v-if="infoRubrica.indicador == null" class="text-danger"><b-icon icon="circle-fill" animation="throb" font-scale="2" variant="danger"></b-icon> Sin guardar</span>
            <span v-else class="pl-2"><b-icon icon="check-square" scale="2" variant="success"></b-icon></span>
            <b-button class="float-right" variant="primary" size="sm" @click="guardarRubrica">Guardar</b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <b-modal ref="modalCrearEditarAccion" size="xl" scrollable hide-footer title="Datos de la Acción" ok-only>
      <div class="mx-3">
        <div>
          <CrearEditarAccion :datosAccion="datosAccion" @retorno="datosRecibidosAccion"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate"
  import { required } from "vuelidate/lib/validators"
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import CrearEditarAccion from '@/views/calidad/CrearEditarAccion'

  export default {
    name: 'componentemejoramiento',
    mixins: [validationMixin],
    props: {
        datosComponente: Object
    },
    components: {
      VueGoodTable,
      CrearEditarAccion
    },
    data () {
      return {
        idRubrica: null,
        infoRubrica: {
          id: null,
          rubrica: null,
          oportunidad: null,
          valoracion: null,
          objetivo: null,
          meta: null,
          umeta: null,
          indicador: null,
          id_periocidad: null
        },
        comboPeriocidades: [],
        listaAcciones: [],
        encabColumnas : [
          { label: 'Acción', field: 'accion', sortable: false },
          { label: 'F_Inicial', field: 'fecha_i', formatFn: this.formatFnF, sortable: false },
          { label: 'F_Final', field: 'fecha_f', formatFn: this.formatFnF, sortable: false },
          { label: 'Recursos', field: 'recursos', sortable: false },
          { label: 'Responsable', field: 'responsable', sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        datosAccion: {},
      }
    },
    validations: {
      infoRubrica: {
        objetivo: { required },
        meta: { required },
        umeta: { required },
        indicador: { required },
        id_periocidad: { required }
      }
    },
    methods: {
      seleccionarAccion(item) {
        this.datosAccion.id = item.id
        this.datosAccion.id_rubrica = this.idRubrica
        this.datosAccion.accion = item.accion
        this.datosAccion.fecha_i = item.fecha_i
        this.datosAccion.fecha_f = item.fecha_f
        this.datosAccion.recursos = item.recursos
        this.datosAccion.responsable = item.responsable
        this.datosAccion.id_gestion = this.datosComponente.idGestion
        this.datosAccion.editarAccion = true
        this.$refs['modalCrearEditarAccion'].show()
      },
      nuevaAccion() {
        this.datosAccion.id = null
        this.datosAccion.id_rubrica = this.idRubrica
        this.datosAccion.accion = null
        this.datosAccion.fecha_i = null
        this.datosAccion.fecha_f = null
        this.datosAccion.recursos = null
        this.datosAccion.responsable = null
        this.datosAccion.id_gestion = this.datosComponente.idGestion
        this.datosAccion.editarAccion = false
        this.$refs['modalCrearEditarAccion'].show()
      },
      async guardarRubrica() {
        this.$v.infoRubrica.$touch()
        if (this.$v.infoRubrica.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          await axios
          .put(CONFIG.ROOT_PATH + 'calidad/rubrica/mejoramiento', JSON.stringify(this.infoRubrica), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error) {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Componente Mejoramiento')
            } else {
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Se ha actualizado el componente correctamente.')
              this.verRubrica()
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Componente Mejoramiento. Intente más tarde. ' + err)
          })
        }
      },
      async verRubrica() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/rubrica/mejoramiento', { params: {idComponente: this.datosComponente.id, idPeriodo: this.$store.state.idPeriodoPmi, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Rubrica')
          } else{
            if (response.data.datos != 0) {
              this.infoRubrica = response.data.datos
              this.idRubrica = this.infoRubrica.id
              this.verAcciones()
              /*
              if (response.data.datos.plazo_i !== null)
                this.infoRubrica.plazo_i = response.data.datos.plazo_i.substr(0,10)
              if (response.data.datos.plazo_t !== null)
                this.infoRubrica.plazo_t = response.data.datos.plazo_t.substr(0,10)
              */
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Rubrica. Intente más tarde. ' + err)
        })
      },
      async ocuparComboPeriocidades() {
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaperiocidades')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Periocidades')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboPeriocidades.push({ 'value': element.id, 'text': element.periocidad })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Periocidades. Intente más tarde. ' + err)
        })
      },
      async verAcciones() {
        this.listaAcciones = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/acciones', { params: {idRubrica: this.idRubrica }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Acciones')
          } else{
            if (response.data.datos != 0) {
              this.listaAcciones = response.data.datos
              //console.log(JSON.stringify(this.listaAcciones))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Acciones. Intente más tarde. ' + err)
        })
      },
      datosRecibidosAccion(retorno) {
        this.$refs['modalCrearEditarAccion'].hide()
        if (retorno == 1) {
          this.verAcciones()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Acción se han registrado correctamente.')
        }
      },
      formatFnF: function(value) {
        if (value != null && value != '') {
          return value.substr(0,10)
        }
        return '-'
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoRubrica[name]
        return $dirty ? !$error : null
      },
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 190))) {
            e.preventDefault()
        }
      },
      iniciarVista() {
        this.ocuparComboPeriocidades()
        this.verRubrica()
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
