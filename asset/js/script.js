// Poems data
const POEMS = [
    {
        title: "The Wanderer's Lament",
        content: "In shadows deep, I walk alone,\nA silent figure, cast in stone.\nMy heart a forge, my soul a flame,\nCrafting dreams, yet bearing shame.\nI've wandered realms, both near and far,\nSeeking truths, beneath each star.\nYet in my hands, no treasure gleams,\nOnly echoes, of shattered dreams.\nA thousand whispers, haunt my mind,\nOf paths untaken, left behind.\nIn solitude, I find my peace,\nYet yearn for wars, that never cease.\nSo here I stand, in twilight's glow,\nA wanderer, with naught to show.\nBut in my heart, a fire burns,\nFor in my soul, adventure yearns."
    },
    {
        title: "The Programmer's Saga",
        content: "In the heart of the code, I am the creator,\nCrafting worlds from lines, a digital equator.\nWith keystrokes as my sword, and pixels my shield,\nIn the realm of bytes, my fate is sealed.\nThrough the binary mist, I navigate,\nForging paths unknown, defying fate.\nIn the crucible of code, I've honed my craft,\nTo build, to shape, my passion's draft.\nI am the architect of virtual expanse,\nA weaver of dreams, in a digital dance.\nThrough endless nights, my mind does soar,\nCreating, innovating, always wanting more.\nThough unseen, my creations are real,\nA reflection of the thoughts I feel.\nIn this realm of bytes, I am king,\nA master of worlds, where I can sing.\nSo, as I code, my spirit unfurled,\nI am the programmer, shaping this world."
    },
    {
        title: "The Creator's Path",
        content: "In the depths of my mind, a world unfolds,\nWhere thoughts and dreams like rivers flow,\nI am the architect, the weaver of tales untold,\nIn my soul's forge, stories glow.\nI wield the pen, my sword of words,\nCrafting worlds from the fabric of thought,\nThrough trials and pain, my spirit girds,\nFor the battles fought and battles sought.\nIn the crucible of creation, I forge my art,\nA thousand blades of thought and feeling,\nUnknown to the world, but not to my heart,\nIn words, my truth and dreams are reeling.\nI have withstood the pain of a thousand nights,\nTo bring forth stories, to bring forth light,\nYet, these hands may never grasp the heights,\nBut through my words, I take flight.\nSo, as I write, my soul takes flight,\nUnlimited stories, unlimited worlds,\nIn the realm of imagination, I find my might,\nIn the tapestry of words, my flag unfurled."
    }
];

let poems = [];
let currentIndex = 0;
let currentFontSize = 1; // Base font size multiplier

// DOM Elements
const slider = document.getElementById('poemSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');
const themeToggle = document.querySelector('.theme-toggle');
const randomBtn = document.getElementById('randomBtn');
const shareBtn = document.getElementById('shareBtn');
const fontSizeBtn = document.getElementById('fontSizeBtn');

// Font size controls
const MIN_FONT_SIZE = 0.8;
const MAX_FONT_SIZE = 1.4;
const FONT_SIZE_STEP = 0.2;

function cycleFontSize() {
    currentFontSize += FONT_SIZE_STEP;
    if (currentFontSize > MAX_FONT_SIZE) {
        currentFontSize = MIN_FONT_SIZE;
    }
    
    const poemContent = document.querySelector('.poem-content');
    if (poemContent) {
        poemContent.style.fontSize = `${currentFontSize}em`;
    }
}

// Random poem selection
function showRandomPoem() {
    const newIndex = Math.floor(Math.random() * poems.length);
    // Ensure we don't get the same poem twice
    currentIndex = newIndex === currentIndex && poems.length > 1 
        ? (newIndex + 1) % poems.length 
        : newIndex;
    updateSlider();
}

// Share functionality
async function sharePoem() {
    const currentPoem = poems[currentIndex];
    const shareText = `${currentPoem.title}\n\n${currentPoem.content}`;
    
    try {
        if (navigator.share) {
            await navigator.share({
                title: currentPoem.title,
                text: shareText
            });
        } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(shareText);
            alert('Poem copied to clipboard!');
        }
    } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to clipboard if sharing fails
        try {
            await navigator.clipboard.writeText(shareText);
            alert('Poem copied to clipboard!');
        } catch (clipboardError) {
            console.error('Error copying to clipboard:', clipboardError);
            alert('Unable to share or copy the poem.');
        }
    }
}

// Theme handling
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'dark' 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
}

// Create poem element HTML
function createPoemElement(poem) {
    return `
        <div class="poem-container">
            <h2 class="poem-title">${poem.title}</h2>
            <div class="poem-content" style="font-size: ${currentFontSize}em">${poem.content}</div>
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

// Add control button event listeners
randomBtn.addEventListener('click', showRandomPoem);
shareBtn.addEventListener('click', sharePoem);
fontSizeBtn.addEventListener('click', cycleFontSize);
themeToggle.addEventListener('click', toggleTheme);

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

// Initialize slider with embedded poems
function initializeSlider() {
    showLoading();
    try {
        poems = POEMS;
        updateSlider();
    } catch (error) {
        console.error('Error initializing poems:', error);
        showError('Failed to initialize poems', 'An unexpected error occurred.');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeSlider();
});