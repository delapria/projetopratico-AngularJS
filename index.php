<html ng-app="app">
    <head>
        <title>Lista de Notícias</title>
        <meta charset="utf-8">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">

        <link rel="stylesheet" href="css/estilo.css">
        
    </head>
    <body>
        
        <div ng-controller="inicialController">       
            
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        
                        <div class="page-header">
                            <h2>Nossas noticias - Douglas</h2>
                        </div>
                        <div class="jumbotron">
                            <h1>Seja bem Vindo!</h1>
                            <p>Sistemsas de noticias com AngularJS</p>
                        </div>  
                    </div>    
                </div>
            </div>    



            <div class="container">
                <div class="row">
                    <div class="col-xs-12">

                    <button 
                            type="button" 
                            class="btn btn-success btn-block" 
                            ng-hide="chat!=true" 
                            ng-click="abrirModalChat()">
                            Chat está online
                        </button>
                        
                        <button 
                                type="button" 
                                class="btn btn-danger btn-block" 
                                ng-show="chat==false" disabled>
                            Chat está offline
                        </button>
                        
                        <hr/>

                        <div class="alert alert-info" 
                             ng-repeat="item in noticias">
                            <h3>
                            <span class="label label-primary"
                                  style="margin-right: 10px;" 
                            >{{item.noticia.dados.datanoticia}}</span> -   
                            <a href="verNoticia.php?id={{item.noticia.dados.idnoticia}}">
                               {{item.noticia.dados.noticiatitulo}} 
                            </a>
                            </h3>
                            
                            <p>{{item.noticia.dados.noticiadescricao}}</p>
                        </div>

                    </div>
                </div>
            </div>  

             <div class="modal fade" id="chat" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">Chat</h4>
                  </div>
                  
                    <div class="modal-body">
                    
                      <div>
                        <div class="container-fluid">
                            <div class="row">
                               
                                <div ng-show="mostra_entrar_chat">
                                    <div class="col-xs-12 text-center">Informe seu nickname:</div>
                                        <div class="col-xs-10">
                                            <input 
                                                   type="text" 
                                                   class="form-control" 
                                                   placeholder="fulano@email.com" ng-model="usuariochat.email">
                                        </div>
                                        <div class="col-xs-2">
                                            <button 
                                                    type="button" 
                                                    class="btn btn-success btn-block" 
                                                    ng-disabled="usuariochat.email==''" 
                                                    ng-click="entrarChat()">
                                                Entrar
                                            </button>
                                        </div>
                                </div>
                                
                                
                                <div ng-show="mostra_batepapo">
                                    
                                        <div class="col-xs-12">
                                            <div class="alert alert-info" 
                                                 style="height:350px; overflow:scroll; overflow-x:hidden" 
                                                 id="mostra_mensagens">
                                                
                                                <div class="well well-sm" 
                                                     ng-repeat="msg in usuariochat.mensagens">
                                                    <p>De: {{msg.de}}</p>
                                                    <p>{{msg.msg}}</p>
                                                </div>
                                                
                                                
                                            </div>
                                        </div>
                                        
                                        <hr/>
                                        <div class="col-xs-10">
                                            <input type="text" 
                                                   class="form-control" 
                                                   placeholder="Mensagem" 
                                                   ng-model="novaMensagem" 
                                                   id="cp_texto_enviar"
                                                   ng-keyup="$event.keyCode == 13 ? enviarMensagem() : null"
                                                   >
                                        </div>
                                        <div class="col-xs-2">
                                            <button 
                                                    type="button" 
                                                    class="btn btn-success btn-block" 
                                                    ng-click="enviarMensagem()" 
                                                    ng-disabled="novaMensagem==''">
                                                    Enviar
                                            </button>
                                        </div>
                                </div>
                                
                            </div>  
                        </div>
                      </div>
                      
                      
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" ng-click="sairChat()">Sair do chat</button>
                  </div>
                </div>
              </div>
            </div>        
        </div>
        
        <script src="https://code.jquery.com/jquery-1.11.3.min.js">
        </script>
        
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js">
        </script>
        <script src="js/angular/angular.min.js"></script>
        <script src="http://localhost:3000/socket.io/socket.io.js"></script>
        <script src="js/angular/ng-socket-io.js"></script>
        <script src="js/inicialController.js"></script>
    </body>
</html>