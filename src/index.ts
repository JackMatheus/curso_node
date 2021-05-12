import express, { Request, Response } from 'express'
import {v4 as uuidV4} from 'uuid'

const app = express();

app.use(express.json())

interface User {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
}

interface CreateUser {
    name: string;
    email: string;
    cpf: string;
    phone: string; 
}

interface UpdateUser {
    name: string;
    email: string;
    cpf: string;
    phone: string;  
}

const users: Array<User> = []

app.listen(3333);

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