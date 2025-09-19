import { connect } from 'mongoose';
import UserController from '../controllers/user.controller';
import express from 'express';
import connectedUser from '../middlewares/auth.middleware';
import swaggerJSDoc from 'swagger-jsdoc';

export default class UserRoute {
        public router = express.Router();
        private userController = new UserController();

    public constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        //Auth
         /**
         * @swagger
         * /auth:
         *   post:
         *     summary: tentative de connection d'un user
         *     tags:
         *       - Users
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/User'
         *     responses:
         *       201:
         *         description: User created successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/User'
         *       409:
         *         description: Email already in use
         *       400:
         *         description: Email and password required
         */
        this.router.post('/auth', this.userController.auth);
        /**
         * @swagger
         * /signin:
         *   post:
         *     summary: Inscription d'un nouveau user
         *     tags:
         *       - Users
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/User'
         *     responses:
         *       201:
         *         description: User created successfully
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/User'
         *       409:
         *         description: Incorrect data
         *       400:
         *         description: Email and password required
         */
        this.router.post('/signin', this.userController.signin);

        //Contacts
         /**
         * @swagger
         * /contacts:
         *   get:
         *     summary: Récupérer la liste des contacts
         *     tags:
         *       - Contacts
         *     responses:
         *       200:
         *         description: Liste des contacts récupérée avec succès
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Contact'
         *       404:
         *         description: Not found
         *       500:
         *         description: Internal server error
         */
        this.router.get('/contacts', connectedUser, this.userController.getContacts);
             /**
         * @swagger
         * /contacts:
         *   post:
         *     summary: Ajouter un nouveau contact
         *     tags:
         *       - Contacts
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Contact'
         *     responses:
         *       200:
         *         description: Contact ajouté avec succès
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Contact'
         *       404:
         *         description: Not found
         *       500:
         *         description: Internal server error
         */
        this.router.post('/contacts/add', connectedUser, this.userController.createContact);
             /**
         * @swagger
         * /contacts:
         *   patch:
         *     summary: Mettre à jour un contact
         *     tags:
         *       - Contacts
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/Contact'
         *     responses:
         *       200:
         *         description: Contact mis à jour avec succès
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Contact'
         *       404:
         *         description: Not found
         *       500:
         *         description: Internal server error
         */
        this.router.patch('/contacts/:contactId', connectedUser, this.userController.updateContact);
             /**
         * @swagger
         * /contacts:
         *   delete:
         *     summary: Supprimer un contact
         *     tags:
         *       - Contacts
         *     responses:
         *       200:
         *         description: Contact supprimé avec succès
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Contact'
         *       404:
         *         description: Not found
         *       500:
         *         description: Internal server error
         */
        this.router.delete('/contacts/:contactId', connectedUser, this.userController.deleteContact);

    }
}