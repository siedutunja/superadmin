<template>
  <div>
    <b-card>
      <template #header>
        <p class="mb-0">Componente:<br><span style="font-weight: bold; font-size: 16">{{ datosComponente.componente.toUpperCase() }}</span></p>
      </template>
      <b-card-group deck>
        <b-card :bg-variant="datosRubrica.rubrica==1 ? 'primary' : ''" :text-variant="datosRubrica.rubrica==1 ? 'white' : ''" header="1. EXISTENCIA" class="text-center">
          <b-card-text>{{datosComponente.existencia}}</b-card-text>
          <template #footer>
            <b-form-radio :class="datosRubrica.rubrica==1 ? 'text-muted' : 'text-info'" v-model="rubricaSeleccionada" name="'opt'+datosRubrica.id" value="1" @change="guardarRubrica" :disabled="datosRubrica.rubrica==1 ? true : false"><span v-if="datosRubrica.rubrica!=1">Seleccionar</span></b-form-radio>
          </template>
        </b-card>
        <b-card :bg-variant="datosRubrica.rubrica==2 ? 'primary' : ''" :text-variant="datosRubrica.rubrica==2 ? 'white' : ''" header="2. PERTINENCIA" class="text-center">
          <b-card-text>{{this.datosComponente.pertinencia}}</b-card-text>
          <template #footer>
            <b-form-radio :class="datosRubrica.rubrica==2 ? 'text-muted' : 'text-info'" v-model="rubricaSeleccionada" :name="'opt'+datosRubrica.id" value="2" @change="guardarRubrica" :disabled="datosRubrica.rubrica==2 ? true : false"><span v-if="datosRubrica.rubrica!=2">Seleccionar</span></b-form-radio>
          </template>
        </b-card>
        <b-card :bg-variant="datosRubrica.rubrica==3 ? 'primary' : ''" :text-variant="datosRubrica.rubrica==3 ? 'white' : ''" header="3. APROPIACIÓN" class="text-center">
          <b-card-text>{{this.datosComponente.apropiacion}}</b-card-text>
          <template #footer>
            <b-form-radio :class="datosRubrica.rubrica==3 ? 'text-muted' : 'text-info'" v-model="rubricaSeleccionada" :name="'opt'+datosRubrica.id" value="3" @change="guardarRubrica" :disabled="datosRubrica.rubrica==3 ? true : false"><span v-if="datosRubrica.rubrica!=3">Seleccionar</span></b-form-radio>
          </template>
        </b-card>
        <b-card :bg-variant="datosRubrica.rubrica==4 ? 'primary' : ''" :text-variant="datosRubrica.rubrica==4 ? 'white' : ''" header="4. MEJORAMIENTO CONTINUO" class="text-center">
          <b-card-text>{{this.datosComponente.mejoramiento}}</b-card-text>
          <template #footer>
            <b-form-radio :class="datosRubrica.rubrica==4 ? 'text-muted' : 'text-info'" v-model="rubricaSeleccionada" :name="'opt'+datosRubrica.id" value="4" @change="guardarRubrica" :disabled="datosRubrica.rubrica==4 ? true : false"><span v-if="datosRubrica.rubrica!=4">Seleccionar</span></b-form-radio>
          </template>
        </b-card>
        <b-card :bg-variant="datosRubrica.rubrica==-1 ? 'primary' : ''" :text-variant="datosRubrica.rubrica==-1 ? 'white' : ''" header="NO APLICA" class="text-center">
          <b-card-text>{{this.datosComponente.noaplica}}</b-card-text>
          <template #footer>
            <b-form-radio :class="datosRubrica.rubrica==-1 ? 'text-muted' : 'text-info'" v-model="rubricaSeleccionada" :name="'opt'+datosRubrica.id" value="-1" @change="guardarRubrica" :disabled="datosRubrica.rubrica==-1 ? true : false"><span v-if="datosRubrica.rubrica!=-1">Seleccionar</span></b-form-radio>
          </template>
        </b-card>
      </b-card-group>
    </b-card>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'rubricacomponente',
    props: {
        datosComponente: Object
    },
    components: {
    },
    data () {
      return {
        datosRubrica: {},
        infoRubrica: {},
        rubricaSeleccionada: null
      }
    },
    methods: {
      async guardarRubrica() {
        this.infoRubrica.id = this.datosRubrica.id
        this.infoRubrica.rubrica = this.rubricaSeleccionada
        await axios
        .put(CONFIG.ROOT_PATH + 'calidad/evaluaciones/rubrica', JSON.stringify(this.infoRubrica), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error) {
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar evaluacion rubrica')
          } else {
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Se ha actualizado la evaluación del componente correctamente.')
            this.seleccionarRubrica()
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Actualizar evaluacion rubrica. Intente más tarde. ' + err)
        })
      },
      async seleccionarRubrica() {
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/evaluaciones/rubrica', { params: {idComponente: this.datosComponente.id, idPeriodo: this.$store.state.idPeriodoPmi, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Datos Rubrica')
          } else{
            if (response.data.datos != 0) {
              this.datosRubrica = response.data.datos
              this.rubricaSeleccionada = this.datosRubrica.rubrica
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Datos Rubrica. Intente más tarde. ' + err)
        })
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.seleccionarRubrica()
    }
  }
</script>
