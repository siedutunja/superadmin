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
            <!--<b-button v-if="datosMensaje.fecha==null" class="small mt-1 mr-3" variant="success" @click="mensajeLeido">Dar por Leido el Mensaje</b-button>-->
            <b-button class="small mt-1" variant="light" @click="cancelarFormulario">Cerrar Mensaje</b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'leermensaje',
    props: {
        datosMensaje: Object
    },
    data () {
      return {
      }
    },
    methods: {
      async mensajeLeido() {
        let infoMensajeLeido = {}
        infoMensajeLeido.idMensaje = this.datosMensaje.id
        infoMensajeLeido.idUsuario = this.$store.state.idUsuario
        await axios
        .post(CONFIG.ROOT_PATH + 'mensajes/leido', JSON.stringify(infoMensajeLeido), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Mensaje Leido')
            this.$emit("retorno", 0)
          } else {
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Mensaje Leido. Intente más tarde. ' + err)
        })
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      iniciarVista() {
        if(this.datosMensaje.fecha == null) {
          this.mensajeLeido()
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
