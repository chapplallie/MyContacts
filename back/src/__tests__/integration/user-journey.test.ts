import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../../server'; // Make sure to export app from server.ts
import { UserModel } from '../../models/user.model';
import { ContactModel } from '../../models/contact.model';

describe('User Journey Tests', () => {
    let mongoServer: MongoMemoryServer;
    let authToken: string;
    let userId: string;
    let contactId: string;

    beforeAll(async () => {
        // Setup in-memory MongoDB instance
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        // Close the existing connection if it exists
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        
        // Connect to the in-memory database
        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        await mongoServer.stop();
    });

    beforeEach(async () => {
        // Clear the database before each test
        await UserModel.deleteMany({});
        await ContactModel.deleteMany({});
    });

    const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123!'
    };

    const testContact = {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        phone: '1234567890'
    };

    describe('Authentication Flow', () => {
        it('should allow user to sign up, login, create and manage contacts', async () => {
            // 1. Sign Up
            const signupResponse = await request(app)
                .post('/api/signin')
                .send(testUser)
                .expect( {"message": "Utilisateur créé avec succès"});

            expect(signupResponse.body.message).toBe('Utilisateur créé avec succès');

            // 2. Login
            const loginResponse = await request(app)
                .post('/api/auth')
                .send(testUser)
                .expect(200);

            expect(loginResponse.body.token).toBeDefined();
            authToken = loginResponse.body.token;
            userId = loginResponse.body.id;

            // 3. Create Contact
            const createContactResponse = await request(app)
                .post('/api/contacts/add')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testContact)
                .expect(201);

            expect(createContactResponse.body).toStrictEqual({"message": "Contact créé avec succès"});

            // 4. Get Contacts List
            const getContactsResponse = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(Array.isArray(getContactsResponse.body)).toBeTruthy();
            expect(getContactsResponse.body.length).toBeGreaterThan(0);
            expect(getContactsResponse.body[0].firstname).toBe(testContact.firstname);

            contactId = getContactsResponse.body[0]._id;

            // 5. Get Single Contact
            const getSingleContactResponse = await request(app)
                .get(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);

            expect(getSingleContactResponse.body.firstname).toBe(testContact.firstname);

            // 6. Update Contact
            const updatedContact = { ...testContact, firstname: 'Jane' };
            const updateContactResponse = await request(app)
                .patch(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updatedContact)
                .expect(200);
                console.log(updateContactResponse.body);

            expect(updateContactResponse.body.firstname).toBe('Jane');

            // 7. Delete Contact
            const deleteContactResponse = await request(app)
                .delete(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .expect(200);
        });
    });

    // Error cases
    describe('Error Cases', () => {
        it('should not allow access to protected routes without authentication', async () => {
            await request(app)
                .get('/api/contacts')
                .expect(401);
        });

        it('should not allow login with invalid credentials', async () => {
            await request(app)
                .post('/api/auth')
                .send({ email: testUser.email, password: 'wrongpassword' })
                .expect(401);
        });

        it('should not allow duplicate email registration', async () => {
            // First registration
            await request(app)
                .post('/api/signin')
                .send(testUser)
                .expect(201);

            // Duplicate registration attempt
            await request(app)
                .post('/api/signin')
                .send(testUser)
                .expect(401);
        });
    });
});