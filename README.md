<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Français - Accueil</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
<nav class="main-nav">
    <div class="nav-container">
        <a href="#" class="nav-logo">📖 Français</a>
        <div class="nav-buttons">
            <button class="nav-btn" data-page="accueil">🏠 Accueil</button>
            <button class="nav-btn" data-page="six">🎒 Sixième</button>
            <button class="nav-btn" data-page="premiere">🎓 Première - BAC</button>
        </div>
    </div>
</nav>

<!-- CONTENEUR DYNAMIQUE -->
<div id="dynamic-content" class="page-container">
    <!-- ACCUEIL -->
    <div id="accueil" class="page active-page">
        
    <!-- HERO -->
    <div class="hero">
        <h1>📖 Français : réussir du collège au bac</h1>
        <p>Cours, exercices et méthodes par un étudiant en Lettres Modernes, futur professeur.</p>
    </div>

    <!-- DEUX COLONNES -->
    <div class="two-columns">
        <!-- Colonne gauche : Informations importantes -->
        <div class="col-left">
            <div class="info-box">
                <h3><i class="fas fa-info-circle"></i> Informations importantes</h3>
                <div id="info-content" class="info-content">
                    Chargement...
                </div>
            </div>
        </div>

        <!-- Colonne droite : Calendrier -->
        <div class="col-right">
            <div class="calendar-box">
                <h3><i class="fas fa-calendar-alt"></i> Calendrier</h3>
                <div id="calendar"></div>
            </div>
        </div>
    </div>

    <!-- ESPACE CITATION -->
    <div id="citation-block" class="citation-container">
        <div class="citation-icon">
            <i class="fas fa-quote-left"></i>
        </div>
        <div class="citation-content">
            <p id="citation-texte" class="citation-texte">Chargement des citations...</p>
            <p id="citation-auteur" class="citation-auteur"></p>
        </div>
    </div>

    <!-- CARTES MAIL / ERREUR -->
    <div class="cards-grid">
        <div class="info-card">
            <i class="fas fa-envelope"></i>
            <h3>Une question ?</h3>
            <p><a href="mailto:ozcelebialican2005@gmail.com?subject=Question%20Français">Envoyez-moi un mail</a><br>Je réponds rapidement.</p>
        </div>
        <div class="info-card">
            <i class="fas fa-bug"></i>
            <h3>Une erreur ?</h3>
            <p><a href="mailto:ozcelebialican2005@gmail.com?subject=Erreur%20site">Signalez-la ici</a><br>Merci pour votre aide !</p>
        </div>
    </div>
</div>

<script src="main.js"></script>
</body>
</html>