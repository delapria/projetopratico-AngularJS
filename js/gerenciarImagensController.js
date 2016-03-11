var app = angular.module('app', ['angular-loading-bar', 'angularFileUpload']);

app.controller('gerenciarImagensController', function($scope, $http, $location, FileUploader){
    
    $scope.noticia = {};
    $scope.imagens = {};
    
    $scope.getNoticia = function(idnoticia){
        $http.get('../api/getnoticia/'+idnoticia)
            .success(function(data){
                
                $scope.noticia = data.noticia;
                $scope.showCadastro = true;
            
            })
            .error(function(){
                alert("Falha em obter notícia");
            });
    };
    
    $scope.getImagens = function(idnoticia){
        $http.get('../api/listarImagens/'+idnoticia)
            .success(function(data){
                $scope.imagens = data.imagens;
            })
            .error(function(){
                alert("Falha em obter notícia");
            });
    };
    
    $scope.excImagem = function(idimagem){
        
        if(!confirm("Tem certeza que deseja excluir?")) return false;
        
        $http.get('../api/excluirImagem/'+idimagem)
            .success(function(data){
                $scope.getImagens($location.search().idnoticia);
            })
            .error(function(){
                alert("Falha em obter notícia");
            });
    };
    
    $scope.getNoticia($location.search().idnoticia);
    $scope.getImagens($location.search().idnoticia);
    
    
    var uploader = $scope.uploader = new FileUploader({
        url : '../api/cadastrarImagem/'+$location.search().idnoticia
    });
    
    uploader.filters.push({
        name : "tamanhoFila",
        fn : function(item, options){
            return this.queue.length < 4;
        }
    });
    
    uploader.onBeforeUploadItem = function(item){
        item.formData.push({
            imagemtitulo : item.imagemtitulo
        });
    };
    
    uploader.onSuccessItem = function(fileItem){
        console.log("Item enviado com sucesso!");
        fileItem.remove();
        $scope.getImagens($location.search().idnoticia);
    };
    
    uploader.onWhenAddingFileFailed = function(fileItem){
        console.info("Erro ao adicionar elemento", fileItem);
    };
    
    uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
    
    
    uploader.onWhenAddingFileFailed = function(fileItem){
        alert("Somente imagens são permitidas");
    };
    
});

app.config(function($locationProvider){
    $locationProvider.html5Mode({
        enabled : true,
        requireBase : false
    });
});