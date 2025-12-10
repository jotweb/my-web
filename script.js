// 1. Hero Section Alternating Backgrounds
const hero = document.getElementById('hero');
const backgroundImages = [
    'url(image4.jpg.png)', // Replace with your image paths
    'url(image3.jpg.png)',
    'url(image2.jpg.jpg)'
];
let currentImageIndex = 0;

function changeBackground() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    hero.style.backgroundImage = backgroundImages[currentImageIndex];
}

// Change the background every 4 seconds (4000 milliseconds)
setInterval(changeBackground, 4000); 

// Set the initial background image
hero.style.backgroundImage = backgroundImages[0];


// --- 2. Mobile Menu Toggle (NEW CODE) ---
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const navLinks = mainNav.querySelectorAll('a');

function toggleMenu() {
    mainNav.classList.toggle('nav-open');
    const icon = menuToggle.querySelector('i');
    
    // Change the icon from bars (menu) to times (X/close)
    if (mainNav.classList.contains('nav-open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Event listener to open/close the menu when the button is clicked
menuToggle.addEventListener('click', toggleMenu);

// Close the menu when a link is clicked (important for single-page sites)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('nav-open')) {
            toggleMenu(); // Closes the menu
        }
    });
});


// 2. Formspree Submission Handling
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    // IMPORTANT: Replace the 'YOUR_FORMSPREE_ENDPOINT' in index.html with your actual Formspree URL.
    // Example: https://formspree.io/f/movyvkel
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.textContent = "Thanks for your message! I'll be in touch soon.";
            status.style.color = "green";
            form.reset(); // Clear the form fields
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.textContent = "Oops! There was an error submitting your form.";
                }
                status.style.color = "red";
            })
        }
    }).catch(error => {
        status.textContent = "Oops! There was a connection error.";
        status.style.color = "red";
    });

    status.style.display = "block"; // Show the status message
}

form.addEventListener("submit", handleSubmit);



