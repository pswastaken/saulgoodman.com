// --- INTRO SEQUENCE LOGIC ---

document.body.classList.add('intro-active');

function openTheDoor() {
    const door = document.getElementById('office-door');
    const doorFrame = document.querySelector('.door-frame');
    const introOverlay = document.getElementById('intro-overlay');
    const videoOverlay = document.getElementById('video-overlay');
    const video = document.getElementById('intro-video');

    door.classList.add('door-open');

    setTimeout(() => {
        doorFrame.classList.add('zoom-active');
    }, 500);

    setTimeout(() => {
        introOverlay.style.opacity = '0'; 
        introOverlay.style.transition = 'opacity 1s ease-out';
        
        videoOverlay.classList.remove('hidden'); 
        
        video.play().catch(e => console.log("Autoplay blocked:", e));

        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 1000);

        video.onended = function() {
            enterSite();
        };

    }, 2000); 
}

function enterSite() {
    const videoOverlay = document.getElementById('video-overlay');
    const video = document.getElementById('intro-video');
    
    video.pause();
    
    videoOverlay.style.opacity = '0';
    videoOverlay.style.transition = 'opacity 1s';
    
    setTimeout(() => {
        videoOverlay.style.display = 'none';
        
        document.body.classList.remove('intro-active');
    }, 1000);
}

// --- 1. GLOBAL FUNCTIONS (Must be outside to work) ---

function sueThemAll() {
    let userResponse = confirm("🚨 URGENT MESSAGE 🚨\n\nDID YOU KNOW YOU HAVE RIGHTS?\n\n(Click OK if you agree. Click Cancel if you want to go to jail.)");

    if (userResponse) {
        alert("GOOD! The Constitution says you do! And so do I!");
        document.body.style.backgroundColor = "#00FF00"; 
        setTimeout(() => {
             document.body.style.backgroundColor = "#000080"; 
        }, 500);
    } else {
        alert("WOAH THERE! Sounds like you're in big trouble.");
        document.body.style.backgroundColor = "#FF0000"; 
        document.body.style.animation = "shake 0.5s infinite"; 
        
        setTimeout(() => {
            document.body.style.backgroundColor = "#000080";
            document.body.style.animation = "none";
            alert("You better call Saul immediately.");
        }, 2000);
    }
}

function playThemeSong() {
    const audioPlayer = document.getElementById('saul-audio');
    if (audioPlayer.paused) {
        audioPlayer.play();
        document.body.style.cursor = "progress"; 
    } else {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; 
        document.body.style.cursor = "default";
    }
}

// --- 2. MAIN LOAD EVENTS (Slideshows & Buttons) ---

document.addEventListener('DOMContentLoaded', () => {
    
    const sueBtn = document.querySelector('.call-btn');
    if(sueBtn) sueBtn.addEventListener('click', sueThemAll);

    const themeBtn = document.getElementById('theme-song-btn');
    if(themeBtn) themeBtn.addEventListener('click', playThemeSong);

    const adImages = [
        'ad1.jpg', 
        'ad2.jpeg',
        'ad3.jpeg', 
        'ad4.jpg'   
    ];
    
    let currentAdIndex = 0;
    const adImgElement = document.getElementById('rotating-ad');

    if (adImgElement) {
        adImgElement.src = adImages[0];
        
        setInterval(() => {
            currentAdIndex = (currentAdIndex + 1) % adImages.length;
            adImgElement.src = adImages[currentAdIndex];
        }, 3000); 
    }

    const saulImages = ['bcs1.jpeg', 'bcs2.jpeg', 'bcs3.jpeg', 'bcs4.jpeg', 'bcs5.jpg'];
    let saulIndex = 0;
    const saulImgElement = document.getElementById('saul-main-img');

    if (saulImgElement) {
        setInterval(() => {
            saulImgElement.classList.add('fade-out');

            setTimeout(() => {
                saulIndex = (saulIndex + 1) % saulImages.length;
                saulImgElement.src = saulImages[saulIndex];
                saulImgElement.classList.remove('fade-out');
            }, 500);

        }, 2500);
    }
});

// --- 3. INTERACTIVE ADVICE BUTTONS ---

const freeAdviceList = [
    "What is this, a charity?!",
    "There is no such thing as free legal advice."
];

const wisdomList = [
    "Did you know that you have rights? The Constitution says you do. And so do I.",
    "Even drug dealers need lawyers, right? Especially drug dealers.",
    "If you wanna make more money and keep the money that you make: Better Call Saul!",
    "If you're committed enough, you can make any story work.",
    "Perfection is the enemy of the perfectly adequate.",
    "Well, you better call Saul!",
    "Never should have let my dojo membership run out. Better safe than sorry.",
    "I know a guy who knows a guy.",
    "Don't drink and drive, but if you do, call me."
];

function getFreeAdvice() {
    const display = document.getElementById('advice-text');
    const randomIndex = Math.floor(Math.random() * freeAdviceList.length);
    
    display.innerHTML = freeAdviceList[randomIndex];
    
    display.style.color = "red";
    setTimeout(() => { display.style.color = "#333"; }, 300);
}

function getWisdom() {
    const display = document.getElementById('advice-text');
    const randomIndex = Math.floor(Math.random() * wisdomList.length);
    
    display.innerHTML = `"${wisdomList[randomIndex]}"<br><span class="quote-credit">- Saul Goodman</span>`;
    
    display.style.color = "#333";
}

function openDescription() {
    const modal = document.getElementById('desc-modal');
    modal.classList.add('modal-visible');
}

function closeDescription() {
    const modal = document.getElementById('desc-modal');
    modal.classList.remove('modal-visible');
}