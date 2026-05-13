// Localization Logic
let translations = {};

async function setLanguage(lang) {
    if (!translations[lang]) {
        try {
            const response = await fetch(`translations_${lang}.json`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            translations[lang] = await response.json();
        } catch (e) {
            console.error('Failed to load translations for ' + lang, e);
            return;
        }
    }
    
    localStorage.setItem('riad_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
    
    const data = translations[lang];
    
    // Update elements with data-t
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.getAttribute('data-t');
        if (data[key]) {
            el.textContent = data[key];
        }
    });
    
    // Update placeholders with data-t-placeholder
    document.querySelectorAll('[data-t-placeholder]').forEach(el => {
        const key = el.getAttribute('data-t-placeholder');
        if (data[key]) {
            el.placeholder = data[key];
        }
    });
    
    // Update language switcher active states
    document.querySelectorAll('#langSwitcher button').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Update mobile switcher active states if applicable
    document.querySelectorAll('.lang-switcher-mobile button').forEach(btn => {
        const btnLang = btn.textContent.trim().toLowerCase();
        btn.classList.toggle('active', btnLang === lang);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const savedLang = localStorage.getItem('riad_lang');
    
    // Priority: URL parameter > LocalStorage > Default (fr)
    const lang = (urlLang && ['fr', 'en', 'ar'].includes(urlLang)) ? urlLang : (savedLang || 'fr');
    setLanguage(lang);
});
