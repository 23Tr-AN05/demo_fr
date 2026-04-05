// ========== CHARGEMENT DYNAMIQUE DES PAGES ==========
const pageCache = {};

async function loadPage(pageName) {
    const container = document.getElementById('page-container');
    if (!container) return;
    
    // Si la page est déjà en cache
    if (pageCache[pageName]) {
        container.innerHTML = pageCache[pageName];
        updateActiveNav(pageName);
        initPageScripts(pageName);
        return;
    }
    
    // Page spéciale accueil (déjà dans le DOM)
    if (pageName === 'accueil') {
        // L'accueil est déjà présent, on le réaffiche
        const accueilDiv = document.getElementById('accueil');
        if (accueilDiv) {
            container.innerHTML = '';
            container.appendChild(accueilDiv.cloneNode(true));
            pageCache['accueil'] = container.innerHTML;
        }
        updateActiveNav('accueil');
        initPageScripts('accueil');
        return;
    }
    
    // Charger la page externe
    try {
        const response = await fetch(`${pageName}.html`);
        if (!response.ok) throw new Error('Page non trouvée');
        const html = await response.text();
        
        pageCache[pageName] = html;
        container.innerHTML = html;
        updateActiveNav(pageName);
        initPageScripts(pageName);
    } catch (error) {
        console.error('Erreur:', error);
        container.innerHTML = `<div class="container"><p style="color:red;">Erreur chargement de ${pageName}</p></div>`;
    }
}

function updateActiveNav(pageName) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active-nav');
    });
    const activeBtn = document.getElementById(`nav-${pageName}`);
    if (activeBtn) activeBtn.classList.add('active-nav');
}

function initPageScripts(pageName) {
    if (pageName === 'accueil') {
        loadImportantInfo();
        loadCitation();
        renderCalendar();
    } else if (pageName === 'six') {
        initSixiemeTabs();
    } else if (pageName === 'premiere') {
        initPremiereAccordion();
    }
    initPdfToast();
}

// ========== ACCUEIL ==========
async function loadImportantInfo() {
    const infoDiv = document.getElementById('info-content');
    if (!infoDiv) return;
    try {
        const response = await fetch('info.json');
        if (!response.ok) throw new Error();
        const info = await response.json();
        if (info.active && info.message) {
            infoDiv.innerHTML = `<i class="fas fa-info-circle"></i> ${info.message}`;
        } else {
            infoDiv.innerHTML = '<span class="info-empty">Pas d\'information importante</span>';
        }
    } catch {
        infoDiv.innerHTML = '<span class="info-empty">Pas d\'information importante</span>';
    }
}

let citationInterval = null;
let citationsList = [];

async function loadCitation() {
    try {
        const response = await fetch('citation.json');
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (data.active && data.citations) {
            citationsList = data.citations;
            displayRandomCitation();
            if (citationInterval) clearInterval(citationInterval);
            citationInterval = setInterval(displayRandomCitation, 25000);
        }
    } catch {
        document.getElementById('citation-texte').innerText = '« La langue française est une femme... »';
        document.getElementById('citation-auteur').innerHTML = '— Paul Claudel';
    }
}

function displayRandomCitation() {
    if (citationsList.length === 0) return;
    const randomIndex = Math.floor(Math.random() * citationsList.length);
    const citation = citationsList[randomIndex];
    const texteEl = document.getElementById('citation-texte');
    const auteurEl = document.getElementById('citation-auteur');
    if (texteEl && auteurEl) {
        texteEl.innerText = citation.texte;
        auteurEl.innerHTML = `— ${citation.auteur}`;
    }
}

let currentDate = new Date();

function renderCalendar() {
    const calendarDiv = document.getElementById('calendar');
    if (!calendarDiv) return;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    let startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    const today = new Date();
    
    let html = `<div class="calendar-header">
        <button onclick="previousMonth()"><i class="fas fa-chevron-left"></i></button>
        <h4>${getMonthName(month)} ${year}</h4>
        <button onclick="nextMonth()"><i class="fas fa-chevron-right"></i></button>
    </div>
    <div class="calendar-weekdays">
        <div class="calendar-weekday">Lun</div><div class="calendar-weekday">Mar</div>
        <div class="calendar-weekday">Mer</div><div class="calendar-weekday">Jeu</div>
        <div class="calendar-weekday">Ven</div><div class="calendar-weekday">Sam</div>
        <div class="calendar-weekday">Dim</div>
    </div><div class="calendar-days">`;
    
    const prevMonthDate = new Date(year, month, 0);
    const daysInPrevMonth = prevMonthDate.getDate();
    for (let i = 0; i < startOffset; i++) {
        html += `<div class="calendar-day other-month">${daysInPrevMonth - startOffset + i + 1}</div>`;
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = (day === today.getDate() && month === today.getMonth() && year === today.getFullYear());
        html += `<div class="calendar-day ${isToday ? 'today' : ''}">${day}</div>`;
    }
    const totalDisplayed = startOffset + daysInMonth;
    for (let day = 1; day <= 42 - totalDisplayed; day++) {
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    html += `</div>`;
    calendarDiv.innerHTML = html;
}

function getMonthName(month) {
    return ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'][month];
}

function previousMonth() { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); }
function nextMonth() { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); }

// ========== SIXIÈME ==========
function initSixiemeTabs() {
    const tabBtns = document.querySelectorAll('#six .tab-btn');
    const tabContents = document.querySelectorAll('#six .tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ========== PREMIÈRE ==========
function initPremiereAccordion() {
    const btns = document.querySelectorAll('#premiere .accordion-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            document.querySelectorAll('#premiere .accordion-content').forEach(c => c.classList.remove('active'));
            content.classList.add('active');
        });
    });
}

// ========== PDF TOAST ==========
function initPdfToast() {
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const toast = document.createElement('div');
            toast.textContent = '📄 Ouverture...';
            toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:#2c3e2f;color:white;padding:8px 16px;border-radius:40px;z-index:9999;opacity:0;transition:0.3s';
            document.body.appendChild(toast);
            setTimeout(() => toast.style.opacity = '1', 10);
            setTimeout(() => toast.remove(), 1500);
        });
    });
}

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
    loadPage('accueil');
});