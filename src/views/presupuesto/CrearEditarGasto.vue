<template>
  <div>
    <CRow>
      <CCol>
        <b-row>
          <b-col lg="12">
            <b-form-group label="Concepto del Gasto*" label-for="concepto">
              <b-form-select  id="concepto" ref="concepto" v-model="$v.infoGasto.id_concepto.$model" :state="validateState('id_concepto')" :options="comboConceptos" aria-describedby="feedconcepto"></b-form-select>
              <b-form-invalid-feedback id="feedconcepto" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Fuente del Gasto*" label-for="fuente">
              <b-form-select  id="fuente" ref="fuente" v-model="$v.infoGasto.id_fuente.$model" :state="validateState('id_fuente')" :options="comboFuentes" aria-describedby="feedfuente"></b-form-select>
              <b-form-invalid-feedback id="feedfuente" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="12">
            <b-form-group label="Objeto del Gasto*" label-for="objeto">
              <b-form-input id="objeto" ref="objeto" v-model.trim="$v.infoGasto.objeto.$model" :state="validateState('objeto')" aria-describedby="feedobjeto" autocomplete="off"></b-form-input>
              <b-form-invalid-feedback id="feedobjeto" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group label="Tipo Documento*" label-for="tipodoc">
              <b-form-select  id="tipodoc" ref="tipodoc" v-model="$v.infoGasto.id_documento.$model" :state="validateState('id_documento')" :options="comboDocumentos" aria-describedby="feedtipodoc"></b-form-select>
              <b-form-invalid-feedback id="feedtipodoc" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group label="Número Documento*" label-for="numegreso">
              <b-form-input id="numegreso" ref="numegreso" v-model.trim="$v.infoGasto.num_egreso.$model" :state="validateState('num_egreso')" aria-describedby="feednumegreso" autocomplete="off"></b-form-input>
              <b-form-invalid-feedback id="feednumegreso" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group label="Valor del Pago*" label-for="valor">
              <b-form-input id="valor" ref="valor" v-model.trim="$v.infoGasto.valor.$model" :state="validateState('valor')" aria-describedby="feedvalor" autocomplete="off" maxlength="25" @keydown="soloDecimales"></b-form-input>
              <b-form-invalid-feedback id="feedvalor" >Campo requerido.</b-form-invalid-feedback>
              <label for="valor" class="small text-medium-emphasis">Solo digite el punto para valores con decimales</label>
            </b-form-group>
          </b-col>
          <b-col lg="3">
            <b-form-group label="Fecha del Pago*" label-for="fecegreso">
              <b-form-input type="date" id="fecegreso" ref="fecegreso" v-model.trim="$v.infoGasto.fecha_egreso.$model" :state="validateState('fecha_egreso')" aria-describedby="feedfecegreso" autocomplete="off"></b-form-input>
              <b-form-invalid-feedback id="feedfecegreso" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <hr>
              <h6>Observaciones:</h6>
              <h6>
                Ingrese la URL del proceso en donde se encuentran los documentos y soportes cargados en el SECOP II, o adjunte los documentos requeridos en el proceso que está ejecutando.<br><br>
                Nota: Para el caso de Servicios Públicos adjuntar Recibo y Soporte de Pago
              </h6>
            <hr>
          </b-col>
        </b-row>
        <CRow v-if="infoGasto.estado==4">
          <CCol>
            <CCard>
              <CCardFooter style="background: rgb(255, 134, 134);">
                <span class="small text-medium-emphasis">OBSERVACIONES PARA CORRECCIÓN DEL GASTO</span>
                <h5>{{infoGasto.observaciones}}</h5>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        <b-row>
          <b-col lg="12" class="mt-2">
            <b-form-group label="URL del Proceso SECOP II:" label-for="url">
              <b-form-input id="url" ref="url" v-model.trim="infoGasto.urlGasto" autocomplete="off"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="infoGasto.editarGasto">
          <b-col lg="12" class="mt-2">
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
                  <span v-if="infoGasto.estado==1 || infoGasto.estado==2 || infoGasto.estado==3" class="mx-3 text-light">|</span>
                  <span v-if="infoGasto.estado==1 || infoGasto.estado==2 || infoGasto.estado==3" style="font-weight: bold; color: red; cursor: pointer" @click="eliminarArchivoAdjunto(props.row)" title="Eliminar archivo adjunto"><CIcon name="cilXCircle"/></span>
                </span>
              </template>
              <div slot="emptystate">
                <h5 class="text-danger ml-5">No existen documentos adjuntos</h5>
              </div>
            </vue-good-table>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button class="small mt-1 mr-3" variant="success" @click="validarDatosGasto">
              <div v-if="infoGasto.editarGasto">Actualizar y Enviar Datos del Gasto para Revisión</div>
              <div v-else>Crear un Nuevo Gasto</div>
            </b-button>
            <b-button v-if="infoGasto.editarGasto" class="small mt-1 mr-3" variant="danger" @click="eliminarDatosGasto">Eliminar Datos del Gasto</b-button>
            <b-button class="small mt-1" variant="light" @click="cancelarFormulario">Cancelar</b-button>
          </b-col>
        </b-row>
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
    name: 'CrearEditarAsignarRecursos',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    props: {
        datosGasto: Object
    },
    data () {
      return {
        comboConceptos: [],
        infoGasto: {
          id: null,
          objeto: null,
          id_concepto: null,
          id_fuente: null,
          id_institucion: null,
          id_destino: null,
          valor: null,
          id_documento: null,
          num_egreso: null,
          fecha_egreso: null,
          vigencia: null,
          estado: null,
          observaciones: null,
          urlGasto: null,
          editarGasto: null
        },
        comboEstados: [
          { value: 0, text: 'Inactivo'},
          { value: 1, text: 'Activo'}
        ],
        comboDocumentos: [
          { value: 1, text: 'CONTRATO'},
          { value: 2, text: 'FACTURA'},
          { value: 3, text: 'EGRESO'},
          { value: 4, text: 'RECIBO'},
          { value: 0, text: 'OTRO'},
        ],
        encabColumnasAdjuntos: [
          { label: 'Identificación del Archivo', field: 'descripcion', sortable: false },
          { label: 'Archivo', field: 'nombre_archivo', sortable: false },
          { label: 'Fec_Cargue', field: 'creado', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        comboFuentes: [],
        listaArchivosAdjuntos: [],
        infoArchivoAdjunto: {
          id: null,
          id_gasto: null,
          descripcion: null,
          carpeta: null,
          subcarpeta: null,
          nombre_archivo: null,
          estado: null
        },
        nombreArchivo: null,
        btnHabilitado: false,
        archivoAdjuntadoEnServidor: {}
      }
    },
    validations: {
      infoGasto: {
        objeto: { required },
        id_concepto: { required },
        id_fuente: { required },
        valor: { required },
        id_documento: { required },
        num_egreso: { required },
        fecha_egreso: { required },
        estado: { required }
      },
      infoArchivoAdjunto: {
        descripcion: { required }
      }
    },
    methods: {
      eliminarDatosGasto() {
        let titulo = 'Eliminar Gasto'
        let pregunta = '¿Esta seguro de eliminar los datos del gasto?. Recuerde que los datos eliminados no se podrán recuperar.'
        this.$bvModal.msgBoxConfirm(pregunta, {
          title: titulo,
          size: '',
          buttonSize: 'sm',
          okVariant: 'success',
          okTitle: 'Si, ' + titulo,
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.eliminarGasto()
          }
        })
        return true
      },
      async eliminarGasto() {
        await axios
        .delete(CONFIG.ROOT_PATH + 'presupuesto/gastos', { params: { id: this.infoGasto.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Elininar Gasto')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Elininar Gasto. Intente más tarde. ' + err)
        })
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
          .post('https://siedutunja.gov.co:3001/api/presupuesto/adjuntar/archivo', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
          .then(response => {
            if (response.data.error) {
              this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Gasto')
            } else {
              this.archivoAdjuntadoEnServidor = response.data.datos
              this.guardarAdjuntoSolicitud()
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: Cargar Archivo Gasto. Intente más tarde. ' + err)
          })
          this.$refs['modalAdjuntarDocumento'].hide()
        }
      },
      async guardarAdjuntoSolicitud() {
        this.infoArchivoAdjunto.id = uuid.v1()
        this.infoArchivoAdjunto.id_gasto = this.infoGasto.id
        this.infoArchivoAdjunto.descripcion = this.infoArchivoAdjunto.descripcion
        this.infoArchivoAdjunto.carpeta = this.archivoAdjuntadoEnServidor.carpeta
        this.infoArchivoAdjunto.subcarpeta = this.archivoAdjuntadoEnServidor.subcarpeta
        this.infoArchivoAdjunto.nombre_archivo = this.archivoAdjuntadoEnServidor.archivo
        this.infoArchivoAdjunto.estado = 1
        await axios
        .post(CONFIG.ROOT_PATH + 'presupuesto/gastos/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Gasto')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Archivo cargado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Gasto. Intente más tarde. ' + err)
        })
        this.verArchivosAdjuntos()
      },
      async verArchivosAdjuntos() {
        this.listaArchivosAdjuntos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'presupuesto/gastos/adjuntos', { params: { idGasto: this.infoGasto.id }})
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
      veArchivoAdjunto(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpeta + "/" + item.subcarpeta + "/" + item.nombre_archivo
        window.open(ruta, '_blank')
      },
      async eliminarArchivoAdjunto(item) {
        this.infoArchivoAdjunto.id = item.id
        await axios
        .put(CONFIG.ROOT_PATH + 'presupuesto/gastos/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
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
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      validarDatosGasto() {
        this.$v.infoGasto.$touch()
        if (this.$v.infoGasto.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoGasto.editarGasto ? 'Actualizar Datos del Gasto' : 'Crear Nuevo Gasto'
          let pregunta = this.infoGasto.editarGasto ? '¿Esta seguro de actualizar los datos del gasto?' : '¿Esta seguro de crear un nuevo gasto?'
          this.$bvModal.msgBoxConfirm(pregunta, {
            title: titulo,
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, ' + titulo,
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarGasto()
            }
          })
        }
        return true
      },
      async guardarGasto() {
        if (this.infoGasto.editarGasto) {
          if (this.infoGasto.estado == 1) {
            this.infoGasto.estado = 2
            this.infoGasto.observaciones = 'Gasto Enviado para Revisión'
            this.infoGasto.usuario = this.$store.state.nombreUsuario + " " + this.$store.state.apellidoUsuario
          } else {
            this.infoGasto.estado = 3
            this.infoGasto.observaciones = 'Gasto Corregido y Enviado para Revisión'
            this.infoGasto.usuario = this.$store.state.nombreUsuario + " " + this.$store.state.apellidoUsuario
          }
          await axios
          .put(CONFIG.ROOT_PATH + 'presupuesto/gastos', JSON.stringify(this.infoGasto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Gasto')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Gasto. Intente más tarde. ' + err)
          })
        } else {
          this.infoGasto.id = uuid.v1()
          this.infoGasto.observaciones = 'Gasto Creado'
          this.infoGasto.usuario = this.$store.state.nombreUsuario + " " + this.$store.state.apellidoUsuario
          await axios
          .post(CONFIG.ROOT_PATH + 'presupuesto/gastos', JSON.stringify(this.infoGasto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Gasto')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Gasto. Intente más tarde. ' + err)
          })
        }
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoGasto[name]
        return $dirty ? !$error : null
      },
      async ocuparComboConceptos() {
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaconceptos', { params: { idDestino: this.infoGasto.id_destino }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Conceptos')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboConceptos.push({ 'value': element.id, 'text': element.nemo })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Conceptos. Intente más tarde. ' + err)
        })
      },
      async ocuparComboFuentes() {
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listafuentesgastos')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Fuentes')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboFuentes.push({ 'value': element.id, 'text': element.codigo + ' - ' + element.fuente })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Fuentes. Intente más tarde. ' + err)
        })
      },
      validateStateA(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjunto[name]
        return $dirty ? !$error : null
      },
      soloDecimales(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 110) || (key == 190))) {
            e.preventDefault()
        }
      },
      async consultaGasto() {
        this.infoGasto.id = this.datosGasto.id
        this.infoGasto.objeto = this.datosGasto.objeto
        this.infoGasto.id_concepto = this.datosGasto.id_concepto
        this.infoGasto.id_fuente = this.datosGasto.id_fuente
        this.infoGasto.id_institucion = this.datosGasto.id_institucion
        this.infoGasto.id_destino = this.datosGasto.id_destino
        this.infoGasto.valor = this.datosGasto.valor
        this.infoGasto.id_documento = this.datosGasto.id_documento
        this.infoGasto.num_egreso = this.datosGasto.num_egreso
        this.infoGasto.fecha_egreso = this.datosGasto.fecha_egreso
        this.infoGasto.vigencia = this.datosGasto.vigencia
        this.infoGasto.estado = this.datosGasto.estado
        this.infoGasto.observaciones = this.datosGasto.observaciones
        this.infoGasto.urlGasto = this.datosGasto.urlGasto
        this.infoGasto.editarGasto = this.datosGasto.editarGasto
        this.verArchivosAdjuntos()
      },
      iniciarVista() {
        if(this.$store.state.colpresupuesto == 1) {
          this.consultaGasto()
          this.ocuparComboConceptos()
          this.ocuparComboFuentes()
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
