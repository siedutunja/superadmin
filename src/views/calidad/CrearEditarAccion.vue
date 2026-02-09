<template>
  <div>
    <b-row class="p-3">
      <b-col lg="12" md="12">
        <b-form-group label="Acción*" label-for="accion">
          <b-form-textarea id="accion" ref="accion" v-model.trim="$v.infoAccion.accion.$model" rows="3" max-rows="6" :state="validateState('accion')" aria-describedby="feedAccion" autocomplete="off" maxlength="500"></b-form-textarea>
          <b-form-invalid-feedback id="feedAccion" >Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col lg="12" md="12">
        <b-form-group label="Recursos*" label-for="recursos">
          <b-form-textarea id="recursos" ref="recursos" v-model.trim="$v.infoAccion.recursos.$model" rows="3" max-rows="6" :state="validateState('recursos')" aria-describedby="feedRecursos" autocomplete="off" maxlength="500"></b-form-textarea>
          <b-form-invalid-feedback id="feedRecursos" >Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Fecha Inicial*" label-for="fechaI">
          <b-form-input id="fechaI" ref="fechaI" type="date" v-model.trim="$v.infoAccion.fecha_i.$model" :state="validateState('fecha_i')" aria-describedby="feedFechaI"></b-form-input>
          <b-form-invalid-feedback id="feedFechaI" >Campo requerido.</b-form-invalid-feedback>            
        </b-form-group>
      </b-col>
      <b-col lg="6">
        <b-form-group label="Fecha Final*" label-for="fechaF">
          <b-form-input id="fechaF" ref="fechaF" type="date" v-model.trim="$v.infoAccion.fecha_f.$model" :state="validateState('fecha_f')" aria-describedby="feedFechaF"></b-form-input>
          <b-form-invalid-feedback id="feedFechaF" >Campo requerido.</b-form-invalid-feedback>            
        </b-form-group>
      </b-col>
      <b-col lg="6" md="6">
        <b-form-group label="Responsable*" label-for="repon">
          <b-form-select  id="repon" ref="repon" v-model="$v.infoAccion.responsable.$model" :options="comboResponsables" :state="validateState('responsable')" aria-describedby="feedRespon"></b-form-select>
          <b-form-invalid-feedback id="feedRespon">Campo requerido.</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="12"><hr></b-col>
      <b-col lg="12">
        <div class="float-right small text-medium-emphasis">* Campo requerido</div>
        <b-button class="small mt-1 mr-3" variant="success" @click="validarDatosAccion">
          <div v-if="infoAccion.editarAccion">Actualizar Datos de la Acción</div>
          <div v-else>Crear una Nueva Acción</div>
        </b-button>
        <b-button v-if="infoAccion.editarAccion" class="small mt-1 mr-3" variant="danger" @click="validarEliminarAccion">Eliminar Datos de la Acción</b-button>
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
    name: 'CrearEditarAccion',
    mixins: [validationMixin],
    components: {
      
    },
    props: {
        datosAccion: Object
    },
    data () {
      return {
        infoAccion: {
          id: null,
          id_rubrica: null,
          accion: null,
          fecha_i: null,
          fecha_f: null,
          recursos: null,
          responsable: null,
          id_gestion: null,
          editarAccion: null
        },
        comboResponsables: []
      }
    },
    validations: {
      infoAccion: {
        accion: { required },
        fecha_i: { required },
        fecha_f: { required },
        recursos: { required },
        responsable: { required }
      }
    },
    methods: {
      validarDatosAccion() {
        this.$v.infoAccion.$touch()
        if (this.$v.infoAccion.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          let titulo = this.infoAccion.editarAccion ? 'Actualizar Acción' : 'Crear Acción'
          let pregunta = this.infoAccion.editarAccion ? '¿Esta seguro de actualizar los datos de la Acción?' : '¿Esta seguro de crear la nueva Acción?'
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
              this.guardarDatosAcción()
            }
          })
        }
        return true
      },
      async guardarDatosAcción() {
        if (this.infoAccion.editarAccion) {
          await axios
          .put(CONFIG.ROOT_PATH + 'calidad/accion', JSON.stringify(this.infoAccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Acción')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Acción. Intente más tarde. ' + err)
          })
        } else {
          await axios
          .post(CONFIG.ROOT_PATH + 'calidad/accion', JSON.stringify(this.infoAccion), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error){
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Crear Acción')
            } else{
              this.$emit("retorno", 1)
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Crear Acción. Intente más tarde. ' + err)
          })
        }
      },
      validarEliminarAccion() {
        let titulo = 'Eliminar Acción'
        let pregunta = '¿Esta seguro de eliminar los datos la Acción?. Recuerde que los datos eliminados no se podrán recuperar.'
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
            this.eliminarAccion()
          }
        })
        return true
      },
      async eliminarAccion() {
        await axios
        .delete(CONFIG.ROOT_PATH + 'calidad/accion', { params: { id: this.infoAccion.id }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Elininar Acción')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Elininar Acción. Intente más tarde. ' + err)
        })
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      async ocuparComboResponsables() {
        this.comboResponsables = []
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/equipogestion', { params: {idGestion: this.infoAccion.id_gestion, idColegio: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Responsables')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboResponsables.push({ 'value': element.apellidos + ' ' + element.nombres, 'text': element.apellidos + ' ' + element.nombres })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Responsables. Intente más tarde. ' + err)
        })
      },
      async consultaAccion() {
        this.infoAccion.id = this.datosAccion.id
        this.infoAccion.id_rubrica = this.datosAccion.id_rubrica
        this.infoAccion.accion = this.datosAccion.accion
        if (this.datosAccion.fecha_i != '' && this.datosAccion.fecha_i != null)
          this.infoAccion.fecha_i = this.datosAccion.fecha_i.substr(0,10)
        if (this.datosAccion.fecha_f != '' && this.datosAccion.fecha_f != null)
          this.infoAccion.fecha_f = this.datosAccion.fecha_f.substr(0,10)
        this.infoAccion.recursos = this.datosAccion.recursos
        this.infoAccion.responsable = this.datosAccion.responsable
        this.infoAccion.id_gestion = this.datosAccion.id_gestion
        this.infoAccion.editarAccion = this.datosAccion.editarAccion
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoAccion[name]
        return $dirty ? !$error : null
      },
      iniciarVista() {
        this.consultaAccion()
        this.ocuparComboResponsables()
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
