<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="file-earmark-person-fill" aria-hidden="true"></b-icon> PREINSCRIPCIONES</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12">
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2">
              <b-form-group label="Vigencia*" label-for="vigencia" style="font-weight: bold; font-size: 16">
                <b-form-select  id="vigencia" ref="vigencia" v-model="aSeleccionado" :options="comboAnios" @change="listarPreinscritos()"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col lg="12" v-if="aSeleccionado!=null">
        <b-card>
          <div class="float-right">
            <b-button class="mx-2" size="sm" variant="info" title="Descargar Excel">
              <vue-excel-xlsx style="border: none; padding: 0px; background: none; color: white" :data="listaPreinscritos" :columns="encabColumnas" :file-name="'InformePreinscritos'" :file-type="'xlsx'" :sheet-name="'Preinscritos'">
                <b-icon icon="file-earmark-excel"></b-icon>
              </vue-excel-xlsx>
            </b-button>
            <!--
            <CLink href="#" class="card-header-action btn-setting mx-2" title="Exportar Excel">
              <vue-excel-xlsx :data="listaPreinscritos" :columns="encabColumnas" :file-name="'InformePreinscritos'" :file-type="'xlsx'" :sheet-name="'Preinscritos'">
                Exportar a Excel
              </vue-excel-xlsx>
            </CLink>
            -->
          </div>
          <div class="float-right">
             <b-button class="mx-2" size="sm" variant="info" @click="verPreInscritos(),verPreInscritosD()" title="Actualizar Lista"><b-icon icon="arrow-repeat"></b-icon></b-button>
          </div>
          <div class="float-right">
            <b-button class="mx-2" size="sm" variant="info" @click="verAyuda" title="Ayuda"><b-icon icon="question"></b-icon></b-button>
          </div>
          <h3 class="ml-2"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> LISTA DE PREINSCRITOS</h3>
          <b-col lg="12">
            <b-alert v-model="verAlertaDevueltas" variant="danger" dismissible>Actualmente existen <strong> {{ listaPreinscritosD.length }} </strong> preinscripciones Devueltas. Por favor dar respuesta en el menor tiempo posible.</b-alert>
          </b-col>
          <b-col lg="12">
            <b-alert v-model="verAlertaVencidas" variant="danger" dismissible>Preinscripciones Aceptadas por IE: {{aceptadasIE}} - Vencidas: {{vencidasIE}}</b-alert>
          </b-col>
          <b-col lg="12">
            <div>
              <b-card no-body>
                <b-tabs active-nav-item-class="font-weight-bold text-uppercase text-success">
                  <b-tab title="Preinscripciones en Proceso" active>
                    <b-card-text>
                      <vue-good-table :columns="encabColumnas" :rows="listaPreinscritos" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                        :search-options="{enabled: true,placeholder: 'Buscar...'}">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'estudiante'">
                            <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultarPreinscrito(props.row)">{{props.row.estudiante}}</span> 
                          </span>
                          <span v-if="props.column.field == 'documento'">
                            <span>{{props.row.estado==6 ? props.row.documento_anulado : props.row.documento}}</span>
                          </span>
                          <span v-if="props.column.field == 'fecha_nacimiento'">
                            <span>{{ new Date(props.row.fecha_nacimiento).toLocaleDateString()}} <!--a las {{ new Date(props.row.creado).toLocaleTimeString()}}--> </span>
                          </span>
                          <span v-if="props.column.field == 'telefono1'">
                            <span>{{props.row.telefono1}}</span>
                          </span>
                          <span v-if="props.column.field == 'poblacion'">
                            <span>{{props.row.poblacion}}</span>
                          </span>
                          <span v-if="props.column.field == 'grado'">
                            <span>{{props.row.grado}}</span>
                          </span>
                          <span v-if="props.column.field == 'descEstado'">
                            <span>{{props.row.descEstado}}</span>
                          </span>
                          <span v-if="props.column.field == 'actualizado'">
                            <span>{{ new Date(props.row.actualizado).toLocaleDateString()}} <!--a las {{ new Date(props.row.actualizado).toLocaleTimeString()}}--> </span>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen estudiantes preinscritos</h5>
                        </div>
                      </vue-good-table>
                    </b-card-text>
                  </b-tab>
                  <b-tab title="Preinscripciones Devueltas">
                    <b-card-text>
                      <vue-good-table :columns="encabColumnas" :rows="listaPreinscritosD" styleClass="vgt-table condensed bordered striped" :line-numbers="true"
                        :search-options="{enabled: true,placeholder: 'Buscar...'}">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'estudiante'">
                            <span style="font-weight: bold; color: blue; cursor: pointer" @click="consultarPreinscrito(props.row)">{{props.row.estudiante}}</span> 
                          </span>
                          <span v-if="props.column.field == 'documento'">
                            <span>{{props.row.estado==6 ? props.row.documento_anulado : props.row.documento}}</span>
                          </span>
                          <span v-if="props.column.field == 'fecha_nacimiento'">
                            <span>{{ new Date(props.row.fecha_nacimiento).toLocaleDateString()}} <!--a las {{ new Date(props.row.creado).toLocaleTimeString()}}--> </span>
                          </span>
                          <span v-if="props.column.field == 'telefono1'">
                            <span>{{props.row.telefono1}}</span>
                          </span>
                          <span v-if="props.column.field == 'poblacion'">
                            <span>{{props.row.poblacion}}</span>
                          </span>
                          <span v-if="props.column.field == 'grado'">
                            <span>{{props.row.grado}}</span>
                          </span>
                          <span v-if="props.column.field == 'descEstado'">
                            <span>{{props.row.descEstado}}</span>
                          </span>
                          <span v-if="props.column.field == 'actualizado'">
                            <span>{{ new Date(props.row.actualizado).toLocaleDateString()}} <!--a las {{ new Date(props.row.actualizado).toLocaleTimeString()}}--> </span>
                          </span>
                        </template>
                        <div slot="emptystate">
                          <h5 class="text-danger ml-5">No existen preinscripciones devueltas.</h5>
                        </div>
                      </vue-good-table>
                    </b-card-text>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </b-col>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalConsultaPreinscrito" size="lg" scrollable hide-footer title="Consulta Preinscrito" ok-only>
      <b-row class="mb-4">
        <b-col lg="12">
          <h3>Información del Estudiante</h3>
          <b-table-simple hover>
            <b-tbody>
              <b-tr><b-td>Apellidos y Nombres:</b-td><b-td>{{datosPreinscrito.estudiante}}</b-td></b-tr>
              <b-tr><b-td>Documento de Identidad:</b-td><b-td>{{datosPreinscrito.nemo}} # {{datosPreinscrito.documento}}</b-td></b-tr>
              <b-tr><b-td>Fecha de Nacimiento:</b-td><b-td>{{datosPreinscrito.fecha_nacimiento!=null ? datosPreinscrito.fecha_nacimiento.substr(0,10):''}}</b-td></b-tr>
              <b-tr><b-td>Nacionalidad:</b-td><b-td>{{datosPreinscrito.pais}}</b-td></b-tr>
              <b-tr><b-td>Género:</b-td><b-td>{{datosPreinscrito.genero}}</b-td></b-tr>
              <b-tr><b-td>SubGrupo Sisben:</b-td><b-td>{{datosPreinscrito.subgrupo}}</b-td></b-tr>
              <b-tr><b-td>Discapacidad:</b-td><b-td>{{datosPreinscrito.discapacidad}}</b-td></b-tr>
              <b-tr><b-td>Dirección Residencia:</b-td><b-td>{{datosPreinscrito.direccion}}</b-td></b-tr>
              <b-tr><b-td>Zona:</b-td><b-td>{{datosPreinscrito.zona}}</b-td></b-tr>
              <b-tr><b-td>Muncipio:</b-td><b-td>{{datosPreinscrito.municipio}}</b-td></b-tr>
              <b-tr><b-td>Fecha Registro:</b-td><b-td>{{ new Date(datosPreinscrito.creado).toLocaleDateString()}} a las {{ new Date(datosPreinscrito.creado).toLocaleTimeString()}}</b-td></b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
        <b-col lg="12">
          <h3>Información del Solicitante</h3>
          <b-table-simple hover>
            <b-tbody>
              <b-tr><b-td>Solicitante:</b-td><b-td>{{datosPreinscrito.solicitante}}</b-td></b-tr>
              <b-tr><b-td>Nombre Solicitante:</b-td><b-td>{{datosPreinscrito.solicitanteA}}</b-td></b-tr>
              <b-tr v-if="datosPreinscrito.id_solicitante>1"><b-td>Cargo:</b-td><b-td>{{datosPreinscrito.cargo}}</b-td></b-tr>
              <b-tr v-if="datosPreinscrito.id_solicitante==1"><b-td>Parentesco:</b-td><b-td>{{datosPreinscrito.parentesco}}</b-td></b-tr>
              <b-tr><b-td>Teléfonos Contacto:</b-td><b-td>{{datosPreinscrito.telefono1}}, {{datosPreinscrito.telefono2}}</b-td></b-tr>
              <b-tr><b-td>Correo Electrónico:</b-td><b-td>{{datosPreinscrito.correo}}</b-td></b-tr>
              <b-tr><b-td>Fecha Registro:</b-td><b-td>{{ new Date(datosPreinscrito.creado).toLocaleDateString()}} a las {{ new Date(datosPreinscrito.creado).toLocaleTimeString()}}</b-td></b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
        <b-col lg="12">
          <h3>Estado de la Preinscripción</h3>
          <b-alert :variant="datosPreinscrito.variante" show class="text-center"><strong>{{datosPreinscrito.descEstado}}</strong></b-alert>
        </b-col>
        <b-col lg="12"><hr></b-col>
        <b-col lg="12">
          <b-button class="mx-2" variant="primary" @click="aceptarPreinscrito" v-if="datosPreinscrito.estado==1 || datosPreinscrito.estado==2">Aceptar Preinscripción</b-button>
          <b-button class="mx-2" variant="success" @click="matricularPreinscrito" v-if="datosPreinscrito.estado==3">Matricular Preinscrito</b-button>
          <b-button class="mx-2" variant="danger" @click="observacionesRechazarPreinscrito" v-if="datosPreinscrito.estado==3 || datosPreinscrito.estado==2">Rechazar Preinscripción</b-button>
          <b-button class="mx-2" variant="light" @click="verTrazabilidad">Ver Trazabilidad</b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal ref="modalTrazabilidad" size="xl" scrollable hide-footer title="Trazabilidad" ok-only>
      <b-row class="mb-4">
        <b-col lg="12">
          <b-table-simple hover>
            <b-thead>
              <b-th style="background: #53606d; color: white;">Estado</b-th>
              <b-th style="background: #53606d; color: white;">Fecha</b-th>
              <b-th style="background: #53606d; color: white;">Realizó</b-th>
              <b-th style="background: #53606d; color: white;">Observaciones</b-th>
              <b-th style="background: #53606d; color: white;">Justificación</b-th>
            </b-thead>
            <b-tbody>
              <b-tr v-for="item in listaTrazabilidad" :key="item.id">
                <b-td>{{item.descEstado}}</b-td>
                <b-td>{{new Date(item.creado).toLocaleDateString()}}</b-td>
                <b-td>{{item.usuario}}</b-td>
                <b-td>{{item.observaciones}}</b-td>
                <b-td>{{item.justificacion}}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal ref="modalObservacionesRechazarPreinscrito" size="lg" scrollable hide-footer title="Rechazar Preinscripción" ok-only>
      <div class="mx-3">
        <div>
          <b-row>
            <b-col lg="12" md="12">
              <b-form-group label="Motivo del Rechazo*" label-for="observaciones">
                <b-form-textarea v-model.trim="$v.rechazo.observacionesRechazo.$model" :state="validateState('observacionesRechazo')" aria-describedby="feedObservR" autocomplete="off" rows="5"></b-form-textarea>
                <b-form-invalid-feedback id="feedObservR">Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12" md="12">
              <b-form-group label="Justificación*" label-for="justifica">
                <b-form-textarea v-model.trim="$v.rechazo.justificaRechazo.$model" :state="validateState('justificaRechazo')" aria-describedby="feedJustifica" autocomplete="off" rows="5"></b-form-textarea>
                <b-form-invalid-feedback id="feedJustifica">Campo requerido.</b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col lg="12" md="12"><hr></b-col>
            <b-col lg="12" md="12">
              <div class="float-right small text-medium-emphasis">* Campo requerido</div>
              <b-button class="small mt-1 mr-3" variant="danger" @click="rechazarPreinscripcion">Rechazar Preinscripción</b-button>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-modal>
    <b-modal ref="modalAyuda" size="" scrollable hide-footer title="Ayuda" ok-only>
      <b-row class="mb-4">
        <b-col lg="12">
          <b-alert variant="info" show>
            <h5><strong>Estados de las Preinscripciones</strong></h5>
            <p>Identifique el estado en que se encuentran las preinscripciones que han sido remitidas a la IE, de acuerdo al color señalado:</p>
            <p><b-avatar size="sm" variant="secondary" text="-"></b-avatar> La preinscripción está sin Aceptar por la IE</p>
            <p>El primer paso es que la institución acepte la preinscripción. Una vez aceptada la preinscripción, el solicitante es notificado mediante correo electrónico e inicia un 
              periodo de 5 días hábiles para que el solicitante junto con el estudiante se presenten en la IE.</p>
            <p>El segundo paso es que la IE debe informar a la SET sobre la situación de la preinscripción. Para ello la IE dispone de 5 días hábiles una vez aceptada la preinscripción.</p>
            <p><b-avatar size="sm" variant="success" text="-"></b-avatar> Aún dispone de 3 a 5 días hábiles para reponder</p>
            <p><b-avatar size="sm" variant="warning" text="-"></b-avatar> Le quedan 1 o 2 días hábiles para responder</p>
            <p><b-avatar size="sm" variant="danger" text="-"></b-avatar> La fecha para responder ha vencido</p>
            <p>La IE asignará el cupo al solicitante seleccionando la opción <span class="text-success">Matriculada</span>.</p>
            <p>Por otra parte, la IE podrá rechazar la preinscripción y liberará el cupo. La SET validará el rechazo de la preinscripción sólo si la IE detalla el motivo y justifica el rechazo.</p>
          </b-alert>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import { validationMixin } from "vuelidate"
  import { required } from "vuelidate/lib/validators"

  export default {
    name: 'ListaPreinscritos',
    mixins: [validationMixin],
    components: {
      VueGoodTable
    },
    data () {
      return {
        idPeriodo: null,
        listaColegiosCupos: [],
        listaPreinscritos: [],
        listaPreinscritosD: [],
        encabColumnas : [
          { label: 'Nombre del Estudiante', field: 'estudiante' },
          { label: 'Documento', field: 'documento', sortable: false },
          { label: 'F_Nace', field: 'fecha_nacimiento', formatFn: this.formatFnF, sortable: false },
          { label: 'Teléfono', field: 'telefono1', sortable: false },
          { label: 'Población', field: 'poblacion', sortable: false },
          /*
          { label: 'Gen', field: 'nemo', sortable: false },
          { label: 'Nación', field: 'pais', sortable: false },
          { label: 'Solicita', field: 'solicitante', sortable: false },
          */
          { label: 'Grado', field: 'grado', tdClass: this.tdClassFuncG, sortable: false },
          { label: 'Estado', field: 'descEstado', sortable: false, tdClass: this.tdClassFuncE },
          { label: 'F_Estado', field: 'actualizado', sortable: false }
        ],
        datosPreinscrito: {},
        listaTrazabilidad: [],
        rechazo: {
          observacionesRechazo: null,
          justificaRechazo: null
        },
        datosTazabilidad: {
          id: null,
          id_preinscrito: null,
          estado: null,
          observaciones: null,
          justificacion: null,
          usuario: null
        },
        festivos: [[1, 7, 8],[27, 28],[1],[6, 9],[1],[15],[9],[17, 18, 19],[10],[16],[6,13],[8,25]],
        diasPactados: 5,
        verAlertaVencidas: false,
        verAlertaDevueltas: false,
        vencidasIE: 0,
        aceptadasIE: 0,
        aSeleccionado: null,
        comboAnios: [],
      }
    },
    validations: {
      rechazo: {
        observacionesRechazo: { required },
        justificaRechazo: { required }
      }
    },
    methods: {
      verAyuda() {
        this.$refs['modalAyuda'].show()
      },
      aceptarPreinscrito() {
        this.$bvModal.msgBoxConfirm('Está seguro de aceptar la preinscripción?', {
          title: 'Aceptar Preinscripción',
          size: '',
          buttonSize: '',
          okVariant: 'success',
          okTitle: 'Si, Aceptar Preinscripción',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.datosTazabilidad.id_preinscrito = this.datosPreinscrito.id
            this.datosTazabilidad.estado = 3
            this.datosTazabilidad.observaciones = 'Preinscripción Aceptada por la IE ' + this.$store.state.nemoInstitucion
            this.datosTazabilidad.usuario = this.$store.state.apellidoUsuario + " " + this.$store.state.nombreUsuario
            axios
            .post(CONFIG.ROOT_PATH + 'matriculas/preinscritos/trazabilidad', JSON.stringify(this.datosTazabilidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Aceptar Trazabilidad')
              } else {
                this.$refs['modalConsultaPreinscrito'].hide()
                this.enviarCorreoAceptar()
                this.verPreInscritos()
                this.verPreInscritosD()
                this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La preinscripción ha sido aceptada correctamente.')
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Aceptar Trazabilidad. Intente más tarde. ' + err)
            })
          }
        })
      },
      async enviarCorreoAceptar() {
        let datosCorreo = {}
        datosCorreo.colegio = this.$store.state.nombreInstitucion
        datosCorreo.grado = this.datosPreinscrito.grado
        datosCorreo.estudiante = this.datosPreinscrito.estudiante
        datosCorreo.documento = this.datosPreinscrito.nemo + ': ' + this.datosPreinscrito.documento
        datosCorreo.correo = this.datosPreinscrito.correo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/aceptadaIE', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Correo Preinscripción aceptada por IE')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Correo Preinscripción aceptada por IE. Intente más tarde. ' + err)
        })
      },
      async enviarCorreoMatricula() {
        let datosCorreo = {}
        datosCorreo.colegio = this.$store.state.nombreInstitucion
        datosCorreo.grado = this.datosPreinscrito.grado
        datosCorreo.estudiante = this.datosPreinscrito.estudiante
        datosCorreo.documento = this.datosPreinscrito.nemo + ': ' + this.datosPreinscrito.documento
        datosCorreo.correo = this.datosPreinscrito.correo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/matriculaIE', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Correo Preinscripción Matriculada por IE')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Correo Preinscripción Matriculada por IE. Intente más tarde. ' + err)
        })
      },
      matricularPreinscrito() {
        this.$bvModal.msgBoxConfirm('Está seguro de matricular al estudiante?', {
          title: 'Matricular Estudiante',
          size: '',
          buttonSize: '',
          okVariant: 'success',
          okTitle: 'Si, Matricular Estudiante',
          cancelTitle: 'Cancelar',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.datosTazabilidad.id_preinscrito = this.datosPreinscrito.id
            this.datosTazabilidad.estado = 5
            this.datosTazabilidad.observaciones = 'Matricula de Estudiante en ' + this.$store.state.nemoInstitucion
            this.datosTazabilidad.justificación = null
            this.datosTazabilidad.usuario = this.$store.state.apellidoUsuario + " " + this.$store.state.nombreUsuario
            axios
            .post(CONFIG.ROOT_PATH + 'matriculas/preinscritos/trazabilidad', JSON.stringify(this.datosTazabilidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
            .then(response => {
              if (response.data.error){
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Aceptar Trazabilidad')
              } else {
                this.$refs['modalConsultaPreinscrito'].hide()
                this.enviarCorreoMatricula()
                this.verPreInscritos()
                this.verPreInscritosD()
                this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Se ha registrado la matricula correctamente.')
              }
            })
            .catch(err => {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Aceptar Trazabilidad. Intente más tarde. ' + err)
            })
          }
        })
      },
      rechazarPreinscripcion() {
        if (this.datosPreinscrito.id_grado == -1) {
          this.datosPreinscrito.id_grado = 12
        }
        this.$v.rechazo.$touch()
        if (this.$v.rechazo.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('Está seguro de rechazar la Preinscripción?', {
            title: 'Rechazar Preinscripción',
            size: '',
            buttonSize: '',
            okVariant: 'success',
            okTitle: 'Si, Rechazar Preinscripción',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              axios
              .get(CONFIG.ROOT_PATH + 'colegios/cupos/grado/liberar', { params: { idPeriodo: this.idPeriodo, idColegio: this.$store.state.idInstitucion, idGrado: this.datosPreinscrito.id_grado }})
              .then(response => {
                if (response.data.error){
                  this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Liberar cupo en Grado')
                } else {
                  if (response.data.datos != 0) {
                    this.datosTazabilidad.id_preinscrito = this.datosPreinscrito.id
                    this.datosTazabilidad.estado = 4
                    this.datosTazabilidad.observaciones = 'Preinscripción rechazada por ' + this.$store.state.nemoInstitucion + '. - ' + this.rechazo.observacionesRechazo
                    this.datosTazabilidad.justificacion = this.rechazo.justificaRechazo
                    this.datosTazabilidad.usuario = this.$store.state.apellidoUsuario + " " + this.$store.state.nombreUsuario
                    axios
                    .post(CONFIG.ROOT_PATH + 'matriculas/preinscritos/trazabilidad', JSON.stringify(this.datosTazabilidad), { headers: {"Content-Type": "application/json; charset=utf-8" }})
                    .then(response => {
                      if (response.data.error){
                        this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Rechazar Trazabilidad')
                      } else {
                        this.$refs['modalObservacionesRechazarPreinscrito'].hide()
                        this.$refs['modalConsultaPreinscrito'].hide()
                        if (this.datosPreinscrito.estado != 2) {
                          this.enviarCorreoRechazar()
                        }
                        this.verPreInscritos()
                        this.verPreInscritosD()
                        this.mensajeEmergente('success',CONFIG.TITULO_MSG,'La preinscripción ha sido rechazada correctamente.')
                      }
                    })
                    .catch(err => {
                      this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Rechazar Trazabilidad. Intente más tarde. ' + err)
                    })
                  } else {
                    alert("No se encontraron registros para liberar el cupo.!")
                    return false
                  }
                } 
              })
              .catch(err => {
                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta Libear cupo en Grado. Intente más tarde.' + err)
              })
            }
          })
        }
      },
      async enviarCorreoRechazar() {
        let datosCorreo = {}
        datosCorreo.colegio = this.$store.state.nombreInstitucion
        datosCorreo.grado = this.datosPreinscrito.grado
        datosCorreo.estudiante = this.datosPreinscrito.estudiante
        datosCorreo.documento = this.datosPreinscrito.nemo + ': ' + this.datosPreinscrito.documento
        datosCorreo.correo = this.datosPreinscrito.correo
        datosCorreo.observaciones = this.rechazo.observacionesRechazo
        datosCorreo.justificacion = this.rechazo.justificaRechazo
        await axios
        .post(CONFIG.ROOT_PATH + 'correos/rechazadaIE', JSON.stringify(datosCorreo), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Correo Preinscripción rechazada por IE')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Correo Preinscripción rechazada por IE. Intente más tarde. ' + err)
        })
      },
      observacionesRechazarPreinscrito() {
        this.$refs['modalObservacionesRechazarPreinscrito'].show()
      },
      async verTrazabilidad() {
        this.$refs['modalTrazabilidad'].show()
      },
      async consultarTrazabilidad() {
        this.listaTrazabilidad = []
        await axios
        .get(CONFIG.ROOT_PATH + 'matriculas/preinscritos/trazabilidad', { params: { idPreinscrito: this.datosPreinscrito.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Trazabilidad Preinscrito')
          } else{
            this.listaTrazabilidad = response.data.datos
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Trazabilidad Preinscrito. Intente más tarde.' + err)
        })
      },
      async consultarPreinscrito(fila) {
        this.datosPreinscrito = {}
        this.idPeriodo = fila.id_periodo_preinscripciones
              console.log(JSON.stringify(fila))
        await axios
        .get(CONFIG.ROOT_PATH + 'matriculas/preinscrito', { params: { id: fila.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Preinscrito de un Colegio')
          } else{
            if (response.data.datos != 0) {
              this.datosPreinscrito = response.data.datos
              if (this.datosPreinscrito.estado == 1) {
                this.datosPreinscrito.variante = 'secondary'
              } else if (this.datosPreinscrito.estado == 2) {
                this.datosPreinscrito.variante = 'info'
              } else if (this.datosPreinscrito.estado == 3) {
                this.datosPreinscrito.variante = 'primary'
              } else if (this.datosPreinscrito.estado == 4) {
                this.datosPreinscrito.variante = 'warning'
              } else if (this.datosPreinscrito.estado == 5) {
                this.datosPreinscrito.variante = 'success'
              } else {
                this.datosPreinscrito.variante = 'danger'
              }
              this.consultarTrazabilidad()
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Preinscrito de un Colegio. Intente más tarde.' + err)
        })
        this.$refs['modalConsultaPreinscrito'].show()
      },
      calcularFechaSemaforo(fechaAceptada, diasPactados, festivos) {
        let i = 1
        let diaPropuesto = null
        while (diasPactados > 0 ) {
          let festivo = false
          diaPropuesto = new Date(fechaAceptada.getFullYear(), fechaAceptada.getMonth(), fechaAceptada.getDate() + i);
          if (diaPropuesto.getDay() > 0 && diaPropuesto.getDay() < 6) {
            let m = diaPropuesto.getMonth()
            let dia = diaPropuesto.getDate()
            for (let d in festivos[m]) {
              if (dia === festivos[m][d]) {
                festivo = true
                break
              }
            }
            if (!festivo) {
              diasPactados--
            }
          }
          i++
        }
        return diaPropuesto
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.rechazo[name]
        return $dirty ? !$error : null
      },
      tdClassFuncG(row) {
        return 'font-weight-bold text-left' 
      },
      formatFnF: function(value) {
        if (value != null && value != '') {
          return value.substr(0,10)
        }
        return '-'
      },
      tdClassFuncE(row) {
        if (row.estado == 1) { 
          return 'text-black text-center bg-secondary' 
        } else if (row.estado == 2) { 
          return 'text-info text-left' 
        } else if (row.estado == 3) {
          return 'text-white text-center ' + row.variant
        } else if (row.estado == 4) { 
          return 'text-danger text-center' 
        } else if (row.estado == 5) { 
          return 'text-success text-center' 
        } else { 
          return 'text-danger text-center' 
        }
      },
      async verPreInscritos() {
        this.listaPreinscritos = []
        this.vencidasIE = this.aceptadasIE = 0
        this.verAlertaVencidas = false
        await axios
        .get(CONFIG.ROOT_PATH + 'matriculas/listapreinscritos/institucion', { params: { idColegio: this.$store.state.idInstitucion, vigencia: this.aSeleccionado }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Preinscritos de un Colegio')
          } else{
            if (response.data.datos != 0) {
              this.listaPreinscritos = response.data.datos
              this.listaPreinscritos.forEach(element => {
                element.variant = 'bg-danger'
                if (element.estado == 3) {
                  if (element.fechaAceptada != null) {
                    let fechaAceptada = new Date(element.fechaAceptada)
                    let fechaFinalSemaforo = this.calcularFechaSemaforo(fechaAceptada, this.diasPactados, this.festivos)
                    let valorSemaforo = Date.now() - (fechaFinalSemaforo.getTime() + 86400000)
                    if (valorSemaforo < -172800000) {
                      element.variant = 'bg-success'
                    } else if (valorSemaforo >= -172800000 && valorSemaforo < 0) {
                      element.variant = 'bg-warning'
                    } else {
                      element.variant = 'bg-danger'
                      this.verAlertaVencidas = true
                      this.vencidasIE++
                    }
                  }
                  this.aceptadasIE++
                }
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Preinscritos de un Colegio. Intente más tarde.' + err)
        })
      },
      async verPreInscritosD() {
        this.listaPreinscritosD = []
        this.verAlertaDevueltas = false
        await axios
        .get(CONFIG.ROOT_PATH + 'matriculas/listapreinscritosD/institucion', { params: { idColegio: this.$store.state.idInstitucion, vigencia: this.aSeleccionado }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Preinscritos Devueltos de un Colegio')
          } else{
            if (response.data.datos != 0) {
              this.listaPreinscritosD = response.data.datos
              this.verAlertaDevueltas = true
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Preinscritos Devueltos de un Colegio. Intente más tarde.' + err)
        })
      },
      listarPreinscritos() {
        this.verPreInscritos()
        this.verPreInscritosD()
      },
      iniciarVista() {
        if(this.$store.state.colcobertura == 1) {
          for (var i = this.$store.state.aLectivoAdmon + 1; i >= this.$store.state.aIniCuatrienio; i--) {
            this.comboAnios.push({ 'value': i, 'text': i })
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