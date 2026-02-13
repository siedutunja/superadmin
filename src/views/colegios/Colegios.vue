<template>
    <div class="colegios-view">
        <h2>Colegios de Colombia</h2>

        <div v-if="loading">Cargando...</div>
        <div v-if="error" style="color:red">Error: {{ error }}</div>

        <!-- FILTROS -->
        <b-row class="mb-3">
            <b-col lg="6">
                <b-form-group label="Zona">
                    <b-form-select v-model="zonaSeleccionada" :options="comboZonas" @change="applyFilters">
                        <template #first>
                            <option :value="null">Todas las zonas</option>
                        </template>
                    </b-form-select>
                </b-form-group>
            </b-col>

            <b-col lg="6">
                <b-form-group label="Tipo de Establecimiento">
                    <b-form-select v-model="tipoSeleccionado" :options="comboTipos" @change="applyFilters">
                        <template #first>
                            <option :value="null">Todos los tipos</option>
                        </template>
                    </b-form-select>
                </b-form-group>
            </b-col>
        </b-row>

        <!-- TABLA -->
        <vue-good-table v-if="!loading && filteredRows.length" :columns="columns" :rows="filteredRows"
            :pagination-options="{ enabled: true, perPage: 10 }" :search-options="{ enabled: true }">
            <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'actions'">
                    <button class="btn btn-sm btn-primary" @click="openDetail(props.row)">
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
                    <h3>{{ selected.nombreestablecimiento }}</h3>

                    <h4>Información General</h4>
                    <table class="tech-table">
                        <tr>
                            <td><strong>Departamento:</strong></td>
                            <td>{{ selected.secretaria }}</td>
                        </tr>
                        <tr>
                            <td><strong>Dirección:</strong></td>
                            <td>{{ selected.direccion }}</td>
                        </tr>
                        <tr>
                            <td><strong>Teléfono:</strong></td>
                            <td>{{ selected.telefono }}</td>
                        </tr>
                        <tr>
                            <td><strong>Zona:</strong></td>
                            <td>{{ selected.zona }}</td>
                        </tr>
                        <tr>
                            <td><strong>Tipo de Establecimiento:</strong></td>
                            <td>{{ selected.tipo_establecimiento }}</td>
                        </tr>
                        <tr>
                            <td><strong>Niveles:</strong></td>
                            <td>{{ selected.niveles }}</td>
                        </tr>
                        <tr>
                            <td><strong>Jornada:</strong></td>
                            <td>{{ selected.jornada }}</td>
                        </tr>
                        <tr>
                            <td><strong>Grados:</strong></td>
                            <td>{{ selected.grados }}</td>
                        </tr>
                        <tr>
                            <td><strong>Idiomas:</strong></td>
                            <td>{{ selected.idiomas }}</td>
                        </tr>
                        <tr>
                            <td><strong>Modelos Educativos:</strong></td>
                            <td>{{ selected.modelos_educativos }}</td>
                        </tr>
                        <tr>
                            <td><strong>Calendario:</strong></td>
                            <td>{{ selected.calendario }}</td>
                        </tr>
                    </table>
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
import ApiColegios from '@/services/apiColegios'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

