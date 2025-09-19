import UserController from '@/controllers/user.controller';
import express from 'express';

export default class UserRoute {
        public router = express.Router();
        private userController = new UserController();

    public constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        //AUTH ici
        this.router.post('/auth', this.userController.auth);
    }
}