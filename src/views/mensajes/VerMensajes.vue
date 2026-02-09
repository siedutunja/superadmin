<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="envelope-open-fill" aria-hidden="true"></b-icon> VER MENSAJES</h3>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col lg="12">
        <b-card>
          <b-row>
            <b-col lg="12">
              <h5 class="ml-2"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE MENSAJES</h5>
            </b-col>
            <b-col lg="12">
              <vue-good-table :columns="encabColumnas" :rows="listaMensajes" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'id'">
                    <span style="font-weight: bold; color: blue; cursor: pointer" @click="verMensaje(props.row)" title="Visualizar Mensaje"><CIcon name="cilLowVision"/></span>
                  </span>
                </template>
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen mensajes</h5>
                </div>
              </vue-good-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalVisualizarMensaje" size="xl" scrollable hide-footer title="Visualizar Mensaje" ok-only>
      <div class="mx-3">
        <div>
          <VisualizarMensaje :datosMensaje="datosMensaje" @retorno="datosRecibidosMensaje"/>
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
  import VisualizarMensaje from '@/views/mensajes/VisualizarMensaje'

  export default {
    name: 'vermensajes',
    components: {
      VueGoodTable,
      VisualizarMensaje
    },
    data () {
      return {
        listaMensajes: [],
        datosMensaje: {},
        encabColumnas : [
          { label: 'Titulo Mensaje', field: 'titulo' },
          { label: 'DirigidoA', field: 'dirigido', sortable: false },
          { label: 'Enviado', field: 'enviado', formatFn: this.formatFnF, sortable: false },
          { label: 'Prioridad', field: 'id_prioridad', formatFn: this.formatFnP, tdClass: this.tdClassFunc, sortable: false },
          { label: 'Estado', field: 'fecha', formatFn: this.formatFnE, sortable: false },
          { label: '', field: 'id', sortable: false }
        ]
      }
    },
    methods: {
      verMensaje(item) {
        this.datosMensaje.id = item.id
        this.datosMensaje.titulo = item.titulo
        this.datosMensaje.dirigido = item.dirigido
        this.datosMensaje.mensaje = item.mensaje
        this.datosMensaje.id_prioridad = item.id_prioridad
        this.datosMensaje.enviado = item.enviado
        this.datosMensaje.fecha = item.fecha
        this.$refs['modalVisualizarMensaje'].show()
      },
      datosRecibidosMensaje(retorno) {
        if (retorno == 0) {
          this.$refs['modalVisualizarMensaje'].hide()
        }
      },
      formatFnF: function(value) {
        if (value != null && value != '') {
          return value.substr(0,10)
        }
        return '-'
      },
      formatFnP: function(value) {
        if (value == 1) {
          return 'Urgente'
        } else {
          return 'Normal'
        }
      },
      formatFnE: function(value) {
        if (value == null) {
          return 'Sin Leer'
        } else {
          return 'Leido'
        }
      },
      tdClassFunc(row) {
        if (row.id_prioridad == 1) { 
          return 'text-danger' 
        } else { 
          return 'text-info' 
        }
      },
      async verMensajes() {
        this.listaMensajes = []
        await axios
        .get(CONFIG.ROOT_PATH + 'mensajes/listamensajes/colegio/30dias', { params: { idUsuario: this.$store.state.idUsuario }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Mensajes')
          } else{
            if (response.data.datos != 0) {
              this.listaMensajes = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Mensajes. Intente más tarde.' + err)
        })
      },
      iniciarVista() {
        this.verMensajes()
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