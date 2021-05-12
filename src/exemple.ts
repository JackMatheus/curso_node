// const nome: string = "Luciano";
// function calculaMedia(numero: number, quantidade: number){
//     return numero  / quantidade;
// }
// calculaMedia(25,5);

const nome = "Luciano";
const idade: number = 25;
const teste: boolean = idade > 24;
const pessoas: Array<String> = ['Luciano', 'Willian']
const usuario: object = {
    id:1,
    nome: "Luciano"
}

interface Usuario {
    id: number;
    nome: string;
}

interface Pessoa {
    id: number;
    nome: string;
}

const Usuario: Usuario = {
    id: 1,
    nome: "Luciano",
}

 //2 Exemplo duking type
function cadastraUsuario(usuario: Usuario): string {
    if(usuario.id==1){
        return usuario.nome;
    }
    return "";
}
const pessoa: Pessoa = {
    id: 1,
    nome: "Luciano",
}
cadastraUsuario(pessoa)

 //2 Exemplo