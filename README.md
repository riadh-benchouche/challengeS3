# Système de Gestion de Rendez-vous
Application de gestion de rendez-vous construite avec API Platform (Symfony) pour le backend et React pour le frontend, conteneurisée avec Docker.

## Prérequis
- Docker
- Docker-compose

## Technologies
### Backend
- API Platform 3.x
- Symfony 6.x
- PHP 8.2
- PostgreSQL 13.x
- JWT Authentication
- Doctrine ORM

### Frontend
- React 18
- React Router 
- Axios 
- Tailwind CSS 
- Vite

## Installation
1. Cloner le dépôt
```bash
git clone https://github.com/riadh-benchouche/challengeS3
cd challengeS3
```

2. Créer un fichier `.env` à partir du fichier `.env.example` dans le dossier `backend`
```bash
cp backend/.env.example backend/.env
```
3. Démarrer les conteneurs Docker :
```bash
docker-compose up -d
```
4. Installer les dépendances PHP :
```bash
docker-compose exec php composer install
```
5. Créer la base de données, exécuter les migrations et générer les clés JWT :
```bash
docker compose exec php php bin/console doctrine:database:create
docker compose exec php php bin/console doctrine:migrations:migrate
docker compose exec php php bin/console lexik:jwt:generate-keypair
```

6. Installer les dépendances frontend :
```bash
docker-compose exec frontend npm install
```

7. Configuration des Fixtures :
```bash
docker-compose exec php php bin/console doctrine:fixtures:load
```

## Utilisation
- Backend : [https://localhost](https://localhost)
- Frontend : [http://localhost:3000](http://localhost:3000)
- API : [https://localhost/api](https://localhost/api)


## API Documentation
La documentation de l'API est disponible à l'adresse https://localhost/api et inclut :

- Documentation Swagger UI
- Documentation ReDoc
- JSON-LD / Hydra

## Sécurité de l'API
L'API utilise l'authentification JWT. Les rôles disponibles sont :

Pour accéder aux endpoints protégés :

Obtenir un token via /api/login
Inclure le token dans les requêtes :
```bash
Authorization: Bearer <your-token>
```
