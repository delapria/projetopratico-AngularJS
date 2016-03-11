<?php
    session_start();
    if(!isset($_SESSION['logado'])){
        header("Location: index.php");
    }
?>

<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>Painel Administrativo - Login</title>
        <meta charset="utf-8">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
        
        <link rel="stylesheet" href="../js/angular/loading-bar.min.css">
        <link rel="stylesheet" href="../js/jquery/jquery.gritter.css">
        
        <link rel="stylesheet" href="../css/estilo.css">
        
    </head>
    <body>
        
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">
                Painel de Notícias
              </a>
            </div>
          </div>
        </nav>
        
        <div ng-controller="painelInicialController">       
        
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                        <div class="well well-sm">
                            <button 
                                    type="button" 
                                    class="btn btn-primary" 
                                    ng-click="abreCadastroNoticia()"
                            >
                                Cadastrar Notícia
                            </button>

                            <a 
                                href="../api/logout"
                                class="btn btn-danger pull-right"
                                onclick="return confirm('Tem certeza?')" 
                            >
                                Logout    
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- form cadastro notícias -->
            <div class="container" ng-show="showCadastro">
                <form ng-submit="processaFormNoticia()">
                    
                    <div class="row mbottom">
                        <div class="col-xs-3 text-right">
                            Título:
                        </div>
                        <div class="col-xs-9">
                            <input 
                                   type="text" 
                                   class="form-control" 
                                   ng-model="noticia.noticiatitulo" 
                                   required>
                        </div>
                    </div>
                    
                    <div class="row mbottom">
                        <div class="col-xs-3 text-right">
                            Descrição:
                        </div>
                        <div class="col-xs-9">
                            <input 
                                   type="text" 
                                   class="form-control" 
                                   ng-model="noticia.noticiadescricao" 
                                   >
                        </div>
                    </div>
                    
                    <div class="row mbottom">
                        <div class="col-xs-3 text-right">
                            Data:
                        </div>
                        <div class="col-xs-9">
                            <input 
                                   class="form-control" 
                                   ng-model="noticia.noticiadata" 
                                   ui-mask="99/99/9999"
                                   model-view-value="true"
                                   >
                        </div>
                    </div>
                    
                    <div class="row mbottom">
                        <div class="col-xs-3 text-right">
                            Texto:
                        </div>
                        <div class="col-xs-9">
                            <textarea 
                                      class="form-control"
                                      ng-model="noticia.noticiatexto"
                                      rows="5"
                                      >
                            </textarea>
                        </div>
                    </div>
                    
                    <div class="row mbottom">
                        <div class="col-xs-9 col-xs-offset-3">
                            <button 
                                    class="btn btn-primary"
                                    type="submit"
                                    ng-show="noticia.idnoticia==-1"
                            >
                                Salvar
                            </button>

                            <button 
                                    class="btn btn-success"
                                    type="submit"
                                    ng-show="noticia.idnoticia!=-1"
                            >
                                Alterar
                            </button>
                            <button 
                                    class="btn btn-danger"
                                    type="submit"
                                    ng-click="cancelarCadastro()"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                    
                </form>
            </div>
            <!-- /form cadastro notícias -->
            
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                    
                        <table class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th width="90">Data</th>
                                    <th>Titulo</th>
                                    <th width="60">Status</th>
                                    <th width="150">-</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                
                                <tr ng-repeat="noticia in allNoticias">
                                    <td>{{ noticia.datanoticia }}</td>
                                    <td>{{ noticia.noticiatitulo }}</td>
                                    <td>
                                        <button 
                                                type="button"
                                                class="btn btn-danger"
                                                title="Neste momento a noticia esta bloqueada."
                                                ng-show="noticia.noticiastatus==1" 
                                                ng-click="trocaStatus(noticia, 2)"
                                        >
                                            <i class="glyphicon glyphicon-eye-open">
                                                
                                            </i>
                                        </button>
                                        <button 
                                                type="button"
                                                class="btn btn-success"
                                                title="Neste momento a notícia está visivel." 
                                                ng-show="noticia.noticiastatus!=1"
                                                ng-click="trocaStatus(noticia, 1)"
                                        >
                                            <i class="glyphicon glyphicon-eye-close">
                                                
                                            </i>
                                        </button>
                                    </td>
                                    <td>
                                    	<a 
                                    			href="gerenciarImagens.php?idnoticia={{noticia.idnoticia}}"
                                                class="btn btn-default"

                                        >
                                            <i class="glyphicon glyphicon-picture">
                                                
                                            </i>
                                        </a>
                                        <button 
                                                type="button"
                                                class="btn btn-default"
                                                ng-click="getNoticia(noticia.idnoticia)"
                                        >
                                            <i class="glyphicon glyphicon-edit">
                                                
                                            </i>
                                        </button>
                                        <button 
                                                type="button"
                                                class="btn btn-danger"
                                                ng-click="excluirNoticia(noticia.idnoticia)"
                                        >
                                            <i class="glyphicon glyphicon-trash">
                                                
                                            </i>
                                        </button>
                                    </td>
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        <div class="alert alert-warning"
                            ng-show="allNoticias.length==0"
                            >
                            <strong>Nenhuma notícia cadastrada</strong>
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </div>
        
        <script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
        
        <script src="../js/jquery/jquery.gritter.min.js"></script>
        
        <script src="../js/angular/angular.min.js"></script>
        <script src="../js/angular/ui-utils.min.js"></script>
        
        <script src="../js/angular/loading-bar.min.js"></script>
        
        <script src="../js/painelInicialController.js"></script>
    </body>
</html>