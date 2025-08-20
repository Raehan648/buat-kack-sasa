document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const currentMessageSpan = document.getElementById('currentMessage');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const dimulaiButton = document.getElementById('dimulaiButton');
    const canvasContainer = document.getElementById('canvas-container');
    const loveCanvas = document.getElementById('loveCanvas');
    const ctx = loveCanvas.getContext('2d');
    
    // Membuat elemen untuk teks "I love you sayang" di atas canvas
    const canvasTextElement = document.createElement('div');
    canvasTextElement.id = 'canvas-text';
    canvasTextElement.textContent = 'I love you sayang ❤️';
    canvasTextElement.style.position = 'absolute';
    canvasTextElement.style.display = 'none';
    body.appendChild(canvasTextElement);

    let messageIndex = 0;
    const messages = [
        "Tap dimana aja yaaa",
        "hallo ilaa ❤️",
        "aku mau ngomong sesuatu nih",
        "coba pencet",
        "pencet lagi",
        "ayo semangat mencetnya",
        "janji ini terakhir",
        "serius",
        "ini",
        "terakhir",
        "tapi bohong hehe yahaha hayyuk",
        "aku tau pasti kamu kesal",
        "hmm",
        "yaudah deh",
        "padahal",
        "aku cuma mau bilang",
        "kepasar beli terasi pulangnya makan kadal",
        "i love you ❤️",
        "bjiiiirrrlah",
        "mau gak balikan lagi sama aku?",
        "kalo nggak mau kamu gausah tap lagi^^",
        "kalo mau coba tap lagi",
        // Pesan terakhir sebelum tombol muncul
        "coba pencet tombol dibawah ini 👇"
    ];
    const totalMessages = messages.length;

    let isMusicStarted = false;

    backgroundMusic.volume = 0.4;

    function createFallingHeart(x, y) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const size = Math.random() * 20 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.transform = `translate(-50%, -50%) rotate(-45deg)`;
        heart.style.animationDuration = `${Math.random() * 1 + 1.5}s`;
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    function createBackgroundHeart() {
        const heart = document.createElement('div');
        heart.classList.add('background-heart');
        const size = Math.random() * 50 + 20;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 10 + 15}s`;
        heart.style.animationDelay = `-${Math.random() * 15}s`;
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    function createBackgroundEmoji() {
        const emojis = ['😊', '🌸', '✨', '💖', '🎉', '❤️'];
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.classList.add('background-emoji');
        const size = Math.random() * 30 + 15;
        emoji.style.fontSize = `${size}px`;
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${Math.random() * 10 + 15}s`;
        emoji.style.animationDelay = `-${Math.random() * 15}s`;
        body.appendChild(emoji);

        emoji.addEventListener('animationend', () => {
            emoji.remove();
        });
    }

    // Fungsi untuk membuat partikel bintang yang berkelip
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = `${Math.random() * 100}vw`;
        sparkle.style.top = `${Math.random() * 100}vh`;
        sparkle.style.animationDuration = `${Math.random() * 2 + 1}s`;
        document.body.appendChild(sparkle);

        sparkle.addEventListener('animationend', () => {
            sparkle.remove();
        });
    }

    // Fungsi untuk membuat gelembung air yang naik
    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        const size = Math.random() * 20 + 5;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = `-50px`;
        bubble.style.animationDuration = `${Math.random() * 10 + 15}s`;
        bubble.style.animationDelay = `-${Math.random() * 15}s`;
        document.body.appendChild(bubble);

        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }

    // Menggabungkan semua efek background agar tidak monoton
    setInterval(() => {
        if (Math.random() > 0.5) {
            createBackgroundHeart();
        } else {
            createBackgroundEmoji();
        }
    }, 1000);

    setInterval(createSparkle, 500);

    setInterval(createBubble, 2000);

    function updateMessage() {
        if (messageIndex < totalMessages) {
            currentMessageSpan.textContent = messages[messageIndex];
            messageIndex++;
        } else {
            currentMessageSpan.style.opacity = '0';
            setTimeout(() => {
                currentMessageSpan.style.display = 'none';
                dimulaiButton.style.display = 'block';
                dimulaiButton.style.transform = 'translateY(20px) scale(0.8)';
                setTimeout(() => {
                    dimulaiButton.style.transform = 'translateX(-50%) scale(1)';
                    dimulaiButton.style.opacity = '1';
                }, 50);
            }, 500);
        }
    }

    body.addEventListener('click', (e) => {
        if (!isMusicStarted) {
            backgroundMusic.play().then(() => {
                isMusicStarted = true;
                console.log("Music started playing.");
            }).catch(error => {
                console.error("Failed to play music:", error);
            });
        }
        createFallingHeart(e.clientX, e.clientY);

        if (messageIndex <= totalMessages) {
            updateMessage();
        }
    });

    dimulaiButton.addEventListener('click', () => {
        dimulaiButton.style.display = 'none';
        currentMessageSpan.style.display = 'none';
        backgroundMusic.volume = 0.1;

        canvasContainer.style.display = 'flex';
        canvasTextElement.style.display = 'block';

        loveCanvas.width = window.innerWidth;
        loveCanvas.height = window.innerHeight;
        positionCanvasText();

        drawHeartAnimation();

        setTimeout(() => {
            canvasTextElement.style.opacity = '1';
        }, 500);
    });

    function positionCanvasText() {
        const centerX = loveCanvas.width / 2;
        const centerY = loveCanvas.height / 2;
        const baseSize = Math.min(loveCanvas.width, loveCanvas.height) * 0.3;
        canvasTextElement.style.left = `${centerX}px`;
        canvasTextElement.style.top = `${centerY + baseSize * 0.8}px`;
        canvasTextElement.style.transform = 'translate(-50%, -50%)';
    }

    window.addEventListener('resize', () => {
        if (canvasContainer.style.display === 'flex') {
            loveCanvas.width = window.innerWidth;
            loveCanvas.height = window.innerHeight;
            positionCanvasText();
            drawHeartAnimation();
        }
    });

    let animationFrameId;

    function drawHeartAnimation() {
        ctx.clearRect(0, 0, loveCanvas.width, loveCanvas.height);

        const centerX = loveCanvas.width / 2;
        const centerY = loveCanvas.height / 2;
        const baseSize = Math.min(loveCanvas.width, loveCanvas.height) * 0.3;

        const numLayers = 5;
        const maxOffset = baseSize * 0.05;

        let particleOffset = 0;
        const particleSpeed = 0.05;

        function animateHeart(timestamp) {
            ctx.clearRect(0, 0, loveCanvas.width, loveCanvas.height);

            particleOffset += particleSpeed;
            if (particleOffset > Math.PI * 2) {
                particleOffset -= Math.PI * 2;
            }

            for (let layer = 0; layer < numLayers; layer++) {
                const currentSize = baseSize * (1 - layer / (numLayers * 1.5));
                ctx.beginPath();

                for (let angle = 0; angle <= Math.PI * 2; angle += 0.01) {
                    const x = 16 * Math.pow(Math.sin(angle), 3);
                    const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);

                    const currentX = centerX + (currentSize * x) / 20;
                    const currentY = centerY - (currentSize * y) / 20;

                    if (angle === 0) {
                        ctx.moveTo(currentX, currentY);
                    } else {
                        ctx.lineTo(currentX, currentY);
                    }
                }
                ctx.closePath();
                ctx.strokeStyle = 'cyan';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
                    const x = 16 * Math.pow(Math.sin(angle), 3);
                    const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle);

                    const particlePosX = centerX + (currentSize * x) / 20 + Math.cos(angle + particleOffset * layer) * maxOffset;
                    const particlePosY = centerY - (currentSize * y) / 20 + Math.sin(angle + particleOffset * layer) * maxOffset;

                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(particlePosX, particlePosY, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            animationFrameId = requestAnimationFrame(animateHeart);
        }

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationFrameId = requestAnimationFrame(animateHeart);
    }
});