// ============================================
// UNTUK NINA - Interactive Script
// ============================================

// --- KONTROL MUSIK & WELCOME SCREEN ---
let musicPlaying = false;

function bukaSurat() {
    // 1. Putar Musik
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    
    bgMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicToggle.classList.add('playing');
    }).catch(error => {
        console.log("Autoplay dicegah oleh browser:", error);
    });

    // 2. Sembunyikan Welcome Screen
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.classList.add('hidden');

    // 3. Buka Kunci Scroll
    document.body.classList.remove('locked');
}

function toggleMusic() {
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
        musicToggle.classList.remove('playing');
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
        musicToggle.classList.add('playing');
    }
    musicPlaying = !musicPlaying;
}

// Floating Hearts Animation
function createFloatingHearts() {
    const container = document.getElementById('floating-hearts');
    if (!container) return;

    const heartCount = 18;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('i');
        heart.className = 'fa-solid fa-heart heart';
        
        // Random position
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        
        // Random size
        const size = Math.random() * 18 + 10;
        heart.style.fontSize = size + 'px';
        
        // Random animation duration & delay
        const duration = Math.random() * 25 + 18;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = '-' + (Math.random() * duration) + 's';
        
        // Random opacity
        heart.style.opacity = (Math.random() * 0.12 + 0.06).toFixed(2);
        
        container.appendChild(heart);
        
        // Remove and recreate after animation ends
        setTimeout(() => {
            if (heart.parentNode) heart.parentNode.removeChild(heart);
            createSingleHeart(container);
        }, duration * 1000);
    }
}

function createSingleHeart(container) {
    const heart = document.createElement('i');
    heart.className = 'fa-solid fa-heart heart';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '110vh';
    
    const size = Math.random() * 16 + 11;
    heart.style.fontSize = size + 'px';
    
    const duration = Math.random() * 22 + 20;
    heart.style.animationDuration = duration + 's';
    heart.style.opacity = (Math.random() * 0.1 + 0.05).toFixed(2);
    
    container.appendChild(heart);
    
    setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, duration * 1000);
}

// Chat Animation Data
const chatMessages = [
    { type: 'right', text: 'Sabrinaa, ini gw Aidil beneran mau di kawal? 😭' },
    { type: 'left', text: 'eh iyaa aidil .. wk wkwk hadeuh maluu' },
    { type: 'left', text: 'tapi yagapapa , emang u yang gapapa ka ?' },
    { type: 'right', text: 'gapapa kann bisa searah' },
    { type: 'left', text: 'wkwkw hadeuh maluu' }
];

let chatStarted = false;

function startChatAnimation() {
    if (chatStarted) return;
    chatStarted = true;

    const container = document.getElementById('chat-container');
    container.innerHTML = '';
    container.scrollTop = 0;

    let index = 0;

    function showNextMessage() {
        if (index >= chatMessages.length) {
            setTimeout(() => {
                showRealScreenshot(container);
            }, 900);
            return;
        }

        const msg = chatMessages[index];
        
        // Create typing indicator
        const typing = document.createElement('div');
        typing.className = `typing-indicator ${msg.type === 'left' ? '' : 'self-end'}`;
        typing.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;

        // Random typing time
        const typingTime = msg.type === 'left' ? 
            Math.random() * 900 + 1250 : 
            Math.random() * 700 + 950;

        setTimeout(() => {
            typing.remove();

            // Create message bubble
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble chat-bubble-${msg.type}`;
            bubble.innerHTML = `<div>${msg.text}</div>`;
            
            container.appendChild(bubble);
            container.scrollTop = container.scrollHeight;

            // Add slight bounce effect
            setTimeout(() => {
                bubble.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    bubble.style.transform = 'scale(1)';
                }, 180);
            }, 80);

            index++;
            
            // Next message with natural delay
            const nextDelay = msg.type === 'left' ? 
                Math.random() * 650 + 1050 : 
                Math.random() * 480 + 820;
                
            setTimeout(showNextMessage, nextDelay);
        }, typingTime);
    }

    showNextMessage();
}

function showRealScreenshot(container) {
    const div = document.createElement('div');
    div.style.cssText = 'margin-top: 20px; padding: 16px; background: white; border-radius: 18px; border: 1px solid #FF9EB5;';
    div.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px; padding:0 4px;">
            <i class="fa-solid fa-image" style="color:#FF9EB5;"></i>
            <span style="font-size:0.8rem; font-weight:500; color:#E91E63;">Screenshot asli obrolan pertama kita</span>
        </div>
        <img src="first_chat.jpeg" 
             style="width:50%; border-radius:14px; border: 4px solid #FFF0F5; align:center;" 
             alt="Screenshot chat">
        <p style="text-align:center; font-size:0.75rem; color:#E91E63; opacity:0.6; margin-top:12px;">
            13 Mei 2026 • 7:31 PM
        </p>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

// Scroll Animation for sections
function initScrollAnimations() {
    const sections = document.querySelectorAll('.section:not(.memories)');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0.85';
        section.style.transform = 'translateY(25px)';
        section.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });
}

// Memunculkan pesan baris demi baris
function initMessageReveal() {
    const messageLines = document.querySelectorAll('.message-content p');
    const messageCard = document.querySelector('.message-card');
    
    if (!messageCard || messageLines.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            messageLines.forEach((line, index) => {
                setTimeout(() => {
                    line.classList.add('show-line');
                }, index * 600);
            });
            observer.disconnect();
        }
    }, { 
        threshold: 0.4 
    });

    observer.observe(messageCard);
}

// Animasi kartu kenangan meluncur dari samping
function initCardScrollAnimations() {
    const cards = document.querySelectorAll('.memory-card');
    
    if (cards.length === 0) return;

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-card');
                cardObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.25, 
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Initialize everything
function init() {
    createFloatingHearts();
    initScrollAnimations();
    initMessageReveal(); 
    initCardScrollAnimations();
}

window.onload = init;