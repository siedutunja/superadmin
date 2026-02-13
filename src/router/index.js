import Vue from 'vue'
import Router from 'vue-router'
import autenticar from "@/auth/autenticar.js";


Vue.use(Router)
export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    // 2022-07-19
    {
      path: '/',
      redirect: '/inicio',
      name: 'Inicio',
      component: () => import('@/containers/TheContainer'),
      children: [
        // 2022-07-19
        {
          path: 'inicio',
          //beforeEnter: autenticar,
          component: () => import('@/views/Inicio')
        },
        // 2022-07-19
        {
          path: 'perfil',
          beforeEnter: autenticar,
          name: 'Perfil del Usuario',
          component: () => import('@/views/perfiles/Perfil')
        },
        // 2022-11-25
        {
          path: 'usuarios',
          redirect: '/usuarios/usuarios',  
          name: 'Usuarios',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            // 2022-11-25
            {
              path: 'usuarios',
              beforeEnter: autenticar,
              name: 'Usuarios IE',
              component: () => import('@/views/usuarios/Usuarios')
            },
            // 2022-11-25
            {
              path: 'consultausuario',
              beforeEnter: autenticar,
              name: 'Consulta Usuario',
              component: () => import('@/views/usuarios/ConsultaUsuario')
            },
          ]
        },
        // 2022-07-21
        {
          path: 'crearsolicitud',
          beforeEnter: autenticar,
          name: 'Crear Solicitud',
          component: () => import('@/views/tramites/CrearSolicitud')
        },
        // 2022-07-22
        {
          path: 'corregirsolicitud',
          beforeEnter: autenticar,
          name: 'Corregir Solicitud',
          component: () => import('@/views/tramites/CorregirSolicitud')
        },
        // 2022-07-25
        {
          path: 'solicitudes',
          beforeEnter: autenticar,
          name: 'Lista Solicitudes',
          component: () => import('@/views/tramites/Solicitudes')
        },
        // 2022-07-25
        {
          path: 'recursos',
          beforeEnter: autenticar,
          name: 'Lista Recursos',
          component: () => import('@/views/presupuesto/Recursos')
        },
        // 2023-09-17
        {
          path: 'cupospreinscripciones',
          beforeEnter: autenticar,
          name: 'Cupos Disponibles',
          component: () => import('@/views/preinscripciones/CuposPreinscripciones')
        },
        // 2023-09-17
        {
          path: 'asignarcupos',
          beforeEnter: autenticar,
          name: 'Asignar Cupos',
          component: () => import('@/views/preinscripciones/AsignarCupos')
        },
        // 2022-08-23
        {
          path: 'listapreinscritos',
          beforeEnter: autenticar,
          name: 'Preinscripciones',
          component: () => import('@/views/preinscripciones/ListaPreinscritos')
        },
        // 2022-08-04
        {
          path: 'gestiongastos',
          beforeEnter: autenticar,
          name: 'Gestion de Gastos',
          component: () => import('@/views/presupuesto/GestionGastos')
        },
        // 2025-06-19
        {
          path: 'informegastos',
          beforeEnter: autenticar,
          name: 'Informe de Gastos',
          component: () => import('@/views/presupuesto/InformeGastos')
        },
        // 2022-07-19
        {
          path: 'restringida',
          component: () => import('@/views/pages/Restringida')
        },    
        // 2022-09-20
        {
          path: 'infoinstitucional',
          beforeEnter: autenticar,
          name: 'Info Institucional',
          component: () => import('@/views/perfiles/InfoInstitucional')
        },
        // 2022-09-20
        {
          path: 'infraestructura',
          beforeEnter: autenticar,
          name: 'Info Infraestructura',
          component: () => import('@/views/perfiles/Infraestructura')
        },
        // 2023-08-10
        {
          path: 'instrumentosiee',
          beforeEnter: autenticar,
          name: 'Instrumento SIEE',
          component: () => import('@/views/calidad/InstrumentoSiee')
        },
        // 2023-08-10
        {
          path: 'resultadossiee',
          beforeEnter: autenticar,
          name: 'Resultados SIEE',
          component: () => import('@/views/calidad/ResultadosSiee')
        },
        // 2023-10-10
        {
          path: 'equipotrabajo',
          beforeEnter: autenticar,
          name: 'Equipos de Trabajo',
          component: () => import('@/views/calidad/EquipoTrabajo')
        },
        // 2023-08-24
        {
          path: 'autoevaluacion',
          beforeEnter: autenticar,
          name: 'Autoevaluación',
          component: () => import('@/views/calidad/Autoevaluacion')
        },
        // 2023-08-29
        {
          path: 'priorizacion',
          beforeEnter: autenticar,
          name: 'Priorización',
          component: () => import('@/views/calidad/Priorizacion')
        },
        // 2023-08-29
        {
          path: 'planmejoramiento',
          beforeEnter: autenticar,
          name: 'Plan de Mejoramiento',
          component: () => import('@/views/calidad/PlanMejoramiento')
        },
        // 2024-06-13
        {
          path: 'seguimientoindicadores',
          beforeEnter: autenticar,
          name: 'Seguimiento Indicadores',
          component: () => import('@/views/calidad/SeguimientoIndicadores')
        },
        // 2024-01-18
        {
          path: 'resumenpmi',
          beforeEnter: autenticar,
          name: 'ResumenPmi',
          component: () => import('@/views/calidad/ResumenPmi')
        },
        // 2024-02-01
        {
          path: 'carguedocumentos',
          beforeEnter: autenticar,
          name: 'CargueDocumentos1',
          component: () => import('@/views/calidad/carguedocumentos/CargueDocumentos')
        },
        // 2024-06-26
        {
          path: 'vermensajes',
          beforeEnter: autenticar,
          name: 'VerMensajes',
          component: () => import('@/views/mensajes/VerMensajes')
        },
        // 2026-02-09 Departamentos
        {
          path: 'departamentos',
          name: 'Departamentos',
          component: () => import('@/views/departamentos/Departamentos')
        },
        // 2026-02-12 Colegios
        {
          path: 'colegios',
          name: 'Colegios',
          component: () => import('@/views/colegios/Colegios')
        },
      ]
    },
    // 2022-07-20
    {
      path: "*",
      component: () => import('@/views/pages/Extraviada')
    },
    // 2022-07-20
    {
      path: '/bienvenida',
      component: () => import('@/views/pages/Bienvenida')
    }
  ]
}

