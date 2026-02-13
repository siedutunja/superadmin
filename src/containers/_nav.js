import * as CONFIG from '@/assets/config.js'
import jwt from 'jsonwebtoken'

let menu = []

    let indice = 0
    const coltramites = 1
    const id_sector = 1
    const colpresupuesto = 1
    const colsiee = 1
    const colpmi = 1
    const colcobertura = 1

    menu = [
      {
        _name: 'CSidebarNav',
        _children: [
          {
            _name: 'CSidebarNavTitle',
            _children: ['Menú Principal']
          }
        ]
      }
    ]

    // TRAMITES
    if (coltramites == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Tramites',
          icon: 'cilFeaturedPlaylist',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Crear Solicitud', to: '/crearsolicitud'})
      menu[0]._children[indice].items.push({ name: 'Consulta Solicitudes', to: '/solicitudes'})
    }

    // PRESUPUESTO
    if (id_sector == 1 && colpresupuesto == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Presupuesto',
          icon: 'cilCash',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Gestión de Ingresos', to: '/recursos'})
      menu[0]._children[indice].items.push({ name: 'Gestión de Gastos', to: '/gestiongastos'})
      menu[0]._children[indice].items.push({ name: 'Informes de Gastos', to: '/informegastos'})
    }

    // CALIDAD - SIEE
    if (colsiee == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Siee',
          icon: 'cil-layers',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Instrumento SIEE', to: '/instrumentosiee'})  
      menu[0]._children[indice].items.push({ name: 'Resultados SIEE', to: '/resultadossiee'})  
    }

    // CALIDAD - PMI
    if (colpmi == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Pmi',
          icon: 'cilChartLine',
          items: []
        }
      )
      indice++
      if (colpmi == 1) {
        menu[0]._children[indice].items.push({ name: 'Equipos de Trabajo', to: '/equipotrabajo'})
      }
      menu[0]._children[indice].items.push({ name: 'Autoevaluación', to: '/autoevaluacion'})
      menu[0]._children[indice].items.push({ name: 'Priorización', to: '/priorizacion'})
      menu[0]._children[indice].items.push({ name: 'Plan de Mejoramiento', to: '/planmejoramiento'})
      menu[0]._children[indice].items.push({ name: 'Resumen Pmi', to: '/resumenpmi'})
      menu[0]._children[indice].items.push({ name: 'Seguimiento Indicadores', to: '/seguimientoindicadores'})
    }
    

    // PREINSCRIPCIONES
    if (id_sector == 1 && colcobertura == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Preinscripciones',
          icon: 'cilAddressBook',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Asignar Cupos', to: '/asignarcupos'})
      menu[0]._children[indice].items.push({ name: 'Cupos Disponibles', to: '/cupospreinscripciones'})
      menu[0]._children[indice].items.push({ name: 'Lista Preinscritos', to: '/listapreinscritos'})
    }

    // CALIDAD
    if (colpmi == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Calidad',
          icon: 'cilTask',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Desarrollo Institucional', to: '/carguedocumentos'})
    }

    // UBICACION - Departamentos
    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Ubicación',
        icon: 'cilMap',
        items: []
      }
    )
    indice++
    menu[0]._children[indice].items.push({ name: 'Departamentos', to: '/departamentos'})

    // Colegios - Bogota
    menu[0]._children.push(
      {
        _name: 'CSidebarNavDropdown',
        name: 'Colegios',
        icon: 'cilMap',
        items: []
      }
    )
    indice++
    menu[0]._children[indice].items.push({ name: 'Bogotá', to: '/colegios'})    
/*
let menu = []
let token = sessionStorage.getItem('token')
if ( token == null ) {
  let valores = window.location.search
  let urlParams = new URLSearchParams(valores)
  token = urlParams.get('token')
}
jwt.verify(token, CONFIG.SECRET_KEY, (err, data) => {
  if (err) {
    alert('¡Nav. Lo sentimos, el token no es válido o el token ha expirado.! Es necesario iniciar una nueva sesión.')
    location.replace(CONFIG.ROOT_WEBSITE)
  } else {
    window.history.replaceState({},'','/colegio/')
    sessionStorage.setItem('token', token)
    let tokenDecodificado = jwt.decode(token)
    let tokenPermisos = tokenDecodificado.permisos
    let indice = 0
    menu = [
      {
        _name: 'CSidebarNav',
        _children: [
          {
            _name: 'CSidebarNavTitle',
            _children: ['Menú Principal']
          }
        ]
      }
    ]

    // TRAMITES
    if (tokenPermisos.coltramites == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Tramites',
          icon: 'cilFeaturedPlaylist',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Crear Solicitud', to: '/crearsolicitud'})
      menu[0]._children[indice].items.push({ name: 'Consulta Solicitudes', to: '/solicitudes'})
    }

    // PRESUPUESTO
    if (tokenDecodificado.id_sector == 1 && tokenPermisos.colpresupuesto == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Presupuesto',
          icon: 'cilCash',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Gestión de Ingresos', to: '/recursos'})
      menu[0]._children[indice].items.push({ name: 'Gestión de Gastos', to: '/gestiongastos'})
      menu[0]._children[indice].items.push({ name: 'Informes de Gastos', to: '/informegastos'})
    }

    // CALIDAD - SIEE
    if (tokenPermisos.colsiee == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Siee',
          icon: 'cil-layers',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Instrumento SIEE', to: '/instrumentosiee'})  
      menu[0]._children[indice].items.push({ name: 'Resultados SIEE', to: '/resultadossiee'})  
    }

    // CALIDAD - PMI
    if (tokenPermisos.colpmi == 1 || tokenPermisos.colpmidirectiva == 1 || tokenPermisos.colpmiacademica == 1 || tokenPermisos.colpmiadmin == 1 || tokenPermisos.colpmicomunidad == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Pmi',
          icon: 'cilChartLine',
          items: []
        }
      )
      indice++
      if (tokenPermisos.colpmi == 1) {
        menu[0]._children[indice].items.push({ name: 'Equipos de Trabajo', to: '/equipotrabajo'})
      }
      menu[0]._children[indice].items.push({ name: 'Autoevaluación', to: '/autoevaluacion'})
      menu[0]._children[indice].items.push({ name: 'Priorización', to: '/priorizacion'})
      menu[0]._children[indice].items.push({ name: 'Plan de Mejoramiento', to: '/planmejoramiento'})
      menu[0]._children[indice].items.push({ name: 'Resumen Pmi', to: '/resumenpmi'})
      menu[0]._children[indice].items.push({ name: 'Seguimiento Indicadores', to: '/seguimientoindicadores'})
    }
    

    // PREINSCRIPCIONES
    if (tokenDecodificado.id_sector == 1 && tokenPermisos.colcobertura == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Preinscripciones',
          icon: 'cilAddressBook',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Asignar Cupos', to: '/asignarcupos'})
      menu[0]._children[indice].items.push({ name: 'Cupos Disponibles', to: '/cupospreinscripciones'})
      menu[0]._children[indice].items.push({ name: 'Lista Preinscritos', to: '/listapreinscritos'})
    }

    // CALIDAD
    if (tokenPermisos.colpmi == 1) {
      menu[0]._children.push(
        {
          _name: 'CSidebarNavDropdown',
          name: 'Calidad',
          icon: 'cilTask',
          items: []
        }
      )
      indice++
      menu[0]._children[indice].items.push({ name: 'Desarrollo Institucional', to: '/carguedocumentos'})
    }
  }

})
*/

export default menu