<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="cash-stack" aria-hidden="true"></b-icon> INFORMES DE GASTOS</h3>
      </b-col>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="2">
              <b-form-group label="Vigencia:" label-for="vigencia" style="font-weight: bold; font-size: 16">
                <b-form-select  id="vigencia" ref="vigencia" v-model="aSeleccionado" :options="comboAnios" @change="verGastos()"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="aSeleccionado!=null">
      <b-col lg="12">
        <b-card>
          <b-row>
            <b-col lg="12">
              <div class="card-header-actions float-right">
                <CLink href="#" class="card-header-action btn-setting mx-2" title="Exportar Excel">
                  <vue-excel-xlsx :data="listaGastosDestinacion" :columns="encabColumnasExcel" :file-name="'InfoGastos'" :file-type="'xlsx'" :sheet-name="'sheetname'">
                    Exportar a Excel
                  </vue-excel-xlsx>
                </CLink>
              </div>
              <h5 class="ml-2"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE GASTOS</h5>
            </b-col>
            <b-col lg="12">
              <vue-good-table :columns="encabColumnas" :rows="listaGastosDestinacion" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                :sort-options="{enabled: true,initialSortBy: {field: 'fecha_egreso', type: 'desc'}}"
                :search-options="{enabled: true,placeholder: 'Buscar...'}">
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen gastos</h5>
                </div>
              </vue-good-table>

            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'informegastos',
    components: {
      VueGoodTable,
    },
    data () {
      return {
        listaGastosDestinacion: [],
        datosGasto: {},
        encabColumnas : [
          //{ label: 'Institución Educativa', field: 'institucion', sortable: false },
          { label: 'Concepto del Gasto', field: 'concepto', sortable: false },
          { label: 'Fuente del Gasto', field: 'fuente', sortable: false },
          { label: 'Objeto del Gasto', field: 'objeto', sortable: false },
          { label: 'Origen', field: 'origen', sortable: false, hidden: true },
          { label: 'Componente', field: 'destino', sortable: false, hidden: true },
          { label: 'Fecha', field: 'fecha_egreso', formatFn: this.formatFnF, sortable: false },
          { label: 'Num_Egreso', field: 'num_egreso', sortable: false },
          { label: 'Valor', field: 'valor', formatFn: this.formatFnV, tdClass: this.tdClassFuncV, sortable: false },
          { label: 'Estado', field: 'descEstado', tdClass: this.tdClassFuncE, sortable: false },
          { label: 'URL', field: 'urlGasto', sortable: false, hidden: true },
          { label: 'Observaciones', field: '', sortable: false, hidden: true }
        ],
        encabColumnasExcel : [
          { label: 'Institución Educativa', field: 'institucion' },
          { label: 'Concepto del Gasto', field: 'concepto' },
          { label: 'Fuente del Gasto', field: 'fuente' },
          { label: 'Objeto del Gasto', field: 'objeto' },
          { label: 'Origen', field: 'origen' },
          { label: 'Componente', field: 'destino' },
          { label: 'Documento', field: 'documento' },
          { label: 'Fecha', field: 'fecha_egreso' },
          { label: 'Número', field: 'num_egreso' },
          { label: 'Valor', field: 'valor' },
          { label: 'Estado', field: 'descEstado' },
          { label: 'URL', field: 'urlGasto' }
        ],
        aSeleccionado: null,
        comboAnios: [],
        idColegio: 0,
      }
    },
    methods: {
      async verGastos() {
        this.listaGastosDestinacion = []
        await axios
        .get(CONFIG.ROOT_PATH + 'presupuesto/gastos/institucion', { params: { idColegio: this.idColegio, vigencia: this.aSeleccionado }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Gastos Institucion')
          } else{
            if (response.data.datos != 0) {
              this.listaGastosDestinacion = response.data.datos
              this.listaGastosDestinacion.forEach(element => {
                if (element.id_documento == 1) {
                  element.documento = 'CONTRATO'
                } else if (element.id_documento == 2) {
                  element.documento = 'FACTURA'
                } else if (element.id_documento == 3) {
                  element.documento = 'EGRESO'
                } else if (element.id_documento == 4) {
                  element.documento = 'RECIBO'
                } else {
                  element.documento = 'OTRO'
                }
                if (element.fecha_egreso != null) {
                  element.fecha_egreso = element.fecha_egreso.substr(0,10)
                }
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Lista Gastos Institucion. Intente más tarde.' + err)
        })
      },
      recargarGastos() {
        this.verGastos()
        this.mensajeEmergente('info',CONFIG.TITULO_MSG,'Gastos actualizados')
      },
      formatFnV: function(value) {
        return '$' + Number(value).toLocaleString()
      },
      tdClassFuncV() {
        return 'text-right'
      },
      formatFnF: function(value) {
        if (value != null) {
          return value.substr(0,10)
        }
        return null
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
      iniciarVista() {
        if(this.$store.state.colpresupuesto == 1) {
          for (var i = this.$store.state.aLectivo; i >= 2020; i--) {
            this.comboAnios.push({ 'value': i, 'text': i })
          }
          this.idColegio = this.$store.state.idInstitucion
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
    }
  }
</script>
