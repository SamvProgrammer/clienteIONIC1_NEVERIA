var direccionip="http://10.172.23.241:8080";

angular.module('app.controllers', [])
  
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menDeOpcionesCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
    $scope.opciones = function(){
        $state.transitionTo("tabsController.menDeProductos",{},{
            reload: true,
            notify: true
        });
    };

}])
   
.controller('pedidosHechosCtrl', ['$scope', '$stateParams','$http','$ionicPopup','$state','$ionicActionSheet','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$ionicPopup,$state,$ionicActionSheet,$timeout) {

    $scope.arreglo = [];
    $http.get(direccionip+"/ventas/clienteventas")
    .then(function(response) {
        $scope.arreglo=response.data;
    });

     $scope.clickBoton = function(){
        $state.transitionTo("tabsController.agregarventacliente",{parametro:{'insertar':true}},{
            reload: true,
            notify: true
        }); 
     };


     $scope.oprime = function(id){
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: 'Ver cuenta' },
              { text: 'Agregar a cuenta' }
            ],
            destructiveText: 'Eliminar Cuenta',
            titleText: 'Opciones',
            cancelText: 'Cancelar',
            cancel: function() {
               },
            buttonClicked: function(index) {
              if(index == 0){
               $state.transitionTo("tabsController.totalcuenta",{parametro:{'insertar':false,'id':id}},{
                reload: true,
                notify: true
            }); 
              }
              if(index == 1){
                $state.transitionTo("tabsController.agregarProductosCuenta",{parametro:{'insertar':false,'id':id}},{
                    reload: true,
                    notify: true
                });   
              }
              return true;
            },
            destructiveButtonClicked:function(){

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Eliminar el registro',
                    template: '¿Esta seguro de eliminar el registro?',
                    cancelText: 'Cancelar',
                    okText: 'Eliminar'
                  });
               
                  confirmPopup.then(function(res) {
                    if(res) {
                        $http.delete(direccionip+"/catalogos/productos/"+id)
                        .then(function(response) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Respuesta',
                                template: response.data.respuesta
                              });
                              $http.get(direccionip+"/catalogos/productos")
                              .then(function(response) {
                                  $scope.arreglo=response.data;
                              });
                              
                        });
                    } else {
                      //código si se dice cancela la petición...
                    }
                  });
            }
          });
       
          // For example's sake, hide the sheet after two seconds
          $timeout(function() {
            hideSheet();
          }, 3000);
     }

}])
   
.controller('historialCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http) {

    $scope.arreglo = [];
    $http.get(direccionip+"/ventas/clienteventashistorico")
    .then(function(response) {
        
        $scope.arreglo=response.data;
    });
  

}])

.controller('ejemplo', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
      
.controller('menDeProductosCtrl', ['$scope', '$stateParams','$http','$ionicActionSheet', '$timeout','$ionicPopup',
'$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$ionicActionSheet, $timeout, $ionicPopup,$state) { 
    $scope.arreglo = [];
    $http.get(direccionip+"/catalogos/productos")
    .then(function(response) {
        $scope.arreglo=response.data;
    });
  
      $scope.actualizar = function(){
        $http.get(direccionip+"/catalogos/productos")
        .then(function(response) {
            $scope.arreglo=response.data;
        });
        
      }
      $scope.oprime = function(id){
        var hideSheet = $ionicActionSheet.show({
            buttons: [
              { text: 'Modificar registro' }
            ],
            destructiveText: 'Eliminar Registro',
            titleText: 'Opciones',
            cancelText: 'Cancelar',
            cancel: function() {
               },
            buttonClicked: function(index) {
              if(index == 0){
                $state.transitionTo("tabsController.agregarproducto",{parametro:{'insertar':false,'id':id}},{
                    reload: true,
                    notify: true
                });   

              }
              return true;
            },
            destructiveButtonClicked:function(){

                var confirmPopup = $ionicPopup.confirm({
                    title: 'Eliminar el registro',
                    template: '¿Esta seguro de eliminar el registro?',
                    cancelText: 'Cancelar',
                    okText: 'Eliminar'
                  });
               
                  confirmPopup.then(function(res) {
                    if(res) {
                        $http.delete(direccionip+"/catalogos/productos/"+id)
                        .then(function(response) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Respuesta',
                                template: response.data.respuesta
                              });
                              $http.get(direccionip+"/catalogos/productos")
                              .then(function(response) {
                                  $scope.arreglo=response.data;
                              });
                              
                        });
                    } else {
                      //código si se dice cancela la petición...
                    }
                  });
            }
          });
       
          // For example's sake, hide the sheet after two seconds
          $timeout(function() {
            hideSheet();
          }, 3000);          
      };

      $scope.clickBoton = function(id){
        $state.transitionTo("tabsController.agregarproducto",{parametro:{'insertar':true}},{
            reload: true,
            notify: true
        });   
      };
}])
   
