<template>
  <div>
    <b-row class="p-3">
      <b-col lg="6" md="6">
        <b-form-group label="Apellidos*" label-for="ape">
          <b-form-input id="ape" ref="ape" v-model.trim="$v.infoIntegrante.apellidos.$model" :state="validateState('apellidos')" aria-describedby="feedApe" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
          <b-form-invalid-feedback id="feedApe" >Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col lg="6" md="6">
        <b-form-group label="Nombres*" label-for="nom">
          <b-form-input id="nom" ref="nom" v-model.trim="$v.infoIntegrante.nombres.$model" :state="validateState('nombres')" aria-describedby="feedNom" autocomplete="off" maxlength="50" @keydown="soloLetras"></b-form-input>
          <b-form-invalid-feedback id="feedNom" >Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col lg="6" md="6">
        <b-form-group label="Teléfono*" label-for="tel1">
          <b-form-input id="tel1" ref="tel1" v-model.trim="$v.infoIntegrante.telefono.$model" :state="validateState('telefono')" aria-describedby="feedTel1" autocomplete="off" maxlength="10" @keydown="soloNumeros"></b-form-input>
          <b-form-invalid-feedback id="feedTel1" >El número debe contener 10 dígitos.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col lg="6" md="6">
        <b-form-group label="Correo Electrónico*" label-for="correo">
          <b-form-input id="correo" ref="correo" v-model.trim="$v.infoIntegrante.correo.$model" :state="validateState('correo')" aria-describedby="feedCorreo" autocomplete="off" maxlength="50"></b-form-input>
          <b-form-invalid-feedback id="feedCorreo" >Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col lg="6" md="6">
        <b-form-group label="Cargo*" label-for="cargo">
          <b-form-select  id="cargo" ref="cargo" v-model="$v.infoIntegrante.cargo.$model" :options="comboCargos" :state="validateState('cargo')" aria-describedby="feedCargo"></b-form-select>
          <b-form-invalid-feedback id="feedCargo">Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col lg="6" md="6">
        <b-form-group label="Lider*" label-for="lider">
          <b-form-select  id="lider" ref="lider" v-model="$v.infoIntegrante.lider.$model" :options="comboLider" :state="validateState('lider')" aria-describedby="feedLider"></b-form-select>
          <b-form-invalid-feedback id="feedLider">Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12"><hr></b-col>
      <b-col lg="12">
        <div class="float-right small text-medium-emphasis">* Campo requerido</div>
        <b-button class="small mt-1 mr-3" variant="success" @click="validarDatosIntegrante">
          <div v-if="infoIntegrante.editarIntegrante">Actualizar Datos del Integrante</div>
          <div v-else>Crear un Nuevo Integrante</div>
        </b-button>
        <b-button v-if="infoIntegrante.editarIntegrante" class="small mt-1 mr-3" variant="danger" @click="validarEliminarIntegrante">Eliminar Datos del Integrante</b-button>
        <b-button class="small mt-1" variant="light" @click="cancelarFormulario">Cancelar</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import { validationMixin } from "vuelidate";
  import { required } from "vuelidate/lib/validators";
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'CrearEditarIntegrante',
    mixins: [validationMixin],
    components: {
      
    },
    props: {
        datosIntegrante: Object
    },
    data () {
      return {
        infoIntegrante: {
          id: null,
          id_gestion: null,
          id_institucion: null,
          apellidos: null,
          nombres: null,
          telefono: null,
          correo: null,
          cargo: null,
          lider: null,
          creo: null,
          editarIntegrante: null
        },
        comboCargos: [
          { 'value': 'Directivo', 'text': 'Directivo'},
          { 'value': 'Administrativo', 'text': 'Administrativo'},
          { 'value': 'Docente', 'text': 'Docente'},
          { 'value': 'Padre de Familia', 'text': 'Padre de Familia'},
          { 'value': 'Estudiante', 'text': 'Estudiante'},
          { 'value': 'Egresado', 'text': 'Egresado'},
          { 'value': 'Autoridad', 'text': 'Autoridad'},
          { 'value': 'Otro', 'text': 'Otro'}
        ],
        comboLider: [
          { 'value': 0, 'text': 'NO'},
          { 'value': 1, 'text': 'SI'}
        ]
      }
    },
    validations: {
      infoIntegrante: {
        apellidos: { required },
        nombres: { required },
        telefono: { required },
        correo: { required },
        cargo: { required },
        lider: { required }
      }
    },
    methods: {
      validarDatosIntegrante() {
        this.$v.infoIntegrante.$touch()
        if (this.$v.infoIntegrante.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoIntegrante.editarIntegrante ? 'Actualizar Integrante' : 'Crear Integrante'
          let pregunta = this.infoIntegrante.editarIntegrante ? '¿Esta seguro de actualizar los datos del Integrante?' : '¿Esta seguro de crear el nuevo integrante?'
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
              this.guardarDatosIntegrante()
            }
          })
        }
        return true
      },
      async guardarDatosIntegrante() {
        this.infoIntegrante.apellidos = this.infoIntegrante.apellidos.toUpperCase()
        this.infoIntegrante.nombres = this.infoIntegrante.nombres.toUpperCase()
        this.infoIntegrante.correo = this.infoIntegrante.correo.toLowerCase()
        if (this.infoIntegrante.editarIntegrante) {
          await axios
          .put(CONFIG.ROOT_PATH + 'calidad/integrante', JSON.stringify(this.infoIntegrante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Integrante')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Integrante. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'calidad/integrante', JSON.stringify(this.infoIntegrante), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Integrante')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Integrante. Intente más tarde. ' + err)
          })
        }
      },
      validarEliminarIntegrante() {
        let titulo = 'Eliminar Integrante'
        let pregunta = '¿Esta seguro de eliminar los datos del Integrante?. Recuerde que los datos eliminados no se podrán recuperar.'
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
            this.eliminarIntegrante()
          }
        })
        return true
      },
      async eliminarIntegrante() {
        await axios
        .delete(CONFIG.ROOT_PATH + 'calidad/integrante', { params: { id: this.infoIntegrante.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Elininar Integrante')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Elininar Integrante. Intente más tarde. ' + err)
        })
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async consultaIntegrante() {
        this.infoIntegrante.id = this.datosIntegrante.id
        this.infoIntegrante.id_gestion = this.datosIntegrante.id_gestion
        this.infoIntegrante.id_institucion = this.datosIntegrante.id_institucion
        this.infoIntegrante.apellidos = this.datosIntegrante.apellidos
        this.infoIntegrante.nombres = this.datosIntegrante.nombres
        this.infoIntegrante.telefono = this.datosIntegrante.telefono
        this.infoIntegrante.correo = this.datosIntegrante.correo
        this.infoIntegrante.cargo = this.datosIntegrante.cargo
        this.infoIntegrante.lider = this.datosIntegrante.lider
        this.infoIntegrante.creo = this.datosIntegrante.creo
        this.infoIntegrante.editarIntegrante = this.datosIntegrante.editarIntegrante
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
      validateState(name) {
        const { $dirty, $error } = this.$v.infoIntegrante[name]
        return $dirty ? !$error : null
      },
      iniciarVista() {
        this.consultaIntegrante()
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
