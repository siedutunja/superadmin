<template>
  <div>
    <b-row v-if="!listaIndicadores">
      <b-col>
        <h4 class="text-danger">¡Lo sentimos!</h4><br>
        <h5>
          En el momento no puden consultar los indicadores ya que aún se encuentran algunos componentes sin diligencias el Plan de Mejoramiento. <br>
          A continuación se detallan los componenetes sin Plan de Mejoramiento:
        </h5>
        <vue-good-table :columns="encabColumnas" :rows="listaIndicadores" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
        </vue-good-table>
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2 text-center">
              <h5>PLAN DE MEJORAMIENTO INSTITUCIONAL - PMI<br>RUTA DE MEJORAMIENTO INSTITUCIONAL</h5>
              <h4>INDICADORES</h4>
              <hr>
            </b-col>
            <b-col lg="5" class="mt-2">
              <b-form-group label="Area de Gestión*" label-for="area" style="font-weight: bold; font-size: 16">
                <b-form-select  id="area" ref="area" v-model="idGestion" :options="comboGestiones" @change="ocuparComboProcesos(),idProceso=null,activado=true"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="7" class="mt-2">
              <b-form-group label="Proceso*" label-for="proceso" style="font-weight: bold; font-size: 16">
                <b-form-select  id="proceso" ref="proceso" v-model="idProceso" :options="comboProcesos" @change="cargarComponentes()" :disabled="!activado"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <div v-if="idProceso != null">
      <b-row v-if="listaComponentes.length">
        <b-col lg="12" md="12">
          <div v-for="item in listaComponentes" :key="item.id">
            <ParametrosIndicador :datosComponente="{id: item.id, componente: item.componente, area: area, proceso: proceso}" />
          </div>
        </b-col>
      </b-row>
      <b-row v-else-if="idProceso != null">
        <b-col lg="12" md="12" class="mt-1">
          <hr>
        </b-col>
        <b-col lg="12">
          <b-card class="mb-2" border-variant="danger" footer-bg-variant="light">
            <b-card-text>
              <h5 class="text-danger">No existen componentes en el Proceso</h5>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import ParametrosIndicador from '@/views/calidad/ParametrosIndicador'

  export default {
    name: 'indicadores',
    components: {
      VueGoodTable,
      ParametrosIndicador
    },
    data () {
      return {
        idGestion: null,
        idProceso: null,
        comboGestiones: [],
        comboProcesos: [],
        listaComponentes: [],
        activado: false,
        listaIndicadores: [],
        encabColumnas: [
          { label: 'Proceso', field: 'proceso', sortable: false },
          { label: 'Componente', field: 'componente', sortable: false },
          { label: 'Factor Crítico', field: 'valoracion', sortable: false }
        ],
        area: null,
        proceso: null
      }
    },
    methods: {
      async cargarComponentes() {
        this.proceso = document.getElementById('proceso')
        this.proceso = this.proceso[this.proceso.selectedIndex].text
        this.listaComponentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/componentes/mejoramiento', { params: {idProceso: this.idProceso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Componentes Mejoramiento')
          } else{
            if (response.data.datos != 0) {
              this.listaComponentes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Componentes Mejoramiento. Intente más tarde. ' + err)
        })
      },
      async ocuparComboProcesos() {
        this.area = document.getElementById('area')
        this.area = this.area[this.area.selectedIndex].text
        this.comboProcesos = []
        this.listaComponentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/procesos/mejoramiento', { params: {idGestion: this.idGestion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Procesos Mejoramiento Pmi')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboProcesos.push({ 'value': element.id, 'text': element.proceso.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Procesos Mejoramiento Pmi. Intente más tarde. ' + err)
        })
      },
      async ocuparComboGestiones() {
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listagestiones')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Gestiones Pmi')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                if (element.id == 1 && this.$store.state.colpmidirectiva)
                  this.comboGestiones.push({ 'value': element.id, 'text': element.gestion.toUpperCase() })
                if (element.id == 2 && this.$store.state.colpmiacademica)
                  this.comboGestiones.push({ 'value': element.id, 'text': element.gestion.toUpperCase() })
                if (element.id == 3 && this.$store.state.colpmiadmin)
                  this.comboGestiones.push({ 'value': element.id, 'text': element.gestion.toUpperCase() })
                if (element.id == 4 && this.$store.state.colpmicomunidad)
                  this.comboGestiones.push({ 'value': element.id, 'text': element.gestion.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Gestiones Pmi. Intente más tarde. ' + err)
        })
      },
      async consultaIndicadores() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/rubricas/indicadores')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Indicadores Componente Pmi*')
          } else{
            if (response.data.datos != 0) {
              this.listaIndicadores = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Indicadores Componente Pmi. Intente más tarde. ' + err)
        })
      },
      iniciarVista() {
        this.consultaIndicadores()
        this.ocuparComboGestiones()
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
