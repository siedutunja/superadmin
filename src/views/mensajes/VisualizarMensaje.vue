<template>
  <div>
    <b-row>
      <b-col>
        <b-card>
          <b-row>  
            <b-col lg="12" md="12">
              <b-alert variant="primary" show><span style="font-weight: bold; font-size: 16">Título del Mensaje:</span> <br> {{ datosMensaje.titulo }}</b-alert>
            </b-col>
            <b-col lg="12" md="12">
              <b-alert variant="primary" show><span style="font-weight: bold; font-size: 16">Dirigido A:</span> <br> {{ datosMensaje.dirigido }}</b-alert>
            </b-col>
            <b-col lg="12" md="12">
              <b-alert variant="primary" show><span style="font-weight: bold; font-size: 16">Mensaje:</span> <br> {{ datosMensaje.mensaje }}</b-alert>
            </b-col>
            <b-col lg="4" md="12">
              <b-alert variant="primary" show><span style="font-weight: bold; font-size: 16">Prioridad:</span> <br> {{ datosMensaje.id_prioridad == 1 ? '¡Urgente!' : 'Normal' }}</b-alert>
            </b-col>
            <b-col lg="4" md="12">
              <b-alert variant="primary" show><span style="font-weight: bold; font-size: 16">Recibido:</span> <br> {{ datosMensaje.enviado.substr(0,10) }}</b-alert>
            </b-col>
            <b-col lg="4" md="12" v-if="datosMensaje.fecha!=null">
              <b-alert variant="primary" show><span style="font-weight: bold; font-size: 16">Leido:</span> <br> {{ datosMensaje.fecha.substr(0,10) }}</b-alert>
            </b-col>
          </b-row>
        </b-card>
        <b-row>
          <b-col lg="12">
            <b-button class="small mt-1" variant="light" @click="cancelarFormulario">Cerrar Mensaje</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: 'visualizarmensaje',
    props: {
        datosMensaje: Object
    },
    data () {
      return {
      }
    },
    methods: {
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
    },
    beforeMount() {
    }
  }
</script>
