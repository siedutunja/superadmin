<template>
  <div>
    <CRow>
      <CCol>
        <b-row>  
          <b-col lg="12" md="12">
            <b-form-group label="Institución Educativa">
              <h3 class="text-info">{{ infoCupos.nemo }}</h3>
            </b-form-group>
          </b-col>
          <b-col lg="12" md="12">
            <b-table-simple hover>
              <b-thead>
                <b-th style="background: #53606d; color: white; width: 20%">Grado</b-th>
                <b-th style="background: #53606d; color: white; width: 15%">Cupos<br>Proyectados</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Cupos<br>Nuevos<br>Ofertados</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Preinscritos<br>Nuevos</b-th>
                <b-th style="background: #53606d; color: white; width: 15%">Cupos<br>Nuevos<br>Disponibles</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Cupos<br>Traslados<br>Ofertados</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Preinscritos<br>Traslados</b-th>
                <b-th style="background: #53606d; color: white; width: 15%">Cupos<br>Traslados<br>Disponibles</b-th>
                <b-th style="background: #53606d; color: white; width: 15%">Total<br>Cupos<br>Disponibles</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Jardín</b-td>
                  <b-td>{{ infoCupos.p12 }}</b-td>
                  <b-td>{{ infoCupos.g12 }}</b-td>
                  <b-td>{{ infoCupos.d12 }}</b-td>
                  <b-td>{{ infoCupos.g12 - infoCupos.d12 }}</b-td>
                  <b-td>{{ infoCupos.t12 }}</b-td>
                  <b-td>{{ infoCupos.dt12 }}</b-td>
                  <b-td>{{ infoCupos.t12 - infoCupos.dt12 }}</b-td>
                  <b-td>{{ infoCupos.p12 - infoCupos.d12 + infoCupos.dt12 }}</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Transición</b-td>
                  <b-td>{{ infoCupos.p0 }}</b-td>
                  <b-td>{{ infoCupos.g0 }}</b-td>
                  <b-td>{{ infoCupos.d0 }}</b-td>
                  <b-td>{{ infoCupos.g0 - infoCupos.d0 }}</b-td>
                  <b-td>{{ infoCupos.t0 }}</b-td>
                  <b-td>{{ infoCupos.dt0 }}</b-td>
                  <b-td>{{ infoCupos.t0 - infoCupos.dt0 }}</b-td>
                  <b-td>{{ infoCupos.p0 - infoCupos.d0 + infoCupos.dt0 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Primero</b-td>
                  <b-td>{{ infoCupos.p1 }}</b-td>
                  <b-td>{{ infoCupos.g1 }}</b-td>
                  <b-td>{{ infoCupos.d1 }}</b-td>
                  <b-td>{{ infoCupos.g1 - infoCupos.d1 }}</b-td>
                  <b-td>{{ infoCupos.t1 }}</b-td>
                  <b-td>{{ infoCupos.dt1 }}</b-td>
                  <b-td>{{ infoCupos.t1 - infoCupos.dt1 }}</b-td>
                  <b-td>{{ infoCupos.p1 - infoCupos.d1 + infoCupos.dt1 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Segundo</b-td>
                  <b-td>{{ infoCupos.p2 }}</b-td>
                  <b-td>{{ infoCupos.g2 }}</b-td>
                  <b-td>{{ infoCupos.d2 }}</b-td>
                  <b-td>{{ infoCupos.g2 - infoCupos.d2 }}</b-td>
                  <b-td>{{ infoCupos.t2 }}</b-td>
                  <b-td>{{ infoCupos.dt2 }}</b-td>
                  <b-td>{{ infoCupos.t2 - infoCupos.dt2 }}</b-td>
                  <b-td>{{ infoCupos.p2 - infoCupos.d2 + infoCupos.dt2 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Tercero</b-td>
                  <b-td>{{ infoCupos.p3 }}</b-td>
                  <b-td>{{ infoCupos.g3 }}</b-td>
                  <b-td>{{ infoCupos.d3 }}</b-td>
                  <b-td>{{ infoCupos.g3 - infoCupos.d3 }}</b-td>
                  <b-td>{{ infoCupos.t3 }}</b-td>
                  <b-td>{{ infoCupos.dt3 }}</b-td>
                  <b-td>{{ infoCupos.t3 - infoCupos.dt3 }}</b-td>
                  <b-td>{{ infoCupos.p3 - infoCupos.d3 + infoCupos.dt3 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Cuarto</b-td>
                  <b-td>{{ infoCupos.p4 }}</b-td>
                  <b-td>{{ infoCupos.g4 }}</b-td>
                  <b-td>{{ infoCupos.d4 }}</b-td>
                  <b-td>{{ infoCupos.g4 - infoCupos.d4 }}</b-td>
                  <b-td>{{ infoCupos.t4 }}</b-td>
                  <b-td>{{ infoCupos.dt4 }}</b-td>
                  <b-td>{{ infoCupos.t4 - infoCupos.dt4 }}</b-td>
                  <b-td>{{ infoCupos.p4 - infoCupos.d4 + infoCupos.dt4 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Quinto</b-td>
                  <b-td>{{ infoCupos.p5 }}</b-td>
                  <b-td>{{ infoCupos.g5 }}</b-td>
                  <b-td>{{ infoCupos.d5 }}</b-td>
                  <b-td>{{ infoCupos.g5 - infoCupos.d5 }}</b-td>
                  <b-td>{{ infoCupos.t5 }}</b-td>
                  <b-td>{{ infoCupos.dt5 }}</b-td>
                  <b-td>{{ infoCupos.t5 - infoCupos.dt5 }}</b-td>
                  <b-td>{{ infoCupos.p5 - infoCupos.d5 + infoCupos.dt5 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Sexto</b-td>
                  <b-td>{{ infoCupos.p6 }}</b-td>
                  <b-td>{{ infoCupos.g6 }}</b-td>
                  <b-td>{{ infoCupos.d6 }}</b-td>
                  <b-td>{{ infoCupos.g6 - infoCupos.d6 }}</b-td>
                  <b-td>{{ infoCupos.t6 }}</b-td>
                  <b-td>{{ infoCupos.dt6 }}</b-td>
                  <b-td>{{ infoCupos.t6 - infoCupos.dt6 }}</b-td>
                  <b-td>{{ infoCupos.p6 - infoCupos.d6 + infoCupos.dt6 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Séptimo</b-td>
                  <b-td>{{ infoCupos.p7 }}</b-td>
                  <b-td>{{ infoCupos.g7 }}</b-td>
                  <b-td>{{ infoCupos.d7 }}</b-td>
                  <b-td>{{ infoCupos.g7 - infoCupos.d7 }}</b-td>
                  <b-td>{{ infoCupos.t7 }}</b-td>
                  <b-td>{{ infoCupos.dt7 }}</b-td>
                  <b-td>{{ infoCupos.t7 - infoCupos.dt7 }}</b-td>
                  <b-td>{{ infoCupos.p7 - infoCupos.d7 + infoCupos.dt7 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Octavo</b-td>
                  <b-td>{{ infoCupos.p8 }}</b-td>
                  <b-td>{{ infoCupos.g8 }}</b-td>
                  <b-td>{{ infoCupos.d8 }}</b-td>
                  <b-td>{{ infoCupos.g8 - infoCupos.d8 }}</b-td>
                  <b-td>{{ infoCupos.t8 }}</b-td>
                  <b-td>{{ infoCupos.dt8 }}</b-td>
                  <b-td>{{ infoCupos.t8 - infoCupos.dt8 }}</b-td>
                  <b-td>{{ infoCupos.p8 - infoCupos.d8 + infoCupos.dt8 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Noveno</b-td>
                  <b-td>{{ infoCupos.p9 }}</b-td>
                  <b-td>{{ infoCupos.g9 }}</b-td>
                  <b-td>{{ infoCupos.d9 }}</b-td>
                  <b-td>{{ infoCupos.g9 - infoCupos.d9 }}</b-td>
                  <b-td>{{ infoCupos.t9 }}</b-td>
                  <b-td>{{ infoCupos.dt9 }}</b-td>
                  <b-td>{{ infoCupos.t9 - infoCupos.dt9 }}</b-td>
                  <b-td>{{ infoCupos.p9 - infoCupos.d9 + infoCupos.dt9 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Décimo</b-td>
                  <b-td>{{ infoCupos.p10 }}</b-td>
                  <b-td>{{ infoCupos.g10 }}</b-td>
                  <b-td>{{ infoCupos.d10 }}</b-td>
                  <b-td>{{ infoCupos.g10 - infoCupos.d10 }}</b-td>
                  <b-td>{{ infoCupos.t10 }}</b-td>
                  <b-td>{{ infoCupos.dt10 }}</b-td>
                  <b-td>{{ infoCupos.t10 - infoCupos.dt10 }}</b-td>
                  <b-td>{{ infoCupos.p10 - infoCupos.d10 + infoCupos.dt10 }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Once</b-td>
                  <b-td>{{ infoCupos.p11 }}</b-td>
                  <b-td>{{ infoCupos.g11 }}</b-td>
                  <b-td>{{ infoCupos.d11 }}</b-td>
                  <b-td>{{ infoCupos.g11 - infoCupos.d11 }}</b-td>
                  <b-td>{{ infoCupos.t11 }}</b-td>
                  <b-td>{{ infoCupos.dt11 }}</b-td>
                  <b-td>{{ infoCupos.t11 - infoCupos.dt11 }}</b-td>
                  <b-td>{{ infoCupos.p11 - infoCupos.d11 + infoCupos.dt11 }}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col lg="12" md="12"><hr></b-col>
          <b-col lg="12" md="12">
            <b-button class="small mt-1" variant="light" @click="cancelarFormulario">Cancelar</b-button>
          </b-col>
        </b-row>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'CuposDisponibles',
    props: {
        datosCupos: Object
    },
    components: {
    },
    data () {
      return {
        infoCupos: {
          id: null,
          nemo: null,
          p0: null,
          p1: null,
          p2: null,
          p3: null,
          p4: null,
          p5: null,
          p6: null,
          p7: null,
          p8: null,
          p9: null,
          p10: null,
          p11: null,
          p12: null,
          g0: null,
          g1: null,
          g2: null,
          g3: null,
          g4: null,
          g5: null,
          g6: null,
          g7: null,
          g8: null,
          g9: null,
          g10: null,
          g11: null,
          g12: null,
          d0: null,
          d1: null,
          d2: null,
          d3: null,
          d4: null,
          d5: null,
          d6: null,
          d7: null,
          d8: null,
          d9: null,
          d10: null,
          d11: null,
          d12: null,
          t0: null,
          t1: null,
          t2: null,
          t3: null,
          t4: null,
          t5: null,
          t6: null,
          t7: null,
          t8: null,
          t9: null,
          t10: null,
          t11: null,
          t12: null,
          dt0: null,
          dt1: null,
          dt2: null,
          dt3: null,
          dt4: null,
          dt5: null,
          dt6: null,
          dt7: null,
          dt8: null,
          dt9: null,
          dt10: null,
          dt11: null,
          dt12: null,
        }
      }
    },
    methods: {
      async consultaCupos() {
        this.infoCupos = this.datosCupos
      },
      cancelarFormulario() {
        this.$emit("retorno", 0)
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    beforeMount() {
      this.consultaCupos()
    },
    computed: {
    }
  }
</script>
