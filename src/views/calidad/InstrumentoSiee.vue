<template>
  <div>
    <b-row>
      <b-col>
        <b-card class="encabezadoVista">
          <b-row>
            <b-col lg="12" class="mt-2 text-center">
              <h5>INSTRUMENTO PARA LA REVISIÓN DEL ESTADO DE DESARROLLO DE LOS ELEMENTOS CONSTITUTIVOS<br>DEL SISTEMA INSTITUCIONAL DE EVALUACIÓN DE ESTUDIANTES -SIEE</h5>
              <h4 v-if="formularioHabilitado" class="text-primary">{{ mensajeFormulario }}</h4>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <div v-if="!formularioHabilitado">
        <b-row>
            <b-col lg="12">
                <b-card>
                  <template #header>
                      <h5 class="mb-0">ESTADO DEL PERIODO SIEE</h5>
                  </template>
                  <b-card-text>
                      <h2 class="text-danger">Periodo Cerrado</h2>
                      <h5 class="text-muted">Por favor comuníquese con el funcionario encargado del proceso en la Secretaría de Educación Territorial.</h5>
                  </b-card-text>
                </b-card>
            </b-col>
        </b-row>
    </div>
    <div v-else>
      <b-row>
        <b-col lg="12">
          <b-card>
            <template #header>
              <h5 class="mb-0">PASO 2. AJUSTES AL SIEE</h5>
            </template>
            <b-card-text>
              <h5 class="text-muted">A continuación encontrará una tabla en la que podrá indicar si se realizaron ajustes a los elementos constitutivos. Asimismo, podrá describir el ajuste que se realizó y determinar en la columna Permanente si el ajuste transitorio quedará incluido de manera permanente en el SIEE del Establecimiento Educativo</h5>
            </b-card-text>
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" width="2%">#</th>
                  <th scope="col" width="39%">Elementos Constitutivos</th>
                  <th scope="col" width="10%">¿Se realizaron ajustes?</th>
                  <th scope="col" width="39%">Descripción del Ajuste</th>
                  <th scope="col" width="10%">Permanente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Los criterios de evaluación y promoción</td>
                  <td>
                    <b-form-select v-model="infoEvaluaciones.c2011" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2011==0 ? infoEvaluaciones.c2012 = null : infoEvaluaciones.c2012 = '-', infoEvaluaciones.c2011==0 ? infoEvaluaciones.c2013 = null : infoEvaluaciones.c2013 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2012" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select v-model="infoEvaluaciones.c2013" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>La escala de valoración institucional y su respectiva equivalencia con la escala nacional</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2021" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2021==0 ? infoEvaluaciones.c2022 = null : infoEvaluaciones.c2022 = '-', infoEvaluaciones.c2021==0 ? infoEvaluaciones.c2023 = null : infoEvaluaciones.c2023 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2022" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2023" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Las estrategias de valoración integral de los desempeños de los estudiantes</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2031" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2031==0 ? infoEvaluaciones.c2032 = null : infoEvaluaciones.c2032 = '-', infoEvaluaciones.c2031==0 ? infoEvaluaciones.c2033 = null : infoEvaluaciones.c2033 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2032" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2033" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Las acciones de seguimiento para el mejoramiento de los desempeños de los estudiantes durante el año escolar</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2041" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2041==0 ? infoEvaluaciones.c2042 = null : infoEvaluaciones.c2042 = '-', infoEvaluaciones.c2041==0 ? infoEvaluaciones.c2043 = null : infoEvaluaciones.c2043 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2042" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2043" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Los procesos de autoevaluación de los estudiantes</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2051" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2051==0 ? infoEvaluaciones.c2052 = null : infoEvaluaciones.c2052 = '-', infoEvaluaciones.c2051==0 ? infoEvaluaciones.c2053 = null : infoEvaluaciones.c2053 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2052" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2053" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Las estrategias de apoyo necesarias para resolver situaciones pedagógicas pendientes de los estudiantes</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2061" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2061==0 ? infoEvaluaciones.c2062 = null : infoEvaluaciones.c2062 = '-', infoEvaluaciones.c2061==0 ? infoEvaluaciones.c2063 = null : infoEvaluaciones.c2063 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2062" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2063" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Las acciones para garantizar que los directivos docentes y docentes del establecimiento educativo cumplan con los procesos evaluativos estipulados en el sistema institucional de evaluación</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2071" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2071==0 ? infoEvaluaciones.c2072 = null : infoEvaluaciones.c2072 = '-', infoEvaluaciones.c2071==0 ? infoEvaluaciones.c2073 = null : infoEvaluaciones.c2073 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2072" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2073" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>La periodicidad de entrega de informes a los padres de familia</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2081" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2081==0 ? infoEvaluaciones.c2082 = null : infoEvaluaciones.c2082 = '-', infoEvaluaciones.c2081==0 ? infoEvaluaciones.c2083 = null : infoEvaluaciones.c2083 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2082" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2083" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>La estructura de los informes de los estudiantes, para que sean claros, comprensibles y den información integral del avance en la formación</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2091" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2091==0 ? infoEvaluaciones.c2092 = null : infoEvaluaciones.c2092 = '-', infoEvaluaciones.c2091==0 ? infoEvaluaciones.c2093 = null : infoEvaluaciones.c2093 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2092" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2093" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td>Las instancias, procedimientos y mecanismos de atención y resolución de reclamaciones de padres de familia y estudiantes sobre la evaluación y promoción</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2101" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2101==0 ? infoEvaluaciones.c2102 = null : infoEvaluaciones.c2102 = '-', infoEvaluaciones.c2101==0 ? infoEvaluaciones.c2103 = null : infoEvaluaciones.c2103 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2102" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2103" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
                <tr>
                  <th scope="row">11</th>
                  <td>Los mecanismos de participación de la comunidad educativa en la construcción del sistema 	institucional de evaluación de los estudiantes</td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2111" :options="comboSiNo" :disabled="!formularioHabilitado" @change="infoEvaluaciones.c2111==0 ? infoEvaluaciones.c2112 = null : infoEvaluaciones.c2112 = '-', infoEvaluaciones.c2111==0 ? infoEvaluaciones.c2113 = null : infoEvaluaciones.c2113 = 1"></b-form-select>
                  </td>
                  <td>
                    <b-form-input v-model.trim="infoEvaluaciones.c2112" autocomplete="off" :disabled="!formularioHabilitado"></b-form-input>
                  </td>
                  <td>
                    <b-form-select  v-model="infoEvaluaciones.c2113" :options="comboSiNo" :disabled="!formularioHabilitado"></b-form-select>
                  </td>
                </tr>
              </tbody>
            </table>
            <template #footer>
            </template>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <b-card>
            <template #header>
              <h5 class="mb-0">PASO 3. REVISIÓN ELEMENTOS CONSTITUTIVOS</h5>
            </template>
            <b-card-text>
              <h5 class="text-muted">Teniendo en cuenta el paso anterior y analizando cada uno de los elementos constitutivos, diligencie la tabla, a partir de las siguientes premisas:</h5>
              <ul>
                <li><h5>Documentado</h5></li>
                <h5 class="text-muted">Cuando las acciones, procesos o criterios establecidos para el elemento constitutivo se encuentran descritos en el documento del SIEE.</h5>
                <li><h5>Implementado</h5></li>
                <h5 class="text-muted">Cuando las acciones, procesos o criterios establecidos para el elemento constitutivo están siendo desarrollados según lo establecido en el documento del SIEE.</h5>
                <li><h5>Necesidad de Ajuste</h5></li>
                <h5 class="text-muted">La columna Necesidad de ajuste mostrará la necesidad de actualizar o ajustar lo descrito en el documento o en su implementación, o si por el contrario se actualizará en algún momento cuando se produzca la necesidad.</h5>
              </ul>
            </b-card-text>
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" width="2%">#</th>
                  <th scope="col" width="39%">Elementos Constitutivos</th>
                  <th scope="col" width="10%">Documentado</th>
                  <th scope="col" width="10%">Implementado</th>
                  <th scope="col" width="10%">Necesidad de Ajuste</th>
                  <th scope="col" width="29%">Observaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Los criterios de evaluación y promoción</td>
                  <td><b-form-select v-model="infoEvaluaciones.c3011" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select v-model="infoEvaluaciones.c3012" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3011,infoEvaluaciones.c3012,1)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3014" autocomplete="off" @change="asignarObs(1)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>La escala de valoración institucional y su respectiva equivalencia con la escala nacional</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3021" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3022" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3021,infoEvaluaciones.c3022,2)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3024" autocomplete="off" @change="asignarObs(2)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Las estrategias de valoración integral de los desempeños de los estudiantes</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3031" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3032" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3031,infoEvaluaciones.c3032,3)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3034" autocomplete="off" @change="asignarObs(3)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Las acciones de seguimiento para el mejoramiento de los desempeños de los estudiantes durante el año escolar</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3041" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3042" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3041,infoEvaluaciones.c3042,4)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3044" autocomplete="off" @change="asignarObs(4)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Los procesos de autoevaluación de los estudiantes</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3051" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3052" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3051,infoEvaluaciones.c3052,5)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3054" autocomplete="off" @change="asignarObs(5)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Las estrategias de apoyo necesarias para resolver situaciones pedagógicas pendientes de los estudiantes</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3061" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3062" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3061,infoEvaluaciones.c3062,6)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3064" autocomplete="off" @change="asignarObs(6)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Las acciones para garantizar que los directivos docentes y docentes del establecimiento educativo cumplan con los procesos evaluativos estipulados en el sistema institucional de evaluación</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3071" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3072" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3071,infoEvaluaciones.c3072,7)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3074" autocomplete="off" @change="asignarObs(7)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>La periodicidad de entrega de informes a los padres de familia</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3081" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3082" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3081,infoEvaluaciones.c3082,8)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3084" autocomplete="off" @change="asignarObs(8)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>La estructura de los informes de los estudiantes, para que sean claros, comprensibles y den información integral del avance en la formación</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3091" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3092" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3091,infoEvaluaciones.c3092,9)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3094" autocomplete="off" @change="asignarObs(9)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td>Las instancias, procedimientos y mecanismos de atención y resolución de reclamaciones de padres de familia y estudiantes sobre la evaluación y promoción</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3101" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3102" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3101,infoEvaluaciones.c3102,10)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3104" autocomplete="off" @change="asignarObs(10)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
                <tr>
                  <th scope="row">11</th>
                  <td>Los mecanismos de participación de la comunidad educativa en la construcción del sistema 	institucional de evaluación de los estudiantes</td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3111" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c3112" :options="comboSiNoPar" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><h5 class="text-center text-primary">{{this.valorNecesidad(infoEvaluaciones.c3111,infoEvaluaciones.c3112,11)}}</h5></td>
                  <td><b-form-input v-model.trim="infoEvaluaciones.c3114" autocomplete="off" @change="asignarObs(11)" :disabled="!formularioHabilitado"></b-form-input></td>
                </tr>
              </tbody>
            </table>
            <template #footer>
            </template>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12">
          <b-card>
            <template #header>
              <h5 class="mb-0">PASO 4. ESTADO Y NIVEL DE INTERVENCIÓN</h5>
            </template>
            <b-card-text>
              <h5 class="text-muted">A continuación, apreciará el Estado en el cual se encuentran cada uno de los Elementos Constitutivos del SIEE, y las observaciones percibidas por el establecimiento educativo</h5><br>
              <h5 class="text-muted">En la columna <code>Intervención</code> seleccione el tiempo para realizar los ajustes según lo considere.</h5><br>
              <h5 class="text-muted">En la columna <code>Priorización</code> digite o asigne el puesto o valor de prioridad para intervenir, actualizar o construir los elementos constitutivos, tenga en cuenta que el valor 1 obedecerá al elemento a intervenir en primer lugar y el valor 11 refiere al último elemento que modificará o actualizará.</h5>
            </b-card-text>
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                  <th scope="col" width="2%">#</th>
                  <th scope="col" width="28%">Elementos Constitutivos</th>
                  <th scope="col" width="25%">Estado</th>
                  <th scope="col" width="25%">Observaciones</th>
                  <th scope="col" width="10%">Intervención</th>
                  <th scope="col" width="10%">Priorización</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Los criterios de evaluación y promoción</td>
                  <td><h5 :style="styleEstado1">{{valorEstado1}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4012}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4013" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4014" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>La escala de valoración institucional y su respectiva equivalencia con la escala nacional</td>
                  <td><h5 :style="styleEstado2">{{valorEstado2}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4022}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4023" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4024" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Las estrategias de valoración integral de los desempeños de los estudiantes</td>
                  <td><h5 :style="styleEstado3">{{valorEstado3}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4032}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4033" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4034" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Las acciones de seguimiento para el mejoramiento de los desempeños de los estudiantes durante el año escolar</td>
                  <td><h5 :style="styleEstado4">{{valorEstado4}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4042}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4043" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4044" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td>Los procesos de autoevaluación de los estudiantes</td>
                  <td><h5 :style="styleEstado5">{{valorEstado5}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4052}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4053" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4054" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">6</th>
                  <td>Las estrategias de apoyo necesarias para resolver situaciones pedagógicas pendientes de los estudiantes</td>
                  <td><h5 :style="styleEstado6">{{valorEstado6}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4062}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4063" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4064" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">7</th>
                  <td>Las acciones para garantizar que los directivos docentes y docentes del establecimiento educativo cumplan con los procesos evaluativos estipulados en el sistema institucional de evaluación</td>
                  <td><h5 :style="styleEstado7">{{valorEstado7}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4072}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4073" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4074" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">8</th>
                  <td>La periodicidad de entrega de informes a los padres de familia</td>
                  <td><h5 :style="styleEstado8">{{valorEstado8}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4082}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4083" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4084" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">9</th>
                  <td>La estructura de los informes de los estudiantes, para que sean claros, comprensibles y den información integral del avance en la formación</td>
                  <td><h5 :style="styleEstado9">{{valorEstado9}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4092}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4093" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4094" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">10</th>
                  <td>Las instancias, procedimientos y mecanismos de atención y resolución de reclamaciones de padres de familia y estudiantes sobre la evaluación y promoción</td>
                  <td><h5 :style="styleEstado10">{{valorEstado10}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4102}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4103" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4104" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
                <tr>
                  <th scope="row">11</th>
                  <td>Los mecanismos de participación de la comunidad educativa en la construcción del sistema 	institucional de evaluación de los estudiantes</td>
                  <td><h5 :style="styleEstado11">{{valorEstado11}}</h5></td>
                  <td><h5>{{infoEvaluaciones.c4112}}</h5></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4113" :options="comboInterv" :disabled="!formularioHabilitado"></b-form-select></td>
                  <td><b-form-select  v-model="infoEvaluaciones.c4114" :options="comboPriori" :disabled="!formularioHabilitado"></b-form-select></td>
                </tr>
              </tbody>
            </table>
            <template #footer>
              <div v-if="formularioHabilitado">
                <b-button class="btn mb-2 mt-4" variant="primary" @click="guardarInstrumento">Guardar Instrumento SIEE</b-button>
              </div>
              <!--<em>Guardar {{JSON.stringify(infoEvaluaciones)}}</em>-->
            </template>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import * as CONFIG from '@/assets/config.js'

  export default {
    name: 'instrumentosiee',
    components: {
    },
    data () {
      return {
        idEvaluacion: null,
        infoEvaluaciones: {
          id: null,
          id_periodo_siee: null,
          id_institucion: null,
          c2011: null,c2012: null,c2013: null,c2021: null,c2022: null,c2023: null,c2031: null,c2032: null,c2033: null,c2041: null,c2042: null,c2043: null,c2051: null,c2052: null,c2053: null,c2061: null,c2062: null,c2063: null,c2071: null,c2072: null,c2073: null,c2081: null,c2082: null,c2083: null,c2091: null,c2092: null,c2093: null,c2101: null,c2102: null,c2103: null,c2111: null,c2112: null,c2113: null,
          c3011: null,c3012: null,c3013: null,c3014: null,c3021: null,c3022: null,c3023: null,c3024: null,c3031: null,c3032: null,c3033: null,c3034: null,c3041: null,c3042: null,c3043: null,c3044: null,c3051: null,c3052: null,c3053: null,c3054: null,c3061: null,c3062: null,c3063: null,c3064: null,c3071: null,c3072: null,c3073: null,c3074: null,c3081: null,c3082: null,c3083: null,c3084: null,c3091: null,c3092: null,c3093: null,c3094: null,c3101: null,c3102: null,c3103: null,c3104: null,c3111: null,c3112: null,c3113: null,c3114: null,
          c4011: null,c4012: null,c4013: null,c4014: null,c4021: null,c4022: null,c4023: null,c4024: null,c4031: null,c4032: null,c4033: null,c4034: null,c4041: null,c4042: null,c4043: null,c4044: null,c4051: null,c4052: null,c4053: null,c4054: null,c4061: null,c4062: null,c4063: null,c4064: null,c4071: null,c4072: null,c4073: null,c4074: null,c4081: null,c4082: null,c4083: null,c4084: null,c4091: null,c4092: null,c4093: null,c4094: null,c4101: null,c4102: null,c4103: null,c4104: null,c4111: null,c4112: null,c4113: null,c4114: null,
          estado: 0
        },
        comboSiNo: [],
        comboSiNoPar: [],
        comboInterv: [],
        comboPriori: [],
        aSeleccionado: this.$store.state.aLectivoAdmon,
        styleEstado1: '',styleEstado2: '',styleEstado3: '',styleEstado4: '',styleEstado5: '',styleEstado6: '',styleEstado7: '',styleEstado8: '',styleEstado9: '',styleEstado10: '',styleEstado11: '',
        formularioHabilitado: true,
        mensajeFormulario: '-'
      }
    },
    methods: {
      async guardarInstrumento() {
        this.infoEvaluaciones.estado = 1
        await axios
        .put(CONFIG.ROOT_PATH + 'calidad/evaluaciones/institucion', JSON.stringify(this.infoEvaluaciones), { headers: {"Content-Type": "application/json; charset=utf-8" }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Evaluaciones Siee por IE')
          } else{
            this.mensajeEmergente('success',CONFIG.TITULO_MSG,'Los datos del Instrumento se han registrado correctamente.')
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Evaluaciones Siee por IE. Intente más tarde. ' + err)
        })
      },
      async cargarEvaluaciones() {
        this.infoEvaluaciones = {}
        await axios
        .get(CONFIG.ROOT_PATH + 'calidad/evaluaciones/institucion', { params: {idPeriodo: this.$store.state.idPeriodoSiee, idInstitucion: this.$store.state.idInstitucion }})
        .then(response => {
          if (response.data.error){
            this.mensajeEmergente('danger',CONFIG.TITULO_MSG,response.data.mensaje + ' - Evaluaciones Siee por IE')
          } else{
            if (response.data.datos != 0) {
              this.infoEvaluaciones = response.data.datos
              this.mensajeFormulario = this.$store.state.venceSiee
              if (this.$store.state.vigenciaSiee) {
                this.formularioHabilitado = true
              } else {
                this.formularioHabilitado = false
              }
            }
          }
        })
        .catch(err => {
          this.mensajeEmergente('danger',CONFIG.TITULO_MSG,'Algo salio mal y no se pudo realizar: Evaluaciones Siee por IE. Intente más tarde. ' + err)
        })
      },
      asignarObs(criterio) {
        if (criterio == 1) this.infoEvaluaciones.c4012 = this.infoEvaluaciones.c3014
        else if (criterio == 2) this.infoEvaluaciones.c4022 = this.infoEvaluaciones.c3024
        else if (criterio == 3) this.infoEvaluaciones.c4032 = this.infoEvaluaciones.c3034
        else if (criterio == 4) this.infoEvaluaciones.c4042 = this.infoEvaluaciones.c3044
        else if (criterio == 5) this.infoEvaluaciones.c4052 = this.infoEvaluaciones.c3054
        else if (criterio == 6) this.infoEvaluaciones.c4062 = this.infoEvaluaciones.c3064
        else if (criterio == 7) this.infoEvaluaciones.c4072 = this.infoEvaluaciones.c3074
        else if (criterio == 8) this.infoEvaluaciones.c4082 = this.infoEvaluaciones.c3084
        else if (criterio == 9) this.infoEvaluaciones.c4092 = this.infoEvaluaciones.c3094
        else if (criterio == 10) this.infoEvaluaciones.c4102 = this.infoEvaluaciones.c3104
        else if (criterio == 11) this.infoEvaluaciones.c4112 = this.infoEvaluaciones.c3114
      },
      valorNecesidad(valor1,valor2,criterio) {
        let valorRetorno = null
        if (valor1 == null || valor2 == null) {
          valorRetorno = null
        } else if (valor1 == 1 && valor2 == 1) {
          valorRetorno = 'Actualizar de acuerdo con la necesidad'
        } else {
          valorRetorno = 'SI'
        }
        if (criterio == 1) this.infoEvaluaciones.c3013 = valorRetorno
        else if (criterio == 2) this.infoEvaluaciones.c3023 = valorRetorno
        else if (criterio == 3) this.infoEvaluaciones.c3033 = valorRetorno
        else if (criterio == 4) this.infoEvaluaciones.c3043 = valorRetorno
        else if (criterio == 5) this.infoEvaluaciones.c3053 = valorRetorno
        else if (criterio == 6) this.infoEvaluaciones.c3063 = valorRetorno
        else if (criterio == 7) this.infoEvaluaciones.c3073 = valorRetorno
        else if (criterio == 8) this.infoEvaluaciones.c3083 = valorRetorno
        else if (criterio == 9) this.infoEvaluaciones.c3093 = valorRetorno
        else if (criterio == 10) this.infoEvaluaciones.c3103 = valorRetorno
        else if (criterio == 11) this.infoEvaluaciones.c3113 = valorRetorno
        return valorRetorno
      },
      seleccionaPriorizacion(criterio) {
        if (criterio == 1) this.infoEvaluaciones.c4014 = this.comboPriori
        else if (criterio == 2) this.infoEvaluaciones.c4024 = this.comboPriori
        else if (criterio == 3) this.infoEvaluaciones.c4034 = this.comboPriori
        else if (criterio == 4) this.infoEvaluaciones.c4044 = this.comboPriori
        else if (criterio == 5) this.infoEvaluaciones.c4054 = this.comboPriori
        else if (criterio == 6) this.infoEvaluaciones.c4064 = this.comboPriori
        else if (criterio == 7) this.infoEvaluaciones.c4074 = this.comboPriori
        else if (criterio == 8) this.infoEvaluaciones.c4084 = this.comboPriori
        else if (criterio == 9) this.infoEvaluaciones.c4094 = this.comboPriori
        else if (criterio == 10) this.infoEvaluaciones.c4104 = this.comboPriori
        else if (criterio == 11) this.infoEvaluaciones.c4114 = this.comboPriori
      },
      comboPriorizacion() {
        if (this.infoEvaluaciones.c4014)
          this.comboPriori.push({ 'value': this.infoEvaluaciones.c4014})
      },
      formatFnF: function(value) {
        let fecha = new Date(value)
        return fecha.toLocaleDateString() + ' a las ' + fecha.toLocaleTimeString()
      },
      iniciarVista() {
        if(this.$store.state.colsiee == 1) {
          this.comboSiNo.push({ 'value': 0, 'text': 'NO' }, { 'value': 1, 'text': 'SI' })
          this.comboSiNoPar.push({ 'value': 0, 'text': 'NO' }, { 'value': 1, 'text': 'SI' }, { 'value': 2, 'text': 'PARCIALMENTE' })
          this.comboInterv.push({ 'value': 1, 'text': 'INMEDIATO' }, { 'value': 2, 'text': 'A CORTO PLAZO' }, { 'value': 3, 'text': 'A LARGO PLAZO' })
          let i = 0
          for (i=1; i<12; i++) {
            this.comboPriori.push({ 'value': i, 'text': i })
          }
          this.cargarEvaluaciones()
        } else {
          this.$router.push('/restringida')
        }
      },
      mensajeEmergente(variante, titulo, contenido) {
        this.$bvToast.toast(contenido, { title: titulo, variant: variante, toaster: "b-toaster-top-center", solid: true, autoHideDelay: 4000, appendToast: false })
      }
    },
    computed: {
      valorEstado1() {
        if (this.infoEvaluaciones.c3011 == null || this.infoEvaluaciones.c3012 == null) {
          this.styleEstado1 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4011 = null
        } else if (this.infoEvaluaciones.c3011 == 1 && this.infoEvaluaciones.c3012 == 1) {
          this.styleEstado1 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4011 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3011 == 1 && this.infoEvaluaciones.c3012 == 0) {
          this.styleEstado1 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4011 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3011 == 0 && this.infoEvaluaciones.c3012 == 0) {
          this.styleEstado1 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4011 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3011 == 1 && this.infoEvaluaciones.c3012 == 2) {
          this.styleEstado1 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4011 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3011 == 2 && this.infoEvaluaciones.c3012 == 2) {
          this.styleEstado1 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4011 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3011 == 0 && this.infoEvaluaciones.c3012 == 2) {
          this.styleEstado1 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4011 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado1 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4011 = 'No Aplica'
        }
      },
      valorEstado2() {
        if (this.infoEvaluaciones.c3021 == null || this.infoEvaluaciones.c3022 == null) {
          this.styleEstado2 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4021 = null
        } else if (this.infoEvaluaciones.c3021 == 1 && this.infoEvaluaciones.c3022 == 1) {
          this.styleEstado2 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4021 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3021 == 1 && this.infoEvaluaciones.c3022 == 0) {
          this.styleEstado2 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4021 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3021 == 0 && this.infoEvaluaciones.c3022 == 0) {
          this.styleEstado2 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4021 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3021 == 1 && this.infoEvaluaciones.c3022 == 2) {
          this.styleEstado2 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4021 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3021 == 2 && this.infoEvaluaciones.c3022 == 2) {
          this.styleEstado2 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4021 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3021 == 0 && this.infoEvaluaciones.c3022 == 2) {
          this.styleEstado2 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4021 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado2 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4021 = 'No Aplica'
        }
      },
      valorEstado3() {
        if (this.infoEvaluaciones.c3031 == null || this.infoEvaluaciones.c3032 == null) {
          this.styleEstado3 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4031 = null
        } else if (this.infoEvaluaciones.c3031 == 1 && this.infoEvaluaciones.c3032 == 1) {
          this.styleEstado3 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4031 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3031 == 1 && this.infoEvaluaciones.c3032 == 0) {
          this.styleEstado3 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4031 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3031 == 0 && this.infoEvaluaciones.c3032 == 0) {
          this.styleEstado3 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4031 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3031 == 1 && this.infoEvaluaciones.c3032 == 2) {
          this.styleEstado3 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4031 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3031 == 2 && this.infoEvaluaciones.c3032 == 2) {
          this.styleEstado3 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4031 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3031 == 0 && this.infoEvaluaciones.c3032 == 2) {
          this.styleEstado3 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4031 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado3 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4031 = 'No Aplica'
        }
      },
      valorEstado4() {
        if (this.infoEvaluaciones.c3041 == null || this.infoEvaluaciones.c3042 == null) {
          this.styleEstado4 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4041 = null
        } else if (this.infoEvaluaciones.c3041 == 1 && this.infoEvaluaciones.c3042 == 1) {
          this.styleEstado4 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4041 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3041 == 1 && this.infoEvaluaciones.c3042 == 0) {
          this.styleEstado4 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4041 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3041 == 0 && this.infoEvaluaciones.c3042 == 0) {
          this.styleEstado4 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4041 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3041 == 1 && this.infoEvaluaciones.c3042 == 2) {
          this.styleEstado4 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4041 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3041 == 2 && this.infoEvaluaciones.c3042 == 2) {
          this.styleEstado4 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4041 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3041 == 0 && this.infoEvaluaciones.c3042 == 2) {
          this.styleEstado4 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4041 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado4 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4041 = 'No Aplica'
        }
      },
      valorEstado5() {
        if (this.infoEvaluaciones.c3051 == null || this.infoEvaluaciones.c3052 == null) {
          this.styleEstado5 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4051 = null
        } else if (this.infoEvaluaciones.c3051 == 1 && this.infoEvaluaciones.c3052 == 1) {
          this.styleEstado5 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4051 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3051 == 1 && this.infoEvaluaciones.c3052 == 0) {
          this.styleEstado5 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4051 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3051 == 0 && this.infoEvaluaciones.c3052 == 0) {
          this.styleEstado5 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4051 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3051 == 1 && this.infoEvaluaciones.c3052 == 2) {
          this.styleEstado5 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4051 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3051 == 2 && this.infoEvaluaciones.c3052 == 2) {
          this.styleEstado5 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4051 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3051 == 0 && this.infoEvaluaciones.c3052 == 2) {
          this.styleEstado5 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4051 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado5 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4051 = 'No Aplica'
        }
      },
      valorEstado6() {
        if (this.infoEvaluaciones.c3061 == null || this.infoEvaluaciones.c3062 == null) {
          this.styleEstado6 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4061 = null
        } else if (this.infoEvaluaciones.c3061 == 1 && this.infoEvaluaciones.c3062 == 1) {
          this.styleEstado6 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4061 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3061 == 1 && this.infoEvaluaciones.c3062 == 0) {
          this.styleEstado6 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4061 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3061 == 0 && this.infoEvaluaciones.c3062 == 0) {
          this.styleEstado6 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4061 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3061 == 1 && this.infoEvaluaciones.c3062 == 2) {
          this.styleEstado6 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4061 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3061 == 2 && this.infoEvaluaciones.c3062 == 2) {
          this.styleEstado6 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4061 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3061 == 0 && this.infoEvaluaciones.c3062 == 2) {
          this.styleEstado6 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4061 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado6 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4061 = 'No Aplica'
        }
      },
      valorEstado7() {
        if (this.infoEvaluaciones.c3071 == null || this.infoEvaluaciones.c3072 == null) {
          this.styleEstado7 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4071 = null
        } else if (this.infoEvaluaciones.c3071 == 1 && this.infoEvaluaciones.c3072 == 1) {
          this.styleEstado7 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4071 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3071 == 1 && this.infoEvaluaciones.c3072 == 0) {
          this.styleEstado7 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4071 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3071 == 0 && this.infoEvaluaciones.c3072 == 0) {
          this.styleEstado7 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4071 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3071 == 1 && this.infoEvaluaciones.c3072 == 2) {
          this.styleEstado7 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4071 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3071 == 2 && this.infoEvaluaciones.c3072 == 2) {
          this.styleEstado7 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4071 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3071 == 0 && this.infoEvaluaciones.c3072 == 2) {
          this.styleEstado7 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4071 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado7 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4071 = 'No Aplica'
        }
      },
      valorEstado8() {
        if (this.infoEvaluaciones.c3081 == null || this.infoEvaluaciones.c3082 == null) {
          this.styleEstado8 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4081 = null
        } else if (this.infoEvaluaciones.c3081 == 1 && this.infoEvaluaciones.c3082 == 1) {
          this.styleEstado8 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4081 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3081 == 1 && this.infoEvaluaciones.c3082 == 0) {
          this.styleEstado8 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4081 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3081 == 0 && this.infoEvaluaciones.c3082 == 0) {
          this.styleEstado8 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4081 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3081 == 1 && this.infoEvaluaciones.c3082 == 2) {
          this.styleEstado8 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4081 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3081 == 2 && this.infoEvaluaciones.c3082 == 2) {
          this.styleEstado8 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4081 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3081 == 0 && this.infoEvaluaciones.c3082 == 2) {
          this.styleEstado8 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4081 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado8 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4081 = 'No Aplica'
        }
      },
      valorEstado9() {
        if (this.infoEvaluaciones.c3091 == null || this.infoEvaluaciones.c3092 == null) {
          this.styleEstado9 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4091 = null
        } else if (this.infoEvaluaciones.c3091 == 1 && this.infoEvaluaciones.c3092 == 1) {
          this.styleEstado9 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4091 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3091 == 1 && this.infoEvaluaciones.c3092 == 0) {
          this.styleEstado9 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4091 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3091 == 0 && this.infoEvaluaciones.c3092 == 0) {
          this.styleEstado9 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4091 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3091 == 1 && this.infoEvaluaciones.c3092 == 2) {
          this.styleEstado9 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4091 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3091 == 2 && this.infoEvaluaciones.c3092 == 2) {
          this.styleEstado9 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4091 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3091 == 0 && this.infoEvaluaciones.c3092 == 2) {
          this.styleEstado9 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4091 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado9 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4091 = 'No Aplica'
        }
      },
      valorEstado10() {
        if (this.infoEvaluaciones.c3101 == null || this.infoEvaluaciones.c3102 == null) {
          this.styleEstado10 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4101 = null
        } else if (this.infoEvaluaciones.c3101 == 1 && this.infoEvaluaciones.c3102 == 1) {
          this.styleEstado10 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4101 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3101 == 1 && this.infoEvaluaciones.c3102 == 0) {
          this.styleEstado10 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4101 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3101 == 0 && this.infoEvaluaciones.c3102 == 0) {
          this.styleEstado10 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4101 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3101 == 1 && this.infoEvaluaciones.c3102 == 2) {
          this.styleEstado10 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4101 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3101 == 2 && this.infoEvaluaciones.c3102 == 2) {
          this.styleEstado10 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4101 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3101 == 0 && this.infoEvaluaciones.c3102 == 2) {
          this.styleEstado10 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4101 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado10 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4101 = 'No Aplica'
        }
      },
      valorEstado11() {
        if (this.infoEvaluaciones.c3111 == null || this.infoEvaluaciones.c3112 == null) {
          this.styleEstado11 = 'background: rgb(255, 255, 255)'
          return this.infoEvaluaciones.c4111 = null
        } else if (this.infoEvaluaciones.c3111 == 1 && this.infoEvaluaciones.c3112 == 1) {
          this.styleEstado11 = 'background: rgb(126, 170, 146)'
          return this.infoEvaluaciones.c4111 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3111 == 1 && this.infoEvaluaciones.c3112 == 0) {
          this.styleEstado11 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4111 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento del SIEE e implementados según lo establecido. Ajustar de acuerdo con las necesidades identificadas durante la práctica.'
        } else if (this.infoEvaluaciones.c3111 == 0 && this.infoEvaluaciones.c3112 == 0) {
          this.styleEstado11 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4111 = 'No se encuentran descritos en el documento del SIEE ni se están desarrollando o poniendo en práctica procesos, acciones o criterios del elemento constitutivo. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3111 == 1 && this.infoEvaluaciones.c3112 == 2) {
          this.styleEstado11 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4111 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3111 == 2 && this.infoEvaluaciones.c3112 == 2) {
          this.styleEstado11 = 'background: rgb(248, 253, 207)'
          return this.infoEvaluaciones.c4111 = 'Los procesos, acciones o criterios del elemento constitutivo se encuentran descritos en el documento, pero se están desarrollando o llevando a la práctica parcialmente según lo establecido en el SIEE. Se evidencia la necesidad de ajuste.'
        } else if (this.infoEvaluaciones.c3111 == 0 && this.infoEvaluaciones.c3112 == 2) {
          this.styleEstado11 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4111 = 'No se encuentran descrito el elemento constitutivo en el documento del SIEE, aunque se están desarrollando o poniendo en práctica diferentes procesos, acciones o criterios. Se evidencia la necesidad de ajuste.'
        } else {
          this.styleEstado11 = 'background: rgb(255, 155, 155)'
          return this.infoEvaluaciones.c4111 = 'No Aplica'
        }
      },
    },
    beforeMount() {
      this.iniciarVista()
    }
  }
</script>
