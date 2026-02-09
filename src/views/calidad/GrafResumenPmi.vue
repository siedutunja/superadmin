<template>
  <div class="pb-3">
    <h4 class="text-center mb-4">ESTADOS PMI</h4>
    <CChartDoughnut :datasets="defaultDatasets" :labels="['Aceptado', 'Devueltos', 'En Revisión','En Proceso']" />
    <!--<div class="small text-medium-emphasis text-center text-dark">TOTAL: {{ totalPmi }}</div>-->
  </div>
</template>

<script>
  //import axios from "axios"
  //import * as CONFIG from '@/assets/config.js'
  import { CChartDoughnut } from '@coreui/vue-chartjs'

  export default {
    name: 'GrafResumenPmi',
    props: {
        datosGrafica: Object
    },
    components: {
      CChartDoughnut
    },
    data () {
      return {
      }
    },
    methods: {
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
    },
    computed: {
      defaultDatasets () {
        return [
          {
            backgroundColor: ['#00FF00','#FCDE06','#C006FC','#FC064D'],
            data: [this.datosGrafica.numAceptados, this.datosGrafica.numDevueltos, this.datosGrafica.numRevision, this.datosGrafica.numFaltapmi]
          }
        ]
      }
    }
  }
</script>
