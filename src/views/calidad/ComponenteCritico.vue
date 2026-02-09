<template>
  <div>
    <b-card v-if="infoRubrica.rubrica == 0">
      <template #header>
        <div class="float-right">
          Valoración: <b>SIN VALORACIÓN</b>
        </div>
        <p class="mb-0">Componente:<br><span style="font-weight: bold; font-size: 16">{{ datosComponente.componente.toUpperCase() }}</span></p>
      </template>
      <b-row>
        <b-col>
          <b-alert class="pt-5 pb-5 text-center" variant="danger" show>
            <b-icon icon="info-circle-fill" scale="2" variant="danger"></b-icon>
            <h2 class="pt-3">Aún no se ha evaluado este componente</h2>
            <h5>Por favor diríjase al paso de AUTOEVALUACIÓN y asigne la valoración a este componente.</h5>
          </b-alert>
        </b-col>
      </b-row>
    </b-card>
    <b-card v-if="infoRubrica.rubrica == 1 || infoRubrica.rubrica == 2">
      <template #header>
        <div class="float-right">
          Valoración: <b>{{infoRubrica.rubrica == 1 ? '1. EXISTENCIA' : '2. PERTINENCIA'}}</b>
        </div>
        <p class="mb-0">Componente:<br><span style="font-weight: bold; font-size: 16">{{ datosComponente.componente.toUpperCase() }}</span></p>
      </template>
      <div>
        <b-row>
          <b-col lg="12">
            <div class="float-right" v-b-popover.hover.left="'Conjunto de acciones tomadas para describir lo que puede ser aprovechable, cuál es la oportunidad que genera un beneficio y para quién'" title="Oportunidad de Mejoramiento">
              <b-icon icon="question-circle" aria-hidden="true"></b-icon>
            </div>
            <b-form-group label="Oportunidad de Mejoramiento*" label-for="oportunidad" style="font-weight: bold; font-size: 16">
              <b-form-textarea id="oportunidad" ref="oportunidad" v-model.trim="$v.infoRubrica.oportunidad.$model" placeholder="Escriba la oportunidad de mejoramiento..." rows="3" max-rows="6" :state="validateState('oportunidad')" aria-describedby="feedoportunidad" autocomplete="off"></b-form-textarea>
              <b-form-invalid-feedback id="feedoportunidad" >Campo requerido.</b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="4">
            <div class="float-right" v-b-popover.hover.left="'¿Qué tan apremiante es la necesidad de que la Institución Educativa supere un determinado factor crítico?.  Seleccione el valor de la Urgencia donde: 1 es Poco Urgente y 5 es Muy Urgente'" title="Urgencia">
              <b-icon icon="question-circle" aria-hidden="true"></b-icon>
            </div>
            <b-form-group label="Urgencia*" label-for="urgencia" style="font-weight: bold; font-size: 16">
              <b-form-select  id="urgencia" ref="urgencia" v-model="$v.infoRubrica.urgencia.$model" :state="validateState('urgencia')" :options="comboValoraciones" aria-describedby="feedurgencia"></b-form-select>
              <b-form-invalid-feedback id="feedurgencia" >Campo requerido.</b-form-invalid-feedback>
              <!--<span class="text-warning">Seleccione el valor de la Urgencia donde:<br>1 es poco Urgente y 5 muy Urgente</span>-->
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <div class="float-right" v-b-popover.hover.left="'¿Qué tanto se agravaría la situación institucional si no se elimina un determinado factor crítico?.  Seleccione el valor de la Tendencia donde: 1 es Baja Tendencia y 5 es Alta Tendencia'" title="Tendencia">
              <b-icon icon="question-circle" aria-hidden="true"></b-icon>
            </div>
            <b-form-group label="Tendencia*" label-for="tendencia" style="font-weight: bold; font-size: 16">
              <b-form-select  id="tendencia" ref="tendencia" v-model="$v.infoRubrica.tendencia.$model" :state="validateState('tendencia')" :options="comboValoraciones" aria-describedby="feedtendencia"></b-form-select>
              <b-form-invalid-feedback id="feedtendencia" >Campo requerido.</b-form-invalid-feedback>
              <!--<span class="text-warning">Seleccione el valor de la Tendencia donde:<br>1 es baja Tendencia y 5 alta Tendencia</span>-->
            </b-form-group>
          </b-col>
          <b-col lg="4">
            <div class="float-right" v-b-popover.hover.left="'¿cuál es la incidencia de un determinado factor crítico en el logro de unos resultados concretos?.  Seleccione el valor del Impacto donde: 1 es Bajo Impacto y 5 es Alto Impacto'" title="Impacto">
              <b-icon icon="question-circle" aria-hidden="true"></b-icon>
            </div>
            <b-form-group label="Impacto*" label-for="impacto" style="font-weight: bold; font-size: 16">
              <b-form-select  id="impacto" ref="impacto" v-model="$v.infoRubrica.impacto.$model" :state="validateState('impacto')" :options="comboValoraciones" aria-describedby="feedimpacto"></b-form-select>
              <b-form-invalid-feedback id="feedimpacto" >Campo requerido.</b-form-invalid-feedback>
              <!--<span class="text-warning">Seleccione el valor del Impacto donde:<br>1 es bajo Impacto y 5 alto Impacto</span>-->
            </b-form-group>
          </b-col>
          <b-col lg="12"><hr></b-col>
          <b-col lg="12">
            <span v-if="infoRubrica.valoracion == 0" class="text-danger"><b-icon icon="circle-fill" animation="throb" font-scale="2" variant="danger"></b-icon> Sin guardar</span>
            <span v-else class="pl-2"><b-icon icon="check-square" scale="2" variant="success"></b-icon></span>
            <b-button class="float-right" variant="primary" size="sm" @click="guardarRubrica">Guardar</b-button>
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import { validationMixin } from "vuelidate"
  import { required } from "vuelidate/lib/validators"

  export default {
    name: 'componentecritico',
    mixins: [validationMixin],
    props: {
        datosComponente: Object
    },
    components: {
    },
    data () {
      return {
        datosRubrica: {},
        infoRubrica: {
          id: null,
          rubrica: null,
          oportunidad: null,
          urgencia: null,
          tendencia: null,
          impacto: null
        },
        comboValoraciones: []
      }
    },
    validations: {
      infoRubrica: {
        oportunidad: { required },
        urgencia: { required },
        tendencia: { required },
        impacto: { required }
      }
    },
    methods: {
      async guardarRubrica() {
        this.$v.infoRubrica.$touch()
        if (this.$v.infoRubrica.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          await axios
          .put(CONFIG.ROOT_PATH + 'calidad/rubrica/priorizada', JSON.stringify(this.infoRubrica), { headers: {"Content-Type": "application/json; charset=utf-8" }})
          .then(response => {
            if (response.data.error) {
              this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Componente Priorizado')
            } else {
              this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Se ha actualizado el componente correctamente.')
              this.verRubrica()
            }
          })
          .catch(err => {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar Componente Priorizado. Intente más tarde. ' + err)
          })
        }
      },
      async verRubrica() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/rubrica/priorizada', { params: {idComponente: this.datosComponente.id, idPeriodo: this.$store.state.idPeriodoPmi, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Rubrica')
          } else{
            if (response.data.datos != 0) {
              this.infoRubrica = response.data.datos
              if ( response.data.datos.urgencia == 0 ) this.infoRubrica.urgencia = null
              if ( response.data.datos.tendencia == 0 ) this.infoRubrica.tendencia = null
              if ( response.data.datos.impacto == 0 ) this.infoRubrica.impacto = null
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Rubrica. Intente más tarde. ' + err)
        })
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoRubrica[name]
        return $dirty ? !$error : null
      },
      iniciarVista() {
        this.verRubrica()
        for (var i = 1; i <= 5; i++) {
          this.comboValoraciones.push({ 'value': i, 'text': i })
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
