var app = angular.module('app', ['ui.mask','angular-loading-bar']);

app.controller('painelInicialController', function($scope, $http){
    $scope.showCadastro = false;
    $scope.noticia = objNoticia();
    $scope.allNoticias = {};
    
    $scope.abreCadastroNoticia = function(){
    	$scope.noticia = objNoticia();
        $scope.showCadastro = true;
    }
    
    $scope.listarNoticias = function(){
        $http.get('../api/listarNoticias')
            .success(function(data){
                $scope.allNoticias = data.noticias;
            })
            .error(function(){
                alert("Falha em obter notícias");
            });
    };

    $scope.cancelarCadastro = function(){
    	$scope.noticia = objNoticia();
    	$scope.showCadastro = false;
    }

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

    $scope.trocaStatus = function(noticia, novoStatus){
        $http.get('../api/trocastatus/'+noticia.idnoticia+"/"+novoStatus)
            .success(function(data){

                noticia.noticiastatus = novoStatus;
            })
            .error(function(){
                alert("Falha em trocar o Status");
            });
    };

    $scope.excluirNoticia = function(idnoticia){
        
        if(!confirm("Confirma a exclusão da notícia?")) return false;

      $http.get('../api/excluirNoticia/'+idnoticia)
            .success(function(data){

                $scope.listarNoticias();
                $scope.exibirMenssagemGriter("Sucesso!","Notícia excluida com sucesso!");
            })
            .error(function(){
                alert("Falha em Excluir notícia");
            });       
    };

    $scope.limparTelaCadastro = function(){
    	$scope.showCadastro = false;
		$scope.noticia = objNoticia();
        $scope.listarNoticias();

    }

    $scope.processaFormNoticia = function(){

    	if ($scope.noticia.idnoticia===-1) {
    		$scope.cadastrarNovaNoticia();
    	}else{
    		$scope.alterarNoticia();
    	};
    };

    $scope.exibirMenssagemGriter = function(titulo,menssagem){
        $.gritter.add({
            title : titulo,
            text : menssagem,
            class_name : "gritter"
        });

    }
    
    $scope.cadastrarNovaNoticia = function(){
        $http
            .post('../api/cadastrarNovaNoticia', $scope.noticia)
            .success(function(data){
                
                if(!data.erro) {
                    // deu certo o cadastro
                    $scope.exibirMenssagemGriter("Sucesso!","Notícia cadastrada com sucesso!");                    
                    
                    $scope.limparTelaCadastro();

                } else {
                	$scope.exibirMenssagemGriter("Falha!", "Ocorreu um erro!");
                };
            
            })
            .error(function(){
                alert("Falha geral da aplicação!");
            });
    };

    $scope.alterarNoticia = function(){
        $http
            .post('../api/alterarNoticia/'+$scope.noticia.idnoticia, $scope.noticia)
            .success(function(data){
                
                if(!data.erro) {
                    // deu certo a alteração
                    $scope.exibirMenssagemGriter("Sucesso!","Notícia alterada com sucesso!"); 
                    
                    $scope.limparTelaCadastro();

                } else {
                	$scope.exibirMenssagemGriter("Falha!", "Ocorreu um erro ao tentar alterar!");
                };
            
            })
            .error(function(){
                alert("Falha geral da aplicação!");
            });
    };    
    
    $scope.listarNoticias();
    
});

function objNoticia(){
    return {
        idnoticia : -1,
        noticiatitulo : "",
        noticiadescricao : "",
        noticiatexto : "",
        noticiadata : ""
    };
}