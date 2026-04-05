<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Français - Cours pour collégiens & lycéens</title>
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
        
        <!-- HERO (titre + sous-titre) -->
        <div class="hero-fullwidth">
            <div class="hero-content">
                <h1>📖 Français : réussir du collège au bac</h1>
                <p class="hero-subtitle">Cours, exercices et méthodes par un étudiant en Lettres Modernes, futur professeur.</p>
            </div>
        </div>

        <!-- ===== BANDEAU D'INFORMATION IMPORTANTE ===== -->
        <!-- Ce bloc est maintenant placé juste après le hero -->
        <div id="info-banner" class="info-banner" style="display: none;"></div>
        <!-- ========================================= -->
        
        <!-- Cartes : Une question ? / Une erreur ? -->
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

        <!-- ===== ESPACE CITATION ===== -->
        <div id="citation-block" class="citation-container" style="display: none;">
            <div class="citation-icon">
                <i class="fas fa-quote-left"></i>
            </div>
            <div class="citation-content">
                <p id="citation-texte" class="citation-texte"></p>
                <p id="citation-auteur" class="citation-auteur"></p>
            </div>
        </div>

    </div> <!-- FIN ACCUEIL -->
</div> <!-- FIN DYNAMIC CONTENT -->

<script src="js/main.js"></script>
</body>
</html>