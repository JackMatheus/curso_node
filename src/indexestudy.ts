import express, { Request, Response } from 'express'
import {v4 as uuidV4} from 'uuid'

const app = express();

app.use(express.json())


//1-Criando o usuário
interface User {
            id: string;
            name: string;
            email: string;
            cpf: string;
            phone: number
}

//3-Criando o formato do usuário
interface CreateUser {
    name: string;
    email: string;
    cpf: string;
    phone: number
}

//4- Criando o formato UpdateUser
interface UpdateUser {
    name: string;
    email: string;
    cpf: string;
    phone: number
}

//0-Declarando a User, DO TIPO <USER> para a interface acima
const users: Array<User> = []

app.listen(3333);

//2-Criando rota
setInterval(() => {
    console.table(users);
}, 2000)

app.post('/user', (req: Request, res: Response) => {
    const {cpf, email, name, phone} = req.body as CreateUser;

    const userExist = users.some(user => user.cpf === cpf);

    if(userExist) {
        return res.status(400).json({ error: "Usuário já existe" })
    } else {
        const user: User = {
            id: uuidV4(),
            cpf,
            email,
            name,
            phone
        } 

        users.push(user);

        return res.status(201).json(user);
    }
})

app.get('/user', (req: Request, res: Response) => {
    return res.status(200).json(users);
})

app.get('/user/:cpf', (req: Request, res: Response) => {
    const {cpf} = req.params as {cpf: string};

    const user = users.find(user => user.cpf === cpf);

    if(user) {
        return res.status(200).json(user);
    } else {
        return res.status(400).json({error: 'Usuário não encontrado'})
    }
})

app.put('/user/:id', (req: Request, res: Response) => {
    const {id} = req.params as {id: string}
    const {name, cpf, email, phone} = req.body as UpdateUser

    const user = users.find(user => user.id === id);

    if(!user) {
        return res.status(400).json({ error: "Usuário não encontrado" });
    } else {
        user.name = name;
        user.cpf = cpf;
        user.email = email;
        user.phone = phone;

        res.status(200).json(user);
    }
})

app.delete('/user/:id', (req: Request, res: Response) => {
    const {id} = req.params as {id: string}

    const idValidator = users.some(user => user.id === id);

    if(idValidator) {
        users.splice(users.findIndex(user => user.id === id), 1);
        return res.status(200).json(users);
    } else {
        return res.status(400).json({error: 'Erro ao apagar o usuário'});
    }
})

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
