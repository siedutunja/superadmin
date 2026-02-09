<template>
  <div>
    <b-card>
      <template #header>
        <h3 class="text-center">FICHA TÉCNICA INDICADORES PMI</h3>
      </template>
      <div v-if="infoRubrica.rubrica!=0">
        <b-row>
          <b-col lg="6">
            <b-alert variant="info" show><strong>Area de Gestión:</strong> <br> {{ datosComponente.area!=null ? datosComponente.area.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="6">
            <b-alert variant="info" show><strong>Proceso:</strong> <br> {{ datosComponente.proceso!=null ? datosComponente.proceso.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="info" show><strong>Componente:</strong> <br> {{ datosComponente.componente!=null ? datosComponente.componente.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="success" show><strong>Indicador:</strong> <br> {{ infoRubrica.indicador!=null ? infoRubrica.indicador.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show><strong>Oportunidad de Mejoramiento:</strong> <br> {{ infoRubrica.oportunidad!=null ? infoRubrica.oportunidad.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show><strong>Objetivo:</strong> <br> {{ infoRubrica.objetivo!=null ? infoRubrica.objetivo.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="6">
            <b-alert variant="secondary" show><strong>Meta:</strong> <br> {{ infoRubrica.meta }}</b-alert>
          </b-col>
          <b-col lg="6">
            <b-alert variant="secondary" show><strong>Unidad de Medida:</strong> <br> {{ infoRubrica.umeta!=null ? infoRubrica.umeta.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show><strong>Acciones:</strong> <br> {{ infoRubrica.acciones!=null ? infoRubrica.acciones.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="4">
            <b-alert variant="secondary" show><strong>Periocidad:</strong> <br> {{ infoRubrica.periocidad!=null ? infoRubrica.periocidad.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="4">
            <b-alert variant="secondary" show><strong>Fecha Inicio:</strong> <br> {{ infoRubrica.plazo_i }}</b-alert>
          </b-col>
          <b-col lg="4">
            <b-alert variant="secondary" show><strong>Fecha Termina:</strong> <br> {{ infoRubrica.plazo_t }}</b-alert>
          </b-col>
          <b-col lg="6">
            <b-alert variant="secondary" show><strong>Recursos:</strong> <br> {{ infoRubrica.recursos!=null ? infoRubrica.recursos.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="6">
            <b-alert variant="secondary" show><strong>Fuente de Información:</strong> <br> {{ infoRubrica.fuente!=null ? infoRubrica.fuente.toUpperCase() : '' }}</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert variant="secondary" show><strong>Responsable:</strong> <br> {{ infoRubrica.responsable!=null ? infoRubrica.responsable.toUpperCase() : '' }}</b-alert>
          </b-col>
        </b-row>
      </div>
    </b-card>
    <b-card>
      <template #header>
        <h3 class="text-center">AVANCES DEL INDICADOR</h3>
      </template>
      <b-row>
        <b-col lg="12">
          <h4>Avances del Indicador</h4>
          <vue-good-table :columns="encabColumnas" :rows="listaAvances" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'id'">
                <span style="font-weight: bold; color: blue; cursor: pointer" @click="verFilaAvance(props.row)" title="Editar Seguimiento"><CIcon name="cilZoom"/></span>
              </span>
            </template>
            <div slot="emptystate">
              <h5 class="text-danger ml-5">No existen avances registrados</h5>
            </div>
          </vue-good-table>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate"
  import { required } from "vuelidate/lib/validators"
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'componentemejoramiento',
    mixins: [validationMixin],
    props: {
        datosComponente: Object
    },
    components: {
      VueGoodTable
    },
    data () {
      return {
        infoRubrica: {
          id: null,
          rubrica: null,
          valoracion: null,
          objetivo: null,
          meta: null,
          indicador: null,
          acciones: null,
          responsable: null,
          plazo_i: null,
          plazo_t: null,
          recursos: null,
          fuente: null,
          oportunidad: null
        },
        listaAvances: [],
        encabColumnas: [
          { label: 'Descripción del Avance', field: 'descripcion', sortable: false },
          { label: 'Valor', field: 'valor', sortable: false },
          { label: 'Fecha', field: 'fecha', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
      }
    },
    validations: {
      infoRubrica: { // No va
        recursos: { required },
        fuente: { required }
      }
    },
    methods: {
      verFilaAvance(fila){
        alert(fila)
      },
      async verRubrica() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/rubrica/indicador', { params: {idComponente: this.datosComponente.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Indicador')
          } else{
            if (response.data.datos != 0) {
              this.infoRubrica = response.data.datos
              if (response.data.datos.plazo_i !== null)
                this.infoRubrica.plazo_i = response.data.datos.plazo_i.substr(0,10)
              if (response.data.datos.plazo_t !== null)
              this.infoRubrica.plazo_t = response.data.datos.plazo_t.substr(0,10)
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Indicador. Intente más tarde. ' + err)
        })
      },
      async cargarAvances() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/avances', { params: {idRubrica: this.infoRubrica.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Avances Indicador')
          } else{
            if (response.data.datos != 0) {
              this.listaAvances = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Avances Indicador. Intente más tarde. ' + err)
        })
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoRubrica[name]
        return $dirty ? !$error : null
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      iniciarVista() {
        this.verRubrica()
        this.cargarAvances()
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
