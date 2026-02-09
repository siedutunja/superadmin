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
                <b-th style="background: #53606d; color: white; width: 15%">Cupos<br>Proyectados<br>I.E.</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Preinscritos<br>Nuevos<br>a la Fecha</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Preinscritos<br>Traslados<br>a la Fecha</b-th>
                <b-th style="background: #53606d; color: white; width: 15%">Cupos<br>Disponibles<br>a la Fecha</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Cupos<br>Nuevos<br>Ofertados</b-th>
                <b-th style="background: #53606d; color: white; width: 10%">Cupos<br>Traslados<br>Ofertados</b-th>
                <b-th style="background: #53606d; color: white; width: 15%">Total<br>Cupos<br>Ofertados</b-th>
              </b-thead>
              <b-tbody>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Jardín</b-td>
                  <b-td>{{ infoCupos.p12 }}</b-td>
                  <b-td>{{ infoCupos.d12 }}</b-td>
                  <b-td>{{ infoCupos.dt12 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p12 - infoCupos.d12 + infoCupos.dt12 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g12.$model" :state="validateState('g12')" aria-describedby="feedDesc12" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g12 = validarNuevos(infoCupos.g12,infoCupos.d12,infoCupos.t12,infoCupos.p12)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc12" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t12.$model" :state="validateState('t12')" aria-describedby="feedDesc12t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t12 = validarTraslados(infoCupos.g12,infoCupos.t12,infoCupos.td12,infoCupos.p12)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc12t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g12,infoCupos.t12,infoCupos.d12,infoCupos.dt12,infoCupos.p12) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g12,infoCupos.t12,infoCupos.d12,infoCupos.dt12,infoCupos.p12) }}</b-td>
                </b-tr>
                <b-tr>
                  <b-td>Transición</b-td>
                  <b-td>{{ infoCupos.p0 }}</b-td>
                  <b-td>{{ infoCupos.d0 }}</b-td>
                  <b-td>{{ infoCupos.dt0 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p0 - infoCupos.d0 - infoCupos.dt0 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g0.$model" :state="validateState('g0')" aria-describedby="feedDesc0" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g0 = validarNuevos(infoCupos.g0,infoCupos.d0,infoCupos.t0,infoCupos.p0)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc0" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t0.$model" :state="validateState('t0')" aria-describedby="feedDesc0t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t0 = validarTraslados(infoCupos.g0,infoCupos.t0,infoCupos.td0,infoCupos.p0)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc0t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g0,infoCupos.t0,infoCupos.d0,infoCupos.dt0,infoCupos.p0) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g0,infoCupos.t0,infoCupos.d0,infoCupos.dt0,infoCupos.p0) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Primero</b-td>
                  <b-td>{{ infoCupos.p1 }}</b-td>
                  <b-td>{{ infoCupos.d1 }}</b-td>
                  <b-td>{{ infoCupos.dt1 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p1 - infoCupos.d1 - infoCupos.dt1 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g1.$model" :state="validateState('g1')" aria-describedby="feedDesc1" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g1 = validarNuevos(infoCupos.g1,infoCupos.d1,infoCupos.t1,infoCupos.p1)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc1" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t1.$model" :state="validateState('t1')" aria-describedby="feedDesc1t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t1 = validarTraslados(infoCupos.g1,infoCupos.t1,infoCupos.td1,infoCupos.p1)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc1t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g1,infoCupos.t1,infoCupos.d1,infoCupos.dt1,infoCupos.p1) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g1,infoCupos.t1,infoCupos.d1,infoCupos.dt1,infoCupos.p1) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Segundo</b-td>
                  <b-td>{{ infoCupos.p2 }}</b-td>
                  <b-td>{{ infoCupos.d2 }}</b-td>
                  <b-td>{{ infoCupos.dt2 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p2 - infoCupos.d2 - infoCupos.dt2 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g2.$model" :state="validateState('g2')" aria-describedby="feedDesc2" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g2 = validarNuevos(infoCupos.g2,infoCupos.d2,infoCupos.t2,infoCupos.p2)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc2" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t2.$model" :state="validateState('t2')" aria-describedby="feedDesc2t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t2 = validarTraslados(infoCupos.g2,infoCupos.t2,infoCupos.td2,infoCupos.p2)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc2t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g2,infoCupos.t2,infoCupos.d2,infoCupos.dt2,infoCupos.p2) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g2,infoCupos.t2,infoCupos.d2,infoCupos.dt2,infoCupos.p2) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Tercero</b-td>
                  <b-td>{{ infoCupos.p3 }}</b-td>
                  <b-td>{{ infoCupos.d3 }}</b-td>
                  <b-td>{{ infoCupos.dt3 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p3 - infoCupos.d3 - infoCupos.dt3 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g3.$model" :state="validateState('g3')" aria-describedby="feedDesc3" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g3 = validarNuevos(infoCupos.g3,infoCupos.d3,infoCupos.t3,infoCupos.p3)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc3" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t3.$model" :state="validateState('t3')" aria-describedby="feedDesc3t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t3 = validarTraslados(infoCupos.g3,infoCupos.t3,infoCupos.td3,infoCupos.p3)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc3t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g3,infoCupos.t3,infoCupos.d3,infoCupos.dt3,infoCupos.p3) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g3,infoCupos.t3,infoCupos.d3,infoCupos.dt3,infoCupos.p3) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Cuarto</b-td>
                  <b-td>{{ infoCupos.p4 }}</b-td>
                  <b-td>{{ infoCupos.d4 }}</b-td>
                  <b-td>{{ infoCupos.dt4 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p4 - infoCupos.d4 - infoCupos.dt4 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g4.$model" :state="validateState('g4')" aria-describedby="feedDesc4" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g4 = validarNuevos(infoCupos.g4,infoCupos.d4,infoCupos.t4,infoCupos.p4)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc4" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t4.$model" :state="validateState('t4')" aria-describedby="feedDesc4t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t4 = validarTraslados(infoCupos.g4,infoCupos.t4,infoCupos.td4,infoCupos.p4)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc4t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g4,infoCupos.t4,infoCupos.d4,infoCupos.dt4,infoCupos.p4) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g4,infoCupos.t4,infoCupos.d4,infoCupos.dt4,infoCupos.p4) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Quinto</b-td>
                  <b-td>{{ infoCupos.p5 }}</b-td>
                  <b-td>{{ infoCupos.d5 }}</b-td>
                  <b-td>{{ infoCupos.dt5 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p5 - infoCupos.d5 - infoCupos.dt5 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g5.$model" :state="validateState('g5')" aria-describedby="feedDesc5" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g5 = validarNuevos(infoCupos.g5,infoCupos.d5,infoCupos.t5,infoCupos.p5)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc5" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t5.$model" :state="validateState('t5')" aria-describedby="feedDesc5t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t5 = validarTraslados(infoCupos.g5,infoCupos.t5,infoCupos.td5,infoCupos.p5)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc5t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g5,infoCupos.t5,infoCupos.d5,infoCupos.dt5,infoCupos.p5) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g5,infoCupos.t5,infoCupos.d5,infoCupos.dt5,infoCupos.p5) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Sexto</b-td>
                  <b-td>{{ infoCupos.p6 }}</b-td>
                  <b-td>{{ infoCupos.d6 }}</b-td>
                  <b-td>{{ infoCupos.dt6 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p6 - infoCupos.d6 - infoCupos.dt6 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g6.$model" :state="validateState('g6')" aria-describedby="feedDesc6" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g6 = validarNuevos(infoCupos.g6,infoCupos.d6,infoCupos.t6,infoCupos.p6)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc6" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t6.$model" :state="validateState('t6')" aria-describedby="feedDesc6t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t6 = validarTraslados(infoCupos.g6,infoCupos.t6,infoCupos.td6,infoCupos.p6)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc6t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g6,infoCupos.t6,infoCupos.d6,infoCupos.dt6,infoCupos.p6) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g6,infoCupos.t6,infoCupos.d6,infoCupos.dt6,infoCupos.p6) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Séptimo</b-td>
                  <b-td>{{ infoCupos.p7 }}</b-td>
                  <b-td>{{ infoCupos.d7 }}</b-td>
                  <b-td>{{ infoCupos.dt7 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p7 - infoCupos.d7 - infoCupos.dt7 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g7.$model" :state="validateState('g7')" aria-describedby="feedDesc7" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g7 = validarNuevos(infoCupos.g7,infoCupos.d7,infoCupos.t7,infoCupos.p7)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc7" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t7.$model" :state="validateState('t7')" aria-describedby="feedDesc7t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t7 = validarTraslados(infoCupos.g7,infoCupos.t7,infoCupos.td7,infoCupos.p7)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc7t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g7,infoCupos.t7,infoCupos.d7,infoCupos.dt7,infoCupos.p7) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g7,infoCupos.t7,infoCupos.d7,infoCupos.dt7,infoCupos.p7) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Octavo</b-td>
                  <b-td>{{ infoCupos.p8 }}</b-td>
                  <b-td>{{ infoCupos.d8 }}</b-td>
                  <b-td>{{ infoCupos.dt8 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p8 - infoCupos.d8 - infoCupos.dt8 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g8.$model" :state="validateState('g8')" aria-describedby="feedDesc8" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g8 = validarNuevos(infoCupos.g8,infoCupos.d8,infoCupos.t8,infoCupos.p8)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc8" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t8.$model" :state="validateState('t8')" aria-describedby="feedDesc8t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t8 = validarTraslados(infoCupos.g8,infoCupos.t8,infoCupos.td8,infoCupos.p8)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc8t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g8,infoCupos.t8,infoCupos.d8,infoCupos.dt8,infoCupos.p8) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g8,infoCupos.t8,infoCupos.d8,infoCupos.dt8,infoCupos.p8) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Noveno</b-td>
                  <b-td>{{ infoCupos.p9 }}</b-td>
                  <b-td>{{ infoCupos.d9 }}</b-td>
                  <b-td>{{ infoCupos.dt9 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p9 - infoCupos.d9 - infoCupos.dt9 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g9.$model" :state="validateState('g9')" aria-describedby="feedDesc9" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g9 = validarNuevos(infoCupos.g9,infoCupos.d9,infoCupos.t9,infoCupos.p9)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc9" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t9.$model" :state="validateState('t9')" aria-describedby="feedDesc9t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t9 = validarTraslados(infoCupos.g9,infoCupos.t9,infoCupos.td9,infoCupos.p9)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc9t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g9,infoCupos.t9,infoCupos.d9,infoCupos.dt9,infoCupos.p9) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g9,infoCupos.t9,infoCupos.d9,infoCupos.dt9,infoCupos.p9) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Décimo</b-td>
                  <b-td>{{ infoCupos.p10 }}</b-td>
                  <b-td>{{ infoCupos.d10 }}</b-td>
                  <b-td>{{ infoCupos.dt10 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p10 - infoCupos.d10 - infoCupos.dt10 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g10.$model" :state="validateState('g10')" aria-describedby="feedDesc10" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g10 = validarNuevos(infoCupos.g10,infoCupos.d10,infoCupos.t10,infoCupos.p10)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc10" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t10.$model" :state="validateState('t10')" aria-describedby="feedDesc10t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t10 = validarTraslados(infoCupos.g10,infoCupos.t10,infoCupos.td10,infoCupos.p10)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc10t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g10,infoCupos.t10,infoCupos.d10,infoCupos.dt10,infoCupos.p10) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g10,infoCupos.t10,infoCupos.d10,infoCupos.dt10,infoCupos.p10) }}</b-td>
                </b-tr>
                <b-tr v-if="infoCupos.idGrupo!=2">
                  <b-td>Once</b-td>
                  <b-td>{{ infoCupos.p11 }}</b-td>
                  <b-td>{{ infoCupos.d11 }}</b-td>
                  <b-td>{{ infoCupos.dt11 }}</b-td>
                  <b-td style="color: blue"><strong>{{ infoCupos.p11 - infoCupos.d11 - infoCupos.dt11 }}</strong></b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.g11.$model" :state="validateState('g11')" aria-describedby="feedDesc11" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.g11 = validarNuevos(infoCupos.g11,infoCupos.d11,infoCupos.t11,infoCupos.p11)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc11" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td>
                    <b-form-input v-model.trim="$v.infoCupos.t11.$model" :state="validateState('t11')" aria-describedby="feedDesc11t" autocomplete="off" maxlength="3" @keydown="soloNumeros" @blur="infoCupos.t11 = validarTraslados(infoCupos.g11,infoCupos.t11,infoCupos.td11,infoCupos.p11)"></b-form-input>
                    <b-form-invalid-feedback id="feedDesc11t" >Campo requerido.</b-form-invalid-feedback>
                  </b-td>
                  <b-td :class="sumaCupos(infoCupos.g11,infoCupos.t11,infoCupos.d11,infoCupos.dt11,infoCupos.p11) >= 0 ? 'text-success' : 'text-danger'">{{ sumaCupos(infoCupos.g11,infoCupos.t11,infoCupos.d11,infoCupos.dt11,infoCupos.p11) }}</b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
          </b-col>
          <b-col lg="12" md="12"><hr></b-col>
          <b-col lg="12" md="12">
            <div class="float-right small text-medium-emphasis">* Campo requerido</div>
            <b-button class="small mt-1 mr-3" variant="success" size="sm" @click="validarCupos">Asignar Cupos</b-button>
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
  import { validationMixin } from "vuelidate"
  import { required, minLength } from "vuelidate/lib/validators"

  export default {
    name: 'ActualizarCupos',
    mixins: [validationMixin],
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
    validations: {
      infoCupos: {
        g12: { required },
        g0: { required },
        g1: { required },
        g2: { required },
        g3: { required },
        g4: { required },
        g5: { required },
        g6: { required },
        g7: { required },
        g8: { required },
        g9: { required },
        g10: { required },
        g11: { required },
        t12: { required },
        t0: { required },
        t1: { required },
        t2: { required },
        t3: { required },
        t4: { required },
        t5: { required },
        t6: { required },
        t7: { required },
        t8: { required },
        t9: { required },
        t10: { required },
        t11: { required }
      }
    },
    methods: {
      validarTraslados(g,t,td,total) {
        if (Number(t) < Number(td)) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El valor de los Cupos Traslados Ofertados no puede ser menor a ' + Number(td) + ' (número de Preincritos Traslados a la Fecha).')
          return
        }
        if ((Number(g) + Number(t)) > Number(total)) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El valor de los Cupos Nuevos Ofertados mas el valor de los Cupos Traslados Ofertados no puede ser mayor a los Cupos Proyectados.')
          return
        }
        return t
      },
      validarNuevos(g,d,t,total) {
        if (Number(g) < Number(d)) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El valor de los Cupos Nuevos Ofertados no puede ser menor a ' + Number(d) + ' (número de Preincritos Nuevos a la Fecha).')
          return
        }
        if ((Number(g) + Number(t)) > Number(total)) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'El valor de los Cupos Nuevos Ofertados mas el valor de los Cupos Traslados Ofertados no puede ser mayor a los Cupos Proyectados.')
          return
        }
        return g
      },
      sumaCupos(nuevos,traslados,dispon,dispot,total) {
        if ((Number(total) - Number(dispon) - Number(dispot)) >= (Number(nuevos) + Number(traslados)) - (Number(dispon) + Number(dispot))) {
          return (Number(nuevos) + Number(traslados)) - (Number(dispon) + Number(dispot))
        }
        return 'Error!'
      },
      validarCupos() {
        this.$v.infoCupos.$touch()
        if (this.$v.infoCupos.$anyError) {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algunos campos están incompletos.')
          return false
        } else {
          this.$bvModal.msgBoxConfirm('Está seguro de asignar los cupos a la institución Educativa?', {
            title: 'Asignar Cupos',
            size: '',
            buttonSize: '',
            okVariant: 'success',
            okTitle: 'Si, Actualizar Cupos',
            cancelTitle: 'Cancelar',
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then(value => {
            if (value) {
              this.guardarDatosCupos()
            }
          })
        }
        return true
      },
      async guardarDatosCupos() {
        await axios
        .put(CONFIG.ROOT_PATH + 'matriculas/cupos', JSON.stringify(this.infoCupos), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Actualizar Cupos')
          } else{
            this.$emit("retorno", 1)
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Cupos. Intente más tarde. ' + err)
        })
      },
      async consultaCupos() {
        this.infoCupos = this.datosCupos
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.infoCupos[name]
        return $dirty ? !$error : null
      },
      soloNumeros(e) {
        let key = window.Event ? e.which : e.keyCode
        if (!((key >= 48 && key <= 57) || (key >= 96 && key <= 105) || (key == 8) || (key == 9) || (key == 37) || (key == 39))) {
            e.preventDefault()
        }
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
