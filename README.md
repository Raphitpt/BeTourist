<p align="center">
  <img src="[https://cdn-icons-png.flaticon.com/512/6295/6295417.png](https://github.com/Raphitpt/BeTourist/blob/main/public/pwa-512x512.png?raw=true)" width="100" />
</p>
<p align="center">
    <h1 align="center">BETOURIST</h1>
</p>
<p align="center">
    <em>
La première application utile pour le tourisme, après GoogleMaps, Tripadvisor, Booking ....</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/Raphitpt/BeTourist?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Raphitpt/BeTourist?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Raphitpt/BeTourist?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Raphitpt/BeTourist?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Développé avec les logiciels et langages suivants :</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/Leaflet-199900.svg?style=flat&logo=Leaflet&logoColor=white" alt="Leaflet">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

## 🔗 Liens Rapides

> - [📍 Aperçu](#-aperçu)
> - [📂 Structure du Répertoire](#-structure-du-répertoire) > [🧩 Modules](#-pour-commencer)
> - [🚀 Pour Commencer](#-pour-commencer)
>   - [⚙️ Installation](#️-installation)
>   - [🤖 Exécution de BeTourist](#-exécution-de-betourist)
> - [🤝 Contribuer](#-contribuer)
> - [📄 Licence](#-licence)
> - [👏 Remerciements](#-remerciements)

---

## 📍 Aperçu

BeTourist est une application web (PWA), compatible IOS, Android, Windows, Mac. L'application est téléchargeable. Elle est optimisé pour les appareils mobile.<br>
Son but, aider les touristes à voir les points d'intérêt aux alentours de sa position. La personne est donc géolocaliser, elle peut retrouver les points d'intérêts de 8 catégories pour le moment. (Pour une futur version de l'application, le mieux ce serait de laisser choisir les catégories à l'utilisateurs).<br>
L'application propose une carte avec une barre de recherche qui est aussi accessible avec une recherche vocal (Pas disponible sur tout les navigateurs). Lorsque l'utilisateurs clique sur un points d'intérêt sur la carte, une alerte apparaît lui demandans si il autorise à voir la fiche établissement sur Google Maps. (L'intégration n'est pas faîte à cause du prix de l'api Google 😥)
<br>
Si un lieu plaît à l'utilisateurs, il peux l'ajouter en signet, donc il s'enregistre en local storage sur l'appareil, et il peux le retrouver dans son onglet.

---

## 📂 Structure du répertoire

```sh
└── BeTourist/
    ├── README.md
    ├── Users
    │   └── raphi
    │       ├── .devServer
    │       │   └── cert
    │       │       └── _cert.pem
    │       └── _cert.pem
    ├── dev-dist
    │   ├── registerSW.js
    │   ├── sw.js
    │   └── workbox-b5f7729d.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── apple-touch-icon-180x180.png
    │   ├── assets
    │   │   └── image
    │   │       ├── 184305239.webp
    │   │       ├── 9_w_2560%2Cc_limit_108387402.webp
    │   │       ├── Station_service_lambda_Fotolia.webp
    │   │       ├── bandeau_jardin_royal.jpg.webp
    │   │       ├── boutique-vetements-clair-eggo.webp
    │   │       ├── dom-museum-wien-2017-ausstellungsansicht.webp
    │   │       ├── pcc-actus-debuter-salle-sport.webp
    │   │       └── restaurant-nolinski-paris-5-etoiles-luxe-12-guillaume-de-laubier.webp
    │   ├── favicon.ico
    │   ├── logo.svg
    │   ├── maskable-icon-512x512.png
    │   ├── pwa-192x192.png
    │   ├── pwa-512x512.png
    │   └── pwa-64x64.png
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── fonts
    │   │   │   └── SFProDisplay
    │   │   │       ├── SFProDisplay-Black.woff
    │   │   │       ├── SFProDisplay-Black.woff2
    │   │   │       ├── SFProDisplay-BlackItalic.woff
    │   │   │       ├── SFProDisplay-BlackItalic.woff2
    │   │   │       ├── SFProDisplay-Bold.woff
    │   │   │       ├── SFProDisplay-Bold.woff2
    │   │   │       ├── SFProDisplay-BoldItalic.woff
    │   │   │       ├── SFProDisplay-BoldItalic.woff2
    │   │   │       ├── SFProDisplay-Heavy.woff
    │   │   │       ├── SFProDisplay-Heavy.woff2
    │   │   │       ├── SFProDisplay-HeavyItalic.woff
    │   │   │       ├── SFProDisplay-HeavyItalic.woff2
    │   │   │       ├── SFProDisplay-Light.woff
    │   │   │       ├── SFProDisplay-Light.woff2
    │   │   │       ├── SFProDisplay-LightItalic.woff
    │   │   │       ├── SFProDisplay-LightItalic.woff2
    │   │   │       ├── SFProDisplay-Medium.woff
    │   │   │       ├── SFProDisplay-Medium.woff2
    │   │   │       ├── SFProDisplay-MediumItalic.woff
    │   │   │       ├── SFProDisplay-MediumItalic.woff2
    │   │   │       ├── SFProDisplay-Regular.woff
    │   │   │       ├── SFProDisplay-Regular.woff2
    │   │   │       ├── SFProDisplay-RegularItalic.woff
    │   │   │       ├── SFProDisplay-RegularItalic.woff2
    │   │   │       ├── SFProDisplay-Semibold.woff
    │   │   │       ├── SFProDisplay-Semibold.woff2
    │   │   │       ├── SFProDisplay-SemiboldItalic.woff
    │   │   │       ├── SFProDisplay-SemiboldItalic.woff2
    │   │   │       ├── SFProDisplay-Thin.woff
    │   │   │       ├── SFProDisplay-Thin.woff2
    │   │   │       ├── SFProDisplay-ThinItalic.woff
    │   │   │       ├── SFProDisplay-ThinItalic.woff2
    │   │   │       ├── SFProDisplay-Ultralight.woff
    │   │   │       ├── SFProDisplay-Ultralight.woff2
    │   │   │       ├── SFProDisplay-UltralightItalic.woff
    │   │   │       └── SFProDisplay-UltralightItalic.woff2
    │   │   ├── icon
    │   │   │   └── Icon.jsx
    │   │   └── react.svg
    │   ├── components
    │   │   ├── bookmarks
    │   │   │   └── bookmarks.jsx
    │   │   ├── card
    │   │   │   ├── card.jsx
    │   │   │   └── detailCard.jsx
    │   │   ├── home
    │   │   │   ├── home.jsx
    │   │   │   └── top.jsx
    │   │   ├── maps
    │   │   │   ├── MapModal.jsx
    │   │   │   └── maps.jsx
    │   │   ├── menu
    │   │   │   └── menu.jsx
    │   │   └── place
    │   │       └── placeDetail.jsx
    │   ├── fonts.css
    │   ├── index.css
    │   ├── main.jsx
    │   ├── routes
    │   │   └── root.jsx
    │   └── transitions.css
    └── vite.config.js
```

---

## 🚀 Pour Commencer

**_Prérequis_**

Assurez-vous d'avoir les dépendances suivantes installées sur votre système :

- **Node.js** : `21.7.0` ou moins.

### ⚙️ Installation

1. Clonez le dépôt BeTourist :

```sh
git clone https://github.com/Raphitpt/BeTourist
```

2. Accédez au répertoire du projet :

```sh
cd BeTourist
```

3. Installez les dépendances :

```sh
npm install
```

### 🤖 Exécution de BeTourist

Utilisez la commande suivante pour exécuter BeTourist :

```sh
npm run dev
```

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! Voici plusieurs façons dont vous pouvez contribuer :

- **[Soumettre des Pull Requests (PR)](https://github.com/Raphitpt/BeTourist/blob/main/CONTRIBUTING.md)** : Consultez les PR ouvertes et soumettez les vôtres.
- **[Participer aux Discussions](https://github.com/Raphitpt/BeTourist/discussions)** : Partagez vos idées, donnez votre avis ou posez des questions.
- **[Signaler des Problèmes](https://github.com/Raphitpt/BeTourist/issues)** : Soumettez des bugs trouvés ou faites des demandes de fonctionnalités pour BeTourist.

<details closed>
    <summary>Directives de Contribution</summary>

1. **Forkez le Dépôt** : Commencez par forker le dépôt du projet sur votre compte GitHub.
2. **Clonez Localement** : Clonez le dépôt forké sur votre machine locale en utilisant un client Git.
   ```sh
   git clone https://github.com/Raphitpt/BeTourist
   ```
3. **Créez une Nouvelle Branche** : Travaillez toujours sur une nouvelle branche, en lui donnant un nom descriptif.
   ```sh
   git checkout -b nouvelle-fonctionnalité-x
   ```
4. **Apportez Vos Modifications** : Développez et testez vos modifications localement.
5. **Validez Vos Modifications** : Validez avec un message clair décrivant vos mises à jour.
   ```sh
   git commit -m 'Implémentation de la nouvelle fonctionnalité x.'
   ```
6. **Poussez vers GitHub** : Poussez les modifications vers votre dépôt forké.
   ```sh
   git push origin nouvelle-fonctionnalité-x
   ```
7. **Soumettez une Pull Request** : Créez une PR contre le dépôt du projet original. Décrivez clairement les modifications et leurs motivations.

Une fois votre PR examinée et approuvée, elle sera fusionnée dans la branche principale.

</details>

---
