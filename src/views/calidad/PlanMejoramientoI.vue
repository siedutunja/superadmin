<template>
  <div>
    <b-card bg-variant="secondary">
      <template #header>
        <p class="mb-0 text-center"><span style="font-weight: bold; font-size: 16">PLAN DE MEJORAMIENTO INSTITUCIONAL - PMI<br>RUTA DE MEJORAMIENTO INSTITUCIONAL<br>INDICADOR</span></p>
      </template>
      <b-row>
        <b-col lg="6">
          <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Area de Gestión:</span> <br> {{ datosEvaluacion.area.toUpperCase() }}</b-alert>
        </b-col>
        <b-col lg="6">
          <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Proceso:</span> <br> {{ datosEvaluacion.proceso.toUpperCase() }}</b-alert>
        </b-col>
        <b-col lg="6">
          <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Componente:</span> <br> {{ datosEvaluacion.componente.toUpperCase() }}</b-alert>
        </b-col>
        <b-col lg="3">
          <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Valoración:</span> <br> {{ datosIndicador.rubrica }}</b-alert>
        </b-col>
        <b-col lg="3">
          <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Priorización:</span> <br> {{ datosIndicador.valoracion }}</b-alert>
        </b-col>
        <b-col lg="12">
          <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Oportunidad de Mejoramiento:</span> <br> {{ datosIndicador.oportunidad }}</b-alert>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Objetivo*" label-for="objetivo" style="font-weight: bold; font-size: 16">
            <b-form-textarea id="objetivo" ref="objetivo" v-model.trim="$v.datosIndicador.objetivo.$model" placeholder="Escriba el objetivo de mejoramiento..." rows="3" max-rows="6" :state="validateState('objetivo')" aria-describedby="feedObjetivo" autocomplete="off" :disabled="!habilitar"></b-form-textarea>
            <b-form-invalid-feedback id="feedObjetivo" >Campo requerido.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col lg="12">
          <b-form-group label="Nombre de Indicador*" label-for="indicador" style="font-weight: bold; font-size: 16">
            <b-form-textarea id="indicador" ref="indicador" v-model.trim="$v.datosIndicador.indicador.$model" placeholder="Escriba el indicador..." rows="3" max-rows="6" :state="validateState('indicador')" aria-describedby="feedIndicador" autocomplete="off" :disabled="!habilitar"></b-form-textarea>
            <b-form-invalid-feedback id="feedIndicador" >Campo requerido.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group label="Descripción de la Medida de la Meta*" label-for="umeta" style="font-weight: bold; font-size: 16">
            <b-form-input id="umeta" ref="umeta" v-model.trim="$v.datosIndicador.umeta.$model" placeholder="Escriba la descripción de la medida de la meta..." :state="validateState('umeta')" aria-describedby="feedUMeta" autocomplete="off" :disabled="!habilitar"></b-form-input>
            <b-form-invalid-feedback id="feedUMeta" >Campo requerido.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group label="Meta (Cantidad a alcanzar)*" label-for="meta" style="font-weight: bold; font-size: 16">
            <b-form-input id="meta" ref="meta" v-model.trim="$v.datosIndicador.meta.$model" :state="validateState('meta')" aria-describedby="feedMeta" autocomplete="off" maxlength="25" @keydown="soloDecimales" :disabled="!habilitar"></b-form-input>
            <b-form-invalid-feedback id="feedMeta" >Campo requerido.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col lg="4">
          <b-form-group label="Frecuencia de Seguimiento*" label-for="periocidad" style="font-weight: bold; font-size: 16">
            <b-form-select  id="periocidad" ref="periocidad" v-model="datosIndicador.id_periocidad" :options="comboPeriocidades" aria-describedby="feedPeriocidad" :disabled="!habilitar"></b-form-select>
            <b-form-invalid-feedback id="feedPeriocidad" >Campo requerido.</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <div class="card-header-actions float-right" v-if="habilitar">
            <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevaAccion()" title="Crear Nueva Acción">
              <CIcon name="cilMedicalCross"/>
            </CLink>
          </div>
          <b-form-group label="Acciones de Cumplimiento" style="font-weight: bold; font-size: 16">
            <vue-good-table :columns="encabColumnas" :rows="listaAcciones" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'id'">
                  <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarAccion(props.row)" title="Editar Acción" v-if="habilitar"><CIcon name="cilPencil"/></span>
                </span>
              </template>
              <div slot="emptystate">
                <h5 class="text-danger ml-5">No existen acciones registradas</h5>
              </div>
            </vue-good-table>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-alert variant="info" show><span style="font-weight: bold; font-size: 16">Ultima Actualización:</span> <br> {{ new Date(datosIndicador.actualizado).toLocaleDateString() }}</b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12"><hr></b-col>
        <b-col lg="12">
          <b-button class="mx-2" variant="success" @click="reenviarIndicador" v-if="datosIndicador.estado==1">Guardar Ajustes y Enviar Indicador Ajustado</b-button>
          <b-button class="mx-2" variant="light" @click="verTrazabilidad">Ver Trazabilidad</b-button>
        </b-col>
      </b-row>
    </b-card>
    <b-modal ref="modalTrazabilidad" size="xl" scrollable hide-footer title="Trazabilidad" ok-only>
      <b-row class="mb-4">
        <b-col lg="12">
          <b-table-simple hover>
            <b-thead>
              <b-th style="background: #53606d; color: white;">Estado</b-th>
              <b-th style="background: #53606d; color: white;">Fecha</b-th>
              <b-th style="background: #53606d; color: white;">Realizó</b-th>
              <b-th style="background: #53606d; color: white;">Observaciones</b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="item in listaTrazabilidad" :key="item.id">
                <b-td>{{item.descEstado}}</b-td>
                <b-td>{{new Date(item.creado).toLocaleDateString()}}</b-td>
                <b-td>{{item.usuario}}</b-td>
                <b-td>{{item.observaciones}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-modal>
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
    name: 'planmejoramientoi',
    mixins: [validationMixin],
    props: {
        datosEvaluacion: Object
    },
    components: {
      VueGoodTable,
      CrearEditarAccion
    },
    data () {
      return {
        comboPeriocidades: [],
        datosIndicador: {},
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
        datosTazabilidad: {},
        listaTrazabilidad: [],
        rechazo: {
          observaciones: null
        },
        habilitar: false
      }
    },
    validations: {
      datosIndicador: {
        objetivo: { required },
        indicador: { required },
        meta: { required },
        umeta: { required },
        id_periocidad: { required }
      },
      rechazo: {
        observaciones: { required }
      }
    },
    methods: {
      seleccionarAccion(item) {
        this.datosAccion.id = item.id
        this.datosAccion.id_rubrica = item.id_rubrica
        this.datosAccion.accion = item.accion
        this.datosAccion.fecha_i = item.fecha_i
        this.datosAccion.fecha_f = item.fecha_f
        this.datosAccion.recursos = item.recursos
        this.datosAccion.responsable = item.responsable
        this.datosAccion.id_gestion = this.datosEvaluacion.idGestion
        this.datosAccion.editarAccion = true
        this.$refs['modalCrearEditarAccion'].show()
      },
      nuevaAccion() {
        this.datosAccion.id = null
        this.datosAccion.id_rubrica = this.datosEvaluacion.idEvaluacion
        this.datosAccion.accion = null
        this.datosAccion.fecha_i = null
        this.datosAccion.fecha_f = null
        this.datosAccion.recursos = null
        this.datosAccion.responsable = null
        this.datosAccion.id_gestion = this.datosEvaluacion.idGestion
        this.datosAccion.editarAccion = false
        this.$refs['modalCrearEditarAccion'].show()
      },
      datosRecibidosAccion(retorno) {
        this.$refs['modalCrearEditarAccion'].hide()
        if (retorno == 1) {
          this.verAcciones()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la Acción se han registrado correctamente.')
        }
      },
      verTrazabilidad() {
        this.$refs['modalTrazabilidad'].show()
      } ,    
      reenviarIndicador() {
        this.$bvModal.msgBoxConfirm('Está seguro de guardar y enviar los ajustes del Indicador del PMI?', {
          title: 'Guardar y Enviar Indicador',
          size: '',
          buttonSize: '',
          okVariant: 'success',
          okTitle: 'Si, Guardar y Enviar Indicador',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.datosTazabilidad.id = this.datosEvaluacion.idEvaluacion
            this.datosTazabilidad.nuevoEstado = 0
            this.datosTazabilidad.observaciones = 'Indicador Ajustado y enviado a la SET '
            this.datosTazabilidad.usuario = this.$store.state.apellidoUsuario + " " + this.$store.state.nombreUsuario
            this.datosTazabilidad.objetivo = this.datosIndicador.objetivo
            this.datosTazabilidad.indicador = this.datosIndicador.indicador
            this.datosTazabilidad.meta = this.datosIndicador.meta
            this.datosTazabilidad.umeta = this.datosIndicador.umeta
            this.datosTazabilidad.id_periocidad = this.datosIndicador.id_periocidad
            axios
            .post(CONFIG.ROOT_PATH + 'calidad/indicador/estado', JSON.stringify(this.datosTazabilidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Aceptar Indicadores')
              } else {
                this.$emit("retorno", 1)
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Aceptar Indicadores. Intente más tarde. ' + err)
            })
          }
        })
      },
      async verAcciones() {
        this.listaAcciones = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/acciones', { params: {idRubrica: this.datosEvaluacion.idEvaluacion }})
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
      async consultaIndicador() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/indicador', { params: { idEvaluacion: this.datosEvaluacion.idEvaluacion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Evaluaciones')
          } else{
            if (response.data.datos != 0) {
              this.datosIndicador = response.data.datos
              if (this.datosIndicador.estado == 1) {
                this.habilitar = true
              } else {
                this.habilitar = false
              }
              this.verAcciones()
              this.consultarTrazabilidad()
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Evaluaciones. Intente más tarde. ' + err)
        })
      },
      async consultarTrazabilidad() {
        this.listaTrazabilidad = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/indicador/trazabilidad', { params: { idEvaluacion: this.datosEvaluacion.idEvaluacion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Trazabilidad Indicador')
          } else{
            this.listaTrazabilidad = response.data.datos
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Trazabilidad Indicador. Intente más tarde.' + err)
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
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 190))) {
            e.preventDefault()
        }
      },
      formatFnF: function(value) {
        if (value != null && value != '') {
          return value.substr(0,10)
        }
        return '-'
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.datosIndicador[name]
        return $dirty ? !$error : null
      },
      validateStateR(name) {
        const { $dirty, $error } = this.$v.rechazo[name]
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
        this.consultaIndicador()
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
