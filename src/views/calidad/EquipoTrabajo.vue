<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2 text-center">
              <h5>PLAN DE MEJORAMIENTO INSTITUCIONAL - PMI<br>RUTA DE MEJORAMIENTO INSTITUCIONAL</h5>
              <h4>EQUIPOS DE TRABAJO</h4>
              <h5 v-if="formularioHabilitado" class="text-primary">{{ mensajeFormulario }}</h5>
            </b-col>
          </b-row>
          <b-row v-if="formularioHabilitado">
            <b-col lg="12"><hr></b-col>
            <b-col lg="5" class="mt-2">
              <b-form-group label="Area de Gestión*" label-for="area" style="font-weight: bold; font-size: 16">
                <b-form-select  id="area" ref="area" v-model="idGestion" :options="comboGestiones" @change="verEquipoGestion(),activado=true"></b-form-select>
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
    <div v-if="activado">
      <b-card>
        <b-row>
          <b-col lg="12" md="12">
            <div class="card-header-actions float-right">
              <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevoIntegrante" title="Crear Integrante">
                <CIcon name="cilMedicalCross"/>
              </CLink>
            </div>
            <h5 class="ml-2"><b-icon icon="person-lines-fill" aria-hidden="true"></b-icon> EQUIPO DE TRABAJO DEL ÁREA DE GESTIÓN</h5>
            <vue-good-table :columns="encabColumnas" :rows="listaEquipoGestion" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'id'">
                  <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarIntegrante(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                </span>
              </template>
              <div slot="emptystate">
                <h5 class="text-danger ml-5">No existen integrantes del equipo del área de gestión</h5>
              </div>
            </vue-good-table>
          </b-col>
        </b-row>
      </b-card>
    </div>
    <b-modal ref="modalCrearEditarIntegrante" size="xl" scrollable hide-footer title="Datos del Integrante" ok-only>
      <div class="mx-3">
        <div>
          <CrearEditarIntegrante :datosIntegrante="datosIntegrante" @retorno="datosRecibidosIntegrante"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import CrearEditarIntegrante from '@/views/calidad/CrearEditarIntegrante'

  export default {
    name: 'equipotrabajo',
    components: {
      VueGoodTable,
      CrearEditarIntegrante
    },
    data () {
      return {
        idGestion: null,
        comboGestiones: [],
        listaEquipoGestion: [],
        encabColumnas : [
          { label: 'Apellidos', field: 'apellidos', sortable: false },
          { label: 'Nombres', field: 'nombres', sortable: false },
          { label: 'Teléfono', field: 'telefono', sortable: false },
          { label: 'Correo', field: 'correo', sortable: false },
          { label: 'Cargo', field: 'cargo', sortable: false },
          { label: 'Lider', field: 'lider', formatFn: this.formatFnL, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        datosIntegrante: {},
        activado: false
      }
    },
    methods: {
      seleccionarIntegrante(item) {
        this.datosIntegrante.id = item.id
        this.datosIntegrante.id_gestion = item.id_gestion
        this.datosIntegrante.id_institucion = item.id_institucion
        this.datosIntegrante.apellidos = item.apellidos
        this.datosIntegrante.nombres = item.nombres
        this.datosIntegrante.telefono = item.telefono
        this.datosIntegrante.correo = item.correo
        this.datosIntegrante.cargo = item.cargo
        this.datosIntegrante.lider = item.lider
        this.datosIntegrante.creo = item.creo
        this.datosIntegrante.editarIntegrante = true
        this.$refs['modalCrearEditarIntegrante'].show()
      },
      nuevoIntegrante() {
        this.datosIntegrante.id = null
        this.datosIntegrante.id_gestion = this.idGestion
        this.datosIntegrante.id_institucion = this.$store.state.idInstitucion
        this.datosIntegrante.apellidos = null
        this.datosIntegrante.nombres = null
        this.datosIntegrante.telefono = null
        this.datosIntegrante.correo = null
        this.datosIntegrante.cargo = null
        this.datosIntegrante.lider = null
        this.datosIntegrante.creo = this.$store.state.nombreUsuario + ' ' + this.$store.state.apellidoUsuario
        this.datosIntegrante.editarIntegrante = false
        this.$refs['modalCrearEditarIntegrante'].show()
      },
      datosRecibidosIntegrante(retorno) {
        this.$refs['modalCrearEditarIntegrante'].hide()
        if (retorno == 1) {
          this.verEquipoGestion()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Integrante se han registrado correctamente.')
        }
      },
      async verEquipoGestion() {
        this.listaEquipoGestion = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/equipogestion', { params: {idGestion: this.idGestion, idColegio: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista equipo gestión Pmi')
          } else{
            if (response.data.datos != 0) {
              this.listaEquipoGestion = response.data.datos
              //console.log(JSON.stringify(this.listaEquipoGestion))
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista equipo gestión Pmi. Intente más tarde. ' + err)
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
      formatFnL: function(value) {
        if (value == 1)
          return 'SI'
        else
          return ''
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
