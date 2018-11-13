angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

      .state('tabsController.menDeOpciones', {
    url: '/page2',
    cache:false,
    views: {
      'tab1': {
        templateUrl: 'templates/menDeOpciones.html',
        controller: 'menDeOpcionesCtrl'
      }
    }
  })

  .state('tabsController.pedidosHechos', {
    url: '/page3',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/pedidosHechos.html',
        controller: 'pedidosHechosCtrl'
      }
    }
  })

  .state('tabsController.historial', {
    url: '/page4',
    cache:false,
    views: {
      'tab3': {
        templateUrl: 'templates/historial.html',
        controller: 'historialCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    cache:false,
    templateUrl: 'templates/tabsController.html',
    controller:'opcionestabctrl',
    abstract:true
  })

  .state('tabsController.menDeProductos', {
    url: '/productos',
    cache:false,
    views: {
      'tab1': {
        templateUrl: 'templates/menDeProductos.html',
        controller: 'menDeProductosCtrl'
      }
    }
  })

  .state('tabsController.descripciNDelProducto', {
    url: '/descripcion',
    cache:false,
    views: {
      'tab1': {
        templateUrl: 'templates/descripciNDelProducto.html',
        controller: 'descripciNDelProductoCtrl'
      }
    }
  })
  .state('tabsController.agregarproducto', {
    url: '/agregarproducto/{parametro:json}',
    cache:false,
    views: {
      'tab1': {
        templateUrl: 'templates/agregarproducto.html',
        controller: 'agregarproductoCtrl'
      }
    }
  })
  .state('tabsController.agregarventacliente', {
    url: '/agregarventacliente/{parametro:json}',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/agregarventacliente.html',
        controller: 'agregarventaclienteCtrl'
      }
    }
  })
  .state('tabsController.agregarProductosCuenta', {
    url: '/agregarProductosCuenta/{parametro:json}',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/productosCuenta.html',
        controller: 'agregarProductosCuentaCtrl'
      }
    }
  })
  .state('tabsController.totalcuenta', {
    url: '/totalcuenta/{parametro:json}',
    cache:false,
    views: {
      'tab2': {
        templateUrl: 'templates/totalcuenta.html',
        controller: 'totalcuentaCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page2')


});