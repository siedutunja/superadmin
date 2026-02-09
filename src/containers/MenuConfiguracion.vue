<template>
  <CDropdown inNav class="c-header-nav-items" add-menu-classes="pt-0">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cilSettings"/>Configuración
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center text-light" color="dark"><strong>Configuración</strong></CDropdownHeader>
    <CDropdownItem to="/usuarios/usuarios">
      <CIcon name="cilUserFollow" />Usuarios
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/infoinstitucional">
      <CIcon name="cilFeaturedPlaylist" />Información Institucional
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/infraestructura">
      <CIcon name="cilBuilding" />Infraestructura
    </CDropdownItem>
    <!--
    <CDropdownItem to="/planeacion/seguimientopa">
      <CIcon name="cilChartPie" />Seguimiento al Plan de Acción
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/planeacion/avancepa">
      <CIcon name="cilBraille" />Avance Plan de Acción
    </CDropdownItem>
    <CDropdownDivider/>
    <CDropdownItem to="/planeacion/metaspa">
      <CIcon name="cilChart" />Metas por Indicador
    </CDropdownItem>
    <CDropdownItem to="/planeacion/actividadespa">
      <CIcon name="cilList" />Actividades por Indicador
    </CDropdownItem>
    <CDropdownItem to="/planeacion/gestionpa">
      <CIcon name="cilBlur" />Gestión del Plan de Acción
    </CDropdownItem>
    -->
  </CDropdown>
</template>

<script>
  export default {
    name: 'MenuConfiguracion',
    data () {
      return { 
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>