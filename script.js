const intro = document.getElementById('intro');
const loading = document.getElementById('loading');
const mainContent = document.getElementById('main-content');
const progress = document.getElementById('progress');
const percentEl = document.getElementById('percent');
const introText = document.getElementById('intro-text');
const cursor = document.querySelector('.cursor');
const sliderContainer = document.getElementById('slider');
const dotsContainer = document.querySelector('.slider-dots');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const clickSound = document.getElementById('clickSound');
const visitorCountSpan = document.getElementById('count');

// ========== SOUND ON CLICK (Original preserved) ==========
function playClickSound() {
    if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.warn("Audio play failed:", e));
    }
}

// Add click listener to all links and buttons (except some)
document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button');
    if (target && target.id !== 'chatbot-btn' && target.id !== 'close-chat') {
        playClickSound();
    }
});

// ========== CLOCK UPDATE (Original preserved) ==========
function updateClock() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('clock').textContent = now.toLocaleDateString('ar-EG', options);
}
setInterval(updateClock, 1000);
updateClock();

// ========== STARS BACKGROUND (Original preserved) ==========
function createStars(count = 80) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 5 + 5) + 's';
        star.style.animationDelay = Math.random() * 5 + 's';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        document.body.appendChild(star);
    }
}
createStars();

// ========== FIREBASE VISITOR COUNTER (Original preserved) ==========
// Replace with your own Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const counterRef = db.collection('siteData').doc('visitorCount');

async function updateVisitorCount() {
    try {
        const doc = await counterRef.get();
        if (doc.exists) {
            const currentCount = doc.data().count || 0;
            visitorCountSpan.textContent = currentCount + 1;
            await counterRef.update({ count: firebase.firestore.FieldValue.increment(1) });
        } else {
            visitorCountSpan.textContent = 1;
            await counterRef.set({ count: 1 });
        }
    } catch (error) {
        console.error("Visitor count error:", error);
        visitorCountSpan.textContent = "N/A";
    }
}
updateVisitorCount();

// ========== INTRO TYPEWRITER ==========
const fullText = "نورت يا غالي ❤️ ياريت الخدمات تعجبك";
let i = 0;
let typingInterval;

function startTypewriter() {
    typingInterval = setInterval(() => {
        if (i < fullText.length) {
            introText.textContent += fullText.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            cursor.style.display = 'none'; // hide cursor after done
            // Wait 3 seconds then go to loading
            setTimeout(() => {
                intro.style.opacity = '0';
                setTimeout(() => {
                    intro.style.display = 'none';
                    startLoading();
                }, 1000);
            }, 3000);
        }
    }, 80);
}
startTypewriter();

// ========== LOADING SCREEN ==========
function startLoading() {
    loading.style.display = 'flex';
    let width = 0;
    const loadingInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(loadingInterval);
            // Loading complete -> fade out
            setTimeout(() => {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                    mainContent.style.display = 'block';
                    initSlider(); // initialize slider
                    initScrollAnimations(); // scroll reveal
                    initChatbot(); // chatbot
                }, 800);
            }, 300);
        } else {
            width += Math.floor(Math.random() * 5) + 1;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
            percentEl.textContent = width + '%';
        }
    }, 50);
}

// ========== HERO SLIDER ==========
let currentSlide = 0;
let slideInterval;

function initSlider() {
    // Create dots dynamically
    slides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });

    // Auto play
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 4000);

    // Touch support
    let touchStartX = 0;
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    sliderContainer.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextBtn.click();
            else prevBtn.click();
        }
    });
}

function updateSlide() {
    slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
    });
    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlide();
    // Reset auto play timer
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }, 4000);
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service, .contact, .hero-slider, #visitor-count, #clock, footer');
    animatedElements.forEach(el => el.classList.add('animate-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
}

// ========== AI CHATBOT ==========
const botResponses = {
    "services": "نقدم خدمات متابعة وزيادة متابعين لـ Telegram, Facebook, WhatsApp, YouTube, Instagram, TikTok بالإضافة إلى برمجة مواقع ويب مخصصة.",
    "contact": "يمكنك التواصل عبر زر الواتساب في الأسفل أو عبر نموذج الاتصال.",
    "help": "أنا هنا لمساعدتك! يمكنك السؤال عن أي خدمة أو طريقة التواصل.",
    "default": "عذراً، لم أفهم سؤالك. يمكنك أن تسأل عن الخدمات أو التواصل."
};

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserMessage(userInput) {
    const cleaned = userInput.trim().toLowerCase();
    let reply;

    if (cleaned.includes('خدمة') || cleaned.includes('خدمات')) {
        reply = botResponses.services;
    } else if (cleaned.includes('تواصل') || cleaned.includes('اتصال') || cleaned.includes('رقم')) {
        reply = botResponses.contact;
    } else if (cleaned.includes('ساعد') || cleaned.includes('مساعدة')) {
        reply = botResponses.help;
    } else {
        reply = botResponses.default;
    }

    setTimeout(() => {
        addMessage(reply, 'bot');
    }, 500);
}

function initChatbot() {
    // Toggle window
    chatbotBtn.addEventListener('click', () => {
        const display = chatbotWindow.style.display === 'flex' ? 'none' : 'flex';
        chatbotWindow.style.display = display;
        if (display === 'flex') {
            // Add greeting if empty
            if (chatMessages.children.length === 0) {
                addMessage('مرحباً! كيف أقدر أساعدك؟', 'bot');
            }
        }
    });

    closeChat.addEventListener('click', () => {
        chatbotWindow.style.display = 'none';
    });

    sendBtn.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            handleUserMessage(text);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
}

// ========== 3D TILT EFFECT (for service cards) ==========
document.querySelectorAll('.service').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        card.style.transform = `scale(1.08) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) perspective(1000px) rotateX(0) rotateY(0)';
    });
});
