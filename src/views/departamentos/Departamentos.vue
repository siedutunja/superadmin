<template>
  <div class="departamentos-view">
    <h2>Departamentos (API Colombia)</h2>

    <div v-if="loading">Cargando...</div>
    <div v-if="error" style="color:red">Error: {{ error }}</div>

    <!-- FILTROS -->
    <b-row class="mb-3">
      <b-col lg="4">
        <b-form-group label="Región">
          <b-form-select
            v-model="idRegion"
            :options="comboRegiones"
            @change="onSeleccionarRegion"
          >
            <template #first>
              <option :value="null">Todas las regiones</option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col lg="4">
        <b-form-group label="Departamento">
          <b-form-select
            v-model="idDepartamento"
            :options="comboDepartamentos"
            @change="applyFilters"
            :disabled="!idRegion"
          >
            <template #first>
              <option :value="null">Todos los departamentos</option>
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- TABLA -->
    <vue-good-table
      v-if="!loading && filteredRows.length"
      :columns="columns"
      :rows="filteredRows"
      :pagination-options="{ enabled: true, perPage: 10 }"
      :search-options="{ enabled: true }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'actions'">
          <button
            class="btn btn-sm btn-primary"
            @click="openDetail(props.row)"
          >
            Ver
          </button>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <div v-if="!loading && !filteredRows.length && !error">
      No hay datos para mostrar.
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
      <div class="modal-card">
        <div class="modal-body">
          <h3>{{ selected.name }}</h3>

          <p v-if="selected.description">
            {{ selected.description }}
          </p>
          <p v-else-if="selected._description">
            {{ selected._description }}
          </p>
          <p v-else>
            Sin descripción disponible.
          </p>

          <hr />

          <h4>Ciudades</h4>

          <div v-if="loadingCities">Cargando ciudades...</div>

          <ul v-else-if="cities.length">
            <li v-for="c in cities" :key="c.id">
              {{ c.name }}
            </li>
          </ul>

          <p v-else>No hay ciudades para este departamento.</p>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiColombia from '@/services/apiColombia'
import axios from 'axios'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
  name: 'Departamentos',
  components: { VueGoodTable },

  data () {
    return {
      loading: false,
      error: null,

      rows: [],
      filteredRows: [],

      columns: [
        { label: 'ID', field: 'id', sortable: true },
        { label: 'Nombre', field: 'name', sortable: true },
        { label: 'Capital ID', field: 'cityCapitalId' },
        { label: 'Municipios', field: 'municipalities' },
        { label: 'Superficie', field: 'surface' },
        { label: 'Población', field: 'population' },
        { label: 'Prefijo', field: 'phonePrefix' },
        { label: 'País', field: 'countryId' },
        { label: 'Acciones', field: 'actions' }
      ],

      endpoint: '/api/v1/Department',

      // filtros
      idRegion: null,
      idDepartamento: null,
      comboRegiones: [],
      comboDepartamentos: [],

      // modal
      showModal: false,
      selected: null,
      cities: [],
      loadingCities: false
    }
  },

  methods: {
    async fetch () {
      this.loading = true
      this.error = null

      try {
        const url = ApiColombia.resolve(this.endpoint)
        const res = await axios.get(url)
        const data = Array.isArray(res.data) ? res.data : []

        this.rows = data.map(d => ({
          id: d.id,
          name: d.name,
          cityCapitalId: d.cityCapitalId,
          municipalities: d.municipalities,
          surface: d.surface,
          population: d.population,
          phonePrefix: d.phonePrefix,
          countryId: d.countryId,
          _full: d
        }))

        this.filteredRows = this.rows
      } catch (err) {
        this.error = err.message || err
        this.rows = []
      } finally {
        this.loading = false
      }
    },

    async cargarRegiones () {
      const res = await axios.get(
        'https://api-colombia.com/api/v1/Region'
      )

      this.comboRegiones = res.data.map(r => ({
        value: r.id,
        text: r.name
      }))
    },

    async onSeleccionarRegion () {
      this.idDepartamento = null
      this.comboDepartamentos = []

      const res = await axios.get(
        `https://api-colombia.com/api/v1/Region/${this.idRegion}/departments`
      )

      this.comboDepartamentos = res.data.map(d => ({
        value: d.id,
        text: d.name
      }))

      this.applyFilters()
    },

    applyFilters () {
      this.filteredRows = this.rows.filter(r => {
        const matchRegion = this.idRegion
          ? r._full.regionId === this.idRegion
          : true

        const matchDepartment = this.idDepartamento
          ? r.id === this.idDepartamento
          : true

        return matchRegion && matchDepartment
      })
    },

    async openDetail (row) {
      this.selected = row._full || row
      this.showModal = true
      this.loadingCities = true
      this.cities = []

      try {
        const res = await axios.get(
          `https://api-colombia.com/api/v1/Department/${this.selected.id}/cities`
        )
        this.cities = res.data
      } catch {
        this.cities = []
      } finally {
        this.loadingCities = false
      }
    },

    closeModal () {
      this.showModal = false
      this.selected = null
      this.cities = []
    }
  },

  mounted () {
    this.fetch()
    this.cargarRegiones()
  }
}
</script>

<style scoped>
.departamentos-view {
  padding: 12px;
}

.modal-backdrop { 
  position: fixed; 
  inset: 0;
  background: #000;
  opacity: 0.95;
  z-index: 99999;
  overflow-y: auto;   /* ✅ SCROLL AQUÍ */
}

.modal-card { 
  background: #fff; 
  padding: 18px; 
  border-radius: 8px; 
  max-width: 680px; 
  width: 90%; 
  margin: 40px auto;  /* ✅ CENTRADO SIN FLEX */
  box-shadow: 0 8px 30px rgba(0,0,0,0.6);
}

/* Contenido con scroll */
.modal-body {
  padding: 18px;
}


/* Footer fijo abajo */
.modal-footer {
  margin-top: 12px;
  text-align: right;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

</style>