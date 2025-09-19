import { connect } from 'mongoose';
import UserController from '../controllers/user.controller';
import express from 'express';
import connectedUser from '../middlewares/auth.middleware';

export default class UserRoute {
        public router = express.Router();
        private userController = new UserController();

    public constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        //Auth
        this.router.post('/auth', this.userController.auth);
        this.router.post('/signin', this.userController.signin);

        //Contacts
        this.router.get('/contacts', connectedUser, this.userController.getContacts);
        this.router.post('/contacts/add', connectedUser, this.userController.createContact);
        this.router.patch('/contacts/:contactId', connectedUser, this.userController.updateContact);
        // this.router.delete('/contacts/:id', connectedUser, this.userController.deleteContact);

 //TODO 3 : penser a décommenter les routes contacts lol 

    }
}