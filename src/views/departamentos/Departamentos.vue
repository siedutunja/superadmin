<template>
  <div class="departamentos-view">
    <h2>Departamentos (API Colombia)</h2>

    <div v-if="loading">Cargando...</div>
    <div v-if="error" style="color:red">Error: {{ error }}</div>

    <vue-good-table
      v-if="!loading && rows.length>0"
      :columns="columns"
      :rows="rows"
      :pagination-options="{enabled: true, perPage: 10}"
      :search-options="{enabled: true}"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'actions'">
          <button class="btn btn-sm btn-primary" @click="openDetail(props.row)">Ver</button>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>

    <div v-if="!loading && rows.length===0 && !error">No hay datos para mostrar.</div>
 
    <div v-if="showModal" class="modal-backdrop">
      <div class="modal-card">
        <h3>{{ selected.name }}</h3>
        <p v-if="selected.description">{{ selected.description }}</p>
        <p v-else-if="selected._description">{{ selected._description }}</p>
        <p v-else-if="selected._full && selected._full.description">{{ selected._full.description }}</p>
        <p v-else>Sin descripción disponible.</p>
        <div style="margin-top:12px;text-align:right">
          <button class="btn btn-secondary" @click="closeModal">Cerrar</button>
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
      
      columns: [
        { label: 'ID', field: 'id', sortable: true },
        { label: 'Name', field: 'name', sortable: true },
        { label: 'CityCapitalId', field: 'cityCapitalId', sortable: true },
        { label: 'Municipalities', field: 'municipalities', sortable: true },
        { label: 'Surface', field: 'surface', sortable: true },
        { label: 'Population', field: 'population', sortable: true },
        { label: 'PhonePrefix', field: 'phonePrefix', sortable: true },
        { label: 'CountryId', field: 'countryId', sortable: true },
        { label: 'Acciones', field: 'actions' }
      ],
      endpoint: '/api/v1/Department',
      showModal: false,
      selected: null
    }
  },
  methods: {
    async fetch () {
      this.loading = true
      this.error = null
      try {
        const url = ApiColombia.resolve(this.endpoint)
        const res = await axios.get(url)
        let data = res.data
        
        if (data && data.data) data = data.data
        if (data && data.results) data = data.results
        if (!Array.isArray(data)) {
          if (typeof data === 'object') data = [data]
          else data = []
        }
        
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
      } catch (err) {
        this.error = (err && err.message) ? err.message : err
        this.rows = []
      } finally {
        this.loading = false
      }
    },
    buildColumns (rows) {
      
      return this.columns
    },
    
    openDetail (row) {
            this.selected = row._full || row
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
      this.selected = null
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>

<style scoped>
.departamentos-view { padding: 12px }
input { padding: 6px }
button { padding: 6px 10px }
.modal-backdrop { position: fixed; left:0; top:0; right:0; bottom:0; background: #000; opacity: 0.95; display:flex; align-items:center; justify-content:center; z-index:99999; pointer-events: auto }
.modal-card { background: #fff; padding:18px; border-radius:8px; max-width:680px; width:90%; box-shadow:0 8px 30px rgba(0,0,0,0.6); z-index:100000 }
</style>
