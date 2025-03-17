# PetsWave - E-commerce Mobile App

PetsWave est une application mobile e-commerce permettant aux utilisateurs d'acheter des produits et services pour animaux. Développée avec React Native via Expo, elle est dockerisée et intègre un pipeline CI/CD pour automatiser les déploiements.

## 🛠️ Technologies utilisées

- **Frontend** : React Native via Expo
- **Backend** : NestJS avec MongoDB
- **Stockage d'images** : MinIO
- **Containerisation** : Docker & Docker Compose
- **CI/CD** : GitHub Actions

## 📦 Installation et exécution locale

### Prérequis

- Node.js (version 22.14.0)
- Docker et Docker Compose
- Expo CLI

### Installation

1. Cloner le dépôt :   
```  
   https://github.com/mohmmedlahlali20/PetsWave_mobile_app.git
   ```
2. accedez au ficher
```
cd   PetsWave_mobile_app 
   ```
3. installe dependecy :
```
npm install
```

## 🐳 Dockerisation

Le projet est dockerisé avec un fichier `docker-compose.yaml` orchestrant les services suivants :

- **petswave-backend** : Backend NestJS (port 5000)
- **uploader-service** : Service d'upload MinIO (port 4000)
- **petswave-mobile-app** : Application React Native Expo (port 8081)
- **petswave-admin** : Dashboard d'administration (port 3000)


## 🚀 CI/CD

L'intégration et le déploiement continu sont gérés via GitHub Actions.

### Pipeline CI/CD

1. **Lint & Test** : Vérifie le code avec ESLint et exécute les tests Jest.
2. **Build & Push Docker** : Construit l'image Docker et la pousse vers Docker Hub.
3. **Déploiement** : Déploie les mises à jour sur l'environnement cible.



## 📩 Contact

Pour toute question ou suggestion, veuillez contacter :
- **Email** : mohmmedlaeh81@gmail.com

   
