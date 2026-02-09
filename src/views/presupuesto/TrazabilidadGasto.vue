<template>
  <div>
    <CRow class="mt-2">
      <CCol>
        <CCard>
          <CCardFooter style="background: rgb(210, 237, 100); margin-top: 0; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);">
            <b-row>
              <b-col lg="12" class="mt-1">
                <span class="small text-medium-emphasis">CONCEPTO DEL GASTO</span>
                <h6>{{datosTrazaGasto.concepto}}</h6>
              </b-col>
              <b-col lg="12" class="mt-1">
                <span class="small text-medium-emphasis">FUENTE DEL GASTO</span>
                <h6>{{datosTrazaGasto.fuente}}</h6>
              </b-col>
              <b-col lg="12" class="mt-1">
                <span class="small text-medium-emphasis">OBJETO DEL GASTO</span>
                <h6>{{datosTrazaGasto.objeto}}</h6>
              </b-col>
              <b-col lg="3" class="mt-1">
                <span class="small text-medium-emphasis">VALOR DEL GASTO</span>
                <h6>${{Number(datosTrazaGasto.valor).toLocaleString()}}</h6>
              </b-col>
              <b-col lg="3" class="mt-1">
                <span class="small text-medium-emphasis">FECHA EGRESO</span>
                <h6>{{datosTrazaGasto.fecha_egreso != '' && datosTrazaGasto.fecha_egreso != null ? datosTrazaGasto.fecha_egreso.substr(0,10) : '-'}}</h6>
              </b-col>
              <b-col lg="3" class="mt-1">
                <span class="small text-medium-emphasis">DOCUMENTO</span>
                <h6>{{datosTrazaGasto.documento}}</h6>
              </b-col>
              <b-col lg="3" class="mt-1">
                <span class="small text-medium-emphasis">NÚMERO EGRESO</span>
                <h6>{{datosTrazaGasto.num_egreso}}</h6>
              </b-col>
            </b-row>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <CRow class="mt-3"> <!--  v-if="datosTrazaGasto.estado==6" -->
      <CCol>
        <CCard>
          <CCardBody>
            <span v-if="datosTrazaGasto.urlGasto !== null && datosTrazaGasto.urlGasto !== ''">
              <b-row>
                <b-col lg="12">
                  <h4>URL del Proceso</h4>
                  <p class="text-muted">{{datosTrazaGasto.urlGasto}}</p>
                  <b-button class="small mt-1 mr-3" variant="primary" @click="verUrl">Ir a la URL</b-button>
                </b-col>
              </b-row>
              <b-row><b-col lg="12"><hr></b-col></b-row>
            </span>
            <b-row>
              <b-col lg="12">
                <h4>Documentos del Procesos</h4>
                <vue-good-table :columns="encabColumnasAdjuntos" :rows="listaArchivosAdjuntos" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'id'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjunto(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen documentos adjuntos</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow class="mt-3">
      <CCol>
        <CCard>
          <CCardBody>
            <b-row>
              <b-col lg="12">
                <h4>Histórico de Cambios - Trazabilidad del Proceso</h4>
                <b-table-simple hover striped bordered responsive>
                  <b-thead>
                    <b-th style="background: #53606d; color: white;">Fecha_Traza</b-th>
                    <b-th style="background: #53606d; color: white;">Estado</b-th>
                    <b-th style="background: #53606d; color: white;">Observaciones</b-th>
                  </b-thead>
                  <b-tbody>
                    <b-tr v-for="item in listaTrazabilidad" :key="item.id">
                      <b-td>{{fechaLocal(item.creado)}}</b-td>
                      <b-td>{{item.descEstado}}</b-td>
                      <b-td>{{item.observaciones}}</b-td>
                    </b-tr>
                  </b-tbody>
                </b-table-simple>
              </b-col>
            </b-row>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script> 
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'TrazabilidadGasto',
    components: {
      VueGoodTable
    },
    props: {
        datosTrazaGasto: Object
    },
    data () {
      return {
        encabColumnasAdjuntos: [
          { label: 'Identificación del Archivo', field: 'descripcion', sortable: false },
          { label: 'Archivo', field: 'nombre_archivo', sortable: false },
          { label: 'Fec_Cargue', field: 'creado', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        listaArchivosAdjuntos: [],
        listaTrazabilidad: []
      }
    },
    methods: {
      async consultarTrazabilidad() {
        this.listaTrazabilidad = []
        await axios
        .get(CONFIG.ROOT_PATH + 'presupuesto/trazabilidad/gasto', { params: { id: this.datosTrazaGasto.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Trazabilidad Gasto')
          } else{
            this.listaTrazabilidad = response.data.datos
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Trazabilidad Gasto. Intente más tarde.' + err)
        })
      },
      veArchivoAdjunto(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpeta + "/" + item.subcarpeta + "/" + item.nombre_archivo
        window.open(ruta, '_blank')
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      fechaLocal(fechaCreado) {
        let fecha = new Date(fechaCreado)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      async verArchivosAdjuntos() {
        this.listaArchivosAdjuntos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'presupuesto/gastos/adjuntos', { params: { idGasto: this.datosTrazaGasto.id }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Archivos Adjuntos Gastos')
          } else {
            if (response.data.datos != 0) {
              this.listaArchivosAdjuntos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Archivos Adjuntos Gastos. Intente más tarde. ' + err)
        })
      },
      cerrarFormulario() {
        this.$emit("retorno", 0)
      },
      verUrl() {
        let ruta = this.datosTrazaGasto.urlGasto
        window.open(ruta, '_blank')
      },
      iniciarVista() {
        this.consultarTrazabilidad()
        this.verArchivosAdjuntos()
        if (this.datosTrazaGasto.estado == 6) {
          this.verArchivosAdjuntos()
        }
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
