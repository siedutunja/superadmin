<template>
  <div>
    <CRow class="mt-2">
      <CCol>
        <CCard>
          <CCardFooter style="background: rgb(210, 237, 100); margin-top: 0; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);">
            <b-row>
              <b-col lg="6" class="mt-1">
                <span class="small text-medium-emphasis">TRÁMITE</span>
                <h6>{{datosSolicitud.tramite}}</h6>
              </b-col>
              <b-col lg="6" class="mt-1">
                <span class="small text-medium-emphasis">FECHA SOLICITUD</span>
                <h6>{{fechaLocal(datosSolicitud.creado)}}</h6>
              </b-col>
              <b-col lg="12" class="mt-1">
                <span class="small text-medium-emphasis">DESCRIPCIÓN DE LA SOLICITUD</span>
                <h6>{{datosSolicitud.solicitud}}</h6>
              </b-col>
            </b-row>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
    <CRow class="mt-3" v-if="datosSolicitud.estado==7">
      <CCol>
        <CCard>
          <CCardBody>
            <b-row>
              <b-col lg="12">
                <h4>Documentos Finales Producto de la Solicitud</h4>
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
    name: 'TrazabilidadSolicitud',
    components: {
      VueGoodTable
    },
    props: {
        datosSolicitud: Object
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
        .get(CONFIG.ROOT_PATH + 'tramites/trazabilidad/solicitud', { params: { id: this.datosSolicitud.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Trazabilidad Solicitud')
          } else{
            this.listaTrazabilidad = response.data.datos
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Trazabilidad Solicitud. Intente más tarde.' + err)
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
        .get(CONFIG.ROOT_PATH + 'tramites/solicitudes/productos', { params: { idSolicitud: this.datosSolicitud.id }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Archivos Adjuntos Solicitud')
          } else {
            if (response.data.datos != 0) {
              this.listaArchivosAdjuntos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Archivos Adjuntos Solicitud. Intente más tarde. ' + err)
        })
      },
      cerrarFormulario() {
        this.$emit("retorno", 0)
      },
      iniciarVista() {
        this.consultarTrazabilidad()
        if (this.datosSolicitud.estado == 7) {
          this.verArchivosAdjuntos()
        }
      }
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
