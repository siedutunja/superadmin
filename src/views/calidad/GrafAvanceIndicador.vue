<template>
  <div class="pb-3">
    <h4 class="text-center mb-4">AVANCE INDICADOR</h4>
    <CChartDoughnut :datasets="defaultDatasets" :labels="['Avance#1', 'Avance#2', 'Sin Avance']" />
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
            backgroundColor: ['#00FF00','#FCDE06','#C006FC'],
            data: [this.datosGrafica.Avance1, this.datosGrafica.Avance2, this.datosGrafica.sinAvance]
          }
        ]
      }
    }
  }
</script>
