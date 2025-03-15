let beatSpeed = 1.5; // Başlangıçta yavaş atış
let clickCount = 0;
const heart = document.querySelector(".heart");
const audio = document.getElementById("heartbeatSound");
const body = document.body;

const images = [];
for (let i = 1; i <= 796; i++) {
    images.push(`img${i}.jpg`);
}

let imageSize = 120; // Sabit resim boyutu
let imagesLoaded = false;

body.addEventListener("click", () => {
    clickCount++;

    // Kalbin hızını artır
    beatSpeed = Math.max(0.2, beatSpeed - 0.15); // Minimum 0.2s olana kadar hızlanır
    heart.style.animationDuration = `${beatSpeed}s`;

    if (audio.paused) {
        audio.play();
    }

    // 10 tıklamadan sonra resimler yüklenmeye başlasın
    if (clickCount >= 10 && !imagesLoaded) {
        imagesLoaded = true;
        heart.style.opacity = "0.3"; // Kalbi arkaya al (soluk hale getir)
        heart.style.pointerEvents = "none"; // Kalbin tıklanamaz olmasını sağla
        addImages();
    }
});

function addImages() {
    const screenWidth = window.innerWidth;
    const imagesPerRow = Math.floor(screenWidth / imageSize);

    images.forEach((imgSrc, index) => {
        setTimeout(() => {
            let img = document.createElement("img");
            img.src = `images/${imgSrc}`;
            img.style.width = `${imageSize}px`;
            img.style.height = `${imageSize}px`;
            img.style.margin = "5px";

            body.appendChild(img);
        }, index * 50); // Hızlı ekleme
    });
}