.controller('descripciNDelProductoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 

   
.controller('agregarproductoCtrl', ['$scope', '$stateParams','$ionicPopup','$http','$state','$location', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$ionicPopup,$http,$state,$location,$window) {
    $scope.nombre = "";
    $scope.descripcion = "";
    $scope.precio = "";
    $scope.imagen = "";
    $scope.visible = false;
    $scope.valortexto = "";
    var parametro =  $stateParams.parametro;
    
    if(parametro.insertar){
        $scope.nombreboton ="Insertar producto";        
    }else{
        $scope.nombreboton ="Modificar producto"; 
        $http.get(direccionip+"/catalogos/productos/"+parametro.id)
            .then(function(response) {
                  $scope.arreglo=response.data;
                  var obj = $scope.arreglo[0];
                  $scope.nombre = obj.nombre;
                  $scope.descripcion = obj.descripcion;
                  $scope.precio = obj.precio;
                 });      
    }
    $scope.regresar = function(){
        $state.transitionTo("tabsController.menDeProductos",{},{
            reload: true,
            notify: true
        });
    };
    $scope.clickBoton = function(nombre,descripcion,precio){
        if(nombre === ""){
           $scope.visible = true;
           $scope.valortexto = "Ingresar nombre";
        
        }else if(descripcion === ""){
            $scope.visible = true;
            $scope.valortexto = "Ingresar descripción";
         
         }else if(precio === ""){
            $scope.visible = true;
            $scope.valortexto = "Ingresar precio";
         
         }else{
            $scope.visible = false;
            $scope.valortexto = "";
            if(parametro.insertar){
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Insertar registro',
                    template: '¿Desea insertar el registro?',
                    cancelText: 'Cancelar',
                    okText: 'Agregar'
                  });
               
                  confirmPopup.then(function(res) {
                    if(res) {
                      var objeto = {
                         nombre:nombre,
                         descripcion:descripcion,
                         precio:precio,
                         rutaimagen:'imagenenviar'                    
                      };
                      var jsonparseado = JSON.stringify(objeto);
                      var configuracion = {
                        url: direccionip+"/catalogos/productos",
                        method: "POST",
                        data: jsonparseado
                      };
                      $http(configuracion)
                    .then(function(response) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Respuesta',
                            template: response.data.respuesta
                          });
                          //$state.go('tabsController.menDeProductos');
                          $state.transitionTo("tabsController.menDeProductos",{},{
                            reload: true,
                            notify: true
                        });
                        
                    }, 
                    function(response) { // optional
                  
                    });
                    
                    
                    } else {
                        //Código para insertar algo si se da en cancelar
                    }
                  });

            }else{
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Actualizar registro',
                    template: '¿Desea actualizar el registro?',
                    cancelText: 'Cancelar',
                    okText: 'Agregar'
                  });
               
                  confirmPopup.then(function(res) {
                    if(res) {
                      var objeto = {
                         nombre:nombre,
                         descripcion:descripcion,
                         precio:precio,
                         rutaimagen:'imagenenviar'                    
                      };
                      var jsonparseado = JSON.stringify(objeto);
                      var configuracion = {
                        url: direccionip+"/catalogos/productos/"+parametro.id,
                        method: "PUT",
                        data: jsonparseado
                      };
                      $http(configuracion)
                    .then(function(response) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Respuesta',
                            template: response.data.respuesta
                          });
                          //$state.go('tabsController.menDeProductos');
                          $state.transitionTo("tabsController.menDeProductos",{},{
                            reload: true,
                            notify: true
                        });
                        
                    }, 
                    function(response) { // optional
                  
                    });
                    
                    
                    } else {
                        //Código para insertar algo si se da en cancelar
                    }
                  });

            }
        }
    };
}])

.controller('opcionestabctrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
    $scope.boton = function(){
        $state.transitionTo("tabsController.menDeOpciones",{},{
            reload: true,
            notify: true
        });
    };

}])

