<template>
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader color="info" text-color="light">
            <h5 class="my-0">Búsqueda de Ciudades</h5>
          </CCardHeader>
          <CCardBody>
            <b-row>
              <!-- REGIÓN -->
              <b-col lg="4" class="mb-3">
                <b-form-group label="Región:*">
                  <b-form-select
                    v-model="idRegion"
                    :options="comboRegiones"
                    @change="onSeleccionarRegion">
                    <template #first>
                      <option :value="null" disabled>Seleccione región...</option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <!-- DEPARTAMENTO -->
              <b-col lg="4" class="mb-3">
                <b-form-group label="Departamento:*">
                  <b-form-select
                    v-model="idDepartamento"
                    :options="comboDepartamentos"
                    @change="onSeleccionarDepartamento"
                    :disabled="!idRegion">
                    <template #first>
                      <option :value="null" disabled>Seleccione departamento...</option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col>
              <!-- CIUDAD -->
              <b-col lg="4" class="mb-3">
                <b-form-group label="Ciudad:*">
                  <b-form-select
                    v-model="idCiudad"
                    :options="comboCiudades"
                    :disabled="!idDepartamento">
                    <template #first>
                      <option :value="null" disabled>Seleccione ciudad...</option>
                    </template>
                  </b-form-select>
                </b-form-group>
              </b-col> 
            </b-row>
            <b-row v-if="idCiudad">
              <b-col>
                <b-alert show variant="success">
                  <strong>Ciudad seleccionada</strong>
                  <span>{{ ciudadSeleccionadaNombre }}</span>
                </b-alert>
              </b-col>
            </b-row>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>



<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import * as CONFIG from '@/assets/config.js'
import { uuid } from 'vue-uuid'

export default {
  name: 'CrearSolicitud',
  mixins: [validationMixin],

  data () {
    return {
      idNuevaSolicitud: null,

      idTramite: null,
      comboTramites: [],
      listaTramites: [],

      idRegion: null,
      idDepartamento: null,
      idCiudad: null,

      comboRegiones: [],
      comboDepartamentos: [],
      comboCiudades: [],

      infoSolicitud: {
        id: null,
        solicitud: null,
        correo: this.$store.state.correoInstitucion
      },

      tramiteSel: false
    }
  },

  validations: {
    infoSolicitud: {
      solicitud: { required },
      correo: { required }
    },
    idRegion: { required },
    idDepartamento: { required },
    idCiudad: { required }
  },

  methods: {

    /*API COLOMBIA */

    async cargarRegiones () {
      const res = await axios.get('https://api-colombia.com/api/v1/Region')
      this.comboRegiones = res.data.map(r => ({
        value: r.id,
        text: r.name
      }))
    },

    async onSeleccionarRegion () {
      this.idDepartamento = null
      this.idCiudad = null
      this.comboDepartamentos = []
      this.comboCiudades = []

      const res = await axios.get(
        `https://api-colombia.com/api/v1/Region/${this.idRegion}/departments`
      )

      this.comboDepartamentos = res.data.map(d => ({
        value: d.id,
        text: d.name
      }))
    },

    async onSeleccionarDepartamento () {
      this.idCiudad = null
      this.comboCiudades = []

      const res = await axios.get(
        `https://api-colombia.com/api/v1/Department/${this.idDepartamento}/cities`
      )

      this.comboCiudades = res.data.map(c => ({
        value: c.id,
        text: c.name
      }))
    },

    /*TRÁMITE*/

    seleccionarTramite () {
      this.tramiteSel = true
    },

    crearSolicitud () {
      this.$v.$touch()
      if (this.$v.$anyError) {
        this.mensajeEmergente('danger', CONFIG.TITULO_MSG, 'Campos incompletos')
        return
      }

      this.guardarSolicitud()
    },

    async guardarSolicitud () {
      this.infoSolicitud.id = uuid.v1()
      this.infoSolicitud.id_tramite = this.idTramite
      this.infoSolicitud.id_region = this.idRegion
      this.infoSolicitud.id_departamento = this.idDepartamento
      this.infoSolicitud.id_ciudad = this.idCiudad

      await axios.post(
        CONFIG.ROOT_PATH + 'tramites/solicitudes',
        JSON.stringify(this.infoSolicitud),
        { headers: { 'Content-Type': 'application/json' } }
      )

      this.mensajeEmergente('success', CONFIG.TITULO_MSG, 'Solicitud enviada')
      this.$router.push('/solicitudes')
    },

    cerrarFormulario () {
      this.$router.push('/solicitudes')
    },

    validateState (name) {
      const { $dirty, $error } = this.$v.infoSolicitud[name]
      return $dirty ? !$error : null
    },

    mensajeEmergente (variant, title, content) {
      this.$bvToast.toast(content, {
        title,
        variant,
        solid: true,
        autoHideDelay: 4000,
        toaster: 'b-toaster-top-center'
      })
    }
  },

  beforeMount () {
    this.idNuevaSolicitud = uuid.v1()
    this.cargarRegiones()
  }
}
</script>