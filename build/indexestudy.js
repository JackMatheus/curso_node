"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var app = express_1.default();
app.use(express_1.default.json());
//0-Declarando a User, DO TIPO <USER> para a interface acima
var users = [];
app.listen(3333);
//2-Criando rota
setInterval(function () {
    console.table(users);
}, 2000);
app.post('/user', function (req, res) {
    var _a = req.body, cpf = _a.cpf, email = _a.email, name = _a.name, phone = _a.phone;
    var userExist = users.some(function (user) { return user.cpf === cpf; });
    if (userExist) {
        return res.status(400).json({ error: "Usuário já existe" });
    }
    else {
        var user = {
            id: uuid_1.v4(),
            cpf: cpf,
            email: email,
            name: name,
            phone: phone
        };
        users.push(user);
        return res.status(201).json(user);
    }
});
app.get('/user', function (req, res) {
    return res.status(200).json(users);
});
app.get('/user/:cpf', function (req, res) {
    var cpf = req.params.cpf;
    var user = users.find(function (user) { return user.cpf === cpf; });
    if (user) {
        return res.status(200).json(user);
    }
    else {
        return res.status(400).json({ error: 'Usuário não encontrado' });
    }
});
app.put('/user/:id', function (req, res) {
    var id = req.params.id;
    var _a = req.body, name = _a.name, cpf = _a.cpf, email = _a.email, phone = _a.phone;
    var user = users.find(function (user) { return user.id === id; });
    if (!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    }
    else {
        user.name = name;
        user.cpf = cpf;
        user.email = email;
        user.phone = phone;
        res.status(200).json(user);
    }
});
app.delete('/user/:id', function (req, res) {
    var id = req.params.id;
    var idValidator = users.some(function (user) { return user.id === id; });
    if (idValidator) {
        users.splice(users.findIndex(function (user) { return user.id === id; }), 1);
        return res.status(200).json(users);
    }
    else {
        return res.status(400).json({ error: 'Erro ao apagar o usuário' });
    }
});
// const {response} = require ('express');
// const express = require ('express');
// const {v4:uuidv4} = require ('uuid');
// const app = express();
// //Necessário este middleware para interpretrar o json
// app.use(express.json());
// //como não tenho um modulo para armazenar meus dados, utilizarei um array aqui na index
// const users = [];
// app.post('/user', (req, res) => {
//     const {name , email, cpf, phone} = req.body;
//     const unserExist = users.some(
//         //erofunct = Faz a verificação (user, pega cada usuario do array) => user.cpf === cpf
//         (user) => user.cpf === cpf
//     );
//     if(unserExist) {
//         return res.status(400).json({error: "Usuário já existe"})
//     }else{
//         const user = {
//             id: uuidv4(),
//             name,
//             email,
//             cpf,
//             phone
//         }
//         users.push(user);
//         res.status(201).json(user)
//     }
// });
// // T.120 
// // app.get('/user', (req, res) => {
// //     return res.status(200).json(users)
// // })
// app.get('/user/:cpf', (req, res) => {
//     const {cpf} = req.params;
//     //confirmar aqui {}
//     //passando um parametro e do ususario    
//     const user = users.find((e) => e.cpf === cpf)
//     if(user){
//         return res.status(200).json(user)
//     }else{
//         return res.status(400).json({error: "Usuário não encontrado"}) 
//     }    
// })
// // T.137
// app.put('/user/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, email, phone } = req.body;
//     const user = users.find((e)=> e.id === id);
//     // (user) => user.cpf === cpf
//     if(!user) {
//         return res.status(400).json({error: "Usuário não encontrado"})
//     }else{
//         user.name = name;
//         user.email = email;
//         // user.cpf = cpf;
//         user.phone = phone;
//         return res.status(200).json(user);
//     }
// })
// app.delete('/user/:id', (req, res) => {
//     const { id } = req.params;
//     // console.log(id)
//     const idValidator = users.some((e) => e.id === id);
//       if (idValidator) {
//         users.splice(users.indexOf(id), 1);
//         return res.status(200).json(users);
//     } else {
//         res.status(400).json({error: 'Erro ao apagar o usuário'});
//     }
// }); 
// app.listen(3333);
// Base Line - ok 
//     user.push({
//         id: uuidv4(),
//         name,
//         email,
//         cpf,
//         phone
//     });
//     res.status(201).send("Sucesso")
// });
// function soma(a,b){
//     return a+b
// }
// const soma =(a,b)=> a+b
// app.get('/', (request, response)=>{
//     response.json({response:'Hello new Word'})
// })
