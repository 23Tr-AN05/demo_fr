// ========== CHARGEMENT DES INFORMATIONS IMPORTANTES (JSON) ==========
async function loadImportantInfo() {
    try {
        const response = await fetch('info.json');
        if (!response.ok) throw new Error('Impossible de charger info.json');
        const info = await response.json();
        
        const banner = document.getElementById('info-banner');
        if (!banner) return;
        
        if (info.active && info.message && info.message.trim() !== '') {
            let typeClass = 'info-banner-info';
            switch (info.type) {
                case 'warning': typeClass = 'info-banner-warning'; break;
                case 'success': typeClass = 'info-banner-success'; break;
                case 'danger': typeClass = 'info-banner-danger'; break;
                default: typeClass = 'info-banner-info';
            }
            
            banner.className = `info-banner ${typeClass}`;
            
            let icon = 'fa-info-circle';
            if (info.type === 'warning') icon = 'fa-exclamation-triangle';
            if (info.type === 'success') icon = 'fa-check-circle';
            if (info.type === 'danger') icon = 'fa-exclamation-circle';
            
            let html = `<i class="fas ${icon}"></i> ${info.message}`;
            
            if (info.lien && info.lien.texte && info.lien.url) {
                html += ` <a href="${info.lien.url}" target="_blank">${info.lien.texte} →</a>`;
            }
            
            html += `<button class="info-banner-close" onclick="this.parentElement.style.display='none'">✖</button>`;
            
            banner.innerHTML = html;
            banner.style.display = 'block';
            
            const bannerClosed = localStorage.getItem('infoBannerClosed');
            if (bannerClosed === info.message) {
                banner.style.display = 'none';
            }
        } else {
            banner.style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur chargement info.json:', error);
    }
}

// ========== ESPACE CITATION ==========
// ========== ESPACE CITATION AVEC DÉFILEMENT AUTOMATIQUE ==========
let citationInterval = null;
let currentCitationIndex = 0;
let citationsList = [];

async function loadCitation() {
    try {
        const response = await fetch('citation.json');
        if (!response.ok) throw new Error('Impossible de charger citation.json');
        const data = await response.json();

        const citationBlock = document.getElementById('citation-block');
        if (!citationBlock) return;

        if (!data.active || !data.citations || data.citations.length === 0) {
            citationBlock.style.display = 'none';
            return;
        }

        // Stocker la liste des citations
        citationsList = data.citations;
        
        // Choisir une citation aléatoire au départ
        currentCitationIndex = Math.floor(Math.random() * citationsList.length);
        displayCitation(currentCitationIndex);
        
        citationBlock.style.display = 'flex';
        
        // Nettoyer l'ancien intervalle s'il existe
        if (citationInterval) {
            clearInterval(citationInterval);
        }
        
        // Démarrer le défilement automatique (entre 20 et 30 secondes)
        scheduleNextCitation();
        
    } catch (error) {
        console.error('Erreur chargement citation:', error);
        const citationBlock = document.getElementById('citation-block');
        if (citationBlock) citationBlock.style.display = 'none';
    }
}

function displayCitation(index) {
    if (!citationsList.length) return;
    
    const citation = citationsList[index];
    const texteElement = document.getElementById('citation-texte');
    const auteurElement = document.getElementById('citation-auteur');
    
    if (texteElement && auteurElement) {
        // Ajout d'un effet de fondu
        const container = document.getElementById('citation-block');
        if (container) {
            container.style.transition = 'opacity 0.3s';
            container.style.opacity = '0';
            
            setTimeout(() => {
                texteElement.innerText = citation.texte;
                auteurElement.innerHTML = `— ${citation.auteur}`;
                container.style.opacity = '1';
            }, 300);
        } else {
            texteElement.innerText = citation.texte;
            auteurElement.innerHTML = `— ${citation.auteur}`;
        }
    }
}

function scheduleNextCitation() {
    // Délai aléatoire entre 20 et 30 secondes (20000 à 30000 millisecondes)
    const delay = Math.floor(Math.random() * (30000 - 20000 + 1) + 20000);
    
    citationInterval = setTimeout(() => {
        // Passer à la citation suivante (circulaire)
        currentCitationIndex = (currentCitationIndex + 1) % citationsList.length;
        displayCitation(currentCitationIndex);
        
        // Planifier la prochaine
        scheduleNextCitation();
    }, delay);
}

// Nettoyer l'intervalle si nécessaire (optionnel)
function stopCitationRotation() {
    if (citationInterval) {
        clearTimeout(citationInterval);
        citationInterval = null;
    }
}

// ========== CHARGEMENT DYNAMIQUE DES PAGES ==========
const contentContainer = document.getElementById('dynamic-content');
const navBtns = document.querySelectorAll('.nav-btn');

const pageCache = {
    accueil: document.getElementById('accueil').outerHTML
};

async function loadPage(pageName) {
    if (pageCache[pageName]) {
        contentContainer.innerHTML = pageCache[pageName];
        initPageScripts(pageName);
        return;
    }
    
    try {
        const response = await fetch(`${pageName}.html`);
        if (!response.ok) throw new Error('Page non trouvée');
        const html = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const content = doc.querySelector(`#${pageName === 'six' ? 'sixieme' : 'premiere'}`);
        
        if (content) {
            pageCache[pageName] = content.outerHTML;
            contentContainer.innerHTML = pageCache[pageName];
            initPageScripts(pageName);
        }
    } catch (error) {
        console.error('Erreur de chargement:', error);
        contentContainer.innerHTML = `<div class="error">Impossible de charger la page ${pageName}</div>`;
    }
}

function initPageScripts(pageName) {
    if (pageName === 'six') {
        initSixiemeTabs();
    } else if (pageName === 'premiere') {
        initPremiereAccordion();
    }
    initPdfToast();
}

// ========== ONGLETS SIXIÈME ==========
function initSixiemeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function activateTab(tabId) {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(tabId);
        if (targetBtn) targetBtn.classList.add('active');
        if (targetContent) targetContent.classList.add('active');
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            activateTab(tabId);
        });
    });
}

