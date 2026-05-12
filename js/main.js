
// ...existing code for anchor smooth scroll and nav highlighting...

document.querySelectorAll('a[href^="#"]').forEach(function(anchor) 
{
 anchor.addEventListener('click', function(e) {
 e.preventDefault();
var target = 
document.querySelector(this.getAttribute('href'));
if (target) {
 target.scrollIntoView({ behavior: 'smooth' });
 }
 });
});

// Highlight current page in navigation
document.addEventListener('DOMContentLoaded', function () {
	const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
	const currentPage = window.location.pathname.split('/').pop();
	navLinks.forEach(link => {
		// Remove any existing 'active' class
		link.classList.remove('active');
		// If href matches current page, add 'active'
		if (link.getAttribute('href') === currentPage || (link.getAttribute('href') === 'index.html' && (currentPage === '' || currentPage === '/'))) {
			link.classList.add('active');
			link.setAttribute('aria-current', 'page');
		} else {
			link.removeAttribute('aria-current');
		}
	});
});
