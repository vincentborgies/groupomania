# P7 - Réseau social d'entreprise - Groupomania

## Compétences évaluées

- Authentifier un utilisateur et maintenir sa session

- Implémenter un stockage de données sécurisé en utilisant une base de données

- Développer l’interface d’un site web grâce à un framework front-end

# Installez l'application Groupomania

# Backend

Le backend a été créé avec **Node.js**, **Express.js** et **MySQL** comme base de données.
<br />

## Pré-requis

Vous devez avoir Node js, et MySQL et MySQL Command Line Client installés sur votre machine

## Installation

- Dans le terminal de VSCODE, situez-vous dans le dossier `/backend`.
  <br />
- Entrez la commande `npm install` pour installer toutes les dependences listées sur le fichier package.json
  <br />
- Dans le fichier `.env`, remplissez toutes les variables avec vos informations personnelles :

  DB_NAME= le nom que vous souhaitez donner à la base de données

  DB_USER= votre nom d'utilisateur MySQL (souvent 'root')

  DB_PASSWORD= votre mot de passe utilisateur MySQL

  DB_PORT= le port sur lequel tourne votre serveur MySQL (3306)

  DB_HOST= votre nom d'hôte MySQL

  FRONTEND_URL_URL= l'url de votre client

  ACCESS_TOKEN_SECRET= générez une clé secrète pour votre token puis coller là ici

  PORT= le port sur lequel tourne votre serveur
  <br />

## Démarrage du server et création de la base de données

Entrez la commande `cd backend` pour vous rendre sur le dossier backend du projet puis `npm start` pour créer la base de données et lancer le serveur.

# Frontend

Le frontend a été créé avec **React.js**

## Installation

- Dans votre terminal, accédez au dossier frontend en tapant `cd frontend` puis taper `npm install` pour installer toutes les dépendances du frontend.
  <br />
- Dans le terminal de VSCODE, situez-vous dans le dossier `/backend` puis remplisser l'url de votre backend (ex: REACT_APP_API_URL=http://localhost:3000/)

## Development server

Dans le terminal, en lieu et place du dossier frontend, entrez la commande `npm start` pour démarrer le client de l'application

## Droits Admin

Pour tester les droits d'admin, vous devrez d'abord créer un utilisateur sur l'application puis rendez-vous sur votre terminal MySQL Command Line Client, entrez la commande `use` suivi du nom de la base donées que vous avez choisi. Ensuite entrez la commande `UPDATE users SET is_admin = 1 WHERE users.id = id de l'utilisateur;`
