/*
=================================================================
 LÃ“GICA: NEON PULSE
=================================================================
*/

document.addEventListener("DOMContentLoaded", function() {
    AOS.init({ duration: 1000, once: true });
    
    if (typeof config !== 'undefined') {
        loadContent(config);
        setupCountdown(config.fechaDelEvento);
        setupMusic(config);
        initCanvas(); // Iniciar fondo animado
    }
});

function loadContent(data) {
    // 1. Hero
    setText('hero-subtitle', data.info.tituloEvento);
    setText('hero-name', data.info.nombre);
    const title = document.getElementById('hero-name');
    if(title) title.setAttribute('data-text', data.info.nombre); 
    setText('hero-age', data.info.edad);

    // 2. Frase
    setHTML('quote-text', data.info.frase);

    // 3. UbicaciÃ³n
    setText('place-name', data.lugar.nombre);
    setText('place-address', data.lugar.direccion);
    setAttr('btn-map', 'href', data.lugar.linkMapa);
    setAttr('img-lugar', 'src', data.fotos.lugar);

    // 4. Lineup
    const list = document.getElementById('lineup-list');
    if(list && data.lineup) {
        let html = '';
        data.lineup.forEach(item => {
            html += `
            <li data-aos="fade-right">
                <span class="time-slot">${item.hora}</span>
                <span class="activity"><i class="fa-solid ${item.icono} t-icon"></i> ${item.actividad}</span>
            </li>`;
        });
        list.innerHTML = html;
    }

    // 5. FOTO EXTRA (NUEVO)
    setAttr('img-extra', 'src', data.fotos.fotoExtra);

    // 6. Dresscode
    setText('dc-title', data.dresscode.titulo);
    setText('dc-text', data.dresscode.texto);
    setAttr('img-dress', 'src', data.fotos.dresscode);

    // 7. Ticket VIP
    if(data.ticket && data.ticket.activar) {
        setText('ticket-name', data.info.nombre + "'s PARTY");
        setText('ticket-level', data.ticket.nivel);
        setText('ticket-folio', "NO: " + data.ticket.folio);
    } else {
        document.getElementById('ticket-section').style.display = 'none';
    }

    // 8. Regalos
    setText('gift-title', data.regalos.titulo);
    setText('gift-text', data.regalos.texto);
    if(data.regalos.tipo === 'sobres') {
        document.getElementById('gift-data').classList.remove('hidden');
        setText('bank-name', data.regalos.datos.banco);
        setText('bank-num', data.regalos.datos.cuenta);
        setText('bank-owner', data.regalos.datos.titular);
    }

    // 9. WhatsApp
    const btnWa = document.getElementById('btn-whatsapp');
    if(btnWa) {
        btnWa.addEventListener('click', () => {
            const url = `https://wa.me/${data.whatsapp.numero}?text=${encodeURIComponent(data.whatsapp.mensajeConfirmacion)}`;
            window.open(url, '_blank');
        });
    }
}

// === MÃšSICA ===
function setupMusic(data) {
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('play-btn');
    const trackName = document.getElementById('track-name');
    const visualizer = document.querySelector('.visualizer');

    if(data.musica) {
        audio.src = data.musica.url;
        trackName.innerText = data.musica.titulo + " - " + data.musica.artista;
    }

    let isPlaying = false;
    if(visualizer) {
        const bars = visualizer.querySelectorAll('span');
        bars.forEach(b => b.style.animationPlayState = 'paused');
    }

    btn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-play"></i>';
            if(visualizer) visualizer.querySelectorAll('span').forEach(b => b.style.animationPlayState = 'paused');
        } else {
            audio.play();
            btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            if(visualizer) visualizer.querySelectorAll('span').forEach(b => b.style.animationPlayState = 'running');
        }
        isPlaying = !isPlaying;
    });
}

// === CONTADOR ===
function setupCountdown(dateStr) {
    const target = new Date(dateStr).getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        if (diff < 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        setText('d', d < 10 ? '0'+d : d);
        setText('h', h < 10 ? '0'+h : h);
        setText('m', m < 10 ? '0'+m : m);
        setText('s', s < 10 ? '0'+s : s);
    }, 1000);
}

// === FONDO ANIMADO ===
function initCanvas() {
    const canvas = document.getElementById('neon-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.size = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if(this.x < 0 || this.x > width) this.vx *= -1;
            if(this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'; 
            ctx.fill();
        }
    }

    for(let i=0; i<50; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((p, index) => {
            p.update();
            p.draw();
            for(let j = index + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if(dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 243, 255, ${1 - dist/150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function setText(id, txt) { const el = document.getElementById(id); if(el) el.innerText = txt; }
function setHTML(id, html) { const el = document.getElementById(id); if(el) el.innerHTML = html; }
function setAttr(id, attr, val) { const el = document.getElementById(id); if(el) el.setAttribute(attr, val); }