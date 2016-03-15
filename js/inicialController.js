var app = angular.module('app', ['socket-io']);

app.controller('inicialController', function($scope, $http, socket){

    socket.on('error', function (err) {
        console.log("Parece que a conexão caiu!");
    });
    
    $scope.usuariochat = { email : "", mensagens : [] };
    
    $scope.chat = false;
    $scope.mostra_entrar_chat = true;
    $scope.mostra_batepapo = false;
    
    $scope.novaMensagem = "";
    
    socket.on('chatstatus', function(data){
        $scope.chat = data.online;
        
        if(!data.online){            
            if($('#chat').hasClass('in')) 
                alert("O administrador fechou o chat! :-(");
            
            $("#chat").modal('hide');
        }
    });
    
    socket.on('chegoumensagem', function(mensagem){
        $scope.usuariochat.mensagens.push({"de":mensagem.de, "msg":mensagem.msg});
        $scope.scrolldown();
    });
    
    $scope.abrirModalChat = function(){
        $scope.usuariochat = { email : "", mensagens : [] };
        $("#chat").modal({backdrop:'static'});
        $("#chat").modal('show');
    }
    
    $scope.entrarChat = function(){
        socket.emit('entrarchat', $scope.usuariochat.email, function(data){
            $scope.mostra_entrar_chat = false;
            $scope.mostra_batepapo = true;
        });
    }
    
    $scope.sairChat = function(){
        if(!confirm("Deseja mesmo sair?")) return false;
        
        socket.emit('sairchat', function(data){});
        $scope.mostra_entrar_chat = true;
        $scope.mostra_batepapo = false;
        $("#chat").modal('hide');
    }
    
    $scope.enviarMensagem = function(){
        socket.emit('enviarmensagem', $scope.novaMensagem);
        $scope.usuariochat.mensagens.push({"de":$scope.usuariochat.email, "msg":$scope.novaMensagem});
        $scope.scrolldown();        
        $scope.novaMensagem = "";
        $("#cp_texto_enviar").focus();
    }
    
    $scope.scrolldown = function(){
        setTimeout(function(){
            $('#mostra_mensagens').scrollTop(1E10);
        },1000);
    }

    
    
    $scope.getNoticias = function(){        
        $scope.noticias = {};
        
        $http.get('api/getNoticiaFrontend')
            .success(function(data){
                
                $scope.noticias = data.noticias;
            
            })
            .error(function(){
                alert("Falha em obter notícia");
            });
        
    };
    
    $scope.getNoticias();
    
});