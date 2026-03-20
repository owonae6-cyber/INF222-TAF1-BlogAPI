#  API Backend Blog - INF222 TAF1

## Description
API REST complète pour gérer un blog simple (CRUD + recherche).  
Développée avec Node.js + Express + SQLite + Swagger pour le TAF1 du cours INF222 – EC1 (Développement Backend).

## Technologies utilisées
- Node.js + Express
- SQLite (base de données locale)
- Swagger (documentation interactive)
- CORS

## Installation

```bash
# 1. Cloner le projet
git clone https://github.com/owonae6-cyber/INF222-TAF1-BlogAPI.git
cd INF222-TAF1-BlogAPI

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur
npm run dev


Méthode,Endpoint,Description
POST,/api/articles,Créer un article
GET,/api/articles,Liste tous les articles (filtre possible)
GET,/api/articles/{id},Récupérer un article par ID
PUT,/api/articles/{id},Modifier un article
DELETE,/api/articles/{id},Supprimer un article
GET,/api/articles/search?query=texte,Rechercher dans titre/contenu


acceder a la documentation interactive
→ http://localhost:3000/api-docs
  
  Auteur:
    OWONA FOMBA ESTHER_23V2184