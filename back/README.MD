# Disclaimer
utilisation de typescript parce que c'est ce dont j'ai l'habitude
j'ai utilisé l'ia pour comprendre comment il fallait brancher mongoDB parce que je n'ai jamais fait de base de données nosql (+ infos sur roadmap.sh + infos sur mongodb.com )

---

# MyContacts API

Une API REST Node.js pour gérer des contacts, construite avec Express, TypeScript et MongoDB.

## Fonctionnalités
- Inscription et authentification des utilisateurs (JWT)
- Opérations CRUD sur les contacts (créer, lire, mettre à jour, supprimer)
- Documentation de l'API avec Swagger (OpenAPI) via la route /api-docs

## Stack technique
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- JWT pour l'authentification
- Swagger pour la documentation API

## Démarrage rapide

### Prérequis
- Node.js (v19+ recommandé)
- MongoDB (local ou Atlas)

### Installation
```bash
npm install
```

### Variables d'environnement
Créez un fichier `.env` dans le dossier `back/` avec :
```
MONGODB_URI=<uri-mongodb>
JWT_SECRET=<jwt-secret>
JWT_EXPIRE=24h
PORT=3000
```

### Lancer le serveur
```bash
npm run dev
```

### Documentation de l'API
Une fois le serveur lancé, rendez-vous sur http://localhost:3000/api-docs pour accéder à Swagger.

## Structure du projet
```
back/
  src/
    controllers/
    models/
    routes/
    middlewares/
    config/
    swagger/
    server.ts
  package.json
  README.md
```