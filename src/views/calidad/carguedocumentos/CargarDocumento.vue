<template>
  <div>
    <b-card>
      <template #header>
        <p class="mb-0">INFORME SOLICITADO: <span class="ml-2" style="font-weight: bold; font-size: 16">{{ datosDocumento.descripcion.toUpperCase() }}</span></p>
      </template>
      <b-card-text>
        <b-col lg="12" class="mt-2">
          <div class="card-header-actions" v-if="listaArchivosAdjuntos.length==0">
            <CLink href="#" class="card-header-action btn-setting mr-2 text-info" @click="adjuntarDocumento" title="Adjuntar Archivo">
              <CIcon name="cilFile"/>
            </CLink>
          </div>
          <p class="mb-1" style="font-weight: bold; font-size: 16">Documentos Cargados:</p>
          <vue-good-table :columns="encabColumnasAdjuntos" :rows="listaArchivosAdjuntos" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'id'">
                <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjunto(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                <span class="mx-3 text-light">|</span>
                <span v-if="props.row.estado==1" style="font-weight: bold; color: blue; cursor: pointer">Enviado</span>
                <span v-if="props.row.estado==2" style="font-weight: bold; color: red; cursor: pointer" @click="eliminarArchivoAdjunto(props.row)" title="Eliminar archivo adjunto">Rechazado <CIcon name="cilXCircle"/></span>
                <span v-if="props.row.estado==3" style="font-weight: bold; color: green; cursor: pointer">Aceptado</span>
              </span>
            </template>
            <div slot="emptystate">
              <h5 class="text-danger ml-5">No existen documentos cargados</h5>
            </div>
          </vue-good-table>
        </b-col>
        <b-col class="mt-3" v-if="observaciones != null">
          <h6 class="text-danger">Observaciones de Rechazo:</h6>
          <span>{{observaciones}}</span>
        </b-col>      
      </b-card-text>
    </b-card>
    <b-modal ref="modalAdjuntarDocumento" size="lg" scrollable hide-footer title="Adjuntar Documento" ok-only>
      <div v-if="!btnHabilitado">
        <div class="text-center m-5">
          <b-spinner style="width: 3rem; height: 3rem;" label="Spinner"></b-spinner>
          <br><strong>Cargando archivo...</strong>
        </div>
      </div>
      <div class="mx-3 mb-3" v-else>
        <b-col lg="12">
          <h5>Seleccione el archivo <span class="small">(Máx 5Mb)</span></h5>
        </b-col>
        <b-col lg="12">
          <b-form-file v-model="nombreArchivo" :state="Boolean(nombreArchivo)" placeholder="Elija un archivo o suéltelo aquí..." drop-placeholder="Suelta el archivo aquí..."></b-form-file>
        </b-col>
        <div v-if="nombreArchivo">
          <b-col lg="12" md="12" class="my-5">
            <b-form-group label="Descripción del Archivo*" label-for="descrip">
              <b-form-input id="descrip" ref="descrip" v-model.trim="$v.infoArchivoAdjunto.descripcion.$model" :state="validateStateA('descripcion')" aria-describedby="feedDescrip" autocomplete="off" maxlength="255"></b-form-input>
              <b-form-invalid-feedback id="feedDescrip">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <b-button variant="success" size="sm" @click="cargarArchivo" :disabled="!btnHabilitado">Adjuntar y Enviar Documento</b-button>
          </b-col>
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
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";

  export default {
    name: 'cargadocumento',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    props: {
        datosDocumento: Object
    },
    data () {
      return {
        infoDocumento: {},
        encabColumnasAdjuntos: [
          { label: 'Descripción del Documento', field: 'descripcion', sortable: false },
          { label: 'Archivo', field: 'nombre_archivo', sortable: false },
          { label: 'FechaEnvío', field: 'creado', formatFn: this.formatFnF, sortable: false },
          { label: 'Estado', field: 'id', sortable: false }
        ],
        infoArchivoAdjunto: {
          id: null,
          id_documento: null,
          id_institucion: null,
          vigencia: null,
          descripcion: null,
          carpeta: null,
          subcarpeta: null,
          nombre_archivo: null,
          estado: null
        },
        listaArchivosAdjuntos: [],
        nombreArchivo: null,
        btnHabilitado: false,
        archivoAdjuntadoEnServidor: {},
        observaciones: null
      }
    },
    validations: {
      infoArchivoAdjunto: {
        descripcion: { required }
      }
    },
    methods: {
      veArchivoAdjunto(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpeta + "/" + item.subcarpeta + "/" + item.nombre_archivo
        window.open(ruta, '_blank')
      },
      adjuntarDocumento() {
        this.nombreArchivo = null
        this.btnHabilitado = true
        this.$refs['modalAdjuntarDocumento'].show()
      },
      async cargarArchivo() {
        this.$v.infoArchivoAdjunto.$touch()
        if (this.$v.infoArchivoAdjunto.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.btnHabilitado = false
          let formData = new FormData()
          formData.append('file', this.nombreArchivo)
          await axios
          .post('https://siedutunja.gov.co:3001/api/calidad/documentos/adjuntar/archivo', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
          .then(response => {
            if (response.data.error) {
              this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Calidad')
            } else {
              this.archivoAdjuntadoEnServidor = response.data.datos
              this.guardarAdjuntoSolicitud()
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Cargar Archivo Calidad. Intente más tarde. ' + err)
          })
          this.$refs['modalAdjuntarDocumento'].hide()
        }
      },
      async guardarAdjuntoSolicitud() {
        this.infoArchivoAdjunto.id_documento = this.datosDocumento.id
        this.infoArchivoAdjunto.id_institucion = this.$store.state.idInstitucion
        this.infoArchivoAdjunto.vigencia = this.datosDocumento.vigencia
        this.infoArchivoAdjunto.descripcion = this.infoArchivoAdjunto.descripcion
        this.infoArchivoAdjunto.carpeta = this.archivoAdjuntadoEnServidor.carpeta
        this.infoArchivoAdjunto.subcarpeta = this.archivoAdjuntadoEnServidor.subcarpeta
        this.infoArchivoAdjunto.nombre_archivo = this.archivoAdjuntadoEnServidor.archivo
        this.infoArchivoAdjunto.estado = 1
        await axios
        .post(CONFIG.ROOT_PATH + 'calidad/documentos/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Calidad')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Archivo cargado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Calidad. Intente más tarde. ' + err)
        })
        this.$refs['modalAdjuntarDocumento'].hide()
        this.verArchivosAdjuntos()
      },
      async eliminarArchivoAdjunto(item) {
        this.infoArchivoAdjunto.id = item.id
        await axios
        .put(CONFIG.ROOT_PATH + 'calidad/documentos/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Eliminar Archivo Adjunto')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Archivo eliminado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Eliminar Archivo Adjunto. Intente más tarde. ' + err)
        })
        this.verArchivosAdjuntos()
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      validateStateA(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjunto[name]
        return $dirty ? !$error : null
      },
      async verArchivosAdjuntos() {
        this.listaArchivosAdjuntos = []
        this.observaciones = null
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/documentos/adjuntos', { params: { vigencia: this.datosDocumento.vigencia, idInstitucion: this.$store.state.idInstitucion, idDocumento: this.datosDocumento.id }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Archivos Adjuntos Calidad')
          } else {
            if (response.data.datos != 0) {
              this.listaArchivosAdjuntos = response.data.datos
              this.observaciones = this.listaArchivosAdjuntos[0].observaciones
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Archivos Adjuntos Calidad. Intente más tarde. ' + err)
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.verArchivosAdjuntos()
    }
  }
</script>
