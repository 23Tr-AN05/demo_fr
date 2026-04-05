// ========== INFORMATIONS IMPORTANTES ==========
async function loadImportantInfo() {
    const infoDiv = document.getElementById('info-content');
    if (!infoDiv) return;
    
    try {
        const response = await fetch('info.json');
        if (!response.ok) throw new Error('Fichier non trouvé');
        
        const info = await response.json();
        
        if (info.active && info.message && info.message.trim() !== '') {
            let html = `<div class="info-message">`;
            
            if (info.type === 'warning') html += `<i class="fas fa-exclamation-triangle"></i> `;
            else if (info.type === 'success') html += `<i class="fas fa-check-circle"></i> `;
            else if (info.type === 'danger') html += `<i class="fas fa-exclamation-circle"></i> `;
            else html += `<i class="fas fa-info-circle"></i> `;
            
            html += `${info.message}`;
            
            if (info.lien && info.lien.texte && info.lien.url) {
                html += ` <a href="${info.lien.url}" target="_blank">${info.lien.texte} →</a>`;
            }
            
            html += `</div>`;
            infoDiv.innerHTML = html;
        } else {
            infoDiv.innerHTML = '<div class="info-empty"><i class="fas fa-ban"></i> Pas d\'information importante</div>';
        }
    } catch (error) {
        console.error('Erreur chargement info.json:', error);
        infoDiv.innerHTML = '<div class="info-empty"><i class="fas fa-ban"></i> Pas d\'information importante</div>';
    }
}

// ========== CITATIONS AVEC DÉFILEMENT ==========
let citationInterval = null;
let citationsList = [];
let currentCitationIndex = 0;

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

        citationsList = data.citations;
        currentCitationIndex = Math.floor(Math.random() * citationsList.length);
        displayCitation(currentCitationIndex);
        citationBlock.style.display = 'flex';
        
        if (citationInterval) clearInterval(citationInterval);
        scheduleNextCitation();
    } catch (error) {
        console.error('Erreur chargement citation:', error);
        const citationBlock = document.getElementById('citation-block');
        if (citationBlock) {
            document.getElementById('citation-texte').innerText = '« La langue française est une femme. Et cette femme est si belle, si fière, si modeste... »';
            document.getElementById('citation-auteur').innerHTML = '— Paul Claudel';
        }
    }
}

function displayCitation(index) {
    if (!citationsList.length) return;
    const citation = citationsList[index];
    const texteEl = document.getElementById('citation-texte');
    const auteurEl = document.getElementById('citation-auteur');
    
    if (texteEl && auteurEl) {
        const container = document.getElementById('citation-block');
        if (container) {
            container.style.transition = 'opacity 0.3s';
            container.style.opacity = '0';
            
            setTimeout(() => {
                texteEl.innerText = citation.texte;
                auteurEl.innerHTML = `— ${citation.auteur}`;
                container.style.opacity = '1';
            }, 300);
        } else {
            texteEl.innerText = citation.texte;
            auteurEl.innerHTML = `— ${citation.auteur}`;
        }
    }
}

function scheduleNextCitation() {
    const delay = Math.floor(Math.random() * (30000 - 20000 + 1) + 20000);
    
    citationInterval = setTimeout(() => {
        currentCitationIndex = (currentCitationIndex + 1) % citationsList.length;
        displayCitation(currentCitationIndex);
        scheduleNextCitation();
    }, delay);
}

// ========== CALENDRIER ==========
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startWeekday = firstDayOfMonth.getDay();
    
    let startOffset = startWeekday === 0 ? 6 : startWeekday - 1;
    
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    
    let calendarHtml = `
        <div class="calendar-header">
            <button onclick="previousMonth()"><i class="fas fa-chevron-left"></i></button>
            <h4>${getMonthName(month)} ${year}</h4>
            <button onclick="nextMonth()"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="calendar-weekdays">
            <div class="calendar-weekday">Lun</div>
            <div class="calendar-weekday">Mar</div>
            <div class="calendar-weekday">Mer</div>
            <div class="calendar-weekday">Jeu</div>
            <div class="calendar-weekday">Ven</div>
            <div class="calendar-weekday">Sam</div>
            <div class="calendar-weekday">Dim</div>
        </div>
        <div class="calendar-days">
    `;
    
    const prevMonthDate = new Date(year, month, 0);
    const daysInPrevMonth = prevMonthDate.getDate();
    
    for (let i = 0; i < startOffset; i++) {
        const day = daysInPrevMonth - startOffset + i + 1;
        calendarHtml += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = (day === todayDate && month === todayMonth && year === todayYear);
        const todayClass = isToday ? 'today' : '';
        calendarHtml += `<div class="calendar-day ${todayClass}">${day}</div>`;
    }
    
    const totalDaysDisplayed = startOffset + daysInMonth;
    const remainingDays = 42 - totalDaysDisplayed;
    
    for (let day = 1; day <= remainingDays; day++) {
        calendarHtml += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    calendarHtml += `</div>`;
    
    const calendarDiv = document.getElementById('calendar');
    if (calendarDiv) calendarDiv.innerHTML = calendarHtml;
}

function getMonthName(month) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    return months[month];
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// ========== BANDEAU INFO DYNAMIQUE (pour l'ancienne structure) ==========
async function loadBannerInfo() {
    const banner = document.getElementById('info-banner');
    if (!banner) return;
    
    try {
        const response = await fetch('info.json');
        if (!response.ok) throw new Error('Impossible de charger info.json');
        const info = await response.json();
        
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
        } else {
            banner.style.display = 'none';
        }
    } catch (error) {
        console.error('Erreur chargement info.json:', error);
        banner.style.display = 'none';
    }
}

// ========== ONGLETS SIXIÈME ==========
function initSixiemeTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length === 0) return;
    
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
    
    if (accordionBtns.length === 0) return;
    
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

// ========== INITIALISATION ==========
function init() {
    loadImportantInfo();
    loadCitation();
    renderCalendar();
    loadBannerInfo();
    initSixiemeTabs();
    initPremiereAccordion();
    initPdfToast();
}

// Démarrage quand la page est chargée
document.addEventListener('DOMContentLoaded', init);