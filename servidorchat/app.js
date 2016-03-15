var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var usuarios = {};
var admin = false;
var chatstatus = false;
var senha = "123456";

server.listen(3000);

app.get('/', function(req, resp){
    resp.sendfile(__dirname + '/publico/index.html');
});

console.log('Servidor rodando!');

io.sockets.on("connection", function(socket){
    
    socket.emit('chatstatus', { online : chatstatus });
    
    socket.on('adminlogin',function(hash, callback){
        if(hash==senha){
            admin = socket;
            chatstatus = true;
            io.sockets.emit('chatstatus', { online : true });
        }
    });
    
    socket.on('setChatStatus', function(hash, callback){
        if(hash==senha){
            chatstatus = (chatstatus) ? false : true;
            usuarios = {};
            io.sockets.emit('chatstatus', { online : chatstatus });
        }
    });
    
    socket.on('adminMsgToUsuario', function(hash, email, mensagem){
        if(hash!=senha) return false;
        
        mensagem = mensagem.trim();
        usuarios[email].emit();
        admin.emit('chegoumensagem',{ de : 'admin', msg : mensagem });                
    });
    
    socket.on('enviarmensagemparausuario', function(dados){
        usuarios[dados.para].emit('chegoumensagem', { de : "Admin", msg : dados.msg });
    });
    
    socket.on('entrarchat', function(email, callback){
        if(email in usuarios){
            callback({retorno : false, msg : "Já existe um usuário com esse email"});
        } else {
            callback({retorno : true, msg : ""});
            socket.email = email;
            usuarios[socket.email] = socket;
            admin.emit('usuarioentrou', email);
        }
    });
    
    socket.on("sairchat", function(callback){
        usuarioSairChat(callback);
    });
    
    socket.on('enviarmensagem', function(mensagem){
        mensagem = mensagem.trim();
        admin.emit('novamensagemparaadmin', { de : socket.email, msg : mensagem });                
    });
    
    socket.on("disconnect", function(){
        callback = function(obj){};
        usuarioSairChat(callback); 
    });
    
    function usuarioSairChat(callback){
        if(admin===socket){
            chatstatus = false;
            io.sockets.emit('chatstatus', { online : chatstatus });
            admin = false;
        }
        
        if(!socket.email) return;
        
        delete usuarios[socket.email];
        
        if(admin!= false){
            admin.emit('usuariosaiu', socket.email);
        }
    }
    
    
    
});