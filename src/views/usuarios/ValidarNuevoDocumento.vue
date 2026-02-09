<template>
  <div>
    <CRow>
      <CCol>
        <b-row>  
            <b-col lg="6" md="10">
                <b-form-group label="Número de Documento:" label-for="docN">
                    <b-form-input id="docN" ref="docN" v-model="$v.infoUsuario.documento.$model" :state="validateState('documento')" aria-describedby="feedDocN" autocomplete="off" maxlength="20" autofocus @keydown="soloNumeros"></b-form-input>
                    <b-form-invalid-feedback id="feedDocN">El número de documento debe contener mínimo 7 caracteres.</b-form-invalid-feedback>
                </b-form-group>
            </b-col>
            <b-col lg="12" md="12"><hr></b-col>
            <b-col lg="12" md="12">
                <b-button variant="success" size="sm" @click="validarDocumento">Validar Número de Documento</b-button>
                <b-button class="ml-4" variant="secondary" size="sm" @click="cancelarFormulario">Cancelar</b-button>
            </b-col>
        </b-row>
      </CCol>
    </CRow>
  </div>
</template>

<script>
    import axios from "axios"
    import * as CONFIG from '@/assets/config.js'
    import { validationMixin } from "vuelidate"
    import { required, minLength } from "vuelidate/lib/validators"
    import { uuid } from 'vue-uuid'

    export default {
        name: 'ValidarNuevoDocumento',
        mixins: [validationMixin],
        props: {
        },
        data () {
            return {
                infoUsuario: {
                    idPersona: null,
                    documento: null,
                    vincular: null
                }
            }
        },
        validations: {
            infoUsuario: {
                documento: { required, minLength: minLength(7) }
            }
        },
        methods: {
            async validarDocumento() {
                this.$v.infoUsuario.$touch()
                if (this.$v.infoUsuario.$anyError) {
                    return false
                } else {
                    await axios
                    .get(CONFIG.ROOT_PATH + 'personas/documento', { params: { documento: this.infoUsuario.documento }})
                    .then(response => {
                        if (response.data.error){
                            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Validar documento funcionario')
                        } else{
                            if (response.data.datos == 0) {
                                this.infoUsuario.idPersona = uuid.v1()
                                this.infoUsuario.vincular = 0
                                this.$emit("retorno", this.infoUsuario)
                            } else if (response.data.datos.id_institucion == null || response.data.datos.id_institucion == '') {
                                this.infoUsuario.idPersona = response.data.datos.id
                                this.infoUsuario.documento = response.data.datos.documento
                                this.infoUsuario.idTipoDoc = response.data.datos.id_tipo_documento
                                this.infoUsuario.idMuniDoc = response.data.datos.id_municipio_documento
                                this.infoUsuario.nombre1 = response.data.datos.nombre1
                                this.infoUsuario.nombre2 = response.data.datos.nombre2
                                this.infoUsuario.apellido1 = response.data.datos.apellido1
                                this.infoUsuario.apellido2 = response.data.datos.apellido2
                                this.infoUsuario.fechaNace = response.data.datos.fecha_nacimiento
                                this.infoUsuario.idGenero = response.data.datos.id_genero
                                this.infoUsuario.idRh = response.data.datos.id_rh
                                this.infoUsuario.direccion = response.data.datos.direccion
                                this.infoUsuario.idMuniRes = response.data.datos.id_municipio_direccion
                                this.infoUsuario.telefono1 = response.data.datos.telefono1
                                this.infoUsuario.telefono2 = response.data.datos.telefono2
                                this.infoUsuario.correo = response.data.datos.correo
                                this.infoUsuario.cargo = response.data.datos.cargo
                                this.infoUsuario.vincular = 1
                                this.infoUsuario.idUsuario = response.data.datos.idUsuario
                                this.$emit("retorno", this.infoUsuario)
                            } else {
                                this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El documento ' + this.infoUsuario.documento + ' ya se encuentra registrado en el sistema y actualmente se encuantra vinculado a una Institución Educativa.')
                                this.infoUsuario.documento = ''
                                this.$refs.docN.focus()
                            }
                        }
                    })
                    .catch(err => {
                        this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Validar documento funcionario. Intente más tarde. ' + err)
                    })
                }
                return true
            },
            cancelarFormulario() {
                this.$emit("retorno", 0)
            },
            validateState(name) {
                const { $dirty, $error } = this.$v.infoUsuario[name]
                return $dirty ? !$error : null
            },
            soloNumeros(e) {
                let key = window.Event ? e.which : e.keyCode
                if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
                    e.preventDefault()
                }
            },
            mensajeEmergente(variante, titulo, contenido) {
                this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
            }
        }
    }
</script>
