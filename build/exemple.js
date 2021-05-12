"use strict";
// const nome: string = "Luciano";
// function calculaMedia(numero: number, quantidade: number){
//     return numero  / quantidade;
// }
// calculaMedia(25,5);
var nome = "Luciano";
var idade = 25;
var teste = idade > 24;
var pessoas = ['Luciano', 'Willian'];
var usuario = {
    id: 1,
    nome: "Luciano"
};
var Usuario = {
    id: 1,
    nome: "Luciano",
};
//2 Exemplo duking type
function cadastraUsuario(usuario) {
    if (usuario.id == 1) {
        return usuario.nome;
    }
    return "";
}
var pessoa = {
    id: 1,
    nome: "Luciano",
};
cadastraUsuario(pessoa);
//2 Exemplo
