<html ng-app="app">
    <head>
        <title>Lista de Notícias</title>
        <meta charset="utf-8">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
        
    </head>
    <body>
        
        <div ng-controller="verNoticiaController">       
             
            
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        
                        <div class="page-header">
                            <h2>
                            {{ noticia.dados.noticiatitulo }}
                            
                            <span class="label label-info pull-right">
                                {{ noticia.dados.datanoticia }}
                            </span>
                            </h2>
                        </div>
                        
                        <p ng-bind-html="noticia.dados.noticiatexto">
                        </p>
                        
                    </div>
                </div>
                
                <div class="row">
                
                    <div 
                         class="col-xs-12 col-sm-4 col-md-2"
                         ng-repeat="img in noticia.imagens"
                         >
                        <a href="#" title="{{img.imagemtitulo}}" ng-click="abreFoto(img)">
                            <img 
                                 ng-src="upload/{{img.imagemarquivo}}"
                                 title="{{img.imagemtitulo}}"
                                 class="img-responsive"
                                 >
                        </a>
                        
                    </div>
                    
                </div>
                
            </div>
        
        
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="verFoto">
          <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="myModalLabel">{{fotoMaior.imagemtitulo}}</h4>
                  </div>
                
                <div class="modal-body">
                
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-12">
                            <img 
                                 ng-src="upload/{{fotoMaior.imagemarquivo}}"
                                 class="img-responsive"
                                 >
                        </div>
                    </div>
                </div>
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
        <script src="js/angular/angular-sanitize.min.js"></script>
        <script src="js/verNoticiaController.js"></script>
    </body>
</html>