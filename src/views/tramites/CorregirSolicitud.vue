<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="success" text-color="light">
            <h5 class="my-0">Trámites En Línea - Solicitudes</h5>
          </CCardHeader>
          <CCardBody>
            <CCard>
              <CCardHeader>
                <h5 class="my-0">Formulario: Corregir Solicitud</h5>
              </CCardHeader>
              <CCardBody>
                <CRow class="mt-2">
                  <CCol>
                    <CCard>
                      <CCardFooter style="background: rgb(123, 197, 240); margin-top: 0; box-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);">
                        <b-row>
                          <b-col lg="6" class="mt-1">
                            <span class="small text-medium-emphasis">TRÁMITE</span>
                            <h6>{{infoSolicitud.tramite}}</h6>
                          </b-col>
                          <b-col lg="3" class="mt-1">
                            <span class="small text-medium-emphasis">No. SOLICITUD</span>
                            <h6>{{infoSolicitud.consecutivo}}</h6>
                          </b-col>
                          <b-col lg="3" class="mt-1">
                            <span class="small text-medium-emphasis">FECHA SOLICITUD</span>
                            <h6>{{fechaLocal(infoSolicitud.creado)}}</h6>
                          </b-col>
                          <b-col lg="9" class="mt-1">
                            <span class="small text-medium-emphasis">DESCRIPCIÓN DE LA SOLICITUD</span>
                            <h6>{{infoSolicitud.solicitud}}</h6>
                          </b-col>
                          <b-col lg="3" class="mt-1">
                            <span class="small text-medium-emphasis">ESTADO</span>
                            <h6>{{infoSolicitud.descEstado}}</h6>
                          </b-col>
                        </b-row>
                      </CCardFooter>
                    </CCard>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardFooter style="background: rgb(255, 134, 134);">
                        <span class="small text-medium-emphasis">OBSERVACIONES PARA CORRECCIÓN DE LA SOLICITUD</span>
                        <h5>{{infoSolicitud.observaciones}}</h5>
                      </CCardFooter>
                    </CCard>
                  </CCol>
                </CRow>
                <b-row>
                  <b-col lg="12" class="mt-4">
                    <b-form-group label="Descripción de la Solicitud:*" label-for="solicitud">
                      <b-form-textarea id="solicitud" ref="solicitud" v-model.trim="$v.infoSolicitud.solicitud.$model" :state="validateState('solicitud')" aria-describedby="feedSolicitud" autocomplete="off" rows="4"></b-form-textarea>
                      <b-form-invalid-feedback id="feedSolicitud" >Campo requerido.</b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col lg="12" class="mt-4">
                    <div class="card-header-actions">
                      <CLink href="#" class="card-header-action btn-setting mr-2 text-info" @click="adjuntarDocumento" title="Adjuntar Archivo">
                        <CIcon name="cilFile"/>
                      </CLink>
                    </div>
                    <p class="mb-1">Adjuntar Documentos:</p>
                    <vue-good-table :columns="encabColumnasAdjuntos" :rows="listaArchivosAdjuntos" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                      <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'id'">
                          <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjunto(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                          <span v-if="infoSolicitud.estado==1 || infoSolicitud.estado==3" class="mx-3 text-light">|</span>
                          <span v-if="infoSolicitud.estado==1 || infoSolicitud.estado==3" style="font-weight: bold; color: red; cursor: pointer" @click="eliminarArchivoAdjunto(props.row)" title="Eliminar archivo adjunto"><CIcon name="cilXCircle"/></span>
                        </span>
                      </template>
                      <div slot="emptystate">
                        <h5 class="text-danger ml-5">No existen documentos adjuntos</h5>
                      </div>
                    </vue-good-table>
                  </b-col>
                  <b-col lg="12" class="mt-4">
                    <b-form-group label="Correo de Notificaciones:*" label-for="correo">
                      <b-form-input id="correo" ref="correo" v-model.trim="$v.infoSolicitud.correo.$model" :state="validateState('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="100"></b-form-input>
                      <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
                    </b-form-group>
                    Si el correo ha cambiado, actualice los datos de la Institución Educativa.
                  </b-col>
                  <b-col lg="12" class="mt-4"><hr></b-col>
                  <b-col lg="12">
                    <div class="float-right small text-medium-emphasis">* Campo requerido</div>
                    <b-button class="small mt-1 mr-3" variant="success" @click="enviarSolicitud">Enviar Solicitud Corregida</b-button>
                    <b-button class="small mt-1" variant="light" @click="cerrarFormulario">Cancelar</b-button>
                  </b-col>
                </b-row>
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol> 
    </CRow>
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
            <b-button variant="success" size="sm" @click="cargarArchivo" :disabled="!btnHabilitado">Adjuntar Archivo</b-button>
          </b-col>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script> 
  import axios from "axios"
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import { uuid } from 'vue-uuid'

  export default {
    name: 'CrearTramite',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        idSolicitud: null,
        infoSolicitud: {
          id: null,
          solicitud: null,
          vigencia: null,
          id_tramite: null,
          id_institucion: null,
          estado: 1
        },
        encabColumnasAdjuntos: [
          { label: 'Identificación del Archivo', field: 'descripcion', sortable: false },
          { label: 'Archivo', field: 'nombre_archivo', sortable: false },
          { label: 'Fec_Cargue', field: 'creado', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        listaArchivosAdjuntos: [],
        infoArchivoAdjunto: {
          id: null,
          id_solicitud: null,
          descripcion: null,
          carpeta: null,
          subcarpeta: null,
          nombre_archivo: null,
          estado: null
        },
        nombreArchivo: null,
        btnHabilitado: true,
        archivoAdjuntadoEnServidor: {}
      }
    },
    validations: {
      infoSolicitud: {
        solicitud: { required },
        correo: { required }
      },
      infoArchivoAdjunto: {
        descripcion: { required }
      }
    },
    methods: {
      enviarSolicitud() {
        this.$v.infoSolicitud.$touch()
        if (this.$v.infoSolicitud.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de enviar la solicitud corregida?', {
            title: 'Enviar Solicitud',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Enviar Solicitud',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarSolicitud()
            }
          })
        }
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
          .post('https://siedutunja.gov.co:3001/api/tramites/adjuntar/archivo', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
          .then(response => {
            if (response.data.error) {
              this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Solicitud')
            } else {
              this.archivoAdjuntadoEnServidor = response.data.datos
              this.guardarAdjuntoSolicitud()
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Cargar Archivo Solicitud. Intente más tarde. ' + err)
          })
          this.$refs['modalAdjuntarDocumento'].hide()
        }
      },
      async guardarAdjuntoSolicitud() {
        this.infoArchivoAdjunto.id = uuid.v1()
        this.infoArchivoAdjunto.id_solicitud = this.idSolicitud
        //this.infoArchivoAdjunto.descripcion = this.infoArchivoAdjunto.descripcion
        this.infoArchivoAdjunto.carpeta = this.archivoAdjuntadoEnServidor.carpeta
        this.infoArchivoAdjunto.subcarpeta = this.archivoAdjuntadoEnServidor.subcarpeta
        this.infoArchivoAdjunto.nombre_archivo = this.archivoAdjuntadoEnServidor.archivo
        this.infoArchivoAdjunto.estado = 1
        await axios
        .post(CONFIG.ROOT_PATH + 'tramites/solicitudes/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Solicitud')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Archivo cargado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Solicitud. Intente más tarde. ' + err)
        })
        this.verArchivosAdjuntos()
      },
      async verArchivosAdjuntos() {
        this.listaArchivosAdjuntos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'tramites/solicitudes/adjuntos', { params: { idSolicitud: this.idSolicitud }})
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
      veArchivoAdjunto(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpeta + "/" + item.subcarpeta + "/" + item.nombre_archivo
        window.open(ruta, '_blank')
      },
      async eliminarArchivoAdjunto(item) {
        this.infoArchivoAdjunto.id = item.id
        await axios
        .put(CONFIG.ROOT_PATH + 'tramites/solicitudes/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      async guardarSolicitud() {
        this.infoSolicitud.id = this.idSolicitud
        this.infoSolicitud.solicitud = this.infoSolicitud.solicitud.toUpperCase()
        this.infoSolicitud.correo = this.infoSolicitud.correo.toLowerCase()
        this.infoSolicitud.nuevoEstado = 2
        this.infoSolicitud.observaciones = 'Solicitud corregida y enviada para revisión'
        this.infoSolicitud.usuario = this.$store.state.nombreUsuario + " " + this.$store.state.apellidoUsuario
        await axios
        .post(CONFIG.ROOT_PATH + 'tramites/solicitudes/corregir', JSON.stringify(this.infoSolicitud), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Solicitud')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La solicitud ha sido enviada.')
            this.$router.push('/solicitudes')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Solicitud. Intente más tarde. ' + err)
        })
      },
      cerrarFormulario() {
        this.$router.push('/inicio')
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      async consultaSolicitud() {
        await axios
        .get(CONFIG.ROOT_PATH + 'tramites/solicitud', { params: { idSolicitud: this.idSolicitud }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Archivos Adjuntos Solicitud')
          } else {
            if (response.data.datos != 0) {
              this.infoSolicitud = response.data.datos
              this.verArchivosAdjuntos()
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Archivos Adjuntos Solicitud. Intente más tarde. ' + err)
        })
      },
      fechaLocal(fechaCreado) {
        let fecha = new Date(fechaCreado)
        return fecha.toLocaleDateString() // + ' a las ' + fecha.toLocaleTimeString()
      },
      iniciarVista() {
        if(this.$store.state.coltramites == 1) {
          this.idSolicitud = sessionStorage.getItem('idSolicitud')
          this.consultaSolicitud()
        } else {
          this.$router.push('/restringida')
        }
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoSolicitud[name]
        return $dirty ? !$error : null
      },
      validateStateA(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjunto[name]
        return $dirty ? !$error : null
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
