import { ContactModel } from "../models/contact.model";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

export default class UserController {
    public async auth(req: any, res: any) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "Email et MDP requis" });
        }
        
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(401).send({ message: "User inconnu" });
        }
        if (await user.validPassword(password)) {
            //JWT ici
            const jwtKey: string = process.env.JWT_SECRET || "your-secret-key";
            const jwtExpire: string = process.env.JWT_EXPIRE || "24h";
            const userId = (user as any)._id;
            const token = jwt.sign({ id: userId }, jwtKey, {
                expiresIn: jwtExpire,
            } as jwt.SignOptions);
            
            // Response = userData dans front
            const userToSend = {
                id: userId,
                email: user.email,
                token: token,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };
            return res
                .set("Content-Type", "application/json; charset=utf-8")
                .status(200)
                .send(userToSend);
        } else {
            return res.status(401).send({ message: "MDP incorrect" });
        }
       
    }

    public async signin(req: any, res: any) { 
        const { email, password } = req.body;  
        if (!email || !password) {
            res.status(400).send({ message: "Email et MDP requis" });
            return;
        }

        const existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            res.status(401).send({ message: "Email déjà utilisé" });
            return;
        }
        
        const newUser = new UserModel({ email, password });
        await newUser.save();
        res.status(201).send({ message: "Utilisateur créé avec succès" });
    }

    public async createContact(req: any, res: any) {
        const { firstname, lastname, phone } = req.body;

        if (!firstname || !lastname || !phone) {
            res.status(400).send({ message: "Tous les champs sont requis" });
            return;
        }

        const existingContact = await ContactModel.findOne({ phone: phone });
        if (existingContact) {
            res.status(409).send({ message: "Contact déjà existant" });
            return;
        }

        const userId = req.user.id;
        const newContact = new ContactModel({ firstname, lastname, phone, createdBy: userId });
        await newContact.save();
        res.status(201).send({ message: "Contact créé avec succès" });
    }

    public async getContacts(req: any, res: any) {
        try {
            const userId = req.user.id;
            const contacts = await ContactModel.find({ createdBy: userId, deletedAt: null });
            res.status(200).send(contacts);
        } catch (error) {
            res.status(500).send({ message: "Erreur lors de la récupération des contacts (erreur serveur)" });
        }
    }

    public async getContactByContactId(req: any, res: any) {
        try {
            const contactId = req.params.contactId;
            const userId = req.user.id;
            
            if (!contactId) {
                return res.status(400).send({ message: "ContactId requis" });
            }

            const contact = await ContactModel.findOne({ _id: contactId, createdBy: userId, deletedAt: null });
            if (!contact) {
                return res.status(404).send({ message: "Contact non trouvé" });
            }
            
            res.status(200).send(contact);
        } catch (error) {
            console.error('Error in getContactByContactId:', error);
            res.status(500).send({ message: "Erreur lors de la récupération du contact" });
        }
    }

    //TODO 5 : renvoyer contact mis à jour direct (doc mongo ???)
    public async updateContact(req: any, res: any) {
        const contactId = req.params.contactId;
        const { firstname, lastname, phone } = req.body;

        if (!firstname && !lastname && !phone) {
            res.status(400).send({ message: "Tous les champs sont requis" });
            return;
        }

        const userId = req.user.id;
        const currentContact = await ContactModel.findOne({ _id: contactId, createdBy: userId, deletedAt: null });
        if (!currentContact) {
            res.status(404).send({ message: "Contact non trouvé" });
            return;
        }

        const updateData: any = { updatedBy: userId };
        if (firstname && firstname !== currentContact.firstname) updateData.firstname = firstname;
        if (lastname && lastname !== currentContact.lastname) updateData.lastname = lastname;
        if (phone && phone !== currentContact.phone) updateData.phone = phone;

        const updatedContact = await ContactModel.findOneAndUpdate(
            { _id: contactId, createdBy: userId, deletedAt: null },
            updateData,
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).send({ message: "Contact not found" });
        }

        res.status(200).send(updatedContact);
    }

    public async deleteContact(req: any, res: any) {
        const contactId = req.params.contactId;
        const userId = req.user.id;
        const contact = await ContactModel.findOne({ _id: contactId, deletedAt: null });
        if (!contact) {
            res.status(404).send({ message: "Contact non trouvé" });
            return;
        }

        if (!contact.createdBy || contact.createdBy.toString() !== userId) {
            res.status(403).send({ message: "Ce contact ne vous appartient pas" });
            return;
        }

        const deletedContact = await ContactModel.findOneAndUpdate(
            { _id: contactId, createdBy: userId, deletedAt: null },
            { deletedAt: new Date() }
        );

        res.status(200).send({ message: "Contact supprimé avec succès" });
    }
}