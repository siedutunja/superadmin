<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="credit-card-fill" aria-hidden="true"></b-icon> GESTIÓN DE SOLICITUDES</h3>
      </b-col>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2">
              <b-form-group label="Vigencia*" label-for="vigencia" style="font-weight: bold; font-size: 16">
                <b-form-select  id="vigencia" ref="vigencia" v-model="aSeleccionado" :options="comboAnios" @change="verSolicitudes()"></b-form-select>
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
              <h5 class="ml-2"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE SOLICITUDES</h5>
            </b-col>
            <b-col lg="12">
              <vue-good-table :columns="encabColumnas" :rows="listaSolicitudes" styleClass="vgt-table condensed bordered striped"
                :sort-options="{enabled: true,initialSortBy: {field: 'creado', type: 'desc'}}"
                :search-options="{enabled: true,placeholder: 'Buscar...'}">
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'descEstado'">
                    <span style="font-weight: bold; cursor: pointer" @click="seleccionarSolicitud(props.row)">{{props.row.descEstado}}</span> 
                  </span>
                </template>
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen solicitudes creadas en este año</h5>
                </div>
              </vue-good-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalTrazabilidad" size="xl" scrollable :title="'Solicitud de Trámite No: ' + consecutivoSolicitud" ok-only>
      <!--hide-footer-->
      <div class="mx-3">
        <TrazabilidadSolicitud :datosSolicitud="datosSolicitud"/>
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
  import TrazabilidadSolicitud from '@/views/tramites/TrazabilidadSolicitud'

  export default {
    name: 'Solicitudes',
    components: {
      VueGoodTable,
      TrazabilidadSolicitud
    },
    data () {
      return {
        listaSolicitudes: [],
        encabColumnas : [
          { label: 'No.', sortable: false, field: 'consecutivo' },
          { label: 'Tipo de Trámite', sortable: false, field: 'tramite' },
          { label: 'Descripción de la Solicitud', sortable: false, field: 'solicitud' },
          { label: 'F_Solicitud', field: 'creado', sortable: false, formatFn: this.formatFnF },
          { label: 'Estado', field: 'descEstado', tdClass: this.tdClassE, sortable: false }
        ],
        consecutivoSolicitud: '',
        aSeleccionado: this.$store.state.aLectivoAdmon,
        comboAnios: [],
        datosSolicitud: {}
      }
    },
    methods: {
      fechaLocal(fechaCreado) {
        let fecha = new Date(fechaCreado)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      seleccionarSolicitud(item) {
        this.datosSolicitud = item
        if (item.estado == 3) {
          sessionStorage.setItem('idSolicitud', item.id)
          this.$router.push('./corregirsolicitud')
        } else {
          this.consecutivoSolicitud = item.consecutivo
          this.$refs['modalTrazabilidad'].show()
        }
      },
      async verSolicitudes() {
        this.listaSolicitudes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'tramites/solicitudes/colegio', { params: { vigencia: this.aSeleccionado, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Solicitudes Colegio')
          } else{
            if (response.data.datos != 0) {
              this.listaSolicitudes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Lista Solicitudes Colegio. Intente más tarde.' + err)
        })
      },
      recargarsolicitudes() {
        this.verSolicitudes()
        this.mensajeEmergente('info',CONFIG.TITULO_MSG,'Solicitudes actualizadas')
      },
      formatFnF: function(value) {
        if (value != null && value != '') {
          return value.substr(0,10)
        }
        return '-'
      },
      tdClassE(row) {
        if (row.estado == 1 || row.estado == 2) { 
          return 'text-info font-weight-bold text-center'
        } else if (row.estado == 3) { 
          return 'text-warning font-weight-bold text-center'
        } else if (row.estado == 4) { 
          return 'text-danger font-weight-bold text-center'
        } else if (row.estado == 5) { 
          return 'text-secondary font-weight-bold text-center' 
        } else if (row.estado == 6) { 
          return 'text-primary font-weight-bold text-center' 
        } else if (row.estado == 7) { 
          return 'text-success font-weight-bold text-center' 
        } else { 
          return 'text-danger font-weight-bold text-center' 
        }
      },
      iniciarVista() {
        if(this.$store.state.coltramites == 1) {
          for (var i = this.$store.state.aLectivoAdmon; i >= this.$store.state.aIniCuatrienio; i--) {
            this.comboAnios.push({ 'value': i, 'text': i })
          }
          this.verSolicitudes()
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
