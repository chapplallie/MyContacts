import { ContactModel } from "../models/contact.model";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

export default class UserController {
    public async auth(req: any, res: any, next: any) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({ message: "Email et MDP requis" });
            return;
        }
        
        const user = await UserModel.findOne({ email: email });
        
        if (user) {
            if (await user.validPassword(password)) {
                //JWT ici
                const jwtKey: string = process.env.JWT_SECRET || "your-secret-key";
                const jwtExpire: string = process.env.JWT_EXPIRE || "24h";
                const userId = (user as any)._id.toString();
                const token = jwt.sign({ id: userId }, jwtKey, {
                    expiresIn: jwtExpire,
                } as jwt.SignOptions);
                
                // Response with user data
                const userToSend = {
                    id: userId,
                    email: user.email,
                    token: token,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                };
                
                res
                    .set("Content-Type", "application/json; charset=utf-8")
                    .status(200)
                    .send(userToSend);
            } else {
                res.status(401).send({ message: "MDP incorrect" });
            }
        } else {
            res.status(404).send({ message: "User inconnu" });
        }
    }

    public async signin(req: any, res: any, next: any) { 
        const { email, password } = req.body;  
        if (!email || !password) {
            res.status(400).send({ message: "Email et MDP requis" });
            return;
        }

        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            res.status(409).send({ message: "Email déjà utilisé" });
            return;
        }
        
        const newUser = new UserModel({ email, password });
        await newUser.save();
        res.status(201).send({ message: "Utilisateur créé avec succès" });
    }

    //TODO 2 : createContact, getContacts, updateContact, deleteContact
    public async createContact(req: any, res: any, next: any) {
        const { firstname, lastname, phone } = req.body;

        if (!firstname || !lastname || !phone) {
            res.status(400).send({ message: "Tous les champs sont requis" });
            return;
        }

        res.status(201).send({ message: "Contact created" });

         if (!firstname || !lastname  || !phone) {
            res.status(400).send({ message: "nom , prénom  et numéro requis" });
            return;
        }

        const existingContact = await ContactModel.findOne({ phone: phone });
        if (existingContact) {
            res.status(409).send({ message: "Contact déjà existant" });
            return;
        }

        const newContact = new ContactModel({ firstname, lastname, phone });
        await newContact.save();
        res.status(201).send({ message: "Contact créé avec succès" });
    }
}