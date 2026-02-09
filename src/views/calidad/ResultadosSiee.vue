<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="encabezadoVista">
            <b-row>
                <b-col lg="12" class="mt-2 text-center">
                <h5>RESULTADO DE LA REVISIÓN DEL ESTADO DE DESARROLLO DE LOS ELEMENTOS CONSTITUTIVOS<br>DEL SISTEMA INSTITUCIONAL DE EVALUACIÓN DE ESTUDIANTES - SIEE</h5>
                </b-col>
            </b-row>
        </b-card>
      </b-col>
    </b-row>
    <div v-if="!formularioHabilitado">
        <b-row>
            <b-col lg="12">
                <b-card>
                    <template #header>
                        <h5 class="mb-0">ESTADO DE DESARROLLO DE LOS ELEMENTOS CONSTITUTIVOS DEL SIEE</h5>
                    </template>
                    <b-card-text>
                        <h2 class="text-danger">{{ mensajeFormulario }}</h2>
                        <h5 class="text-muted">Por favor diríjase al Instrumento SIEE, diligencie completamente el instrumento y guardelo haciendo clic en el botón "Guardar Instrumento SIEE".</h5>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </div>
    <div v-else>
        <b-row>
            <b-col lg="12">
                <b-card>
                    <template #header>
                        <h5 class="mb-0">ESTADO DE DESARROLLO DE LOS ELEMENTOS CONSTITUTIVOS DEL SIEE</h5>
                    </template>
                    <b-card-text>
                        <h5 class="text-muted">A continuación, apreciará el orden de priorización y el estado de los elementos constitutivos del SIEE para que se inicie el plan de fortalecimiento o mejoramiento al Sistema Institucional de Evaluación de Estudiantes.</h5>
                        <b-row>
                            <b-col lg="12">
                                <vue-good-table :columns="encabColumnasResultados" :rows="listaResultados" styleClass="vgt-table condensed bordered striped" :line-numbers="false">
                                    <div slot="emptystate">
                                        <h5 class="text-danger ml-5">No existen registros</h5>
                                    </div>
                                </vue-good-table>
                            </b-col>
                        </b-row>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="12">
                <b-card>
                    <template #header>
                        <h5 class="mb-0">DOCUMENTOS ADJUNTOS AL INSTRUMENTO SIEE</h5>
                    </template>
                    <b-card-text>
                        <b-row>
                            <b-col lg="12" class="mt-2">
                                <div class="card-header-actions" v-if="enviarHabilitado">
                                <CLink href="#" class="card-header-action btn-setting mr-2 text-info" @click="adjuntarDocumento" title="Adjuntar Archivo">
                                    <CIcon name="cilFile"/>
                                </CLink>
                                </div>
                                <p class="mb-1">Documentos:</p>
                                <vue-good-table :columns="encabColumnasAdjuntos" :rows="listaArchivosAdjuntos" styleClass="vgt-table condensed bordered striped" :line-numbers="true">
                                    <template slot="table-row" slot-scope="props">
                                        <span v-if="props.column.field == 'id'">
                                        <span style="font-weight: bold; color: blue; cursor: pointer" @click="veArchivoAdjunto(props.row)" title="Ver archivo adjunto"><CIcon name="cilZoom"/></span>
                                        <span v-if="enviarHabilitado" class="mx-3 text-light">|</span>
                                        <span v-if="enviarHabilitado" style="font-weight: bold; color: red; cursor: pointer" @click="eliminarArchivoAdjunto(props.row)" title="Eliminar archivo adjunto"><CIcon name="cilXCircle"/></span>
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
        <b-row v-if="enviarHabilitado">
            <b-col lg="12">
                <b-card>
                    <template #header>
                        <h5 class="mb-0">ENVIAR INSTRUMENTO SIEE A LA SECETARÍA DE EDUCACIÓN TERRITORIAL</h5>
                    </template>
                    <b-card-text>
                        <h5 class="text-muted">Antes de enviar el instrumento SIEE a la Secretaría de Educación Territorial, verifique que el documento esté diligenciado en su totalidad y que esté cargado el documento adjunto.</h5>
                        <b-row>
                        <b-col lg="12" class="mt-4">
                            <b-button variant="success" size="lg" block @click="validarEnviarSiee">Enviar Instrumento SIEE</b-button>
                        </b-col>
                        </b-row>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="12">
                <b-card>
                    <template #header>
                        <h5 class="mb-0">OBSERVACIONES DE LA SECETARÍA DE EDUCACIÓN TERRITORIAL</h5>
                    </template>
                    <b-card-text>
                        <h5 class="text-primary">{{ infoEvaluaciones.observaciones }}</h5>
                    </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </div>

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
    name: 'instrumentosiee',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        idEvaluacion: null,
        infoEvaluaciones: {
          id: null,
          id_periodo_siee: null,
          id_institucion: null,
          c2011: null,c2012: null,c2013: null,c2021: null,c2022: null,c2023: null,c2031: null,c2032: null,c2033: null,c2041: null,c2042: null,c2043: null,c2051: null,c2052: null,c2053: null,c2061: null,c2062: null,c2063: null,c2071: null,c2072: null,c2073: null,c2081: null,c2082: null,c2083: null,c2091: null,c2092: null,c2093: null,c2101: null,c2102: null,c2103: null,c2111: null,c2112: null,c2113: null,
          c3011: null,c3012: null,c3013: null,c3014: null,c3021: null,c3022: null,c3023: null,c3024: null,c3031: null,c3032: null,c3033: null,c3034: null,c3041: null,c3042: null,c3043: null,c3044: null,c3051: null,c3052: null,c3053: null,c3054: null,c3061: null,c3062: null,c3063: null,c3064: null,c3071: null,c3072: null,c3073: null,c3074: null,c3081: null,c3082: null,c3083: null,c3084: null,c3091: null,c3092: null,c3093: null,c3094: null,c3101: null,c3102: null,c3103: null,c3104: null,c3111: null,c3112: null,c3113: null,c3114: null,
          c4011: null,c4012: null,c4013: null,c4014: null,c4021: null,c4022: null,c4023: null,c4024: null,c4031: null,c4032: null,c4033: null,c4034: null,c4041: null,c4042: null,c4043: null,c4044: null,c4051: null,c4052: null,c4053: null,c4054: null,c4061: null,c4062: null,c4063: null,c4064: null,c4071: null,c4072: null,c4073: null,c4074: null,c4081: null,c4082: null,c4083: null,c4084: null,c4091: null,c4092: null,c4093: null,c4094: null,c4101: null,c4102: null,c4103: null,c4104: null,c4111: null,c4112: null,c4113: null,c4114: null,
        },
        listaResultados: [],
        formularioHabilitado: true,
        enviarHabilitado: false,
        mensajeFormulario: '-',
        btnHabilitado: null,
        encabColumnasAdjuntos: [
          { label: 'Descripción del Archivo', field: 'descripcion', sortable: false },
          { label: 'Archivo', field: 'nombre_archivo', sortable: false },
          { label: 'Fec_Cargue', field: 'creado', formatFn: this.formatFnF, sortable: false },
          { label: '', field: 'id', sortable: false }
        ],
        encabColumnasResultados: [
          { label: 'Priorización', field: 'priorizacion', sortable: false },
          { label: 'Elementos Constitutivos', field: 'elemento', sortable: false },
          { label: 'Estado', field: 'estado', sortable: false },
          { label: 'Observaciones', field: 'observaciones', sortable: false },
          { label: 'Intervención', field: 'intervencion', formatFn: this.formatFnI, sortable: false }
        ],
        listaArchivosAdjuntos: [],
        infoArchivoAdjunto: {
          id: null,
          id_evaluacion: null,
          descripcion: null,
          carpeta: null,
          subcarpeta: null,
          nombre_archivo: null,
          estado: null
        },
        nombreArchivo: null
      }
    },
    validations: {
      infoArchivoAdjunto: {
        descripcion: { required }
      }
    },
    methods: {
      validarEnviarSiee() {
        this.$bvModal.msgBoxConfirm('Está seguro de enviar el Instrumento SIEE a la Secretaría de Educación Territorial?', {
          title: 'Enviar SIEE',
          size: '',
          buttonSize: '',
          okVariant: 'success',
          okTitle: 'Si, Enviar SIEE',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.guardarEnviarSiee()
          }
        })
      },
      async guardarEnviarSiee() {
        let infoEstado = {'id': this.infoEvaluaciones.id, 'enviado': 1}
        await axios
        .put(CONFIG.ROOT_PATH + 'calidad/evaluaciones/enviarsiee', JSON.stringify(infoEstado), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Enviar Siee a SET')
          } else{
            this.cargarEvaluaciones()
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'El Instrumento SIEE se han enviado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Enviar Siee a SET. Intente más tarde. ' + err)
        })
      },
      async guardarAdjuntoSolicitud() {
        this.infoArchivoAdjunto.id = uuid.v1()
        this.infoArchivoAdjunto.id_evaluacion = this.infoEvaluaciones.id
        this.infoArchivoAdjunto.descripcion = this.infoArchivoAdjunto.descripcion
        this.infoArchivoAdjunto.carpeta = this.archivoAdjuntadoEnServidor.carpeta
        this.infoArchivoAdjunto.subcarpeta = this.archivoAdjuntadoEnServidor.subcarpeta
        this.infoArchivoAdjunto.nombre_archivo = this.archivoAdjuntadoEnServidor.archivo
        this.infoArchivoAdjunto.estado = 1
        await axios
        .post(CONFIG.ROOT_PATH + 'calidad/evaluaciones/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Guardar Adjunto Evaluaciones')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Archivo cargado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Guardar Adjunto Evaluaciones. Intente más tarde. ' + err)
        })
        this.verArchivosAdjuntos()
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
          .post('https://siedutunja.gov.co:3001/api/calidad/adjuntar/archivo', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
          .then(response => {
            if (response.data.error) {
              this.mensajeEmergente("danger",CONFIG.TITULO_MSG,response.data.mensaje + ' - Cargar Archivo Evaluaciones')
            } else {
              this.archivoAdjuntadoEnServidor = response.data.datos
              this.guardarAdjuntoSolicitud()
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta: +*Cargar Archivo Evaluaciones. Intente más tarde. ' + err)
          })
          this.$refs['modalAdjuntarDocumento'].hide()
        }
      },
      async eliminarArchivoAdjunto(item) {
        this.infoArchivoAdjunto.id = item.id
        await axios
        .put(CONFIG.ROOT_PATH + 'calidad/evaluaciones/adjuntos', JSON.stringify(this.infoArchivoAdjunto), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Eliminar Archivo Adjunto Evaluaciones')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Archivo eliminado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Eliminar Archivo Adjunto Evaluaciones. Intente más tarde. ' + err)
        })
        this.verArchivosAdjuntos()
      },
      async verArchivosAdjuntos() {
        this.listaArchivosAdjuntos = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/evaluaciones/adjuntos', { params: { idEvaluacion: this.infoEvaluaciones.id }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Archivos Adjuntos Evaluaciones')
          } else {
            if (response.data.datos != 0) {
              this.listaArchivosAdjuntos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Archivos Adjuntos Evaluaciones. Intente más tarde. ' + err)
        })
      },
      veArchivoAdjunto(item) {
        let ruta = CONFIG.ROOT_REPO + item.carpeta + "/" + item.subcarpeta + "/" + item.nombre_archivo
        window.open(ruta, '_blank')
      },
      adjuntarDocumento() {
        this.nombreArchivo = null
        this.btnHabilitado = true
        this.$refs['modalAdjuntarDocumento'].show()
      },
      validateStateA(name) {
        const { $dirty, $error } = this.$v.infoArchivoAdjunto[name]
        return $dirty ? !$error : null
      },
      async cargarEvaluaciones() {
        this.infoEvaluaciones = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/evaluaciones/institucion', { params: {idPeriodo: this.$store.state.idPeriodoSiee, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Evaluaciones Siee por IE')
          } else{
            if (response.data.datos != 0) {
              this.infoEvaluaciones = response.data.datos
              if (this.infoEvaluaciones.estado == 0) {
                this.mensajeFormulario = 'No se ha diligenciado el Instrumento SIEE'
                this.formularioHabilitado = false
              } else {
                this.listaResultados = [
                    { 'priorizacion': this.infoEvaluaciones.c4014, 'elemento': 'Los criterios de evaluación y promoción', 'estado': this.infoEvaluaciones.c4011, 'observaciones': this.infoEvaluaciones.c4012, 'intervencion': this.infoEvaluaciones.c4013 },
                    { 'priorizacion': this.infoEvaluaciones.c4024, 'elemento': 'La escala de valoración institucional y su respectiva equivalencia con la escala nacional', 'estado': this.infoEvaluaciones.c4021, 'observaciones': this.infoEvaluaciones.c4022, 'intervencion': this.infoEvaluaciones.c4023 },
                    { 'priorizacion': this.infoEvaluaciones.c4034, 'elemento': 'Las estrategias de valoración integral de los desempeños de los estudiantes', 'estado': this.infoEvaluaciones.c4031, 'observaciones': this.infoEvaluaciones.c4032, 'intervencion': this.infoEvaluaciones.c4033 },
                    { 'priorizacion': this.infoEvaluaciones.c4044, 'elemento': 'Las acciones de seguimiento para el mejoramiento de los desempeños de los estudiantes durante el año escolar', 'estado': this.infoEvaluaciones.c4041, 'observaciones': this.infoEvaluaciones.c4042, 'intervencion': this.infoEvaluaciones.c4043 },
                    { 'priorizacion': this.infoEvaluaciones.c4054, 'elemento': 'Los procesos de autoevaluación de los estudiantes', 'estado': this.infoEvaluaciones.c4051, 'observaciones': this.infoEvaluaciones.c4052, 'intervencion': this.infoEvaluaciones.c4053 },
                    { 'priorizacion': this.infoEvaluaciones.c4064, 'elemento': 'Las estrategias de apoyo necesarias para resolver situaciones pedagógicas pendientes de los estudiantes', 'estado': this.infoEvaluaciones.c4061, 'observaciones': this.infoEvaluaciones.c4062, 'intervencion': this.infoEvaluaciones.c4063 },
                    { 'priorizacion': this.infoEvaluaciones.c4074, 'elemento': 'Las acciones para garantizar que los directivos docentes y docentes del establecimiento educativo cumplan con los procesos evaluativos estipulados en el sistema institucional de evaluación', 'estado': this.infoEvaluaciones.c4071, 'observaciones': this.infoEvaluaciones.c4072, 'intervencion': this.infoEvaluaciones.c4073 },
                    { 'priorizacion': this.infoEvaluaciones.c4084, 'elemento': 'La periodicidad de entrega de informes a los padres de familia', 'estado': this.infoEvaluaciones.c4081, 'observaciones': this.infoEvaluaciones.c4082, 'intervencion': this.infoEvaluaciones.c4083 },
                    { 'priorizacion': this.infoEvaluaciones.c4094, 'elemento': 'La estructura de los informes de los estudiantes, para que sean claros, comprensibles y den información integral del avance en la formación', 'estado': this.infoEvaluaciones.c4091, 'observaciones': this.infoEvaluaciones.c4092, 'intervencion': this.infoEvaluaciones.c4093 },
                    { 'priorizacion': this.infoEvaluaciones.c4104, 'elemento': 'Las instancias, procedimientos y mecanismos de atención y resolución de reclamaciones de padres de familia y estudiantes sobre la evaluación y promoción', 'estado': this.infoEvaluaciones.c4101, 'observaciones': this.infoEvaluaciones.c4102, 'intervencion': this.infoEvaluaciones.c4103 },
                    { 'priorizacion': this.infoEvaluaciones.c4114, 'elemento': 'Los mecanismos de participación de la comunidad educativa en la construcción del sistema 	institucional de evaluación de los estudiantes', 'estado': this.infoEvaluaciones.c4111, 'observaciones': this.infoEvaluaciones.c4112, 'intervencion': this.infoEvaluaciones.c4113 }
                ]
                this.listaResultados.sort(function (a, b) {
                    if (a.priorizacion > b.priorizacion) {
                        return 1
                    }
                    if (a.priorizacion < b.priorizacion) {
                        return -1
                    }
                    return 0
                })
                this.verArchivosAdjuntos()
                this.formularioHabilitado = true
              }
            } else {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'No hay información del Instrumento Siee')
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Evaluaciones Siee por IE. Intente más tarde. ' + err)
        })
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      formatFnI: function(value) {
        if (value == 1) {
            return 'Inmediato'
        } else if (value == 2) {
            return 'A Corto Plazo'
        }else if (value == 3) {
            return 'A Largo Plazo'
        } else
            return '-'
      },
      iniciarVista() {
        if(this.$store.state.colsiee == 1) {
            this.cargarEvaluaciones()
            if (this.$store.state.vigenciaSiee) {
                this.enviarHabilitado = true
            } else {
                this.enviarHabilitado = false
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
