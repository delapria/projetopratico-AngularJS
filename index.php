<html ng-app="app">
    <head>
        <title>Lista de Notícias</title>
        <meta charset="utf-8">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
        
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
        </div>
        
        <script src="js/angular/angular.min.js"></script>
        <script src="js/app.module.js"></script>
        <script src="js/inicialController.js"></script>
    </body>
</html>