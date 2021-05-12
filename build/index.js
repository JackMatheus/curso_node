"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var app = express_1.default();
app.use(express_1.default.json());
var users = [];
app.listen(3333);
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
