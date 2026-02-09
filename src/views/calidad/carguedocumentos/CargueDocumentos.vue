<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2 text-center">
              <h4>DESARROLLO INSTITUCIONAL - LISTA DE DOCUMENTOS A ENVIAR</h4>
              <h5>AÑO LECTIVO 2024</h5>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <div>
      <b-row v-if="listaDocumentos.length">
        <b-col lg="12" md="12">
          <div v-for="item in listaDocumentos" :key="item.id">
            <CargaDocumento :datosDocumento="item" />
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import CargaDocumento from '@/views/calidad/carguedocumentos/CargarDocumento'

  export default {
    name: 'carguedocumentos',
    components: {
      CargaDocumento
    },
    data () {
      return {
        listaDocumentos: [],
        vigencia: 2024,
      }
    },
    methods: {
      async listaDocumentosCargue() {
        this.listaDocumentos = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/listadocumentos', { params: {vigencia: this.vigencia }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista de Documentos')
          } else{
            if (response.data.datos != 0) {
              this.listaDocumentos = response.data.datos
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista de Documentos. Intente más tarde. ' + err)
        })
      },
      iniciarVista() {
        if(this.$store.state.colpmi == 1) {
          this.listaDocumentosCargue()
        } else {
          this.$router.push('/restringida')
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
