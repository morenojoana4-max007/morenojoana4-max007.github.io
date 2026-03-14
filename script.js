function createModal() {
    const modal = document.createElement('div');
    modal.id = 'videoModal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); backdrop-filter: blur(10px);
        display: none; justify-content: center; align-items: center; z-index: 2000;
    `;
    modal.innerHTML = `
        <div style="position: relative; width: 80%; max-width: 800px;">
            <span id="closeModal" style="position: absolute; top: -40px; right: 0; color: white; cursor: pointer; font-size: 2rem;">&times; Close</span>
            <iframe id="videoFrame" width="100%" height="450" src="" frameborder="0" allowfullscreen style="border-radius: 20px; box-shadow: 0 0 50px rgba(0,0,0,0.5);"></iframe>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

const modal = createModal();
const videoFrame = document.getElementById('videoFrame');

// Add click events to your YouTube cards
document.querySelectorAll('.video-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
        const title = card.querySelector('strong').innerText;
        videoFrame.src = videoLibrary[title] || '';
        modal.style.display = 'flex';
    });
});

// Close modal logic
document.getElementById('closeModal').addEventListener('click', () => {
    modal.style.display = 'none';
    videoFrame.src = ''; // Stops the video from playing in background
});


/* --- INTERACTIVE SCROLL REVEAL --- */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

// Apply a soft fade-in to all sections to match the "dreamy" vibe
document.querySelectorAll('section, .card, .mentor-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 1s cubic-bezier(0.22, 1, 0.36, 1)";
    observer.observe(el);
});


/* --- SMOOTH NAVIGATION --- */

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

console.log("JoJo's Resource Page: Interaction Script Loaded.");