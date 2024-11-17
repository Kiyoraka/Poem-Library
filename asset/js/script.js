const poems = [
    {
        title: "The Road Not Taken",
        content: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;"
    },
    {
        title: "Hope is the Thing with Feathers",
        content: "Hope is the thing with feathers\nThat perches in the soul,\nAnd sings the tune without the words,\nAnd never stops at all,"
    },
    {
        title: "Dreams",
        content: "Hold fast to dreams\nFor if dreams die\nLife is a broken-winged bird\nThat cannot fly.\n\nHold fast to dreams\nFor when dreams go\nLife is a barren field\nFrozen with snow."
    }
];

let currentIndex = 0;
const slider = document.getElementById('poemSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageSpan = document.getElementById('currentPage');
const totalPagesSpan = document.getElementById('totalPages');

function createPoemElement(poem) {
    return `
        <div class="poem-container">
            <h2 class="poem-title">${poem.title}</h2>
            <div class="poem-content">${poem.content}</div>
        </div>
    `;
}

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

// Initialize the slider
updateSlider();