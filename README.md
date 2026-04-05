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

<!-- BARRE DE NAVIGATION PRINCIPALE -->
<nav class="main-nav">
    <div class="nav-container">
        <a href="#" class="nav-logo">📖 Français</a>
        <div class="nav-buttons">
            <button onclick="loadPage('accueil')" id="nav-accueil" class="nav-btn active-nav">
                <i class="fas fa-home"></i> Accueil
            </button>
            <button onclick="loadPage('six')" id="nav-six" class="nav-btn">
                <i class="fas fa-child"></i> Sixième
            </button>
            <button onclick="loadPage('premiere')" id="nav-premiere" class="nav-btn">
                <i class="fas fa-graduation-cap"></i> Première - BAC
            </button>
        </div>
    </div>
</nav>

<!-- CONTENEUR DYNAMIQUE -->
<div id="page-container" class="page-container">
    <!-- ACCUEIL -->
    <div id="accueil" class="page active-page">
        <div class="container">
            <!-- HERO -->
            <div class="hero">
                <h1>📖 Français : réussir du collège au bac</h1>
                <p>Cours, exercices et méthodes par un étudiant en Lettres Modernes, futur professeur.</p>
            </div>

            <!-- DEUX COLONNES -->
            <div class="two-columns">
                <div class="col-left">
                    <div class="info-box">
                        <h3><i class="fas fa-info-circle"></i> Informations importantes</h3>
                        <div id="info-content" class="info-content">Chargement...</div>
                    </div>
                </div>
                <div class="col-right">
                    <div class="calendar-box">
                        <h3><i class="fas fa-calendar-alt"></i> Calendrier</h3>
                        <div id="calendar"></div>
                    </div>
                </div>
            </div>

            <!-- CITATION -->
            <div id="citation-block" class="citation-container">
                <div class="citation-icon"><i class="fas fa-quote-left"></i></div>
                <div class="citation-content">
                    <p id="citation-texte" class="citation-texte">Chargement...</p>
                    <p id="citation-auteur" class="citation-auteur"></p>
                </div>
            </div>

            <!-- CARTES -->
            <div class="cards-grid">
                <div class="info-card">
                    <i class="fas fa-envelope"></i>
                    <h3>Une question ?</h3>
                    <p><a href="mailto:ozcelebialican2005@gmail.com">Envoyez-moi un mail</a></p>
                </div>
                <div class="info-card">
                    <i class="fas fa-bug"></i>
                    <h3>Une erreur ?</h3>
                    <p><a href="mailto:ozcelebialican2005@gmail.com">Signalez-la ici</a></p>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="main.js"></script>
</body>
</html>