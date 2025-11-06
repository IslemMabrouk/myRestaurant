# MyRestaurant 🍽️  
Application Web Full Stack pour la gestion d'un restaurant (menus, commandes, clients, administrateurs et chefs).

## Technologies Utilisées

### Front-End
- Angular 14
- TypeScript
- HTML5
- CSS3
- Angular Material / Bootstrap

### Back-End
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA (Hibernate)
- MySQL / PostgreSQL

---

## Fonctionnalités Principales

### Authentification & Rôles
- Inscription / Connexion
- JWT Authentication
- Différents rôles :
  - **Client**
  - **Chef**
  - **Administrateur**

### Gestion du Restaurant
| Rôle | Fonctionnalités |
|-----|----------------|
| **Admin** | Ajouter / Modifier / Supprimer plats, chefs, comptes utilisateurs + Dashboard |
| **Chef** | Voir commandes & mettre à jour les statuts |
| **Client** | Parcourir le menu, ajouter au panier, valider commande, laisser un avis |
