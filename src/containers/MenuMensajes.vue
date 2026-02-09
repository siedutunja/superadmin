<template>
  <div>
  <CDropdown inNav class="c-header-nav-items" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cil-bell"/>
        <CBadge color="danger" class="ml-2">{{ itemsCount - numLeidos }}</CBadge>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center text-light" color="dark"><strong>Mensajes</strong></CDropdownHeader>

    <CDropdownItem  v-for="item in listaMensajes" :key="item.id" @click="verMensaje(item)">
      <span v-if="item.fecha == null">
        <b-avatar :variant="item.id_prioridad==0 ? 'info' : 'danger'" text="-" size="1rem" class="mr-1"></b-avatar><strong>{{item.titulo}}</strong><br>
        <span class="small text-medium-emphasis ml-4"><em><strong><span :class="item.id_prioridad==1 ? 'text-danger' : 'text-info'">{{item.id_prioridad==1 ? '¡Urgente!' : 'Normal'}}</span><span class="mx-2">|</span>Enviado: {{item.enviado != null && item.enviado != '' ? item.enviado.substr(0,10) : '-'}}</strong></em></span>
      </span>
      <span v-else>
        <b-avatar :variant="item.id_prioridad==0 ? 'info' : 'danger'" text="-" size="1rem" class="mr-1"></b-avatar>{{item.titulo}}<br>
        <span class="small text-medium-emphasis ml-4">Enviado: {{item.enviado != null && item.enviado != '' ? item.enviado.substr(0,10) : '-'}} <span class="mx-2">|</span>Leido: {{item.fecha != null && item.fecha != '' ? item.fecha.substr(0,10) : '-'}}</span>
      </span>
    </CDropdownItem>
    <div v-if="itemsCount == 7">
      <CDropdownDivider/>
      <CDropdownItem @click="verMensajes">
        <em>Ver todos los mensajes...</em>
      </CDropdownItem>
    </div>
  </CDropdown>
    <b-modal ref="modalLeerMensaje" size="xl" scrollable hide-footer title="Leer Mensaje" ok-only>
      <div class="mx-3">
        <div>
          <LeerMensaje :datosMensaje="datosMensaje" @retorno="datosRecibidosMensaje"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import LeerMensaje from '@/views/mensajes/LeerMensaje'

  export default {
    name: 'MenuMensajes',
    components: {
      LeerMensaje
    },
    data () {
      return { 
        datosMensaje: {},
        listaMensajes: [],
        itemsCount: 0,
        numLeidos: 0
      }
    },
    methods: {
      guia34() {
        let ruta = "https://siedutunja.gov.co/manuales/Guia_34_PMI.pdf"
        window.open(ruta, '_blank')
      },
      manualAdmin() {
        let ruta = "https://siedutunja.gov.co/manuales/ManualAdminColegio.pdf"
        window.open(ruta, '_blank')
      },
      verMensaje(item) {
        this.datosMensaje.id = item.id
        this.datosMensaje.titulo = item.titulo
        this.datosMensaje.dirigido = item.dirigido
        this.datosMensaje.mensaje = item.mensaje
        this.datosMensaje.id_prioridad = item.id_prioridad
        this.datosMensaje.enviado = item.enviado
        this.datosMensaje.fecha = item.fecha
        this.$refs['modalLeerMensaje'].show()
      },
      verMensajes() {
        this.$router.push('/vermensajes')
      },
      async consultaMensajes() {
        this.listaMensajes = []
        this.numLeidos = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'mensajes/listamensajes/colegio', { params: { idUsuario: this.$store.state.idUsuario }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista Mensajes')
          } else{
            if (response.data.datos != 0) {
              this.listaMensajes = response.data.datos
              this.itemsCount = this.listaMensajes.length
              this.listaMensajes.forEach(element => {
                if (element.fecha != null) {
                  this.numLeidos++
                }
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Lista Mensajes. Intente más tarde.' + err)
        })
      },
      datosRecibidosMensaje(retorno) {
        if (retorno == 0) {
          this.$refs['modalLeerMensaje'].hide()
        }
        this.consultaMensajes()
      },
      iniciarVista() {
        if (this.$store.state.idSectorInstitucion == 1) {
          this.consultaMensajes()
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

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>