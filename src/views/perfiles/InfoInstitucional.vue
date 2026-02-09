<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="receipt" aria-hidden="true"></b-icon> INFORMACIÓN DE LA INSTITUCIÓN EDUCATIVA</h3>
      </b-col>
      <b-col>
        <b-card>
          <template #header>
            <h5 class="mb-0"><b>DATOS DE IDENTIFICACIÓN</b></h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="3" md="6">
                <b-form-group label="Código Dane*" label-for="dane">
                  <b-form-input id="dane" ref="dane" v-model="datosColegio.dane" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Número Nit*" label-for="nit">
                  <b-form-input id="nit" ref="nit" v-model="$v.datosColegio.nit.$model" :state="validateStateI('nit')" aria-describedby="feedNit" autocomplete="off" maxlength="15" @keydown="soloNit"></b-form-input>
                  <b-form-invalid-feedback id="feedNit">El número Nit debe contener mínimo 10 caracteres.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Sector*" label-for="sector">
                  <b-form-select  id="sector" ref="sector" v-model="$v.datosColegio.id_sector.$model" :options="comboSectores" :state="validateStateI('id_sector')" aria-describedby="feedSector"></b-form-select>
                  <b-form-invalid-feedback id="feedSector">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Zona*" label-for="zona">
                  <b-form-select  id="zona" ref="zona" v-model="$v.datosColegio.id_zona.$model" :options="comboZonas" :state="validateStateI('id_zona')" aria-describedby="feedZona"></b-form-select>
                  <b-form-invalid-feedback id="feedZona">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="12" md="12">
                <b-form-group label="Nombre de la Institución*" label-for="cole">
                  <b-form-input id="cole" ref="cole" v-model.trim="datosColegio.institucion" disabled></b-form-input>
                  <b-form-invalid-feedback id="feedNombre" >Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Nombre Corto*" label-for="nemo">
                  <b-form-input id="nemo" ref="nemo" v-model.trim="$v.datosColegio.nemo.$model" :state="validateStateI('nemo')" aria-describedby="feedNemo" autocomplete="off" maxlength="30"></b-form-input>
                  <b-form-invalid-feedback id="feedNemo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Municipio*" label-for="muni">
                  <b-form-select  id="muni" ref="muni" v-model="$v.datosColegio.id_municipio.$model" :options="comboMunicipios" :state="validateStateI('id_municipio')" aria-describedby="feedMuni" disabled></b-form-select>
                  <b-form-invalid-feedback id="feedMuni">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Dirección*" label-for="dir">
                  <b-form-input id="dir" ref="dir" v-model.trim="$v.datosColegio.direccion.$model" :state="validateStateI('direccion')" aria-describedby="feedDir" autocomplete="off" maxlength="100"></b-form-input>
                  <b-form-invalid-feedback id="feedDir">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Barrio/Vereda*" label-for="barrio">
                  <b-form-input id="barrio" ref="barrio" v-model.trim="$v.datosColegio.barrio.$model" :state="validateStateI('barrio')" aria-describedby="feedBarrio" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedBarrio">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Principal*" label-for="tel1">
                  <b-form-input id="tel1" ref="tel1" v-model.trim="$v.datosColegio.telefono1.$model" :state="validateStateI('telefono1')" aria-describedby="feedTel1" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
                  <b-form-invalid-feedback id="feedTel1">El número debe contener 10 dígitos.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="3" md="6">
                <b-form-group label="Teléfono Opcional" label-for="tel2">
                  <b-form-input id="tel2" ref="tel2" v-model.trim="$v.datosColegio.telefono2.$model" :state="validateStateI('telefono2')" aria-describedby="feedTel2" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col lg="6" md="12">
                <b-form-group label="Correo Electrónico*" label-for="correo">
                  <b-form-input id="correo" ref="correo" v-model.trim="$v.datosColegio.correo.$model" :state="validateStateI('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedCorreo">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <div class="float-right small text-medium-emphasis">* Campo requerido</div>
                <b-button class="small" variant="primary" @click="validarDatosColegio">Actualizar Datos de Identificación</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <template #header>
            <h5 class="mb-0"><b>DATOS ADMINISTRATIVOS</b></h5>
          </template>
          <b-card-text>
            <b class="text-muted"><i>REPRESENTANTE LEGAL</i></b>
            <b-alert variant="secondary" show>
              <b-row>
                <b-col lg="6">
                  <b-form-group label="Apellidos*" label-for="apeRL">
                    <b-form-input id="apeRL" ref="apeRL" v-model.trim="$v.datosAdministrativos.apellidosRL.$model" :state="validateStateA('apellidosRL')" aria-describedby="feedApeRL" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
                    <b-form-invalid-feedback id="feedApeRL" >Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Nombres*" label-for="nomRL">
                    <b-form-input id="nomRL" ref="nomRL" v-model.trim="$v.datosAdministrativos.nombresRL.$model" :state="validateStateA('nombresRL')" aria-describedby="feedNomRL" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
                    <b-form-invalid-feedback id="feedNomRL">Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="No. Documento*" label-for="docRL">
                    <b-form-input id="docRL" ref="docRL" v-model="$v.datosAdministrativos.documentoRL.$model" :state="validateStateA('documentoRL')" aria-describedby="feedDocRL" autocomplete="off" maxlength="20"></b-form-input>
                    <b-form-invalid-feedback id="feedDocRL">Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Teléfono*" label-for="telRL">
                    <b-form-input id="telRL" ref="telRL" v-model.trim="$v.datosAdministrativos.telefonoRL.$model" :state="validateStateA('telefonoRL')" aria-describedby="feedTelRL" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
                    <b-form-invalid-feedback id="feedTelRL" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Correo*" label-for="correoRL">
                    <b-form-input id="correoRL" ref="correoRL" v-model.trim="$v.datosAdministrativos.correoRL.$model" :state="validateStateA('correoRL')" aria-describedby="feedCorreoRL" autocomplete="off" maxlength="50"></b-form-input>
                    <b-form-invalid-feedback id="feedCorreoRL" >Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-alert>
            <b class="text-muted"><i>RECTOR(A)</i></b>
            <b-alert variant="secondary" show>
              <b-row>
                <b-col lg="6">
                  <b-form-group label="Apellidos*" label-for="apeRE">
                    <b-form-input id="apeRE" ref="apeRE" v-model.trim="$v.datosAdministrativos.apellidosRE.$model" :state="validateStateA('apellidosRE')" aria-describedby="feedApeRE" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
                    <b-form-invalid-feedback id="feedApeRE" >Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Nombres*" label-for="nomRE">
                    <b-form-input id="nomRE" ref="nomRE" v-model.trim="$v.datosAdministrativos.nombresRE.$model" :state="validateStateA('nombresRE')" aria-describedby="feedNomRE" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
                    <b-form-invalid-feedback id="feedNomRE">Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="No. Documento*" label-for="docRE">
                    <b-form-input id="docRE" ref="docRE" v-model="$v.datosAdministrativos.documentoRE.$model" :state="validateStateA('documentoRE')" aria-describedby="feedDocRE" autocomplete="off" maxlength="20"></b-form-input>
                    <b-form-invalid-feedback id="feedDocRE">Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Teléfono*" label-for="telRE">
                    <b-form-input id="telRE" ref="telRE" v-model.trim="$v.datosAdministrativos.telefonoRE.$model" :state="validateStateA('telefonoRE')" aria-describedby="feedTelRE" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
                    <b-form-invalid-feedback id="feedTelRE" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Correo*" label-for="correoRE">
                    <b-form-input id="correoRE" ref="correoRE" v-model.trim="$v.datosAdministrativos.correoRE.$model" :state="validateStateA('correoRE')" aria-describedby="feedCorreoRE" autocomplete="off" maxlength="50"></b-form-input>
                    <b-form-invalid-feedback id="feedCorreoRE" >Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-alert>
            <b class="text-muted"><i>SECRETARIO(A)</i></b>
            <b-alert variant="secondary" show>
              <b-row>
                <b-col lg="6">
                  <b-form-group label="Apellidos*" label-for="apeSE">
                    <b-form-input id="apeSE" ref="apeSE" v-model.trim="$v.datosAdministrativos.apellidosSE.$model" :state="validateStateA('apellidosSE')" aria-describedby="feedApeSE" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
                    <b-form-invalid-feedback id="feedApeSE" >Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Nombres*" label-for="nomSE">
                    <b-form-input id="nomSE" ref="nomSE" v-model.trim="$v.datosAdministrativos.nombresSE.$model" :state="validateStateA('nombresSE')" aria-describedby="feedNomSE" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
                    <b-form-invalid-feedback id="feedNomSE">Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="No. Documento*" label-for="docSE">
                    <b-form-input id="docSE" ref="docSE" v-model="$v.datosAdministrativos.documentoSE.$model" :state="validateStateA('documentoSE')" aria-describedby="feedDocSE" autocomplete="off" maxlength="20"></b-form-input>
                    <b-form-invalid-feedback id="feedDocSE">Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="3">
                  <b-form-group label="Teléfono*" label-for="telSE">
                    <b-form-input id="telSE" ref="telSE" v-model.trim="$v.datosAdministrativos.telefonoSE.$model" :state="validateStateA('telefonoSE')" aria-describedby="feedTelSE" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
                    <b-form-invalid-feedback id="feedTelSE" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col lg="6">
                  <b-form-group label="Correo*" label-for="correoSE">
                    <b-form-input id="correoSE" ref="correoSE" v-model.trim="$v.datosAdministrativos.correoSE.$model" :state="validateStateA('correoSE')" aria-describedby="feedCorreoSE" autocomplete="off" maxlength="50"></b-form-input>
                    <b-form-invalid-feedback id="feedCorreoSE" >Campo requerido.</b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-alert>
            <b-row>
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <div class="float-right small text-medium-emphasis">* Campo requerido</div>
                <b-button class="small" variant="primary" @click="validarDatosAdministrativos">Actualizar Datos Administrativos</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <template #header>
            <h5 class="mb-0"><b>LICENCIA DE FUNCIONAMIENTO</b></h5>
          </template>
          <b-card-text>
            <b-row>
              <b-col lg="6">
                <b-form-group label="Número de la Licencia*" label-for="licencia">
                  <b-form-input id="licencia" ref="licencia" v-model.trim="$v.datosLicencia.numLicencia.$model" :state="validateStateL('numLicencia')" aria-describedby="feedLicencia" autocomplete="off" maxlength="50"></b-form-input>
                  <b-form-invalid-feedback id="feedLicencia">Campo requerido.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col lg="6">
                <b-form-group label="Fecha de la Licencia*" label-for="fechaL">
                  <b-form-input type="date" id="fechaL" ref="fechaL" v-model.trim="$v.datosLicencia.fechaLicencia.$model" :state="validateStateL('fechaLicencia')" aria-describedby="feedFechaL"></b-form-input>
                  <b-form-invalid-feedback id="feedFechaL" >Campo requerido.</b-form-invalid-feedback>            
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12"><hr></b-col>
              <b-col lg="12">
                <div class="float-right small text-medium-emphasis">* Campo requerido</div>
                <b-button class="small" variant="primary" @click="validarDatosLicencia">Actualizar Licencia de Funcionamiento</b-button>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate";
  import { required, minLength } from "vuelidate/lib/validators";

  export default {
    name: 'InfoInstitucional',
    mixins: [validationMixin],
    data () {
      return {
        idColegio: this.$store.state.idInstitucion,
        datosColegio: {
          id: null,
          dane: null,
          nit: null,
          institucion: null,
          nemo: null,
          direccion: null,
          barrio: null,
          id_municipio: null,
          telefono1: null,
          telefono2: null,
          id_sector: null,
          id_zona: null,
          correo: null
        },
        datosAdministrativos: {
          id: null,
          apellidosRL: null,
          nombresRL: null,
          documentoRL: null,
          telefonoRL: null,
          correoRL: null,
          apellidosRE: null,
          nombresRE: null,
          documentoRE: null,
          telefonoRE: null,
          correoRE: null,
          apellidosSE: null,
          nombresSE: null,
          documentoSE: null,
          telefonoSE: null,
          correoSE: null,
        },
        datosLicencia: {
          id: null,
          numLicencia: null,
          fechaLicencia: null
        },
        comboMunicipios: [],
        comboSectores: [],
        comboZonas: [],
        comboEstados: []
      }
    },
    validations: {
      datosColegio: {
        nit: { required, minLength: minLength(10) },
        institucion: { required, minLength: minLength(10) },
        nemo: { required, minLength: minLength(10) },
        direccion: { required, minLength: minLength(5) },
        barrio: { required, minLength: minLength(5) },
        id_municipio: { required },
        telefono1: { required, minLength: minLength(10) },
        telefono2: { minLength: minLength(0) },
        id_sector: { required },
        id_zona: { required },
        correo: { required, minLength: minLength(5) }
      },
      datosAdministrativos: {
        apellidosRL: { required, minLength: minLength(3) },
        nombresRL: { required, minLength: minLength(3) },
        documentoRL: { required, minLength: minLength(7) },
        telefonoRL: { required, minLength: minLength(10) },
        correoRL: { required, minLength: minLength(5) },
        apellidosRE: { required, minLength: minLength(3) },
        nombresRE: { required, minLength: minLength(3) },
        documentoRE: { required, minLength: minLength(7) },
        telefonoRE: { required, minLength: minLength(10) },
        correoRE: { required, minLength: minLength(5) },
        apellidosSE: { required, minLength: minLength(3) },
        nombresSE: { required, minLength: minLength(3) },
        documentoSE: { required, minLength: minLength(7) },
        telefonoSE: { required, minLength: minLength(10) },
        correoSE: { required, minLength: minLength(5) }
      },
      datosLicencia: {
        numLicencia: { required, minLength: minLength(1) },
        fechaLicencia: { required }
      }
    },
    methods: {
      validarDatosLicencia() {
        this.$v.datosLicencia.$touch()
        if (this.$v.datosLicencia.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar los datos de la Licencia de Funcionamiento de la Institución Educativa?', {
            title: 'Actualizar Datos',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Actualizar Datos',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.actualizarLicencia()
            }
          })
        }
        return true
      },
      async actualizarLicencia() {
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios/licencia', JSON.stringify(this.datosLicencia), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Datos Licencia')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la institución se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Datos Licencia. Intente más tarde. ' + err)
        })
      },
      validarDatosAdministrativos() {
        this.$v.datosAdministrativos.$touch()
        if (this.$v.datosAdministrativos.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar los datos Administrativos de la Institución Educativa?', {
            title: 'Actualizar Datos',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Actualizar Datos',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.actualizarAdmin()
            }
          })
        }
        return true
      },
      async actualizarAdmin() {
        this.datosAdministrativos.apellidosRL = this.datosAdministrativos.apellidosRL.toUpperCase()
        this.datosAdministrativos.nombresRL = this.datosAdministrativos.nombresRL.toUpperCase()
        this.datosAdministrativos.documentoRL = this.datosAdministrativos.documentoRL.toUpperCase()
        this.datosAdministrativos.telefonoRL = this.datosAdministrativos.telefonoRL.toUpperCase()
        this.datosAdministrativos.correoRL = this.datosAdministrativos.correoRL.toLowerCase()
        this.datosAdministrativos.apellidosRE = this.datosAdministrativos.apellidosRE.toUpperCase()
        this.datosAdministrativos.nombresRE = this.datosAdministrativos.nombresRE.toUpperCase()
        this.datosAdministrativos.documentoRE = this.datosAdministrativos.documentoRE.toUpperCase()
        this.datosAdministrativos.telefonoRE = this.datosAdministrativos.telefonoRE.toUpperCase()
        this.datosAdministrativos.correoRE = this.datosAdministrativos.correoRE.toLowerCase()
        this.datosAdministrativos.apellidosSE = this.datosAdministrativos.apellidosSE.toUpperCase()
        this.datosAdministrativos.nombresSE = this.datosAdministrativos.nombresSE.toUpperCase()
        this.datosAdministrativos.documentoSE = this.datosAdministrativos.documentoSE.toUpperCase()
        this.datosAdministrativos.telefonoSE = this.datosAdministrativos.telefonoSE.toUpperCase()
        this.datosAdministrativos.correoSE = this.datosAdministrativos.correoSE.toLowerCase()
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios/administrativos', JSON.stringify(this.datosAdministrativos), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Datos Administrativos')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la institución se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Datos Administrativos. Intente más tarde. ' + err)
        })
      },
      validarDatosColegio() {
        this.$v.datosColegio.$touch()
        if (this.$v.datosColegio.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('¿Esta seguro de actualizar los datos de la Institución Educativa?', {
            title: 'Actualizar Datos',
            size: '',
            buttonSize: 'sm',
            okVariant: 'success',
            okTitle: 'Si, Actualizar Datos de la Institución Educativa',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.actualizarColegio()
            }
          })
        }
        return true
      },
      async actualizarColegio() {
        this.datosColegio.nemo = this.datosColegio.nemo.toUpperCase()
        this.datosColegio.barrio = this.datosColegio.barrio.toUpperCase()
        if (this.datosColegio.telefono2 == '' || this.datosColegio.telefono2 == null) {
          this.datosColegio.telefono2 = null
        }
        this.datosColegio.correo = this.datosColegio.correo.toLowerCase()
        await axios
        .put(CONFIG.ROOT_PATH + 'colegios', JSON.stringify(this.datosColegio), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Colegio')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos de la institución se han actualizado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Colegio. Intente más tarde. ' + err)
        })
      },
      async consultaColegio() {
        await axios
        .get(CONFIG.ROOT_PATH + 'colegios/colegio', { params: { idColegio: this.idColegio }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Consulta Colegio')
          } else{
            if (response.data.datos != 0) {
              this.datosColegio.id = response.data.datos.id
              this.datosColegio.dane = response.data.datos.dane
              this.datosColegio.nit = response.data.datos.nit
              this.datosColegio.institucion = response.data.datos.institucion
              this.datosColegio.nemo = response.data.datos.nemo
              this.datosColegio.direccion = response.data.datos.direccion
              this.datosColegio.barrio = response.data.datos.barrio
              this.datosColegio.id_municipio = response.data.datos.id_municipio
              this.datosColegio.telefono1 = response.data.datos.telefono1
              this.datosColegio.telefono2 = response.data.datos.telefono2
              this.datosColegio.id_sector = response.data.datos.id_sector
              this.datosColegio.id_zona = response.data.datos.id_zona
              this.datosColegio.correo = response.data.datos.correo
              this.datosAdministrativos.id = response.data.datos.id
              this.datosAdministrativos.apellidosRL = response.data.datos.apellidosRL
              this.datosAdministrativos.nombresRL = response.data.datos.nombresRL
              this.datosAdministrativos.documentoRL = response.data.datos.documentoRL
              this.datosAdministrativos.telefonoRL = response.data.datos.telefonoRL
              this.datosAdministrativos.correoRL = response.data.datos.correoRL
              this.datosAdministrativos.apellidosRE = response.data.datos.apellidosRE
              this.datosAdministrativos.nombresRE = response.data.datos.nombresRE
              this.datosAdministrativos.documentoRE = response.data.datos.documentoRE
              this.datosAdministrativos.telefonoRE = response.data.datos.telefonoRE
              this.datosAdministrativos.correoRE = response.data.datos.correoRE
              this.datosAdministrativos.apellidosSE = response.data.datos.apellidosSE
              this.datosAdministrativos.nombresSE = response.data.datos.nombresSE
              this.datosAdministrativos.documentoSE = response.data.datos.documentoSE
              this.datosAdministrativos.telefonoSE = response.data.datos.telefonoSE
              this.datosAdministrativos.correoSE = response.data.datos.correoSE
              this.datosLicencia.id = response.data.datos.id
              this.datosLicencia.numLicencia = response.data.datos.numLicencia
              if (response.data.datos.fechaLicencia !=null && response.data.datos.fechaLicencia !='')
                this.datosLicencia.fechaLicencia = response.data.datos.fechaLicencia.substr(0,10)
              else
                this.datosLicencia.fechaLicencia = null
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Consulta Colegio. Intente más tarde. ' + err)
        })
      },
      async ocuparComboSectores() {
        this.comboSectores = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listasectores')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Sectores')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboSectores.push({ 'value': element.id, 'text': element.sector.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Sectores. Intente más tarde. ' + err)
        })
      },
      async ocuparComboZonas() {
        this.comboZonas = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listazonas')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Zonas')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboZonas.push({ 'value': element.id, 'text': element.zona.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Zonas. Intente más tarde. ' + err)
        })
      },
      async ocuparComboEstados() {
        this.comboEstados = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listaestadosinstituciones')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Estados Instituciones')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboEstados.push({ 'value': element.id, 'text': element.estado.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Estados Instituciones. Intente más tarde. ' + err)
        })
      },
      async ocuparComboMunicipios() {
        this.comboMunicipios = []
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listamunicipios')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Municipios')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboMunicipios.push({ 'value': element.id, 'text': element.municipio.toUpperCase() + ' - ' + element.departamento.toUpperCase() })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Municipios. Intente más tarde. ' + err)
        })
      },
      validateStateI(name) {
        const { $dirty, $error } = this.$v.datosColegio[name]
        return $dirty ? !$error : null
      },
      validateStateA(name) {
        const { $dirty, $error } = this.$v.datosAdministrativos[name]
        return $dirty ? !$error : null
      },
      validateStateL(name) {
        const { $dirty, $error } = this.$v.datosLicencia[name]
        return $dirty ? !$error : null
      },
      soloNumeros(e) {
          let key = window.Event ? e.which : e.keyCode
          if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
              e.preventDefault()
          }
      },
      soloLetras(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || (key == 193) || (key == 201) || (key == 205) || (key == 211) || (key == 218) || (key == 225) || (key == 233) || (key == 237) || (key == 243) || (key == 250) || (key == 192) || (key == 32) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
      },
      soloNit(e) {
          let key = window.Event ? e.which : e.keyCode
          if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39) || (key == 109) || (key == 110) || (key == 189) || (key == 190))) {
              e.preventDefault()
          }
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
      this.ocuparComboMunicipios()
      this.ocuparComboSectores()
      this.ocuparComboZonas()
      this.ocuparComboEstados()
    }
  }
</script>
