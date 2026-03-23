#  API Backend Blog - INF222 TAF1

**Une API REST complète pour gérer un blog simple**
Développée dans le cadre du **TAF 1** du cours **INF222 – EC1 (Développement Backend)**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-black)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-blue)](https://sqlite.org)
[![Swagger](https://img.shields.io/badge/Swagger-UI-orange)](https://swagger.io)

---

##  Description
Cette API permet de gérer les articles d’un blog (CRUD complet + recherche).  
Toutes les fonctionnalités demandées dans le TAF sont implémentées :
- Création, lecture, modification et suppression d’articles
- Recherche par titre ou contenu
- Filtrage par catégorie ou auteur
- Documentation interactive avec **Swagger**

---

##  Technologies utilisées
- **Backend** : Node.js + Express
- **Base de données** : SQLite (fichier `blog.db`)
- **Documentation** : Swagger UI
- **Autres** : CORS, Nodemon (dev)

---

##  Fonctionnalités
- ✅ Créer un article (titre, contenu, auteur, catégorie, tags)
- ✅ Lire tous les articles (avec filtres)
- ✅ Lire un article par ID
- ✅ Modifier un article
- ✅ Supprimer un article
- ✅ Rechercher des articles (titre ou contenu)
- ✅ Validation des données + codes HTTP corrects
- ✅ Documentation Swagger complète

---

# Installation et utilisation

# 1. Cloner le repository
git clone https://github.com/owonae6-cyber/INF222-TAF1-BlogAPI.git
cd INF222-TAF1-BlogAPI

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur en mode développement
npm run dev

 **ENDPOINTS**
 **Méthode:** **Endpoint**                         **Description**
POST:        /api/articles:                  Créer un nouvel article
GET:         /api/articles:                   Liste tous les articles (filtre possible)
GET:         /api/articles/{id}:              Récupérer un article par ID
PUT:         /api/articles/{id}:              Modifier un article
DELETE:      /api/articles/{id}:              Supprimer un article
GET:         /api/articles/search?query=...:  Rechercher par mot-clé

**Exemples d'utilisation**

Créer un article → POST avec JSON (titre, content, author obligatoires)
Rechercher → GET /api/articles/search?query=TAF1
Voir tous les articles → GET /api/articles?category=Tech