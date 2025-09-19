import UserController from '../controllers/user.controller';
import express from 'express';

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


//TODO 1 : faire un middleware pour vérifier que l'utilisateur est connecté avant d'accéder aux routes contacts   

        //Contacts
        // this.router.post('/contacts', this.connectedUser.userController.createContact);
        // this.router.get('/contacts', this.connectedUser.userController.getContacts);
        // this.router.patch('/contacts/:id', this.connectedUser.userController.updateContact);
        // this.router.delete('/contacts/:id', this.connectedUser.userController.deleteContact);

 //TODO 3 : penser a décommenter les routes contacts lol 
       
    }
}