export default {
    name: 'Colegios',
    components: { VueGoodTable },

    data() {
        return {
            loading: false,
            error: null,

            rows: [],
            filteredRows: [],

            columns: [
                { label: 'Nombre', field: 'nombreestablecimiento', sortable: true },
                { label: 'Departamento', field: 'secretaria', sortable: true },
                { label: 'Dirección', field: 'direccion', sortable: true },
                { label: 'Zona', field: 'zona', sortable: true },
                { label: 'Tipo', field: 'tipo_establecimiento', sortable: true },
                { label: 'Teléfono', field: 'telefono' },
                { label: 'Acciones', field: 'actions' }
            ],

            // filtros
            nombreBusqueda: '',
            zonaSeleccionada: null,
            tipoSeleccionado: null,

            comboZonas: [],
            comboTipos: [],

            // modal
            showModal: false,
            selected: {}
        }
    },

    methods: {
        normalizeText(value) {
            if (value === null || value === undefined) return ''
            return String(value).trim()
        },

        async fetch() {
            this.loading = true
            this.error = null

            try {
                const res = await ApiColegios.getAll()
                const data = Array.isArray(res.data?.data) ? res.data.data : []

                this.rows = data.map((d, idx) => ({
                    nombreestablecimiento: this.normalizeText(d.nombre),
                    secretaria: this.normalizeText(d.secretaria),
                    direccion: this.normalizeText(d.direccion),
                    telefono: this.normalizeText(d.telefono),
                    zona: this.normalizeText(d.zona),
                    tipo_establecimiento: this.normalizeText(d.tipo),
                    correo_electronico: this.normalizeText(d.correo),
                    numero_de_sedes: this.normalizeText(d.numeroSedes),
                    niveles: this.normalizeText(d.niveles),
                    jornada: this.normalizeText(d.jornada),
                    grados: this.normalizeText(d.grados),
                    idiomas: this.normalizeText(d.idiomas),
                    modelos_educativos: this.normalizeText(d.modelosEducativos),
                    calendario: this.normalizeText(d.calendario),
                    rector: this.normalizeText(d.rector),
                    prestadorServicio: this.normalizeText(d.prestadorServicio),
                    propiedadPlanta: this.normalizeText(d.propiedadPlanta),
                    resguardo: this.normalizeText(d.resguardo),
                    matriculaContratada: this.normalizeText(d.matriculaContratada),
                    ano: this.normalizeText(d.ano),
                    _full: d,
                    _id: idx
                }))

                this.buildFiltersData()
                this.filteredRows = this.rows
            } catch (err) {
                this.error = err.message || err
                this.rows = []
            } finally {
                this.loading = false
            }
        },

        buildFiltersData() {


            const zonasSet = new Set(
                this.rows
                    .map(r => r.zona)
                    .filter(z => z && z.length > 0)
            )
            this.comboZonas = Array.from(zonasSet)
                .sort()
                .map(z => ({
                    value: z,
                    text: z
                }))


            const tiposSet = new Set(
                this.rows
                    .map(r => r.tipo_establecimiento)
                    .filter(t => t && t.length > 0)
            )
            this.comboTipos = Array.from(tiposSet)
                .sort()
                .map(t => ({
                    value: t,
                    text: t
                }))
        },

        applyFilters() {
            this.filteredRows = this.rows.filter(r => {
                const matchZona = this.zonaSeleccionada
                    ? r.zona === this.zonaSeleccionada
                    : true

                const matchTipo = this.tipoSeleccionado
                    ? r.tipo_establecimiento === this.tipoSeleccionado
                    : true

                return matchZona && matchTipo
            })
        },

        openDetail(row) {
            this.selected = row
            this.showModal = true
        },

        closeModal() {
            this.showModal = false
            this.selected = {}
        }
    },

    mounted() {
        this.fetch()
    }
}
</script>

<style scoped>
.colegios-view {
    padding: 12px;
}

.modal-backdrop {
    position: fixed;
    inset: 0;
    background: #000;
    opacity: 0.95;
    z-index: 99999;
    overflow-y: auto;
}

.modal-card {
    background: #fff;
    padding: 18px;
    border-radius: 8px;
    max-width: 800px;
    width: 90%;
    margin: 40px auto;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
}

.modal-body {
    padding: 18px;
}

.tech-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 18px;
}

.tech-table tr {
    border-bottom: 1px solid #eee;
}

.tech-table td {
    padding: 10px 0;
}

.tech-table td:first-child {
    width: 200px;
    vertical-align: top;
}

.modal-footer {
    margin-top: 12px;
    text-align: right;
    border-top: 1px solid #eee;
    padding-top: 10px;
}
</style>
