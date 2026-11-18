const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const mainTitle = document.getElementById("mainTitle");
const successMessage = document.getElementById("successMessage");
const buttonContainer = document.getElementById("buttonContainer");
const revealContainer = document.getElementById("revealContainer");
const bgSong = document.getElementById("bgSong");

function moveButton() {
    noBtn.style.position = "fixed";

    const padding = 30;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// Dodge on hover (desktop) or touch (mobile)
noBtn.addEventListener("mouseenter", moveButton);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveButton();
});

// Action when Yes is clicked
// Action when Yes is clicked
yesBtn.addEventListener("click", () => {
    // 1. Hide buttons and title immediately
    buttonContainer.style.display = "none";
    mainTitle.style.display = "none";

    // 2. Show the final picture container and start the song instantly!
    revealContainer.style.display = "flex";
    
    bgSong.play().catch(error => {
        console.log("Audio playback failed:", error);
    });

    // 3. Trigger confetti burst right away
    const duration = 3 * 6000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1500 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        }));
    }, 250);
});