.controller('agregarventaclienteCtrl', ['$scope', '$stateParams','$state','$http','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$http,$ionicPopup) {
    var parametro =  $stateParams.parametro;
    $scope.arreglo = [];
    $scope.seleccion;
    $http.get(direccionip+"/catalogos/mesas")
    .then(function(response) {
        $scope.arreglo=response.data;
    });


    if(parametro.insertar){
        $scope.nombreboton ="Agregar Venta";        
    }

    $scope.regresar = function(){
        $state.transitionTo("tabsController.pedidosHechos",{},{
            reload: true,
            notify: true
        });
    };

    $scope.agregar = function(id_mesa){

        if(parametro.insertar){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Registrar venta mesa',
                template: '¿Desea registrar una nueva mesa?',
                cancelText: 'Cancelar',
                okText: 'Agregar'
              });
           
              confirmPopup.then(function(res) {
                if(res) {
                  var tempFecha = new Date();
                  var fecha = tempFecha.getFullYear()+"-"+tempFecha.getMonth()+"-"+tempFecha.getDate();
                  var objeto = {
                     fecha:fecha,
                     id_mesa:id_mesa                 
                  };
                  var jsonparseado = JSON.stringify(objeto);
                  var configuracion = {
                    url: direccionip+"/ventas/clienteventas",
                    method: "POST",
                    data: jsonparseado
                  };
                  $http(configuracion)
                .then(function(response) {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Respuesta',
                        template: response.data.respuesta
                      });
                      //$state.go('tabsController.menDeProductos');
                      $state.transitionTo("tabsController.pedidosHechos",{},{
                        reload: true,
                        notify: true
                    });
                    
                }, 
                function(response) { // optional
              
                });
                
                
                } else {
                    //Código para insertar algo si se da en cancelar
                }
              });

        }
    };

}])

.controller('agregarProductosCuentaCtrl', ['$scope', '$stateParams','$state','$http','$ionicPopup','$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$http,$ionicPopup,$timeout) {
    var parametro =  $stateParams.parametro;
    $scope.arreglo = [];
    $http.get(direccionip+"/catalogos/productos")
    .then(function(response) {
        $scope.arreglo=response.data;
    });

   $scope.oprime = function(id_producto){
    $scope.data = {};

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="number" ng-model="data.cantidad">',
      title: 'Número de ordenes',
      subTitle: 'Favor de ingresar la cantidad a agregar',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Agregar</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.cantidad) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.cantidad;
            }
          }
        }
      ]
    });
  
    myPopup.then(function(res) {
      if(res){
        var objeto = {
            id_producto:id_producto,
            id_mesa:parametro.id,
            cantidad :res                 
         };
         var jsonparseado = JSON.stringify(objeto);
         var configuracion = {
           url: direccionip+"/ventas/clienteventasDetalle",
           method: "POST",
           data: jsonparseado
         };
         $http(configuracion)
         .then(function(response) {
             var alertPopup = $ionicPopup.alert({
                 title: 'Respuesta',
                 template: "Producto agregado a la cuenta"
               });             
         }, 
         function(response) { // optional
       
         });

      }
    });
  
    
   };
   
   $scope.regresar = function(){

    $state.transitionTo("tabsController.pedidosHechos",{},{
        reload: true,
        notify: true
    });
   }
}])
.controller('totalcuentaCtrl', ['$scope', '$stateParams','$http','$state','$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$http,$state,$ionicPopup) {
    var parametro =  $stateParams.parametro;
    $scope.arreglo = [];
    $scope.total = 0;
    $http.get(direccionip+"/ventas/clienteVentasDetalle/"+parametro.id)
    .then(function(response) {
        $scope.arreglo=response.data;
    });



    $scope.regresar = function(){
        $state.transitionTo("tabsController.pedidosHechos",{},{
            reload: true,
            notify: true
        });

    };
    
    $scope.realizarcobro = function(totalcuenta){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Realizar el cobro',
            template: '¿Desea realizar el cobro de la cuenta?',
            cancelText: 'Cancelar',
            okText: 'Aceptar'
          });
          confirmPopup.then(function(res) {
            if(res) {
                var objeto = {
                    total:totalcuenta
                 };
                 var jsonparseado = JSON.stringify(objeto);
                 var configuracion = {
                   url: direccionip+"/ventas/clienteventasDetalle/"+parametro.id,
                   method: "PUT",
                   data: jsonparseado
                 };
                 $http(configuracion)
               .then(function(response) {
                   var alertPopup = $ionicPopup.alert({
                       title: 'Respuesta',
                       template: response.data.respuesta
                     });
                     //$state.go('tabsController.menDeProductos');
                     $state.transitionTo("tabsController.pedidosHechos",{},{
                       reload: true,
                       notify: true
                   });
                   
               }, 
               function(response) { // optional
             
               });
               
               
                     
            } else {
                //Código para insertar algo si se da en cancelar
            }
          });
    };

}])