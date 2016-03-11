<html ng-app="app">
    <head>
        <title>Painel Administrativo - Login</title>
        <meta charset="utf-8">
        
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
        
    </head>
    <body>
        
        <div ng-controller="loginController">       
            
            <div class="container">
                <div class="row">
                    <div class="col-xs-12">
                    
                        <div class="page-header">
                            <h3>Efetue Login</h3>
                        </div>
                        
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-xs-12 col-sm-7">
                        
                        <form class="form-horizontal" ng-submit="fazerLogin()">
                          <div class="form-group">
                            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                            <div class="col-sm-10">
                              <input type="text" class="form-control" id="inputEmail3" placeholder="Usuário" ng-model="login.usuario" required>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                            <div class="col-sm-10">
                              <input type="password" class="form-control" id="inputPassword3" placeholder="Senha" ng-model="login.senha" required>
                            </div>
                          </div>
                          
                          <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                              <button type="submit" class="btn btn-default">Efetuar Login</button>
                            </div>
                          </div>
                        </form>
                        
                    </div>
                    <div class="col-xs-12 col-sm-5">
                        <h4>Instruções de login</h4>
                        <p>Cuide letras maiusculas e minusculas</p>
                    </div>
                </div>
                
            </div>
            
            
        </div>
        
        <script src="../js/angular/angular.min.js"></script>
        <script src="../js/app.module.js"></script>
        <script src="../js/loginController.js"></script>
    </body>
</html>