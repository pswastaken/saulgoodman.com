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

        // NEW: Turn on the chat widget logic ONLY after entering the site
        const chatWidget = document.getElementById('saul-chat-widget');
        if (chatWidget) {
            // Un-hide it from the DOM (it is still slid down because of 'chat-hidden')
            chatWidget.style.display = 'block';
            
            // Start the 6-second timer to aggressively pop it up
            setTimeout(() => {
                if (chatWidget.classList.contains('chat-hidden')) {
                    chatWidget.classList.remove('chat-hidden');
                }
            }, 6000);
        }
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
// --- 4. LIVE CHAT SHAKEDOWN ---

const saulResponses = [
    "Sounds expensive. I'm gonna need a $4,000 retainer.",
    "Are you wearing a wire? Type NO to confirm.",
    "I accept cash, money orders, and bearer bonds.",
    "Don't put that in writing! Just bring cash to the nail salon.",
    "Look, I'm a lawyer, not a miracle worker. But for $10k, maybe I am.",
    "Did the cops read you your rights? If not, WE GOT 'EM!",
    "I know a guy who knows a guy who can fix this. Bring unmarked bills.",
    "Whatever you did, self-defense is a perfectly viable strategy.",
    "I'm billing you $350 an hour for this chat, by the way."
];

function toggleChat() {
    const chatWidget = document.getElementById('saul-chat-widget');
    chatWidget.classList.toggle('chat-hidden');
}

function closeChat(event) {
    event.stopPropagation(); 
    
    const chatWidget = document.getElementById('saul-chat-widget');
    chatWidget.style.display = 'none'; 
}

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim();
    const chatBox = document.getElementById('chat-messages');

    if (message !== "") {
        chatBox.innerHTML += `<div class="msg user-msg">You: ${message}</div>`;
        inputField.value = "";
        
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            const randomResponse = saulResponses[Math.floor(Math.random() * saulResponses.length)];
            chatBox.innerHTML += `<div class="msg saul-msg">Saul: ${randomResponse}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1200 + Math.random() * 1000); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    
    if(chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
});
// --- 5. BURNER PHONE EASTER EGG ---

let dialedNumber = "";

function openBurnerPhone() {
    document.getElementById('burner-modal').classList.add('modal-visible');
    dialedNumber = "";
    updateDisplay();
}

function closeBurner() {
    document.getElementById('burner-modal').classList.remove('modal-visible');
    
    const hackerAudio = document.getElementById('hacker-audio');
    if (hackerAudio) {
        hackerAudio.pause();
        hackerAudio.currentTime = 0;
    }

    dialedNumber = "";
    const display = document.getElementById('phone-display');
    if (display) {
        display.innerText = "_";
        display.style.backgroundColor = "#9ea771"; 
        display.style.animation = "none";
    }
}

function pressKey(key) {
    if (dialedNumber.length < 10) {
        dialedNumber += key;
        updateDisplay();
    }
}

function updateDisplay() {
    const display = document.getElementById('phone-display');
    if (display) {
        display.innerText = dialedNumber || "_";
    }
}

function checkNumber() {
    const display = document.getElementById('phone-display');
    
    if (!display) return;

    if (dialedNumber === "5058425662") {
        display.innerText = "CONNECTED";
        display.style.backgroundColor = "#00FF00"; 
        display.style.animation = "flash-border 0.5s infinite";

        const themePlayer = document.getElementById('saul-audio');
        if (themePlayer && !themePlayer.paused) {
            themePlayer.pause();
        }

        const hackerAudio = document.getElementById('hacker-audio');
        if (hackerAudio) {
            hackerAudio.currentTime = 0;
            hackerAudio.play().catch(e => console.log("Audio blocked:", e)); 
            
            hackerAudio.onended = function() {
                closeBurner();
            };
        }

    } else {
        display.innerText = "ERROR";
        display.style.backgroundColor = "#FF0000"; 
        display.style.animation = "none";
        
        setTimeout(() => {
            dialedNumber = "";
            updateDisplay();
            display.style.backgroundColor = "#9ea771";
        }, 1000);
    }
}
// --- 6. CUSTOM GAVEL CURSOR LOGIC ---
document.addEventListener('mousedown', () => {
    document.body.classList.add('gavel-down');
});

document.addEventListener('mouseup', () => {
    document.body.classList.remove('gavel-down');
});

// --- 7. THE ENDLESS T&C TRAP ---
const termsAndConditions = [
    "By clicking OK, you agree to our Terms and Conditions.",
    "You agree to surrender your firstborn child to Saul Goodman & Associates.",
    "You also admit on the record that you actually DID steal that garden gnome.",
    "You consent to Saul Goodman automatically charging $5,000 to the credit card you are currently thinking about.",
    "Wait, did you even read clause 4? Too late. You already agreed.",
    "If you click Cancel on the next box, you will be sued for breach of contract.",
    "Do you solemnly swear you are up to no good?",
    "Okay, fine. Just kidding. But seriously, the retainer is $5,000. Non-refundable."
];

function startTermsTrap(event) {
    event.preventDefault();
    
    let userAgreed = true;

    for (let i = 0; i < termsAndConditions.length; i++) {
        let response = confirm(`🚨 LEGAL AGREEMENT (Page ${i + 1} of ${termsAndConditions.length}) 🚨\n\n${termsAndConditions[i]}`);
        
        if (!response) {
            alert("OBJECTION! You cannot decline the terms. Starting over...");
            userAgreed = false;
            break; 
        }
    }

    if (userAgreed) {
        alert("Excellent. A copy of this legally binding confession has been sent to the Albuquerque Police Department. Have a nice day!");
    } else {
        setTimeout(() => {
            startTermsTrap(event);
        }, 500);
    }
}
