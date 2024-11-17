let poems = [];
let currentIndex = 0;

// DOM Elements
const slider = document.getElementById('poemSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');

// Create poem element HTML
function createPoemElement(poem) {
    return `
        <div class="poem-container">
            <h2 class="poem-title">${poem.title}</h2>
            <div class="poem-content">${poem.content}</div>
        </div>
    `;
}

// Update the slider display
function updateSlider() {
    slider.innerHTML = createPoemElement(poems[currentIndex]);
    setTimeout(() => {
        slider.querySelector('.poem-container').classList.add('active');
    }, 50);
    
    currentPageSpan.textContent = currentIndex + 1;
    totalPagesSpan.textContent = poems.length;
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === poems.length - 1;
}

// Navigation event listeners
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < poems.length - 1) {
        currentIndex++;
        updateSlider();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        currentIndex--;
        updateSlider();
    } else if (e.key === 'ArrowRight' && currentIndex < poems.length - 1) {
        currentIndex++;
        updateSlider();
    }
});

// Loading state
function showLoading() {
    slider.innerHTML = '<div class="loading">Loading poems...</div>';
}

// Error state
function showError(message) {
    slider.innerHTML = `<div class="error">Error: ${message}</div>`;
}

// Initialize: Load poems from JSON file
async function initializeSlider() {
    showLoading();
    try {
        const response = await fetch('../poem/poems.json');
        if (!response.ok) {
            throw new Error('Failed to load poems');
        }
        poems = await response.json();
        updateSlider();
    } catch (error) {
        showError(error.message);
        console.error('Error loading poems:', error);
    }
}

// Start the application
initializeSlider();