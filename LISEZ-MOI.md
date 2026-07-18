# Poutre — PWA d'entraînement doigts

Application autonome (aucune dépendance, aucun compte, aucun serveur back-end). Toutes tes données restent **sur ton téléphone** (localStorage).

## Contenu du dossier
- `index.html` — l'application
- `manifest.json` — métadonnées PWA (installation)
- `sw.js` — service worker (fonctionnement hors-ligne)
- `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` — icônes

Garde **tous les fichiers dans le même dossier**.

## Mettre en ligne (3 options gratuites)

**Netlify Drop** (le plus simple)
1. Va sur https://app.netlify.com/drop
2. Glisse-dépose le dossier entier.
3. Tu obtiens une URL `https://…netlify.app` → ouvre-la sur ton téléphone.

**GitHub Pages**
1. Crée un dépôt, pousse ces fichiers à la racine.
2. Settings → Pages → Branch `main` / dossier `/root`.
3. Ton app est sur `https://<user>.github.io/<repo>/`.

**Vercel** : `vercel` dans le dossier, ou import du dépôt Git.

> Il faut du **HTTPS** pour que l'installation et le hors-ligne marchent (Netlify/GitHub/Vercel le fournissent automatiquement). En local, `http://localhost` marche aussi pour tester.

## Installer sur le téléphone
- **iPhone (Safari)** : bouton Partager → « Sur l'écran d'accueil ».
- **Android (Chrome)** : menu ⋮ → « Installer l'application » (ou la bannière in-app).

Une fois installée, elle s'ouvre en plein écran et fonctionne **sans connexion**.

## Tester en local (facultatif)
```bash
cd poutre
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Sauvegarde
Les données vivent dans le navigateur. Si tu changes de téléphone ou vides le cache, elles disparaissent. (Dis-moi si tu veux un bouton **Exporter / Importer** en JSON — c'est rapide à ajouter.)
