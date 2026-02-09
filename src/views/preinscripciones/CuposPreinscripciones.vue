<template>
  <div>
    <b-row>
      <b-col lg="12">
        <h3 class="ml-2"><b-icon icon="layers-fill" aria-hidden="true"></b-icon> CUPOS DISPONIBLES PARA PREINSCRIPCIONES</h3>
      </b-col>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="4">
              <b-form-group label="Grupo de Preinscripciones" label-for="grupo" style="font-weight: bold; font-size: 16">
                <b-form-select  id="grupo" ref="grupo" v-model="idGrupo" :options="comboGrupos" @change="consultaPeriodoActivo"></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="8" v-if="estadoPre==1">
              <b-form-group label="Descripción del Periodo Activo" style="font-weight: bold; font-size: 16">
                <h3>{{ datosPeriodo.descripcion }}</h3>
              </b-form-group>
            </b-col>
            <b-col lg="4" v-if="estadoPre==1">
              <b-form-group label="Vigencia" style="font-weight: bold; font-size: 16">
                <h3>{{ datosPeriodo.vigencia }}</h3>
              </b-form-group>
            </b-col>
            <b-col lg="4"  v-if="estadoPre==1">
              <b-form-group label="Fecha Inicia" style="font-weight: bold; font-size: 16">
                <h3>{{ datosPeriodo.fecha_inicia!=null? datosPeriodo.fecha_inicia.substr(0,10) : '-' }}</h3>
              </b-form-group>
            </b-col>
            <b-col lg="4"  v-if="estadoPre==1">
              <b-form-group label="Fecha Termina" style="font-weight: bold; font-size: 16">
                <h3>{{ datosPeriodo.fecha_termina!=null? datosPeriodo.fecha_termina.substr(0,10) : '-' }}</h3>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-2" v-if="idGrupo!=null">
      <b-col lg="12">
        <b-card>
          <b-row>
            <b-col lg="12">
              <h5 class="ml-2"><b-icon icon="card-checklist" aria-hidden="true"></b-icon> CUPOS DISPONIBLES</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="12">
              <vue-good-table :columns="idGrupo==1? encabColumnas1 : encabColumnas2" :rows="listaColegios" styleClass="vgt-table condensed bordered striped">
                <template slot="table-row" slot-scope="props">
                  <span v-if="props.column.field == 'nemo'">
                    <span style="font-weight: bold; color: blue; cursor: pointer" @click="seleccionarColegio(props.row)">{{props.row.nemo}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g12'">
                    <span>{{props.row.p12 - props.row.d12 + props.row.dt12}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g0'">
                    <span>{{props.row.p0 - props.row.d0 + props.row.dt0}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g1'">
                    <span>{{props.row.p1 - props.row.d1 + props.row.dt1}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g2'">
                    <span>{{props.row.p2 - props.row.d2 + props.row.dt2}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g3'">
                    <span>{{props.row.p3 - props.row.d3 + props.row.dt3}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g4'">
                    <span>{{props.row.p4 - props.row.d4 + props.row.dt4}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g5'">
                    <span>{{props.row.p5 - props.row.d5 + props.row.dt5}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g6'">
                    <span>{{props.row.p6 - props.row.d6 + props.row.dt6}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g7'">
                    <span>{{props.row.p7 - props.row.d7 + props.row.dt7}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g8'">
                    <span>{{props.row.p8 - props.row.d8 + props.row.dt8}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g9'">
                    <span>{{props.row.p9 - props.row.d9 + props.row.dt9}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g10'">
                    <span>{{props.row.p10 - props.row.d10 + props.row.dt10}}</span> 
                  </span>
                  <span v-if="props.column.field == 'g11'">
                    <span>{{props.row.p11 - props.row.d11 + props.row.dt11}}</span> 
                  </span>
                  <span v-if="props.column.field == 'totalcupos'">
                    <span>{{props.row.totalcupos}}</span> 
                  </span>
                </template>
                <div slot="emptystate">
                  <h5 class="text-danger ml-5">No existen colegios con cupos</h5>
                </div>
              </vue-good-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-modal ref="modalActualizarCupos" size="xl" scrollable hide-footer title="Cupos Disponibles" ok-only>
      <div class="mx-3">
        <div>
          <CuposDisponibles :datosCupos="datosCupos" @retorno="datosRecibidosCupos"/>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'
  import 'vue-good-table/dist/vue-good-table.css'
  import { VueGoodTable } from 'vue-good-table'
  import CuposDisponibles from '@/views/preinscripciones/CuposDisponibles'

  export default {
    name: 'CuposPreinscripciones',
    components: {
      VueGoodTable,
      CuposDisponibles
    },
    data () {
      return {
        datosPeriodo: {
          id: null,
          descripcion: null,
          vigencia: null,
          aviso: null,
          fecha_inicia: null,
          fecha_termina: null,
        },
        estadoPre: null,
        listaColegios: [],
        datosCupos: {
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
          idGrupo: null
        },
        encabColumnas1 : [
          { label: 'Institución Educativa', field: 'nemo' },
          { label: 'JAR', field: 'g12', sortable: false },
          { label: 'PRE', field: 'g0', sortable: false },
          { label: 'G01', field: 'g1', sortable: false },
          { label: 'G02', field: 'g2', sortable: false },
          { label: 'G03', field: 'g3', sortable: false },
          { label: 'G04', field: 'g4', sortable: false },
          { label: 'G05', field: 'g5', sortable: false },
          { label: 'G06', field: 'g6', sortable: false },
          { label: 'G07', field: 'g7', sortable: false },
          { label: 'G08', field: 'g8', sortable: false },
          { label: 'G09', field: 'g9', sortable: false },
          { label: 'G10', field: 'g10', sortable: false },
          { label: 'G11', field: 'g11', sortable: false },
          { label: 'Total', field: 'totalcupos', sortable: false }
        ],
        encabColumnas2 : [
          { label: 'Institución Educativa', field: 'nemo' },
          { label: 'PRE', field: 'g0', sortable: false },
          { label: 'Total', field: 'totalcupos', sortable: false }
        ],
        idGrupo: null,
        comboGrupos: []
      }
    },
    methods: {
      datosRecibidosCupos(retorno) {
        if (retorno == 1) {
          this.verColegios()
          this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Datos actualizados correctamente.')
        }
        this.$refs['modalActualizarCupos'].hide()
      },
      seleccionarColegio(item) {
        this.datosCupos.id = item.id
        this.datosCupos.nemo = item.nemo
        this.datosCupos.p0 = item.p0
        this.datosCupos.p1 = item.p1
        this.datosCupos.p2 = item.p2
        this.datosCupos.p3 = item.p3
        this.datosCupos.p4 = item.p4
        this.datosCupos.p5 = item.p5
        this.datosCupos.p6 = item.p6
        this.datosCupos.p7 = item.p7
        this.datosCupos.p8 = item.p8
        this.datosCupos.p9 = item.p9
        this.datosCupos.p10 = item.p10
        this.datosCupos.p11 = item.p11
        this.datosCupos.p12 = item.p12
        this.datosCupos.g0 = item.g0
        this.datosCupos.g1 = item.g1
        this.datosCupos.g2 = item.g2
        this.datosCupos.g3 = item.g3
        this.datosCupos.g4 = item.g4
        this.datosCupos.g5 = item.g5
        this.datosCupos.g6 = item.g6
        this.datosCupos.g7 = item.g7
        this.datosCupos.g8 = item.g8
        this.datosCupos.g9 = item.g9
        this.datosCupos.g10 = item.g10
        this.datosCupos.g11 = item.g11
        this.datosCupos.g12 = item.g12
        this.datosCupos.d0 = item.d0
        this.datosCupos.d1 = item.d1
        this.datosCupos.d2 = item.d2
        this.datosCupos.d3 = item.d3
        this.datosCupos.d4 = item.d4
        this.datosCupos.d5 = item.d5
        this.datosCupos.d6 = item.d6
        this.datosCupos.d7 = item.d7
        this.datosCupos.d8 = item.d8
        this.datosCupos.d9 = item.d9
        this.datosCupos.d10 = item.d10
        this.datosCupos.d11 = item.d11
        this.datosCupos.d12 = item.d12
        this.datosCupos.t0 = item.t0
        this.datosCupos.t1 = item.t1
        this.datosCupos.t2 = item.t2
        this.datosCupos.t3 = item.t3
        this.datosCupos.t4 = item.t4
        this.datosCupos.t5 = item.t5
        this.datosCupos.t6 = item.t6
        this.datosCupos.t7 = item.t7
        this.datosCupos.t8 = item.t8
        this.datosCupos.t9 = item.t9
        this.datosCupos.t10 = item.t10
        this.datosCupos.t11 = item.t11
        this.datosCupos.t12 = item.t12
        this.datosCupos.dt0 = item.dt0
        this.datosCupos.dt1 = item.dt1
        this.datosCupos.dt2 = item.dt2
        this.datosCupos.dt3 = item.dt3
        this.datosCupos.dt4 = item.dt4
        this.datosCupos.dt5 = item.dt5
        this.datosCupos.dt6 = item.dt6
        this.datosCupos.dt7 = item.dt7
        this.datosCupos.dt8 = item.dt8
        this.datosCupos.dt9 = item.dt9
        this.datosCupos.dt10 = item.dt10
        this.datosCupos.dt11 = item.dt11
        this.datosCupos.dt12 = item.dt12
        this.datosCupos.idGrupo = this.idGrupo
        this.$refs['modalActualizarCupos'].show()
      },
      async verColegios() {
        this.listaColegios = []
        await axios
        .get(CONFIG.ROOT_PATH + 'colegios/listasimple/cupos/institucion', { params: { idPeriodo: this.datosPeriodo.id, idColegio: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Lista simple de colegios')
          } else{
            if (response.data.datos != 0) {
              this.listaColegios = response.data.datos
            }
          }
        })
        .catch(err => {
          console.log(err)
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta lista simple colegios. Intente más tarde.' + err)
        })
      },
      async consultaPeriodoActivo() {
        this.datosPeriodo = []
        this.estadoPre = 0
        await axios
        .get(CONFIG.ROOT_PATH + 'configuraciones/preinscripciones', { params: {idGrupo: this.idGrupo}})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' Datos de configuración del sistema')
          } else{
            if (response.data.datos != 0) {
              this.datosPeriodo = response.data.datos
              this.estadoPre = 1
              this.verColegios()
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar la consulta de configuración del sistema. Intente más tarde.' + err)
        })
      },
      async ocuparComboGrupos() {
        await axios
        .get(CONFIG.ROOT_PATH + 'combos/listagrupospreinscripciones')
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Combo de Grupos Preinscripciones')
          } else{
            if (response.data.datos != 0) {
              response.data.datos.forEach(element => {
                this.comboGrupos.push({ 'value': element.id, 'text': element.grupo })
              })
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Combo de Grupos Preinscripciones. Intente más tarde. ' + err)
        })
      },
      iniciarVista() {
        if(this.$store.state.colcobertura == 1) {
          this.ocuparComboGrupos()
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