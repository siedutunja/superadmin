<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="credit-card-fill" aria-hidden="true"></b-icon> GESTIÓN DE INGRESOS</h3>
      </b-col>
      <b-col>
        <b-card>
          <b-row>
            <b-col lg="12">
              <CDropdown color="p-0" placement="bottom-end" class="float-right">
                <template #toggler-content>
                  <strong>Vigencia: {{ aSeleccionado }}</strong>
                </template>
                <CDropdownItem v-for="item in listaAnios" :key="item.value" @click="aSeleccionado=item.value,verRecursos()">{{ item.value }}</CDropdownItem>
              </CDropdown>
              <h5 class="ml-2"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> RELACIÓN DE INGRESOS</h5>
            </b-col>
            <b-col lg="12">
              <vue-good-table :columns="encabColumnas" :rows="listaRecursos" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'acto'">
                    <span style="font-weight: bold; color: blue; cursor: pointer" @click="verArchivosAdjuntos(props.row.id)">{{props.row.acto}}</span> 
                  </span>
                </template>
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen recursos asignados</h5>
                </div>
              </vue-good-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalVerArchivosAdjuntos" size="xl" scrollable hide-footer title="Archivos Adjuntos" ok-only>
      <div class="mx-3">
        <b-row>
          <b-col lg="12" class="mt-2">
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
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <b-button class="small mt-1" variant="light" @click="cancelarFormulario">Cancelar</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'

  export default {
    name: 'Recursos',
    components: {
      VueGoodTable
    },
    data () {
      return {
        listaRecursos: [],
        encabColumnasAdjuntos: [
          { label: 'Identificación del Archivo', field: 'descripcion', sortable: false },
          { label: 'Archivo', field: 'nombre_archivo', sortable: false },
          { label: 'Fec_Cargue', field: 'creado', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnas : [
          { label: 'Acto Administrativo de Asignación', field: 'acto', sortable: false },
          { label: 'Origen Recursos', field: 'origen', sortable: false },
          { label: 'Destinación', field: 'destino', sortable: false },
          { label: 'Fecha', field: 'creado', formatFn: this.formatFnF, sortable: false },
          { label: 'Valor', field: 'valor', formatFn: this.formatFnV, tdClass: this.tdClassFuncV, sortable: false }
        ],
        aSeleccionado: this.$store.state.aLectivoAdmon,
        listaAnios: [],
        listaArchivosAdjuntos: []
      }
    },
    methods: {
      veArchivoAdjunto(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpeta + "/" + item.subcarpeta + "/" + item.nombre_archivo
        window.open(ruta, '_blank')
      },
      async verArchivosAdjuntos(item) {
        this.listaArchivosAdjuntos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'presupuesto/recursosasignados/adjuntos', { params: { idRecursosAsignados: item }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Archivos Adjuntos Transferencia')
          } else {
            if (response.data.datos != 0) {
              this.listaArchivosAdjuntos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Archivos Adjuntos Transferencia. Intente más tarde. ' + err)
        })
        this.$refs['modalVerArchivosAdjuntos'].show()
      },
      async verRecursos() {
        this.listaRecursos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'presupuesto/recursos/institucion', { params: { id: this.$store.state.idInstitucion, vigencia: this.aSeleccionado }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Recursos')
          } else{
            if (response.data.datos != 0) {
              this.listaRecursos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Recursos. Intente más tarde. ' + err)
        })
      },
      cancelarFormulario() {
        this.$refs['modalVerArchivosAdjuntos'].hide()
      },
      formatFnV: function(value) {
        return '$' + Number(value).toLocaleString()
      },
      tdClassFuncV() {
        return 'text-right'
      },
      formatFnE: function(value) {
        if (value == 0) {
          return 'Inactivo'
        }
        return 'Activo'
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() // + ' a las ' + fecha.toLocaleTimeString()
      },
      tdClassFuncE(row) {
        if (row.estado == 0) { 
          return 'text-danger text-left' 
        } else { 
          return 'text-success text-left' 
        }
      },
      iniciarVista() {
        if(this.$store.state.colpresupuesto == 1) {
          this.verRecursos()
          for (var i = this.$store.state.aLectivoAdmon; i >= this.$store.state.aIniCuatrienio; i--) {
            this.listaAnios.push({ 'value': i, 'text': i })
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
    }
  }
</script>