// ========== ACCORDÉON PREMIÈRE ==========
function initPremiereAccordion() {
    const accordionBtns = document.querySelectorAll('.accordion-btn');
    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
            
            if (!isActive) {
                content.classList.add('active');
            }
        });
    });
}

// ========== INDICATEUR PDF ==========
function initPdfToast() {
    const oldToast = document.querySelector('.pdf-toast');
    if (oldToast) oldToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'pdf-toast';
    toast.textContent = '📄 Ouverture du fichier...';
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#2c3e2f';
    toast.style.color = 'white';
    toast.style.padding = '8px 16px';
    toast.style.borderRadius = '40px';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    toast.style.pointerEvents = 'none';
    document.body.appendChild(toast);
    
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.addEventListener('click', () => {
            toast.style.opacity = '1';
            setTimeout(() => {
                toast.style.opacity = '0';
            }, 1500);
        });
    });
}

// ========== NAVIGATION ==========
function showPage(pageName) {
    if (pageName === 'accueil') {
        contentContainer.innerHTML = pageCache.accueil;
        initPdfToast();
        loadImportantInfo();
        loadCitation();  // ← Charge la citation sur l'accueil
    } else {
        loadPage(pageName);
    }
    
    navBtns.forEach(btn => btn.classList.remove('active-nav'));
    const activeBtn = document.querySelector(`.nav-btn[data-page="${pageName}"]`);
    if (activeBtn) activeBtn.classList.add('active-nav');
    
    localStorage.setItem('lastPage', pageName);
}

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const pageName = btn.getAttribute('data-page');
        showPage(pageName);
    });
});

const lastPage = localStorage.getItem('lastPage');
if (lastPage && lastPage !== 'accueil') {
    showPage(lastPage);
} else {
    showPage('accueil');
}