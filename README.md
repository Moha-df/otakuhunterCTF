# 🔐 Next.js Security Learning Project

![Next.js](https://img.shields.io/badge/Next.js-13.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-5.1+-525252?style=for-the-badge)

Un projet éducatif pour explorer les concepts de sécurité web et d'authentification avec Next.js. Cette application démontre les pratiques fondamentales de sécurité pour les développeurs React/Next.js.

## 📋 Vue d'ensemble

Ce projet a été créé pour approfondir ma compréhension de Next.js et des principes essentiels de la sécurité web moderne. L'application implémente un système d'authentification robuste avec plusieurs couches de protection.

### 🌐 Déploiement
L'application est déployée et accessible à l'adresse : [https://moha-df-auth.vercel.app/](https://moha-df-auth.vercel.app/)

### ✨ Fonctionnalités principales

- **Authentification sécurisée** - Système complet basé sur bcrypt et tokens
- **Protection contre les attaques** - Mécanismes de rate limiting et blocage temporaire 
- **Gestion sécurisée des sessions** - Utilisation de cookies httpOnly et sameSite
- **Middleware de protection** - Sécurisation des routes et redirections intelligentes
- **UI adaptative** - Interface simple et responsive

## 🛠️ Technologies utilisées

- **Next.js** - Framework React pour le rendu côté serveur et les API Routes
- **TypeScript** - Pour un typage statique et une meilleure maintenabilité
- **Tailwind CSS** - Pour un styling rapide et responsive
- **bcrypt** - Pour le hachage sécurisé des mots de passe
- **crypto** - Pour la génération de tokens d'authentification

## 🏗️ Architecture du projet

```
password/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/       # Endpoint d'authentification sécurisé
│   │   ├── accueil/        # Zone protégée de l'application
│   │   └── login-page.tsx  # Interface de connexion
│   └── middleware.ts       # Protection des routes et vérification des tokens
├── utils/
│   └── auth.ts             # Fonctions et helpers d'authentification
├── .env.local              # Variables d'environnement (non versionné)
├── generate-hash.js        # Utilitaire de génération de hash bcrypt
└── tailwind.config.js      # Configuration de Tailwind CSS
```

## 🧠 Concepts de sécurité explorés

1. **Hachage sécurisé des mots de passe**
   - Utilisation de bcrypt avec facteur de coût approprié
   - Stratégies de salage pour prévenir les attaques par tables arc-en-ciel

2. **Protection contre les attaques par force brute**
   - Limitation des tentatives de connexion par IP
   - Périodes de blocage progressives après échecs multiples
   - Suivi des tentatives avec expiration programmée

3. **Gestion sécurisée des sessions**
   - Tokens aléatoires cryptographiquement sûrs
   - Cookies à accès restreint (httpOnly, secure, sameSite)
   - Durée de vie limitée des sessions

4. **Bonnes pratiques générales**
   - Variables d'environnement pour les données sensibles
   - Validation stricte des entrées utilisateur
   - Messages d'erreur génériques (sans divulgation d'informations)

## 🚀 Pour commencer

1. Clonez ce dépôt
   ```bash
   git clone https://github.com/Moha-df/Auth-Security-with-Next.js.git
   cd auth-security-nextjs
   ```

2. Installez les dépendances
   ```bash
   npm install
   ```

3. Configurez les variables d'environnement
   ```bash
   touch .env.local
   # Éditez .env.local pour configurer le hash de mot de passe
   ```
   
   Exemple de contenu pour .env.local:
   ```
   HASHED_PASSWORD=votre_hash_bcrypt_ici
   SALT_ROUNDS=10
   ```

4. Générez un hash de mot de passe (facultatif)
   ```bash
   node generate-hash.js votre_mot_de_passe
   ```

5. Lancez le serveur de développement
   ```bash
   npm run dev
   ```

## ⚠️ Avertissement

Ce projet est conçu à des fins éducatives uniquement. Bien qu'il implémente plusieurs bonnes pratiques de sécurité, une application de production nécessiterait des mesures supplémentaires comme:

- Utilisation d'un système de base de données sécurisé pour les utilisateurs
- Implémentation de l'authentification multifacteur (MFA)
- Surveillance et journalisation avancées des tentatives suspectes
- Protection CSRF complète
- Tests de pénétration réguliers

## 📚 Ressources d'apprentissage

- [Documentation Next.js](https://nextjs.org/docs)
- [Guide OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Authentication Patterns](https://nextjs.org/docs/authentication)
- [bcrypt NPM Package](https://www.npmjs.com/package/bcrypt)

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

*Créé dans le cadre de mon parcours d'apprentissage de Next.js et de la sécurité web. Les contributions et suggestions sont les bienvenues!*