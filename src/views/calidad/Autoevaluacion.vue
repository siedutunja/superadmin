<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2 text-center">
              <h5>PLAN DE MEJORAMIENTO INSTITUCIONAL - PMI<br>RUTA DE MEJORAMIENTO INSTITUCIONAL</h5>
              <h4>AUTOEVALUACIÓN</h4>
              <h5 v-if="formularioHabilitado" class="text-primary">{{ mensajeFormulario }}</h5>
            </b-col>
          </b-row>
          <b-row v-if="formularioHabilitado">
            <b-col lg="12"><hr></b-col>
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
    <div v-if="!formularioHabilitado">
        <b-row>
            <b-col lg="12">
                <b-card>
                  <template #header>
                      <h5 class="mb-0">ESTADO DEL PERIODO PMI</h5>
                  </template>
                  <b-card-text>
                      <h2 class="text-danger">Periodo Cerrado</h2>
                      <h5 class="text-muted">Por favor comuníquese con el funcionario encargado del proceso en la Secretaría de Educación Territorial.</h5>
                  </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </div>
    <div v-if="idProceso != null">
      <b-row v-if="listaComponentes.length">
        <b-col lg="12" md="12">
          <div v-for="item in listaComponentes" :key="item.id">
            <RubricaComponente :datosComponente="item" />
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
  import RubricaComponente from '@/views/calidad/RubricaComponente'

  export default {
    name: 'autoevaluacion',
    components: {
      RubricaComponente
    },
    data () {
      return {
        idGestion: null,
        idProceso: null,
        comboGestiones: [],
        comboProcesos: [],
        listaComponentes: [],
        activado: false
      }
    },
    methods: {
      async cargarComponentes() {
        this.listaComponentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/listacomponentes', { params: {idProceso: this.idProceso }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Componentes Pmi')
          } else{
            if (response.data.datos != 0) {
              this.listaComponentes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Componentes Pmi. Intente más tarde. ' + err)
        })
      },
      async ocuparComboProcesos() {
        this.comboProcesos = []
        this.listaComponentes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaprocesos', { params: {idGestion: this.idGestion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Procesos Pmi')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboProcesos.push({ 'value': element.id, 'text': element.proceso.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Procesos Pmi. Intente más tarde. ' + err)
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
      iniciarVista() {
        this.mensajeFormulario = this.$store.state.vencePmi
        if (this.$store.state.vigenciaPmi) {
          this.ocuparComboGestiones()
          this.formularioHabilitado = true
        } else {
          this.formularioHabilitado = false
        }
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
