<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="credit-card-fill" aria-hidden="true"></b-icon> GESTIÓN DE GASTOS</h3>
      </b-col>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="2" class="mt-2">
              <b-form-group label="Vigencia*" label-for="vigencia" style="font-weight: bold; font-size: 16">
                <b-form-select  id="vigencia" ref="vigencia" v-model="aSeleccionado" :options="comboAnios" @change="idOrigen=null,idDestino=null"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="5" class="mt-2">
              <b-form-group label="Origen de los Recursos*" label-for="origen" style="font-weight: bold; font-size: 16">
                <b-form-select  id="origen" ref="origen" v-model="idOrigen" :options="comboOrigenes" @change="ocuparComboDestinos"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="5" class="mt-2">
              <b-form-group label="Componente*" label-for="destino" style="font-weight: bold; font-size: 16">
                <b-form-select  id="destino" ref="destino" v-model="idDestino" :options="comboDestinos" @change="consultaGastosDestinacion"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="idDestino!=null">
      <b-col lg="12">
        <b-card>
          <b-row>
            <b-col lg="12">
              <div class="card-header-actions float-right" v-if="listaGastosDestinacion.saldo>0">
                <CLink href="#" class="card-header-action btn-setting mx-1 text-primary" @click="nuevoGasto" title="Nuevo Gasto">
                  <CIcon name="cilMedicalCross"/>
                </CLink>
              </div>
              <h5 class="ml-2"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RELACIÓN DE GASTOS</h5>
            </b-col>
            <b-col lg="12">
              <vue-good-table :columns="encabColumnas" :rows="listaGastosDestinacion.gastos" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'descEstado'">
                    <span style="font-weight: bold; cursor: pointer" @click="seleccionarGasto(props.row)">{{props.row.descEstado}}</span> 
                  </span>
                </template>
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen gastos registrados</h5>
                </div>
              </vue-good-table>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col lg="5" class="mt-1 mb-4">
              <CChartDoughnut :datasets="defaultDatasets" :labels="['Gastos', 'Saldo']" />
            </b-col>
            <b-col lg="7" class="mt-1">
              <b-row>
                <b-col class="mt-3">
                  <span class="small text-medium-emphasis">TOTAL RECURSOS</span>
                  <h2 class="text-primary">${{Number(listaGastosDestinacion.totalAsignado).toLocaleString()}}</h2>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="mt-3">
                  <span class="small text-medium-emphasis">GASTOS</span>
                  <h2 class="text-success">${{Number(listaGastosDestinacion.totalGastado).toLocaleString()}} <span class="small text-muted">({{Math.round(Number(listaGastosDestinacion.porcGastado))}}%)</span></h2>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="mt-3">
                  <span class="small text-medium-emphasis">SALDO</span>
                  <h2 class="text-danger">${{Number(listaGastosDestinacion.saldo).toLocaleString()}} <span class="small text-muted">({{Math.round(Number(listaGastosDestinacion.porcSaldo))}}%)</span></h2>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalCrearEditarGasto" size="xl" scrollable hide-footer :title="datosGasto.editarGasto ? 'Editar Gasto' : 'Nuevo Gasto'" ok-only>
      <div class="mx-3">
        <div>
          <CrearEditarGasto :datosGasto="datosGasto" @retorno="datosRecibidosGasto"/>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalTrazabilidad" size="xl" scrollable title="Trazabilidad del Gasto" ok-only>
      <!--hide-footer-->
      <div class="mx-3">
        <TrazabilidadGasto :datosTrazaGasto="datosTrazaGasto"/>
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
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import CrearEditarGasto from '@/views/presupuesto/CrearEditarGasto'
  import TrazabilidadGasto from '@/views/presupuesto/TrazabilidadGasto'
  import { CChartDoughnut } from '@coreui/vue-chartjs'

  export default {
    name: 'GestionGastos',
    components: {
      VueGoodTable,
      CrearEditarGasto,
      TrazabilidadGasto,
      CChartDoughnut
    },
    data () {
      return {
        encabColumnas : [
          { label: 'Concepto del Gasto', field: 'concepto', sortable: false },
          { label: 'Fuente', field: 'fuente', sortable: false },
          { label: 'Objeto', field: 'objeto', sortable: false },
          { label: 'Fecha', field: 'fecha_egreso', formatFn: this.formatFnF, sortable: false },
          { label: 'Num_Egreso', field: 'num_egreso', sortable: false },
          { label: 'Valor', field: 'valor', formatFn: this.formatFnV, tdClass: this.tdClassFuncV, sortable: false },
          { label: 'Estado', field: 'descEstado', tdClass: this.tdClassFuncE, sortable: false }
        ],
        aSeleccionado: this.$store.state.aLectivoAdmon,
        comboAnios: [],
        idOrigen: null,
        comboOrigenes: [],
        idDestino: null,
        comboDestinos: [],
        listaGastosDestinacion: {
          id: null,
          totalAsignado: null,
          totalGastado: null,
          saldo: 0,
          porcGastado: 0,
          porcSaldo: 0,
          gastos: []
        },
        datosGasto: {
          id: null,
          objeto: null,
          id_concepto: null,
          id_fuente: null,
          fuente: null,
          id_institucion: null,
          id_destino: null,
          valor: null,
          id_documento: null,
          documento: null,
          num_egreso: null,
          fecha_egreso: null,
          vigencia: null,
          creado: null,
          estado: null,
          observaciones: null,
          urlGasto: null,
          editarGasto: false
        },
        datosTrazaGasto: {}
      }
    },
    methods: {
      async nuevoGasto() {
        this.datosGasto.id = null
        this.datosGasto.objeto = null
        this.datosGasto.id_concepto = null
        this.datosGasto.id_fuente = null
        this.datosGasto.id_institucion = this.$store.state.idInstitucion
        this.datosGasto.id_destino = this.idDestino
        this.datosGasto.valor = null
        this.datosGasto.id_documento = null
        this.datosGasto.num_egreso = null
        this.datosGasto.fecha_egreso = null
        this.datosGasto.vigencia = this.aSeleccionado
        this.datosGasto.estado = 1
        this.datosGasto.observaciones = null
        this.datosGasto.urlGasto = null
        this.datosGasto.editarGasto = false
        this.$refs['modalCrearEditarGasto'].show()
      },
      datosRecibidosGasto(retorno) {
        this.$refs['modalCrearEditarGasto'].hide()
        if (retorno == 1) {
          this.consultaGastosDestinacion()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El gasto se ha registrado correctamente.')
        }
      },
      seleccionarGasto(item) {
        this.datosTrazaGasto = item
        if (item.estado == 1 || item.estado == 4) { // Sin enviar o devuelto
          this.datosGasto.id = item.id
          this.datosGasto.objeto = item.objeto
          this.datosGasto.id_concepto = item.id_concepto
          this.datosGasto.id_fuente = item.id_fuente
          this.datosGasto.fuente = item.fuente
          this.datosGasto.id_institucion = null
          this.datosGasto.id_destino = this.idDestino
          this.datosGasto.valor = item.valor
          this.datosGasto.id_documento = item.id_documento
          this.datosGasto.num_egreso = item.num_egreso
          if (item.fecha_egreso != '' && item.fecha_egreso != null) {
            this.datosGasto.fecha_egreso = item.fecha_egreso.substr(0,10)
          } else {
            this.datosGasto.fecha_egreso = null
          }
          this.datosGasto.vigencia = null
          this.datosGasto.estado = item.estado
          this.datosGasto.observaciones = item.observaciones
          this.datosGasto.urlGasto = item.urlGasto
          this.datosGasto.editarGasto = true
          this.$refs['modalCrearEditarGasto'].show()
        } else {
          if (item.id_documento == 1) {
            this.datosTrazaGasto.documento = 'CONTRATO'
          } else if (item.id_documento == 2) {
            this.datosTrazaGasto.documento = 'FACTURA'
          } else if (item.id_documento == 3) {
            this.datosTrazaGasto.documento = 'EGRESO'
          } else if (item.id_documento == 4) {
            this.datosTrazaGasto.documento = 'RECIBO'
          } else {
            this.datosTrazaGasto.documento = 'OTRO'
          }
          this.$refs['modalTrazabilidad'].show()
        }
      },
      async consultaGastosDestinacion() {
        await axios
        .get(CONFIG.ROOT_PATH + 'presupuesto/gastosdestinacion/institucion', { params: { id: this.$store.state.idInstitucion, idDestino: this.idDestino, vigencia: this.aSeleccionado }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Gastos Destino Institución')
          } else{
            if (response.data.datos != 0) {
              this.listaGastosDestinacion = response.data.datos
              this.listaGastosDestinacion.porcSaldo = 0
              this.listaGastosDestinacion.porcGastado = 0
              this.listaGastosDestinacion.saldo = Number(this.listaGastosDestinacion.totalAsignado) - Number(this.listaGastosDestinacion.totalGastado)
              if (this.listaGastosDestinacion.totalAsignado > 0) {
                this.listaGastosDestinacion.porcSaldo = Number(this.listaGastosDestinacion.saldo) * 100 / Number(this.listaGastosDestinacion.totalAsignado)
                this.listaGastosDestinacion.porcGastado = Number(this.listaGastosDestinacion.totalGastado) * 100 / Number(this.listaGastosDestinacion.totalAsignado)
              }
              if (this.listaGastosDestinacion.gastos == null) {
                this.listaGastosDestinacion.gastos = []
              }
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Gastos Destino Institución. Intente más tarde. ' + err)
        })
      },
      formatFnV: function(value) {
        return '$' + Number(value).toLocaleString()
      },
      tdClassFuncV() {
        return 'text-right'
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() // + ' a las ' + fecha.toLocaleTimeString()
      },
      tdClassFuncE(row) {
        if (row.estado == 1) {
          return 'text-warning font-weight-bold text-center'
        } else if (row.estado == 2 || row.estado == 3) { 
          return 'text-info font-weight-bold text-center'
        } else if (row.estado == 4) { 
          return 'text-warning font-weight-bold text-center'
        } else if (row.estado == 5) { 
          return 'text-primary font-weight-bold text-center' 
        } else if (row.estado == 6) { 
          return 'text-success font-weight-bold text-center' 
        } else { 
          return 'text-light font-weight-bold text-center' 
        }
      },
      async ocuparComboOrigenes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaorigenes')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Origenes')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboOrigenes.push({ 'value': element.id, 'text': element.origen + ' - ' + element.sigla })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Origenes. Intente más tarde. ' + err)
        })
      },
      async ocuparComboDestinos() {
        this.idDestino = null
        this.comboDestinos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listadestinos', { params: {idOrigen: this.idOrigen }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Destinos')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboDestinos.push({ 'value': element.id, 'text': element.destino })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Destinos. Intente más tarde. ' + err)
        })
      },
      iniciarVista() {
        if(this.$store.state.colpresupuesto == 1) {
          this.ocuparComboOrigenes()
          for (var i = this.$store.state.aLectivoAdmon; i >= this.$store.state.aIniCuatrienio; i--) {
            this.comboAnios.push({ 'value': i, 'text': i })
          }
        } else {
          this.$router.push('/restringida')
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.iniciarVista()
    },
    computed: {
      defaultDatasets () {
        return [
          {
            backgroundColor: ['#3CCF4E','#F05454'],
            data: [this.listaGastosDestinacion.totalGastado, this.listaGastosDestinacion.saldo]
          }
        ]
      }
    }
  }
</script>
