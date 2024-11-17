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

// Error state with detailed message
function showError(message, details = '') {
    const errorDetails = details ? `<br><small>${details}</small>` : '';
    slider.innerHTML = `
        <div class="error">
            Error: ${message}${errorDetails}
        </div>
    `;
}

// Fallback poems in case JSON fails to load
const fallbackPoems = [
    {
        title: "Fallback Poem",
        content: "This is a fallback poem\nDisplayed when JSON fails to load\nPlease check your file path\nAnd try again"
    }
];

// Initialize: Load poems from JSON file
async function initializeSlider() {
    showLoading();
    try {
        // Log the attempt
        console.log('Attempting to fetch poems from:', '/asset/poem/poems.json');
        
        const response = await fetch('/asset/poem/poems.json');
        console.log('Fetch response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Successfully loaded poems:', data.length, 'poems found');
        
        if (!Array.isArray(data)) {
            throw new Error('Loaded data is not an array');
        }
        
        poems = data;
        updateSlider();
        
    } catch (error) {
        console.error('Detailed error:', error);
        
        // Show specific error message based on error type
        if (error.name === 'SyntaxError') {
            showError('Invalid JSON format', 'The poems.json file contains invalid JSON. Please check the file format.');
        } else if (error.message.includes('HTTP error')) {
            showError('File not found', `Could not load poems.json. Please check if the file exists at ../poem/poems.json\nServer response: ${error.message}`);
        } else {
            showError('Failed to load poems', 'Please ensure you are running this through a local server (like Live Server in VS Code)');
        }
        
        // Use fallback poems if available
        console.log('Using fallback poems');
        poems = fallbackPoems;
        updateSlider();
    }
}

// Add event listener for when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing slider...');
    initializeSlider();
});