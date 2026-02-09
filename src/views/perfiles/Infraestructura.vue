<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="building" aria-hidden="true"></b-icon> INFRAESTRUCTURA DE LA INSTITUCIÓN EDUCATIVA</h3>
      </b-col>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b>PLAN DE MANTENIMIENTO</b></h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12" class="mt-2">
                <div class="card-header-actions">
                  <CLink href="#" class="card-header-action btn-setting mr-2 text-info" @click="adjuntarDocumentoM" title="Adjuntar Archivo">
                    <CIcon name="cilFile"/>
                  </CLink>
                </div>
                <p class="mb-1">Documento Plan de Mantenimiento:</p>
                <vue-good-table :columns="encabColumnasMantenimiento" :rows="listaArchivosAdjuntosM" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'id'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjuntoM(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                      <span v-if="props.row.archivoMantenimiento != null" class="mx-3 text-light">|</span>
                      <span v-if="props.row.archivoMantenimiento != null" style="font-weight: bold; color: red; cursor: pointer" @click="guardarAdjuntoMantenimiento(0)" title="Eliminar archivo adjunto"><CIcon name="cilXCircle"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen documentos adjuntos</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b>USO DE SUELO</b></h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12" class="mt-2">
                <div class="card-header-actions">
                  <CLink href="#" class="card-header-action btn-setting mr-2 text-info" @click="adjuntarDocumentoU" title="Adjuntar Archivo">
                    <CIcon name="cilFile"/>
                  </CLink>
                </div>
                <p class="mb-1">Documento Uso de Suelo:</p>
                <vue-good-table :columns="encabColumnasUso" :rows="listaArchivosAdjuntosU" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'id'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjuntoU(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                      <span v-if="props.row.archivoUso != null" class="mx-3 text-light">|</span>
                      <span v-if="props.row.archivoUso != null" style="font-weight: bold; color: red; cursor: pointer" @click="guardarAdjuntoUso(0)" title="Eliminar archivo adjunto"><CIcon name="cilXCircle"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen documentos adjuntos</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b>LICENCIA DE CONSTRUCCIÓN</b></h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12" class="mt-2">
                <div class="card-header-actions">
                  <CLink href="#" class="card-header-action btn-setting mr-2 text-info" @click="adjuntarDocumentoC" title="Adjuntar Archivo">
                    <CIcon name="cilFile"/>
                  </CLink>
                </div>
                <p class="mb-1">Documento Licencia de Construcción:</p>
                <vue-good-table :columns="encabColumnasConstruccion" :rows="listaArchivosAdjuntosC" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'id'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjuntoC(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                      <span v-if="props.row.archivoConstruccion != null" class="mx-3 text-light">|</span>
                      <span v-if="props.row.archivoConstruccion != null" style="font-weight: bold; color: red; cursor: pointer" @click="guardarAdjuntoConstruccion(0)" title="Eliminar archivo adjunto"><CIcon name="cilXCircle"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen documentos adjuntos</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
      <b-col lg="12">
        <b-card>
          <template #header>
            <h5 class="mb-0"><b>PLAN DE EMERGENCIAS</b></h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="12" class="mt-2">
                <div class="card-header-actions">
                  <CLink href="#" class="card-header-action btn-setting mr-2 text-info" @click="adjuntarDocumentoE" title="Adjuntar Archivo">
                    <CIcon name="cilFile"/>
                  </CLink>
                </div>
                <p class="mb-1">Documento Plan de Emergencias:</p>
                <vue-good-table :columns="encabColumnasEmer" :rows="listaArchivosAdjuntosE" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'id'">
                      <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjuntoE(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                      <span v-if="props.row.archivoEmer != null" class="mx-3 text-light">|</span>
                      <span v-if="props.row.archivoEmer != null" style="font-weight: bold; color: red; cursor: pointer" @click="guardarAdjuntoEmer(0)" title="Eliminar archivo adjunto"><CIcon name="cilXCircle"/></span>
                    </span>
                  </template>
                  <div slot="emptystate">
                    <h5 class="text-danger ml-5">No existen documentos adjuntos</h5>
                  </div>
                </vue-good-table>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalAdjuntarDocumentoM" size="lg" scrollable hide-footer title="Adjuntar Documento Plan de Mantenimiento" ok-only>
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
          <b-form-file v-model.trim="nombreArchivo" :state="Boolean(nombreArchivo)" placeholder="Elija un archivo o suéltelo aquí..." drop-placeholder="Suelta el archivo aquí..."></b-form-file>
        </b-col>
        <div v-if="nombreArchivo">
          <b-col lg="12" md="12" class="my-5">
            <b-form-group label="Descripción del Archivo*" label-for="descripM">
              <b-form-input id="descripM" ref="descripM" v-model.trim="$v.infoArchivoAdjuntoM.descMantenimiento.$model" :state="validateStateM('descMantenimiento')" aria-describedby="feedDescripM" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedDescripM">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button variant="success" size="sm" @click="cargarArchivoM" :disabled="!btnHabilitado">Adjuntar Archivo</b-button>
          </b-col>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAdjuntarDocumentoU" size="lg" scrollable hide-footer title="Adjuntar Documento Uso de Suelo" ok-only>
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
          <b-form-file v-model.trim="nombreArchivo" :state="Boolean(nombreArchivo)" placeholder="Elija un archivo o suéltelo aquí..." drop-placeholder="Suelta el archivo aquí..."></b-form-file>
        </b-col>
        <div v-if="nombreArchivo">
          <b-col lg="12" md="12" class="my-5">
            <b-form-group label="Descripción del Archivo*" label-for="descripU">
              <b-form-input id="descripU" ref="descripU" v-model.trim="$v.infoArchivoAdjuntoU.descUso.$model" :state="validateStateU('descUso')" aria-describedby="feedDescripU" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedDescripU">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button variant="success" size="sm" @click="cargarArchivoU" :disabled="!btnHabilitado">Adjuntar Archivo</b-button>
          </b-col>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAdjuntarDocumentoC" size="lg" scrollable hide-footer title="Adjuntar Documento Licencia de Construcción" ok-only>
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
          <b-form-file v-model.trim="nombreArchivo" :state="Boolean(nombreArchivo)" placeholder="Elija un archivo o suéltelo aquí..." drop-placeholder="Suelta el archivo aquí..."></b-form-file>
        </b-col>
        <div v-if="nombreArchivo">
          <b-col lg="12" md="12" class="my-5">
            <b-form-group label="Descripción del Archivo*" label-for="descripC">
              <b-form-input id="descripC" ref="descripC" v-model.trim="$v.infoArchivoAdjuntoC.descConstruccion.$model" :state="validateStateC('descConstruccion')" aria-describedby="feedDescripC" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedDescripC">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button variant="success" size="sm" @click="cargarArchivoC" :disabled="!btnHabilitado">Adjuntar Archivo</b-button>
          </b-col>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAdjuntarDocumentoE" size="lg" scrollable hide-footer title="Adjuntar Documento Plan de Emergencias" ok-only>
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
          <b-form-file v-model.trim="nombreArchivo" :state="Boolean(nombreArchivo)" placeholder="Elija un archivo o suéltelo aquí..." drop-placeholder="Suelta el archivo aquí..."></b-form-file>
        </b-col>
        <div v-if="nombreArchivo">
          <b-col lg="12" md="12" class="my-5">
            <b-form-group label="Descripción del Archivo*" label-for="descripE">
              <b-form-input id="descripE" ref="descripE" v-model.trim="$v.infoArchivoAdjuntoE.descEmer.$model" :state="validateStateE('descEmer')" aria-describedby="feedDescripE" autocomplete="off" maxlength="50"></b-form-input>
              <b-form-invalid-feedback id="feedDescripE">Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button variant="success" size="sm" @click="cargarArchivoE" :disabled="!btnHabilitado">Adjuntar Archivo</b-button>
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
    name: 'Infraestructura',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        idColegio: this.$store.state.idInstitucion,
        datosMantenimiento: {},
        datosUso: {},
        datosConstruccion: {},
        datosEmer: {},
        encabColumnasMantenimiento: [
          { label: 'Descripción del Archivo', field: 'descMantenimiento', sortable: false },
          { label: 'Archivo', field: 'archivoMantenimiento', sortable: false },
          { label: 'Fec_Cargue', field: 'fechaMantenimiento', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnasUso: [
          { label: 'Descripción del Archivo', field: 'descUso', sortable: false },
          { label: 'Archivo', field: 'archivoUso', sortable: false },
          { label: 'Fec_Cargue', field: 'fechaUso', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnasConstruccion: [
          { label: 'Descripción del Archivo', field: 'descConstruccion', sortable: false },
          { label: 'Archivo', field: 'archivoConstruccion', sortable: false },
          { label: 'Fec_Cargue', field: 'fechaConstruccion', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnasEmer: [
          { label: 'Descripción del Archivo', field: 'descEmer', sortable: false },
          { label: 'Archivo', field: 'archivoEmer', sortable: false },
          { label: 'Fec_Cargue', field: 'fechaEmer', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        listaArchivosAdjuntosM: [],
        listaArchivosAdjuntosU: [],
        listaArchivosAdjuntosC: [],
        listaArchivosAdjuntosE: [],
        infoArchivoAdjuntoM: {
          id: null,
          descMantenimiento: null,
          archivoMantenimiento: null,
          fechaMantenimiento: null,
          carpetaMantenimiento: null,
          subcarpetaMantenimiento: null
        },
        infoArchivoAdjuntoU: {
          id: null,
          descUso: null,
          archivoUso: null,
          fechaUso: null,
          carpetaUso: null,
          subcarpetaUso: null
        },
        infoArchivoAdjuntoC: {
          id: null,
          descConstruccion: null,
          archivoConstruccion: null,
          fechaConstruccion: null,
          carpetaConstruccion: null,
          subcarpetaConstruccion: null
        },
        infoArchivoAdjuntoE: {
          id: null,
          descEmer: null,
          archivoEmer: null,
          fechaEmer: null,
          carpetaEmer: null,
          subcarpetaEmer: null
        },
        btnHabilitado: false,
        archivoAdjuntadoEnServidor: {},
        nombreArchivo: null
      }
    },
    validations: {
      infoArchivoAdjuntoM: {
        descMantenimiento: { required }
      },
      infoArchivoAdjuntoU: {
        descUso: { required }
      },
      infoArchivoAdjuntoC: {
        descConstruccion: { required }
      },
      infoArchivoAdjuntoE: {
        descEmer: { required }
      }
    },
    methods: {
      // Emergencias
      adjuntarDocumentoE() {
        this.nombreArchivo = null
        this.btnHabilitado = true
        this.$refs['modalAdjuntarDocumentoE'].show()
      },
      cargarArchivoE() {
        this.archivoAdjuntadoEnServidor = {}
        this.$v.infoArchivoAdjuntoE.$touch()
        if (this.$v.infoArchivoAdjuntoE.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de adjuntar el documento Plan de Emergencias de la Institución Educativa?', {
            title: 'Adjuntar Documento',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Adjuntar',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.btnHabilitado = false
              let formData = new FormData()
              formData.append('file', this.nombreArchivo)
              axios
              .post('https://siedutunja.gov.co:3001/api/colegios/adjuntar/archivoemergencias', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
              .then(response => {
                if (response.data.error) {
                  this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Plan Emergencias')
                } else {
                  this.archivoAdjuntadoEnServidor = response.data.datos
                  this.guardarAdjuntoEmer(1)
                }
              })
              .catch(err => {
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Cargar Archivo Plan Emergencias. Intente más tarde. ' + err)
              })
            }
          })
        }
      },
      async guardarAdjuntoEmer(valor) {
        let msj = ''
        this.infoArchivoAdjuntoE.id = this.idColegio
        if (valor == 1) {
          this.infoArchivoAdjuntoE.descEmer = this.infoArchivoAdjuntoE.descEmer
          this.infoArchivoAdjuntoE.archivoEmer = this.archivoAdjuntadoEnServidor.archivo
          this.infoArchivoAdjuntoE.carpetaEmer = this.archivoAdjuntadoEnServidor.carpeta
          this.infoArchivoAdjuntoE.subcarpetaEmer = this.archivoAdjuntadoEnServidor.subcarpeta
          let fecha = new Date()
          this.infoArchivoAdjuntoE.fechaEmer = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()
          msj = 'Archivo cargado correctamente.'
        } else {
          this.infoArchivoAdjuntoE.descEmer = null
          this.infoArchivoAdjuntoE.archivoEmer = null
          this.infoArchivoAdjuntoE.carpetaEmer = null
          this.infoArchivoAdjuntoE.subcarpetaEmer = null
          this.infoArchivoAdjuntoE.fechaEmer = null
          msj = 'Archivo eliminado correctamente.'
        }
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios/planemergencias', JSON.stringify(this.infoArchivoAdjuntoE), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Plan Emergencias')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,msj)
            this.consultaColegio()
            this.$refs['modalAdjuntarDocumentoE'].hide()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Plan Emergencias. Intente más tarde. ' + err)
        })
      },
      veArchivoAdjuntoE(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpetaEmer + "/" + item.subcarpetaEmer + "/" + item.archivoEmer
        window.open(ruta, '_blank')
      },
      // Construccion
      adjuntarDocumentoC() {
        this.nombreArchivo = null
        this.btnHabilitado = true
        this.$refs['modalAdjuntarDocumentoC'].show()
      },
      cargarArchivoC() {
        this.archivoAdjuntadoEnServidor = {}
        this.$v.infoArchivoAdjuntoC.$touch()
        if (this.$v.infoArchivoAdjuntoC.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de adjuntar el documento Licencia de Construcción de la Institución Educativa?', {
            title: 'Adjuntar Documento',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Adjuntar',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.btnHabilitado = false
              let formData = new FormData()
              formData.append('file', this.nombreArchivo)
              axios
              .post('https://siedutunja.gov.co:3001/api/colegios/adjuntar/archivoconstruccion', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
              .then(response => {
                if (response.data.error) {
                  this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Licencia de Construcción')
                } else {
                  this.archivoAdjuntadoEnServidor = response.data.datos
                  this.guardarAdjuntoConstruccion(1)
                }
              })
              .catch(err => {
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Cargar Archivo Licencia de Construcción. Intente más tarde. ' + err)
              })
            }
          })
        }
      },
      async guardarAdjuntoConstruccion(valor) {
        let msj = ''
        this.infoArchivoAdjuntoC.id = this.idColegio
        if (valor == 1) {
          this.infoArchivoAdjuntoC.descConstruccion = this.infoArchivoAdjuntoC.descConstruccion
          this.infoArchivoAdjuntoC.archivoConstruccion = this.archivoAdjuntadoEnServidor.archivo
          this.infoArchivoAdjuntoC.carpetaConstruccion = this.archivoAdjuntadoEnServidor.carpeta
          this.infoArchivoAdjuntoC.subcarpetaConstruccion = this.archivoAdjuntadoEnServidor.subcarpeta
          let fecha = new Date()
          this.infoArchivoAdjuntoC.fechaConstruccion = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()
          msj = 'Archivo cargado correctamente.'
        } else {
          this.infoArchivoAdjuntoC.descConstruccion = null
          this.infoArchivoAdjuntoC.archivoConstruccion = null
          this.infoArchivoAdjuntoC.carpetaConstruccion = null
          this.infoArchivoAdjuntoC.subcarpetaConstruccion = null
          this.infoArchivoAdjuntoC.fechaConstruccion = null
          msj = 'Archivo eliminado correctamente.'
        }
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios/licenciaconstruccion', JSON.stringify(this.infoArchivoAdjuntoC), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Licencia de Construcción')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,msj)
            this.consultaColegio()
            this.$refs['modalAdjuntarDocumentoC'].hide()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Licencia de Construcción. Intente más tarde. ' + err)
        })
      },
      veArchivoAdjuntoC(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpetaConstruccion + "/" + item.subcarpetaConstruccion + "/" + item.archivoConstruccion
        window.open(ruta, '_blank')
      },
      // Uso
      adjuntarDocumentoU() {
        this.nombreArchivo = null
        this.btnHabilitado = true
        this.$refs['modalAdjuntarDocumentoU'].show()
      },
      cargarArchivoU() {
        this.archivoAdjuntadoEnServidor = {}
        this.$v.infoArchivoAdjuntoU.$touch()
        if (this.$v.infoArchivoAdjuntoU.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de adjuntar el documento Uso de Suelo de la Institución Educativa?', {
            title: 'Adjuntar Documento',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Adjuntar',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.btnHabilitado = false
              let formData = new FormData()
              formData.append('file', this.nombreArchivo)
              axios
              .post('https://siedutunja.gov.co:3001/api/colegios/adjuntar/archivouso', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
              .then(response => {
                if (response.data.error) {
                  this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Uso Suelo')
                } else {
                  this.archivoAdjuntadoEnServidor = response.data.datos
                  this.guardarAdjuntoUso(1)
                }
              })
              .catch(err => {
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Cargar Archivo Uso Suelo. Intente más tarde. ' + err)
              })
            }
          })
        }
      },
      async guardarAdjuntoUso(valor) {
        let msj = ''
        this.infoArchivoAdjuntoU.id = this.idColegio
        if (valor == 1) {
          this.infoArchivoAdjuntoU.descUso = this.infoArchivoAdjuntoU.descUso
          this.infoArchivoAdjuntoU.archivoUso = this.archivoAdjuntadoEnServidor.archivo
          this.infoArchivoAdjuntoU.carpetaUso = this.archivoAdjuntadoEnServidor.carpeta
          this.infoArchivoAdjuntoU.subcarpetaUso = this.archivoAdjuntadoEnServidor.subcarpeta
          let fecha = new Date()
          this.infoArchivoAdjuntoU.fechaUso = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()
          msj = 'Archivo cargado correctamente.'
        } else {
          this.infoArchivoAdjuntoU.descUso = null
          this.infoArchivoAdjuntoU.archivoUso = null
          this.infoArchivoAdjuntoU.carpetaUso = null
          this.infoArchivoAdjuntoU.subcarpetaUso = null
          this.infoArchivoAdjuntoU.fechaUso = null
          msj = 'Archivo eliminado correctamente.'
        }
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios/usosuelo', JSON.stringify(this.infoArchivoAdjuntoU), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Uso de Suelo')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,msj)
            this.consultaColegio()
            this.$refs['modalAdjuntarDocumentoU'].hide()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Uso de Suelo. Intente más tarde. ' + err)
        })
      },
      veArchivoAdjuntoU(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpetaUso + "/" + item.subcarpetaUso + "/" + item.archivoUso
        window.open(ruta, '_blank')
      },
      // Mantenimiento
      adjuntarDocumentoM() {
        this.nombreArchivo = null
        this.btnHabilitado = true
        this.$refs['modalAdjuntarDocumentoM'].show()
      },
      cargarArchivoM() {
        this.archivoAdjuntadoEnServidor = {}
        this.$v.infoArchivoAdjuntoM.$touch()
        if (this.$v.infoArchivoAdjuntoM.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de adjuntar el documento PLan de Mantenimiento de la Institución Educativa?', {
            title: 'Adjuntar Documento',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Adjuntar',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.btnHabilitado = false
              let formData = new FormData()
              formData.append('file', this.nombreArchivo)
              axios
              .post('https://siedutunja.gov.co:3001/api/colegios/adjuntar/archivomantenimiento', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
              .then(response => {
                if (response.data.error) {
                  this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Plan de Mantenimiento')
                } else {
                  this.archivoAdjuntadoEnServidor = response.data.datos
                  this.guardarAdjuntoMantenimiento(1)
                }
              })
              .catch(err => {
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Cargar Archivo Plan de Mantenimiento. Intente más tarde. ' + err)
              })
            }
          })
        }
      },
      async guardarAdjuntoMantenimiento(valor) {
        let msj = ''
        this.infoArchivoAdjuntoM.id = this.idColegio
        if (valor == 1) {
          this.infoArchivoAdjuntoM.descMantenimiento = this.infoArchivoAdjuntoM.descMantenimiento
          this.infoArchivoAdjuntoM.archivoMantenimiento = this.archivoAdjuntadoEnServidor.archivo
          this.infoArchivoAdjuntoM.carpetaMantenimiento = this.archivoAdjuntadoEnServidor.carpeta
          this.infoArchivoAdjuntoM.subcarpetaMantenimiento = this.archivoAdjuntadoEnServidor.subcarpeta
          let fecha = new Date()
          this.infoArchivoAdjuntoM.fechaMantenimiento = fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()
          msj = 'Archivo cargado correctamente.'
        } else {
          this.infoArchivoAdjuntoM.descMantenimiento = null
          this.infoArchivoAdjuntoM.archivoMantenimiento = null
          this.infoArchivoAdjuntoM.carpetaMantenimiento = null
          this.infoArchivoAdjuntoM.subcarpetaMantenimiento = null
          this.infoArchivoAdjuntoM.fechaMantenimiento = null
          msj = 'Archivo eliminado correctamente.'
        }
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios/planmantenimiento', JSON.stringify(this.infoArchivoAdjuntoM), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Plan de Mejoramiento')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,msj)
            this.consultaColegio()
            this.$refs['modalAdjuntarDocumentoM'].hide()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Plan de Mejoramiento. Intente más tarde. ' + err)
        })
      },
      veArchivoAdjuntoM(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpetaMantenimiento + "/" + item.subcarpetaMantenimiento + "/" + item.archivoMantenimiento
        window.open(ruta, '_blank')
      },
      async consultaColegio() {
        this.listaArchivosAdjuntosM = []
        this.listaArchivosAdjuntosU = []
        this.listaArchivosAdjuntosC = []
        this.listaArchivosAdjuntosE = []
        await axios
        .get(CONFIG.ROOT_PATH + 'colegios/colegio', { params: { idColegio: this.idColegio }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Colegio')
          } else{
            if (response.data.datos != 0) {
              this.datosMantenimiento.id = response.data.datos.id
              this.datosMantenimiento.descMantenimiento = response.data.datos.descMantenimiento
              this.datosMantenimiento.archivoMantenimiento = response.data.datos.archivoMantenimiento
              this.datosMantenimiento.carpetaMantenimiento = response.data.datos.carpetaMantenimiento
              this.datosMantenimiento.subcarpetaMantenimiento = response.data.datos.subcarpetaMantenimiento
              if (response.data.datos.fechaMantenimiento != null && response.data.datos.fechaMantenimiento != '')
                this.datosMantenimiento.fechaMantenimiento = response.data.datos.fechaMantenimiento.substr(0,10)
              else 
                this.datosMantenimiento.fechaMantenimiento = null
              if (response.data.datos.archivoMantenimiento != null) {
                this.listaArchivosAdjuntosM.push(this.datosMantenimiento)
              }
              this.datosUso.id = response.data.datos.id
              this.datosUso.descUso = response.data.datos.descUso
              this.datosUso.archivoUso = response.data.datos.archivoUso
              this.datosUso.carpetaUso = response.data.datos.carpetaUso
              this.datosUso.subcarpetaUso = response.data.datos.subcarpetaUso
              if (response.data.datos.fechaUso != null && response.data.datos.fechaUso != '')
                this.datosUso.fechaUso = response.data.datos.fechaUso.substr(0,10)
              else 
                this.datosUso.fechaUso = null
              if (response.data.datos.archivoUso != null) {
                this.listaArchivosAdjuntosU.push(this.datosUso)
              }
              this.datosConstruccion.id = response.data.datos.id
              this.datosConstruccion.descConstruccion = response.data.datos.descConstruccion
              this.datosConstruccion.archivoConstruccion = response.data.datos.archivoConstruccion
              this.datosConstruccion.carpetaConstruccion = response.data.datos.carpetaConstruccion
              this.datosConstruccion.subcarpetaConstruccion = response.data.datos.subcarpetaConstruccion
              if (response.data.datos.fechaConstruccion != null && response.data.datos.fechaConstruccion != '')
                this.datosConstruccion.fechaConstruccion = response.data.datos.fechaConstruccion.substr(0,10)
              else 
                this.datosConstruccion.fechaConstruccion = null
              if (response.data.datos.archivoConstruccion != null) {
                this.listaArchivosAdjuntosC.push(this.datosConstruccion)
              }
              this.datosEmer.id = response.data.datos.id
              this.datosEmer.descEmer = response.data.datos.descEmer
              this.datosEmer.archivoEmer = response.data.datos.archivoEmer
              this.datosEmer.carpetaEmer = response.data.datos.carpetaEmer
              this.datosEmer.subcarpetaEmer = response.data.datos.subcarpetaEmer
              if (response.data.datos.fechaEmer != null && response.data.datos.fechaEmer != '')
                this.datosEmer.fechaEmer = response.data.datos.fechaEmer.substr(0,10)
              else 
                this.datosEmer.fechaEmer = null
              if (response.data.datos.archivoEmer != null) {
                this.listaArchivosAdjuntosE.push(this.datosEmer)
              }
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Colegio. Intente más tarde. ' + err)
        })
      },
      validateStateM(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjuntoM[name]
        return $dirty ? !$error : null
      },
      validateStateU(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjuntoU[name]
        return $dirty ? !$error : null
      },
      validateStateC(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjuntoC[name]
        return $dirty ? !$error : null
      },
      validateStateE(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjuntoE[name]
        return $dirty ? !$error : null
      },
      iniciarVista() {
        if(this.$store.state.idRol == 5) {
          this.consultaColegio()
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
