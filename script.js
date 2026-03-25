// ═══ LEVEL GRID GENERATION ═══
// Generates a sample volcanic level layout
const TILE_TYPES = {
    R: 'tile-rock',
    H: 'tile-hard',
    L: 'tile-lava',
    O: 'tile-ore',
    W: 'tile-water',
    C: 'tile-chest',
    E: 'tile-empty',
    P: 'tile-player',
};

// 16x12 Level layout
const levelMap = [
    'RRRRHRRRRRRRRRRR',
    'RROORRRRHORRRRRR',
    'RREERRRLRRRRRORR',
    'RREPERRLRRRRRRRR',
    'RREERRRLLLRRHORR',
    'RRORRRRRRLRRRERR',
    'RRRRRHOORRRRRERR',
    'RRRRHCHRRRRRRRRR',
    'RRRRRRRRLLLLRRRR',
    'RRORRRRRRRRLRORR',
    'RRRRRRWRRRRLRRRR',
    'RRRRRRRRRRRRRRRR',
];

function buildLevelGrid() {
    const grid = document.getElementById('levelGrid');
    if (!grid) return;

    levelMap.forEach(row => {
        [...row].forEach(char => {
            const tile = document.createElement('div');
            tile.className = `tile ${TILE_TYPES[char] || 'tile-rock'}`;
            grid.appendChild(tile);
        });
    });
}

// ═══ SCROLL ANIMATIONS ═══
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Add fade-in to key elements
    const targets = document.querySelectorAll(
        '.pitch-card, .loop-step, .stat-card, .equip-cat, .iter-card, .timeline-item, .skills-bar, .contact-card, .table-wrapper, .level-grid-container, .level-legend'
    );

    targets.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ═══ NAV ACTIVE STATE ═══
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = 'var(--accent)';
            }
        });
    });
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
    buildLevelGrid();
    initScrollAnimations();
    initNavHighlight();
});
