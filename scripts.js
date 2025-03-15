let beatSpeed = 1.5; // Başlangıçta yavaş atış
let clickCount = 0;
const heart = document.querySelector(".heart");
const audio = document.getElementById("heartbeatSound");
const body = document.body;

const images = [];
for (let i = 1; i <= 796; i++) {
    images.push(`img${i}.jpg`);
}

let imageSize = 80; // Sabit resim boyutu
let imagesLoaded = false;

// Site açıldığında kalbin ışıldaması başlasın
heart.style.filter = "drop-shadow(0 0 20px rgba(255, 0, 0, 0.7))"; // Başlangıçta kırmızı ışıldama

body.addEventListener("click", () => {
    clickCount++;

    // Kalbin hızını artır
    beatSpeed = Math.max(0.2, beatSpeed - 0.15); // Minimum 0.2s olana kadar hızlanır
    heart.style.animationDuration = `${beatSpeed}s`;

    // Kalbin ışıltılı kırmızı etkisi, her tıklamada artacak
    const glowIntensity = 20 + (clickCount * 5); // Başlangıçta 20px, her tıklama ile 5px artar
    heart.style.filter = `drop-shadow(0 0 ${glowIntensity}px rgba(255, 0, 0, 0.7))`; // Kalbe kırmızı ışıltı eklenir

    if (audio.paused) {
        audio.play();
    }

    // Arka planı beyaz yapmak için her tıklamada yavaşça beyaza dönme
    if (clickCount <= 10) { // 10 tıklamaya kadar beyazlık artacak
        const whiteAmount = (clickCount / 10); // Beyazlık 0'dan %100'e kadar artacak
        body.style.transition = "background-color 3s ease-in-out"; // Geçiş animasyonu ekliyoruz
        body.style.backgroundColor = `rgba(255, 255, 255, ${whiteAmount})`; // Arka plan beyaza döner
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
        }, index * 200); // Hızlı ekleme
    });

    // Fotoğraflar eklenmeye başladığında arka plan tamamen beyaza döner
    body.style.transition = "background-color 3s ease-in-out";
    body.style.backgroundColor = "#ffffff"; // Arka plan tamamen beyaza döner

    // Resimler yüklenmeye başladığında kalp ışıltılı olmaya devam etsin
    heart.style.transition = "filter 5s ease-in-out"; // 1 saniyelik geçiş
    heart.style.filter = "drop-shadow(0 0 200px rgba(255, 0, 0, 0.7))"; // Kalp ışıldamaya devam etsin
}
