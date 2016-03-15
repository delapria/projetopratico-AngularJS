var app = angular.module('app', ['ui.mask','angular-loading-bar','socket-io']);

app.controller('painelInicialController', function($scope, $http, socket){

    /* Chat */
    $scope.senha = '123456';
    $scope.chat = false;    
    $scope.chatUsuarios = [];   
    $scope.novaMensagem = '';   
    $scope.usuarioAtivo = 0;
    
    socket.emit('adminlogin', $scope.senha);
    
    $scope.chatStatus = function(){
        socket.emit('setChatStatus', $scope.senha);
    };
    
    socket.on('chatstatus', function(data){
        $scope.chat = data.online;
    });
    
    socket.on('usuarioentrou', function(email){
        $scope.chatUsuarios.push({ usuario : email, mensagens : []});
        
        if($scope.chatUsuarios.length==1){
            $scope.usuarioAtivo = 0;
        }
    });

    socket.on('usuariosaiu', function(usuario){
        var ind = $scope.buscaUsuario(usuario);
        
        console.log('Usuário saiu')
        $scope.exibirMenssagemGriter("Usuário",$scope.chatUsuarios[ind].usuario+" saiu do chat");

        console.log($scope.chatUsuarios[ind])
        $scope.chatUsuarios.splice(ind, 1);
        $scope.usuarioAtivo = 0;
        //removeu toda a conversa
    })
    
    
    socket.on('novamensagemparaadmin', function(mensagem){
        var ind = $scope.buscaUsuario(mensagem.de); 
        $scope.chatUsuarios[ind].mensagens.push(
                            { de:mensagem.de, msg:mensagem.msg }
                            );
    });
    
    $scope.buscaUsuario = function(usuario){
        var status = false;
        var cont = 0;
        while(cont < $scope.chatUsuarios.length){
            if($scope.chatUsuarios[cont].usuario==usuario){
                return cont;   
            }
            cont++;
        }
        
        return false;
    }
    
    $scope.enviarMensagem = function(){
        
        $scope.chatUsuarios[$scope.usuarioAtivo].mensagens.push(
            { de:'Admin', msg : $scope.novaMensagem }
        );
        
        socket.emit('enviarmensagemparausuario', 
                    { para : $scope.chatUsuarios[$scope.usuarioAtivo].usuario, 
                     msg : $scope.novaMensagem });
        
        $scope.novaMensagem = '';
        $scope.scrollDown();
    }
    
    $scope.setaUsuarioAtivo = function(ind){
        $scope.usuarioAtivo = ind;   
    }
    
    $scope.scrollDown = function(){
        setTimeout(function(){
            $("#mostra_mensagens").scrollTop(1E10);
        }, 800);
    }

    /* Fim do Chat*/


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