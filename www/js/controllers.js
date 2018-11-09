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
   
.controller('pedidosHechosCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('historialCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
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