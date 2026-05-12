// js/faq-search.js
// Handles real-time FAQ accordion filtering

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('faqSearch');
    const accordionItems = document.querySelectorAll('#faqAccordion .accordion-item');
    if (!searchInput || !accordionItems.length) return;
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        accordionItems.forEach(item => {
            const headerBtn = item.querySelector('.accordion-button');
            const bodyDiv = item.querySelector('.accordion-body');
            const headerText = headerBtn.textContent;
            const bodyText = bodyDiv.textContent;
            const headerLower = headerText.toLowerCase();
            const bodyLower = bodyText.toLowerCase();
            let match = false;
            // Remove previous highlights
            headerBtn.innerHTML = headerText;
            bodyDiv.innerHTML = bodyText;
            if (query && (headerLower.includes(query) || bodyLower.includes(query))) {
                match = true;
                // Highlight in header
                headerBtn.innerHTML = headerText.replace(new RegExp(`(${query})`, 'ig'), '<mark>$1</mark>');
                // Highlight in body
                bodyDiv.innerHTML = bodyText.replace(new RegExp(`(${query})`, 'ig'), '<mark>$1</mark>');
            }
            item.style.display = match || !query ? '' : 'none';
        });
    });
});
