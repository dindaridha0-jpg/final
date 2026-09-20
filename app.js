const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const wa = (message) => `https://wa.me/${SITE.phone}?text=${encodeURIComponent(message)}`;
const generalWA = () => wa("Assalamu'alaikum, saya ingin berkonsultasi mengenai paket Umroh Samira Travel.");
const packageWA = (name) => wa(`Assalamu'alaikum, saya ingin mendapatkan informasi mengenai paket Umroh ${name} dari Evi Samira Jakarta Timur.`);

const packageCard = (p) => {
  const isTurki = p.slug === 'plus-turki';
  return `
  <article class="package-card ${isTurki ? 'package-card-turki' : ''}">
    ${isTurki ? `<div class="turki-ribbon-tag">★ Special Edition 50 Jt</div>` : ''}
    <div class="package-image-wrap">
      ${p.imageSecondary ? `
        <div class="package-image package-image-collage">
          <div class="collage-panel" style="background-image:url('${p.image}')"><span class="collage-label">Makkah & Madinah</span></div>
          <div class="collage-panel" style="background-image:url('${p.imageSecondary}')"><span class="collage-label">Istanbul Turki</span></div>
        </div>` : `<div class="package-image" style="background-image:url('${p.image}')"></div>`}
      <span class="package-badge" style="${p.badgeColor ? `background: ${p.badgeColor};` : ''}">${p.label}</span>
    </div>
    <div class="package-body">
      ${isTurki ? `
        <div class="turki-route-pill">✈ CGK → IST → MED → JED → CGK</div>
      ` : ''}
      <h3>${p.name}</h3>
      <div class="price-pill">
        <div class="price" style="${isTurki ? 'color: #dc2626; font-size: 1.65rem;' : ''}">${p.price}</div>
        <small style="${isTurki ? 'color: #dc2626; font-weight: 700;' : ''}"> ${isTurki ? '/ all-in' : '/ pax'}</small>
      </div>
      <div class="package-meta">
        <span class="meta-chip">◷ ${p.duration}</span>
        <span class="meta-chip">✈ ${p.airline ? p.airline.split('(')[0].trim() : 'Saudia Direct'}</span>
        <span class="meta-chip">🗓 ${p.departure}</span>
      </div>
      ${isTurki && p.highlights ? `
        <div class="turki-highlights-tags">
          ${p.highlights.map(h => `<span class="turki-tag-item">✦ ${h}</span>`).join('')}
        </div>
      ` : ''}
      <div style="font-size: 0.82rem; color: var(--ios-secondary); margin: 4px 0 12px; line-height: 1.4;">
        ${p.hotel ? `🏢 ${p.hotel}` : ''}
        ${p.pricingMatrix && p.pricingMatrix[0] ? `<br><b>Quad:</b> Rp ${p.pricingMatrix[0].quad} • <b>Triple:</b> Rp ${p.pricingMatrix[0].triple} • <b>Double:</b> Rp ${p.pricingMatrix[0].double}` : ''}
      </div>
      <div class="package-actions">
        <a class="btn btn-glass" target="_blank" rel="noreferrer" href="${packageWA(p.name)}">Tanya WA</a>
        <a class="btn btn-gold" href="#/paket/${p.slug}">Detail</a>
        <a class="btn btn-green" href="#/daftar?paket=${encodeURIComponent(p.name)}">Daftar</a>
      </div>
    </div>
  </article>
`;
};

const videoCard = (v) => `
  <article class="video-testimonial-card">
    <div class="video-frame-container">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${v.id}?rel=0"
        title="${v.title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen></iframe>
    </div>
    <div class="video-card-body">
      <div class="video-badge"><span>▶</span> Video Jamaah</div>
      <h3 class="video-title">${v.title}</h3>
      <p class="video-desc">${v.desc}</p>
      <a class="video-link" href="${v.url}" target="_blank" rel="noreferrer">
        <span>Buka di YouTube</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>
    </div>
  </article>
`;

const quoteCard = (t) => `
  <article class="quote-card">
    <div>
      <div class="quote-mark">“</div>
      <p class="quote-text">${t.quote}</p>
    </div>
    <div class="quote-author">
      <div class="author-avatar">${t.name.charAt(0)}</div>
      <div class="author-info">
        <strong>${t.name}</strong>
        <small>${t.city}</small>
      </div>
    </div>
  </article>
`;

function initTheme() {
  const saved = localStorage.getItem('evi_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'dark' || (!saved && prefersDark);
  setTheme(isDark ? 'dark' : 'light');
}

function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-mode');
    localStorage.setItem('evi_theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('dark-mode');
    localStorage.setItem('evi_theme', 'light');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark';
  setTheme(current ? 'light' : 'dark');
}

function nav() {
  $('#header').innerHTML = `
    <nav class="nav-capsule">
      <a class="brand" href="#/" aria-label="Beranda Evi Samira">
        <img class="brand-logo" src="assets/samira-logo.png?v=2" alt="Samira — Sahabat Umroh dan Haji Keluarga Anda">
      </a>
      <div class="nav-links">
        <a href="#/paket" data-nav="paket">Paket Umroh</a>
        <a href="#/jadwal" data-nav="jadwal">Jadwal</a>
        <a href="#/profil-samira" data-nav="profil-samira">Profil Samira</a>
        <a href="#/testimoni" data-nav="testimoni">Testimoni</a>
        <a href="#/tentang" data-nav="tentang">Tentang Mitra</a>
        <a href="#/dokumentasi" data-nav="dokumentasi">Dokumentasi</a>
        <a href="#/artikel" data-nav="artikel">Artikel</a>
        <a href="#/faq" data-nav="faq">FAQ</a>
        <a href="#/kontak" data-nav="kontak">Kontak</a>
        <a class="btn btn-gold" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi WhatsApp</a>
      </div>
      <div class="nav-actions">
        <button class="theme-toggle" id="theme-toggle" aria-label="Ganti mode gelap (navy) atau terang" title="Ganti Mode Gelap (Navy) / Terang">
          <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <button class="mobile-toggle" aria-label="Buka menu navigasi">☰</button>
      </div>
    </nav>
  `;

  const toggle = $('.mobile-toggle');
  const links = $('.nav-links');
  toggle.onclick = () => links.classList.toggle('open');
  $$('.nav-links a').forEach(a => {
    a.onclick = () => links.classList.remove('open');
  });

  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    themeBtn.onclick = () => toggleTheme();
  }
}

function updateActiveNav(activeNavKey) {
  $$('.nav-links a[data-nav]').forEach(el => {
    if (el.getAttribute('data-nav') === activeNavKey) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

function footer() {
  $('#footer').innerHTML = `
    <div class="footer">
      <div class="container footer-grid">
        <div>
          <a class="brand" href="#/" aria-label="Beranda Evi Samira">
            <img class="brand-logo" src="assets/samira-logo.png?v=2" alt="Samira — Sahabat Umroh dan Haji Keluarga Anda">
          </a>
          <p style="margin-top: 16px;">Teman konsultasi Umroh terpercaya Anda di Jakarta Timur. Membantu calon jamaah memahami pilihan paket dan persiapan ibadah dengan sepenuh hati.</p>
        </div>
        <div>
          <h4>Informasi</h4>
          <a href="#/profil-samira">Profil PT. Samira Ali Wisata</a>
          <a href="#/paket">Paket Umroh</a>
          <a href="#/jadwal">Jadwal Keberangkatan</a>
          <a href="#/legalitas">Legalitas & Keamanan</a>
          <a href="#/faq">Pertanyaan Umum</a>
        </div>
        <div>
          <h4>Hubungi Evi Samira</h4>
          <p><b>${SITE.agent}</b><br>Konsultasi WhatsApp: ${SITE.phoneDisplay}</p>
          <a class="btn btn-gold" style="margin-top: 14px; width: fit-content;" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi Sekarang ↗</a>
        </div>
      </div>
      <div class="container copyright">
        © ${new Date().getFullYear()} ${SITE.agent}. Mitra Resmi Samira Travel. Informasi paket dapat berubah sewaktu-waktu; mohon konfirmasi sebelum pendaftaran.
      </div>
    </div>
  `;
}

const hero = () => `
  <section class="hero container">
    <div class="hero-glass-card">
      <div class="hero-content">
        <div class="eyebrow">✦ Mitra Resmi Samira Travel • Jakarta Timur</div>
        <h1>Rencanakan perjalanan suci dengan hati yang lebih tenang.</h1>
        <p>Bersama Evi Samira Jakarta Timur, dapatkan ruang konsultasi yang hangat dan terpercaya untuk menemukan paket Umroh yang selaras dengan kenyamanan Anda dan keluarga.</p>
        <div class="hero-actions">
          <a href="#/paket" class="btn btn-gold">Lihat Paket Umroh →</a>
          <a target="_blank" rel="noreferrer" href="${generalWA()}" class="btn btn-outline">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Konsultasi via WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
`;

function home() {
  return `
    ${hero()}
    <section class="trust-strip container">
      <div class="trust-grid">
        <div class="trust-item">
          <div class="trust-icon-box">✦</div>
          <div class="trust-text">Konsultasi Personal & Hangat</div>
        </div>
        <div class="trust-item">
          <div class="trust-icon-box">🛡️</div>
          <div class="trust-text">Fokus Kenyamanan Jamaah</div>
        </div>
        <div class="trust-item">
          <div class="trust-icon-box">💎</div>
          <div class="trust-text">Informasi Transparan & Jelas</div>
        </div>
        <div class="trust-item">
          <div class="trust-icon-box">★</div>
          <div class="trust-text">Mitra Resmi Samira Travel</div>
        </div>
      </div>
    </section>

    <!-- Samira Travel Profile Bento Highlight Banner -->
    <section class="section" style="padding-top: 0; padding-bottom: 20px;">
      <div class="container">
        <div class="profile-overview-card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px;">
            <div>
              <div class="eyebrow">✦ Profil Resmi Penyelenggara</div>
              <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.8rem, 3.2vw, 2.4rem); color: var(--ios-navy); margin: 8px 0 12px;">
                PT. SAMIRA ALI WISATA (Samira Travel)
              </h2>
              <p style="color: var(--ios-secondary); max-width: 680px; font-size: 0.98rem; line-height: 1.65;">
                Penyelenggara Perjalanan Ibadah Umroh resmi berizin Kemenag RI <b>PPIU No. 137 Tahun 2020</b>. Dikenal sebagai <b>Juaranya Umroh New Normal</b> dan pelopor program syariah <b>"Umroh Dulu Bayar Belakangan"</b> yang didukung fatwa DSN-MUI.
              </p>
            </div>
            <a href="#/profil-samira" class="btn btn-gold" style="white-space: nowrap;">Pelajari Profil Lengkap →</a>
          </div>
          <div class="profile-meta-chips" style="margin-bottom: 0;">
            <span class="profile-meta-chip">📜 PPIU No. 137 Tahun 2020</span>
            <span class="profile-meta-chip">🏢 Kantor Pusat Duren Sawit, Jakarta Timur</span>
            <span class="profile-meta-chip">⚖️ Fatwa Resmi DSN-MUI</span>
            <span class="profile-meta-chip">✈️ Rekor 1 Pesawat Penuh Tiap 3 Hari</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Pilihan perjalanan</div>
            <h2 class="section-title">Paket untuk rencana ibadah Anda</h2>
          </div>
          <a href="#/paket" class="btn btn-glass">Lihat semua paket →</a>
        </div>
        <div class="notice">
          <span class="notice-icon">✈</span>
          <div><b>Paket Resmi Samira Travel 2026:</b> Pilihan paket <b>Safara</b>, <b>Safawi</b>, <b>Sukari</b>, <b>Majol</b>, serta <b>Umroh Plus Turki</b>. Tersedia penerbangan langsung <b>Saudia Airlines (Direct CGK — JED)</b> durasi 9, 12, dan 16 Hari.</div>
        </div>
        <div class="package-grid">
          ${packages.map(packageCard).join('')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container about-grid">
        <div class="about-visual-card">
          <div class="about-visual-overlay"></div>
          <div class="about-floating-pill">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="background:var(--ios-green); color:#fff; font-size:0.72rem; padding:2px 8px; border-radius:999px; font-weight:700;">Mitra Resmi</span>
              <span style="background:rgba(217,119,6,0.18); color:var(--ios-gold); border:1px solid rgba(217,119,6,0.3); font-size:0.72rem; padding:2px 8px; border-radius:999px; font-weight:700;">Tour Leader BNSP</span>
            </div>
            <strong>Evi Handayani</strong>
            <small>Melayani dengan sepenuh hati, mendampingi setiap langkah awal Anda dan keluarga menuju Baitullah.</small>
          </div>
        </div>
        <div>
          <div class="eyebrow">Tentang Mitra Resmi</div>
          <h2 class="section-title">Membantu Anda memilih dengan lebih tenang & yakin.</h2>
          <p class="section-text">Evi Samira Jakarta Timur adalah representasi mitra resmi PT. Samira Ali Wisata (Samira Travel) yang dipimpin oleh Evi Handayani, pemegang sertifikasi Tour Leader BNSP yang siap membimbing dan mengawal rencana ibadah Anda.</p>
          <div class="features-bento">
            <div class="feature-widget">
              <div class="feature-widget-icon">◌</div>
              <h3>Konsultasi Fleksibel</h3>
              <p>Diskusikan kebutuhan lansia, fasilitas hotel, jadwal cuti, atau paket keluarga Anda.</p>
            </div>
            <div class="feature-widget">
              <div class="feature-widget-icon">◇</div>
              <h3>Penjelasan Transparan</h3>
              <p>Kami bantu membedah rincian biaya, maskapai, dan fasilitas sebelum Anda menentukan pilihan.</p>
            </div>
          </div>
          <a class="btn btn-green" href="#/tentang">Tentang Evi Samira →</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Cerita langsung jamaah</div>
            <h2 class="section-title">Kepercayaan dimulai dari pelayanan tulus.</h2>
          </div>
          <a href="#/testimoni" class="btn btn-glass">Lihat Semua Testimoni →</a>
        </div>
        <div class="video-testimonial-grid" style="margin-bottom: 30px;">
          ${testimonialVideos.map(videoCard).join('')}
        </div>
        <div class="quote-grid">
          ${testimonials.map(quoteCard).join('')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Momen perjalanan</div>
            <h2 class="section-title">Dokumentasi yang penuh makna.</h2>
          </div>
          <a href="#/dokumentasi" class="btn btn-glass">Lihat Semua Galeri</a>
        </div>
        <div class="gallery-bento">
          <div class="gallery-item big" style="background-image:url('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg')" onclick="openLightbox('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg', 'Dokumentasi Keberangkatan Akbar — 12 Titik Perjalanan Jamaah Samira Travel')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Keberangkatan Akbar Jamaah</span>
              <span>🔍 Perbesar</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/dokumentasi/manasik-bersama-jamaah.jpg')" onclick="openLightbox('assets/dokumentasi/manasik-bersama-jamaah.jpg', 'Bimbingan Manasik Umroh Bersama Jamaah Samira Travel & CEO')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Manasik Akbar</span>
              <span>🔍</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/dokumentasi/jamaah-kabin-pesawat.jpg')" onclick="openLightbox('assets/dokumentasi/jamaah-kabin-pesawat.jpg', 'Keceriaan Jamaah Samira Travel di Kabin Pesawat Menuju Baitullah')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Kabin Pesawat</span>
              <span>🔍</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/dokumentasi/panitia-manasik-akbar.jpg')" onclick="openLightbox('assets/dokumentasi/panitia-manasik-akbar.jpg', 'Pendampingan Ramah Panitia Manasik Umroh Samira Travel')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>Panitia Manasik</span>
              <span>🔍</span>
            </div>
          </div>
          <div class="gallery-item" style="background-image:url('assets/profile/samira-tangguh-new-normal.jpg')" onclick="openLightbox('assets/profile/samira-tangguh-new-normal.jpg', 'Keberangkatan Akbar 1 Pesawat Penuh — Juaranya Umroh New Normal')" role="button" tabindex="0">
            <div class="gallery-label">
              <span>1 Pesawat Penuh</span>
              <span>🔍</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    ${ctaBand()}
  `;
}

const ctaBand = () => `
  <section class="cta-band container">
    <div class="cta-card">
      <div class="cta-text">
        <h2>Ada yang ingin ditanyakan?</h2>
        <p>Mulai dengan percakapan singkat dan nyaman bersama Evi Samira Jakarta Timur.</p>
      </div>
      <a class="btn btn-gold" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi WhatsApp ↗</a>
    </div>
  </section>
`;

const pageHero = (title, desc) => `
  <section class="page-hero container">
    <div class="page-hero-card">
      <div class="eyebrow">Evi Samira • Mitra Resmi Samira Travel</div>
      <h1>${title}</h1>
      <p>${desc}</p>
    </div>
  </section>
`;

function renderOfficialPriceTables() {
  if (typeof officialPriceTables === 'undefined') return '';
  return `
    <div class="pricing-matrix-section">
      <div class="section-head" style="margin-bottom: 24px;">
        <div>
          <div class="eyebrow">✦ Tabel Resmi Brosur Musim 2026</div>
          <h2 class="section-title">Daftar Harga Resmi & Pilihan Kamar</h2>
          <p style="color: var(--ios-secondary); max-width: 720px; margin-top: 6px;">
            Rincian lengkap paket <b>Sfaar</b>, <b>Safawi</b>, <b>Sukari</b>, dan <b>Majol</b> bersama maskapai <b>Saudia Airlines</b> (Direct Flight CGK — JED).
          </p>
        </div>
      </div>
      <div class="matrix-card-grid">
        ${officialPriceTables.map(t => `
          <div class="official-matrix-card">
            <div class="matrix-header">
              <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
                <span class="matrix-duration-badge">⏱ ${t.duration}</span>
                <div class="matrix-route-info">
                  <span class="matrix-route-text">${t.route}</span>
                  <span class="matrix-airline-badge">✈ ${t.airline}</span>
                </div>
              </div>
              <a href="#/daftar?rencana=${encodeURIComponent(t.duration)}" class="btn btn-gold" style="font-size: 0.82rem; padding: 7px 16px;">
                Konsultasi Jadwal ${t.duration} →
              </a>
            </div>

            <div class="matrix-dates-container">
              ${t.datesSep && t.datesSep.length > 0 ? `
                <div class="matrix-dates-row">
                  <span class="matrix-dates-month">🗓 September 2026:</span>
                  <div class="matrix-dates-chips">
                    ${t.datesSep.map(d => `<span class="date-pill">${d}</span>`).join('')}
                    <span style="font-size: 0.78rem; color: var(--ios-secondary); align-self: center;">September</span>
                  </div>
                </div>
              ` : ''}
              ${t.datesOkt && t.datesOkt.length > 0 ? `
                <div class="matrix-dates-row">
                  <span class="matrix-dates-month">🗓 Oktober 2026:</span>
                  <div class="matrix-dates-chips">
                    ${t.datesOkt.map(d => `<span class="date-pill">${d}</span>`).join('')}
                    <span style="font-size: 0.78rem; color: var(--ios-secondary); align-self: center;">Oktober</span>
                  </div>
                </div>
              ` : ''}
            </div>

            <div class="matrix-table-wrap">
              <table class="matrix-table">
                <thead>
                  <tr>
                    <th>Paket Umroh</th>
                    <th>Quad (Sekamar Ber-4)</th>
                    <th>Triple (Sekamar Ber-3)</th>
                    <th>Double (Sekamar Ber-2)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  ${t.tiers.map(tr => `
                    <tr>
                      <td style="text-align: left;">
                        <span class="tier-badge-cell tier-badge-${tr.tierKey}">
                          ${tr.name}
                        </span>
                      </td>
                      <td>
                        <div class="price-amount">Rp ${tr.quad}</div>
                        <div class="price-unit">/ pax</div>
                      </td>
                      <td>
                        <div class="price-amount">Rp ${tr.triple}</div>
                        <div class="price-unit">/ pax</div>
                      </td>
                      <td>
                        <div class="price-amount">Rp ${tr.double}</div>
                        <div class="price-unit">/ pax</div>
                      </td>
                      <td>
                        <a class="btn btn-glass" style="padding: 6px 14px; font-size: 0.78rem;" target="_blank" rel="noreferrer" href="${wa(`Assalamu'alaikum Ibu Evi, saya ingin menanyakan Paket ${tr.name} (${t.duration}) Saudia Airlines Direct Jakarta - Jeddah.`)}">
                          Tanya WA ↗
                        </a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function packagesPage() {
  return `
    ${pageHero('Paket Umroh Samira Travel', 'Pilihan paket resmi Safara, Safawi, Sukari, Majol, serta program spesial Umroh Plus Turki.')}
    <section class="section">
      <div class="container">
        <div class="notice">
          <span class="notice-icon">✈</span>
          <div><b>Penerbangan Langsung Saudia Airlines & Umroh Plus Turki:</b> Informasi resmi paket musim 2026. Tersedia paket Safara, Safawi, Sukari, Majol dengan durasi 9, 12, dan 16 Hari (Saudia Direct CGK — JED) serta paket istimewa Umroh Plus Turki.</div>
        </div>
        
        <div class="package-grid">
          ${packages.map(packageCard).join('')}
        </div>

        ${renderOfficialPriceTables()}
      </div>
    </section>
    ${ctaBand()}
  `;
}

function detail(p) {
  const isTurki = p.slug === 'plus-turki';
  return `
    ${pageHero(p.name, p.description ? p.description.slice(0, 140) + '...' : 'Rincian resmi paket Umroh Samira Travel.')}
    <section class="section">
      <div class="container detail-layout">
        <div class="detail-main-card">
          ${p.imageSecondary ? `
            <div class="detail-image" style="height: 320px; display: flex; overflow: hidden; border-radius: var(--ios-radius-lg) var(--ios-radius-lg) 0 0;">
              <div style="flex: 1; background-image: url('${p.image}'); background-size: cover; background-position: center; position: relative;">
                <span style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); color: #fff; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">Tanah Suci Makkah & Madinah</span>
              </div>
              <div style="flex: 1; background-image: url('${p.imageSecondary}'); background-size: cover; background-position: center; border-left: 2px solid #fff; position: relative;">
                <span style="position: absolute; bottom: 12px; left: 12px; background: rgba(0,0,0,0.65); backdrop-filter: blur(4px); color: #fff; padding: 4px 10px; border-radius: 9999px; font-size: 0.75rem; font-weight: 700;">Istanbul Turki</span>
              </div>
            </div>
          ` : `<div class="detail-image" style="background-image:url('${p.image}')"></div>`}
          <div class="detail-content">
            <span class="package-badge" style="${p.badgeColor ? `background:${p.badgeColor};` : ''}">${p.label}</span>
            
            <h2>Tentang ${p.name}</h2>
            <p>${p.description || 'Paket Umroh resmi dari Samira Travel dengan jaminan fasilitas terbaik dan pendampingan profesional.'}</p>

            ${isTurki ? `
              <div class="turki-bento-grid">
                <div class="turki-bento-card">
                  <div class="turki-bento-icon">🕌</div>
                  <div class="turki-bento-text">
                    <h4>Kekhusyukan Tanah Suci</h4>
                    <p>Ibadah Umroh di Masjidil Haram Makkah & ziarah Raudhah serta Makam Rasulullah SAW di Masjid Nabawi Madinah.</p>
                  </div>
                </div>
                <div class="turki-bento-card">
                  <div class="turki-bento-icon">🚢</div>
                  <div class="turki-bento-text">
                    <h4>Bosphorus Cruise Tour</h4>
                    <p>Pelayaran eksklusif menyusuri Selat Bosphorus yang memisahkan keindahan benua Asia dan Eropa dengan panorama ikonik.</p>
                  </div>
                </div>
                <div class="turki-bento-card">
                  <div class="turki-bento-icon">🏛️</div>
                  <div class="turki-bento-text">
                    <h4>Warisan Sejarah Islam</h4>
                    <p>Eksplorasi megah Hagia Sophia Grand Mosque, Blue Mosque (Sultanahmet), Istana Topkapi, dan belanja di Grand Bazaar.</p>
                  </div>
                </div>
                <div class="turki-bento-card">
                  <div class="turki-bento-icon">⭐</div>
                  <div class="turki-bento-text">
                    <h4>Akomodasi Bintang 5 All-In</h4>
                    <p>Hotel bintang 5 Istanbul, Makkah, & Madinah dengan sajian makan 3x sehari fullboard menu Indonesia & khas Turki.</p>
                  </div>
                </div>
              </div>
            ` : ''}

            ${p.pricingMatrix ? `
              <div class="detail-pricing-box">
                <h3>📊 Rincian Biaya Sekamar & Durasi</h3>
                <div class="matrix-table-wrap">
                  <table class="matrix-table">
                    <thead>
                      <tr>
                        <th>Durasi & Rute</th>
                        <th>Quad (Ber-4)</th>
                        <th>Triple (Ber-3)</th>
                        <th>Double (Ber-2)</th>
                        <th>Jadwal Keberangkatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${p.pricingMatrix.map(pm => `
                        <tr>
                          <td style="text-align: left;">
                            <b style="color:var(--ios-navy); font-size:1rem;">${pm.duration}</b><br>
                            <small style="color:var(--ios-secondary);">${pm.route}</small>
                          </td>
                          <td><span class="price-amount">Rp ${pm.quad}</span></td>
                          <td><span class="price-amount">Rp ${pm.triple}</span></td>
                          <td><span class="price-amount">Rp ${pm.double}</span></td>
                          <td style="text-align:left; font-size:0.8rem; line-height: 1.4; max-width: 240px;">
                            ${pm.datesSep && pm.datesSep !== '-' ? `<div><b>Sep:</b> ${pm.datesSep}</div>` : ''}
                            ${pm.datesOkt && pm.datesOkt !== '-' ? `<div><b>Okt:</b> ${pm.datesOkt}</div>` : ''}
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
                <div style="margin-top: 12px; font-size: 0.8rem; color: var(--ios-secondary);">
                  * Biaya per orang. Sudah termasuk tiket Saudia Airlines Direct PP, hotel, visa umroh resmi, makan 3x sehari fullboard menu Indonesia, bimbingan manasik, dan perlengkapan eksklusif Samira Travel.
                </div>
              </div>
            ` : ''}

            <h2>Fasilitas Termasuk</h2>
            <ul class="data-list">
              ${p.facilities.map(x => `<li>${x}</li>`).join('')}
            </ul>

            <h2>Rencana Perjalanan / Itinerary</h2>
            <ul class="data-list">
              ${p.itinerary.map(x => `<li>${x}</li>`).join('')}
            </ul>
          </div>
        </div>
        <aside class="side-card">
          <span class="package-badge" style="${p.badgeColor ? `background:${p.badgeColor};` : ''}">${p.label}</span>
          <h3>${p.name}</h3>
          <div class="price-pill">
            <div class="price" style="${isTurki ? 'color:#dc2626; font-size:1.8rem;' : ''}">${p.price}</div>
            <small style="${isTurki ? 'color:#dc2626; font-weight:700;' : ''}"> ${isTurki ? '/ all-in' : '/ pax'}</small>
          </div>
          <div class="side-specs">
            <div class="side-spec-item"><span>Durasi</span><strong>${p.duration}</strong></div>
            <div class="side-spec-item"><span>Keberangkatan</span><strong>${p.departure}</strong></div>
            <div class="side-spec-item"><span>Maskapai</span><strong>${p.airline || 'Saudia Airlines (Direct)'}</strong></div>
            <div class="side-spec-item"><span>Rute</span><strong>${p.route || 'Jakarta — Jeddah PP'}</strong></div>
            <div class="side-spec-item"><span>Akomodasi</span><strong>${p.hotel}</strong></div>
          </div>
          <a class="btn btn-green" style="width:100%; margin-bottom: 10px;" target="_blank" rel="noreferrer" href="${packageWA(p.name)}">Konsultasi Paket via WhatsApp</a>
          <a class="btn btn-gold" style="width:100%" href="#/daftar?paket=${encodeURIComponent(p.name)}">Daftar Minat Sekarang</a>
        </aside>
      </div>
    </section>
  `;
}

function schedule() {
  return `
    ${pageHero('Jadwal Keberangkatan Resmi 2026', 'Jadwal penerbangan langsung Saudia Airlines Jakarta — Jeddah musim September & Oktober 2026 serta Umroh Plus Turki.')}
    <section class="section">
      <div class="container">
        <div class="notice">
          <span class="notice-icon">✈</span>
          <div>Penerbangan langsung <b>Saudia Airlines</b> tanpa transit rute Jakarta (CGK) — Jeddah (JED) untuk paket Safara, Safawi, Sukari, Majol, serta keberangkatan khusus Umroh Plus Turki.</div>
        </div>

        <div class="schedule-card" style="margin-bottom: 36px;">
          <table class="schedule">
            <thead>
              <tr>
                <th>Paket</th>
                <th>Keberangkatan</th>
                <th>Durasi</th>
                <th>Maskapai & Rute</th>
                <th>Biaya Mulai</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              ${packages.map(p => `
                <tr>
                  <td>
                    <b>${p.name}</b><br>
                    <small style="color:var(--ios-secondary);">${p.hotel ? p.hotel.split('(')[0].trim() : ''}</small>
                  </td>
                  <td><b>${p.departure}</b></td>
                  <td>${p.duration}</td>
                  <td><span class="status-pill" style="background: rgba(12, 112, 107, 0.1); color: var(--ios-green); border-color: rgba(12, 112, 107, 0.2);">${p.airline && p.airline.includes('Saudia') ? 'Saudia Direct' : 'Turkish / Saudia'}</span></td>
                  <td><span style="color:var(--ios-green); font-weight:800; font-size:1rem;">${p.price}</span></td>
                  <td><a href="#/paket/${p.slug}" class="btn btn-glass" style="padding: 6px 14px; font-size: 0.8rem;">Detail & Biaya</a></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${renderOfficialPriceTables()}
      </div>
    </section>
    ${ctaBand()}
  `;
}

function about() {
  const m = MITRA_DOCUMENTATION;
  return `
    ${pageHero('Tentang Evi Samira', 'Ruang konsultasi Umroh yang hangat dan profesional untuk calon jamaah di Jakarta Timur dan sekitarnya.')}
    
    <section class="section">
      <div class="container">
        <!-- Mitra Hero Profile Card -->
        <div class="mitra-doc-split">
          <div class="mitra-doc-photo-col" onclick="openLightbox('${m.photo}', '${m.name} — ${m.role}')" role="button" tabindex="0" title="Klik untuk memperbesar foto">
            <img src="${m.photo}" alt="${m.name} Samira Travel" loading="eager">
            <div class="mitra-photo-overlay-badge">
              <div>
                <strong>${m.name}</strong>
                <small>${m.role}</small>
              </div>
              <span style="font-size:0.75rem; background:var(--ios-green); padding:3px 10px; border-radius:999px; font-weight:700;">🔍 Zoom Foto</span>
            </div>
          </div>
          <div>
            <div class="eyebrow">✦ Mitra Resmi & Tour Leader BNSP</div>
            <h2 class="section-title" style="margin-top: 6px;">
              Memberi ketenangan sejak percakapan pertama.
            </h2>
            <p class="section-text" style="font-style: italic; color: var(--ios-green); margin-bottom: 14px;">
              "${m.quote}"
            </p>
            <p class="section-text">
              Sebagai mitra resmi PT. Samira Ali Wisata (Samira Travel), <b>Evi Handayani</b> mendampingi calon jamaah untuk memahami pilihan paket resmi (Safara, Safawi, Sukari, Majol, & Plus Turki), jadwal penerbangan langsung Saudia Airlines, hingga persiapan manasik dan keberangkatan.
            </p>
            <div style="display:flex; flex-wrap:wrap; gap:10px; margin: 20px 0 24px;">
              <span class="profile-meta-chip">📜 Sertifikasi BNSP Tour Leader</span>
              <span class="profile-meta-chip">🕋 Pendampingan Ramah & Amanah</span>
              <span class="profile-meta-chip">✈️ Pengalaman Lapangan Mumpuni</span>
              <span class="profile-meta-chip">📍 Jakarta Timur & Seluruh Indonesia</span>
            </div>
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <a class="btn btn-green" target="_blank" rel="noreferrer" href="https://wa.me/${SITE.phone}?text=${encodeURIComponent('Assalamu’alaikum Bu Evi, saya ingin konsultasi paket Umroh Samira Travel.')}">
                Konsultasi WhatsApp Sekarang ↗
              </a>
              <a class="btn btn-gold" href="#/paket">
                Lihat Paket Umroh 2026 →
              </a>
            </div>
          </div>
        </div>

        <div class="features-bento" style="margin-top: 10px;">
          <div class="feature-widget">
            <div class="feature-widget-icon">📜</div>
            <h3>Kompetensi BNSP</h3>
            <p>Tersertifikasi resmi sebagai Pemimpin Perjalanan Wisata / Tour Leader dari Badan Nasional Sertifikasi Profesi.</p>
          </div>
          <div class="feature-widget">
            <div class="feature-widget-icon">🧭</div>
            <h3>Tour Leader Berpengalaman</h3>
            <p>Memahami dinamika ibadah dan kebutuhan jamaah di Tanah Suci Makkah dan Madinah secara menyeluruh.</p>
          </div>
          <div class="feature-widget">
            <div class="feature-widget-icon">🤝</div>
            <h3>Pendampingan Personal</h3>
            <p>Bimbingan tatap muka atau konsultasi online yang nyaman untuk jamaah mandiri maupun keluarga besar.</p>
          </div>
          <div class="feature-widget">
            <div class="feature-widget-icon">🕋</div>
            <h3>Standar Resmi Samira</h3>
            <p>Prosedur pendaftaran, manasik, dan keberangkatan terjamin mengikuti legalitas resmi izin PPIU Kemenag RI.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cabin Video Documentation in About -->
    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Dokumentasi Lapangan & Penerbangan</div>
            <h2 class="section-title">Keceriaan & Kekompakan Jamaah di Perjalanan</h2>
          </div>
          <span class="meta-chip">Video Dokumentasi Asli</span>
        </div>

        <div class="cabin-video-card">
          <div class="cabin-video-grid">
            <div class="cabin-video-player-wrap">
              <span class="cabin-video-live-pill">Dokumentasi Video Penerbangan</span>
              <video
                controls
                playsinline
                preload="metadata"
                poster="${m.video.poster}"
                src="${m.video.src}">
                Browser Anda tidak mendukung tag video.
              </video>
            </div>
            <div>
              <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: #0c706b; color:#fff;">✈️ Dokumentasi Kabin Pesawat</span>
              <h3 style="font-family: var(--ios-display-font); font-size: 1.45rem; color: var(--ios-navy); margin: 6px 0 10px;">
                ${m.video.title}
              </h3>
              <p style="color: var(--ios-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 12px;">
                ${m.video.caption} Menunjukkan kehangatan dan dedikasi tim Tour Leader Samira Travel dalam menyemangati para jamaah di udara menuju Baitullah.
              </p>
              
              <div class="cabin-chants-box">
                <div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--ios-secondary); letter-spacing:0.05em; margin-bottom:10px;">
                  Yel-Yel & Seruan Jamaah:
                </div>
                ${m.video.chants.map(c => `
                  <div class="cabin-chant-row">
                    <span class="chant-label">${c.q}</span>
                    <span class="chant-response">${c.a}</span>
                  </div>
                `).join('')}
              </div>

              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-glass" onclick="openLightbox('${m.video.poster}', 'Keceriaan Jamaah Samira Travel di Kabin Pesawat Menuju Baitullah')">
                  Lihat Foto Kabin HD 🔍
                </button>
                <a class="btn btn-green" href="#/dokumentasi">
                  Lihat Semua Dokumentasi →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section credential-section">
      <div class="container">
        <div class="credential-intro">
          <div class="eyebrow">Kompetensi & Kredensial</div>
          <h2 class="section-title">Pelayanan yang didukung sertifikasi resmi.</h2>
          <p class="section-text">Bukti pembekalan dan kompetensi resmi Evi Handayani sebagai Tour Leader tersertifikasi.</p>
        </div>
        <div class="credential-grid">
          <article class="credential-card">
            <div class="credential-image">
              <img src="assets/credentials/pelatihan-tour-leader.png" alt="Sertifikat internalisasi skill Tour Leader Evi Handayani">
            </div>
            <h3>Pelatihan Tour Leader</h3>
            <p>Pembekalan internalisasi keterampilan pemimpin perjalanan wisata.</p>
            <span class="credential-caption">Pelatihan Profesional</span>
          </article>
          <article class="credential-card">
            <div class="credential-image">
              <img src="assets/credentials/kartu-bnsp-tour-leader.png" alt="Kartu sertifikasi profesi Tour Leader Evi Handayani">
            </div>
            <h3>Kartu Sertifikasi Profesi</h3>
            <p>Identitas resmi kompetensi Tour Leader BNSP.</p>
            <span class="credential-caption">Lisensi BNSP</span>
          </article>
          <article class="credential-card">
            <div class="credential-image">
              <img src="assets/credentials/sertifikat-kompetensi-bnsp.png" alt="Sertifikat kompetensi BNSP Evi Handayani">
            </div>
            <h3>Sertifikat Kompetensi BNSP</h3>
            <p>Standar keahlian Pemimpin Perjalanan Wisata nasional.</p>
            <span class="credential-caption">Sertifikat Resmi</span>
          </article>
        </div>
      </div>
    </section>
    <div class="container" style="margin-top: -30px; margin-bottom: 50px; text-align: center;">
      <a class="btn btn-gold" href="#/profil-samira">Pelajari Profil Lengkap PT. Samira Ali Wisata (Kantor Pusat & Legalitas) →</a>
    </div>
    ${ctaBand()}
  `;
}

function samiraProfilePage() {
  const p = SAMIRA_PROFILE;
  return `
    ${pageHero(p.companyName, 'Profil resmi PT. Samira Ali Wisata (Samira Travel) — Juaranya Umroh New Normal, Berizin Resmi PPIU No. 137 Tahun 2020 Kemenag RI.')}

    <section class="section">
      <div class="container">
        <!-- Overview Card -->
        <div class="profile-overview-card">
          <div class="eyebrow">✦ Profil Perusahaan & Visi Pelayanan</div>
          <h2 style="font-family: var(--ios-display-font); font-size: clamp(2rem, 3.4vw, 2.6rem); color: var(--ios-navy); margin: 10px 0 14px;">
            Melayani Tamu Allah Sepenuh Hati Sesuai Sunnah
          </h2>
          <p style="color: var(--ios-secondary); font-size: 1.05rem; line-height: 1.7; max-width: 860px;">
            ${p.mission}
          </p>
          <div class="profile-meta-chips">
            <span class="profile-meta-chip">🏢 Berdiri Sejak ${p.establishedYear}</span>
            <span class="profile-meta-chip">👤 Founder & CEO: ${p.founder}</span>
            <span class="profile-meta-chip">📜 ${p.legalitas.skNumber}</span>
            <span class="profile-meta-chip">📍 ${p.headOffice}</span>
            <span class="profile-meta-chip">📞 Telp: ${p.phone}</span>
          </div>
          <div style="background: rgba(12, 112, 107, 0.06); border: 1px solid rgba(12, 112, 107, 0.15); border-radius: var(--ios-radius-md); padding: 18px 22px; color: var(--ios-navy);">
            <strong style="display: block; color: var(--ios-green); font-size: 0.95rem; margin-bottom: 4px;">Komitmen Pelayanan Holistik:</strong>
            <p style="margin: 0; font-size: 0.92rem; color: var(--ios-secondary); line-height: 1.6;">${p.serviceCommitment}</p>
          </div>
        </div>

        <!-- Bento Grid 1: Founder & Kantor Pusat + Legalitas PPIU -->
        <div class="profile-bento-grid">
          <!-- Founder & Kantor Pusat -->
          <article class="profile-bento-card">
            <div class="profile-bento-img">
              <img src="assets/profile/founder-kantor-pusat.png" alt="Ust. H. Fauzi Wahyu Muntoro CEO Samira Travel dan Kantor Pusat">
            </div>
            <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content;">Kepemimpinan & Kantor Pusat</span>
            <h3>Didirikan oleh ${p.founder}</h3>
            <p style="margin-bottom: 14px;">
              SAMIRA Travel didirikan oleh <b>${p.founder}</b> pada tahun <b>${p.establishedYear}</b>. Saat ini memiliki kantor pusat megah dan representatif di <b>${p.headOffice}</b>.
            </p>
            <p>
              Dengan komitmen profesionalisme yang tinggi, kantor pusat Samira Travel menjadi pusat kendali operasional, manasik, dan verifikasi berkas jamaah dari seluruh Indonesia.
            </p>
          </article>

          <!-- Legalitas Resmi PPIU -->
          <article class="profile-bento-card">
            <div class="profile-bento-img">
              <img src="assets/profile/legalitas-ppiu-kemenag.png" alt="Legalitas Resmi PPIU 137 Tahun 2020 Kemenag RI PT Samira Ali Wisata">
            </div>
            <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: #0c706b; color:#fff;">Izin Resmi Kemenag</span>
            <h3>${p.legalitas.skNumber}</h3>
            <p style="margin-bottom: 14px;">
              Berbadan hukum resmi atas nama <b>${p.legalitas.entity}</b> dengan izin operasional Kementerian Agama RI <b>${p.legalitas.skNumber}</b>.
            </p>
            <p>
              Sangat penting bagi calon jamaah untuk memastikan track record dan legalitas penyelenggara ibadah umroh guna menjamin kepastian jadwal, visa, penerbangan, serta kenyamanan selama di Tanah Suci.
            </p>
          </article>
        </div>

        <!-- Bento Grid 2: Umroh Dulu Bayar Belakangan & Fatwa DSN-MUI -->
        <div class="profile-overview-card">
          <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 30px; align-items: center;" class="detail-layout">
            <div>
              <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: #d6ad58; color:#051923;">Inovasi Syariah Terpercaya</span>
              <h2 style="font-family: var(--ios-display-font); font-size: 2rem; color: var(--ios-navy); margin: 8px 0 12px;">
                ${p.programTalangan.title}
              </h2>
              <p style="color: var(--ios-secondary); font-size: 0.96rem; line-height: 1.7; margin-bottom: 16px;">
                ${p.programTalangan.description}
              </p>
              <div class="notice" style="margin-bottom: 0;">
                <span class="notice-icon">🛡️</span>
                <div>Diawasi dan dikaji langsung berlandaskan ketentuan <b>Majelis Ulama Indonesia (MUI)</b> dan <b>Dewan Syari'ah Nasional</b> dengan akad Murabahah yang murni dan transparan.</div>
              </div>
            </div>
            <div class="profile-bento-img" style="margin: 0;">
              <img src="assets/profile/umroh-dulu-bayar-belakangan-mui.jpg" alt="Fasilitas Umroh Dulu Bayar Belakangan Majelis Ulama Indonesia">
            </div>
          </div>

          <h3 style="font-family: var(--ios-display-font); font-size: 1.4rem; color: var(--ios-navy); margin: 34px 0 14px;">
            Landasan 6 Fatwa DSN-MUI yang Mendasari Program:
          </h3>
          <div class="fatwa-grid">
            ${p.programTalangan.fatwaList.map(f => `
              <div class="fatwa-card">
                <span class="fatwa-badge">${f.code}</span>
                <h4>${f.title}</h4>
                <p>${f.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bento Grid 3: Track Record & Ketangguhan Samira -->
        <div class="profile-bento-grid" style="grid-template-columns: 1fr 1.2fr; align-items: center;">
          <div class="profile-bento-img" style="margin: 0;">
            <img src="assets/profile/samira-tangguh-new-normal.jpg" alt="Samira Tangguh Travel Indonesia Bangkit Rekor Jamaah">
          </div>
          <div class="profile-bento-card">
            <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content;">${p.trackRecord.badge}</span>
            <h2 style="font-family: var(--ios-display-font); font-size: 1.9rem; color: var(--ios-navy); margin-bottom: 14px;">
              ${p.trackRecord.title}
            </h2>
            <p style="color: var(--ios-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
              ${p.trackRecord.story}
            </p>
            <div style="background: rgba(9, 41, 56, 0.04); border-left: 3px solid var(--ios-gold); padding: 14px 18px; border-radius: 0 var(--ios-radius-sm) var(--ios-radius-sm) 0;">
              <strong style="color: var(--ios-navy); display: block; margin-bottom: 4px; font-size: 0.9rem;">Ketepatan Jadwal Teruji:</strong>
              <p style="margin: 0; font-size: 0.88rem; color: var(--ios-secondary);">${p.trackRecord.highlight}</p>
            </div>
          </div>
        </div>

        <!-- Bento Grid 4: Anugerah Rekor MURI -->
        <div class="profile-bento-grid" style="grid-template-columns: 1fr 1.2fr; align-items: center;">
          <div class="profile-bento-img" style="margin: 0;">
            <img src="assets/profile/anugerah-rekor-muri.jpg" alt="Piagam Penghargaan Museum Rekor-Dunia Indonesia MURI kepada PT Samira Ali Wisata">
          </div>
          <div class="profile-bento-card">
            <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: #d6ad58; color:#051923;">🏆 ${p.rekorMuri.title}</span>
            <h2 style="font-family: var(--ios-display-font); font-size: 1.9rem; color: var(--ios-navy); margin-bottom: 14px;">
              Rekor MURI — Jamaah Terbanyak di Masa Pandemi
            </h2>
            <p style="color: var(--ios-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
              ${p.rekorMuri.description}
            </p>
            <div class="profile-meta-chips">
              <span class="profile-meta-chip">📜 ${p.rekorMuri.number}</span>
              <span class="profile-meta-chip">🏅 ${p.rekorMuri.category}</span>
              <span class="profile-meta-chip">📅 ${p.rekorMuri.date}</span>
            </div>
          </div>
        </div>

        <!-- Bento Grid 5: Perlengkapan Umroh -->
        <div class="profile-bento-grid">
          <article class="profile-bento-card" style="grid-column: 1 / -1;">
            <div class="profile-bento-img">
              <img src="assets/profile/perlengkapan-umroh.jpg" alt="Perlengkapan Umroh Eksklusif Samira Travel">
            </div>
            <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: #0c706b; color:#fff;">🎒 ${p.perlengkapan.title}</span>
            <h3>${p.perlengkapan.title}</h3>
            <p style="margin-bottom: 14px;">${p.perlengkapan.description}</p>
            <div class="profile-meta-chips">
              ${p.perlengkapan.items.map(item => `<span class="profile-meta-chip">✓ ${item}</span>`).join('')}
            </div>
          </article>
        </div>

        <!-- Bento Grid 6: Keunggulan Mudah, Murah, Mantap -->
        <div class="profile-overview-card">
          <div class="eyebrow">✦ Kenapa Pilih Samira Travel?</div>
          <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.8rem, 3vw, 2.4rem); color: var(--ios-navy); margin: 10px 0 20px;">
            Keunggulan: <span style="color: var(--ios-green);">Mudah</span>, <span style="color: var(--ios-gold);">Murah</span>, <span style="color: var(--ios-navy);">Mantap</span>
          </h2>
          <div class="profile-bento-grid" style="grid-template-columns: repeat(3, 1fr); gap: 20px;">
            ${p.keunggulan.slides.map((slide, idx) => `
              <article class="profile-bento-card" style="cursor:pointer;" onclick="openLightbox('${slide.image}', 'Keunggulan Samira Travel — ${['Mudah','Murah','Mantap'][idx]}')">
                <div class="profile-bento-img">
                  <img src="${slide.image}" alt="Keunggulan Samira Travel ${['Mudah','Murah','Mantap'][idx]}">
                </div>
                <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: ${['#27ae60','#d6ad58','#0c706b'][idx]}; color:#fff;">${['🟢 MUDAH','🟡 MURAH','🔵 MANTAP'][idx]}</span>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${slide.points.map(pt => `<li style="padding: 4px 0; font-size: 0.88rem; color: var(--ios-secondary); line-height: 1.5;">✦ ${pt}</li>`).join('')}
                </ul>
              </article>
            `).join('')}
          </div>
        </div>

        <!-- Galeri Dokumen & Slide Presentasi Resmi -->
        <div class="section-head" style="margin-top: 50px;">
          <div>
            <div class="eyebrow">Dokumen & Bukti Resmi</div>
            <h2 class="section-title">Visual Profil & Dokumen Samira Travel</h2>
          </div>
          <span class="meta-chip">Klik gambar untuk memperbesar</span>
        </div>
        <div class="profile-docs-grid">
          ${p.gallery.map((doc, idx) => `
            <div class="profile-doc-card" onclick="openLightbox('${doc.image}', '${doc.caption}')" role="button" tabindex="0">
              <div class="profile-doc-img-wrap">
                <img src="${doc.image}" alt="${doc.caption}" loading="lazy">
                <span class="profile-doc-badge">${doc.tag}</span>
              </div>
              <div class="profile-doc-body">
                <p>${doc.caption}</p>
                <div class="profile-doc-hint">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  Perbesar Dokumen
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${ctaBand()}
  `;
}

function gallery() {
  const m = MITRA_DOCUMENTATION;
  return `
    ${pageHero('Galeri & Dokumentasi Jamaah', 'Dokumentasi resmi manasik akbar, keberangkatan, suasana penerbangan, dan pendampingan ibadah bersama Evi Samira Jakarta Timur.')}
    <section class="section">
      <div class="container">
        <!-- Trust Notice -->
        <div class="notice" style="margin-bottom: 30px;">
          <span class="notice-icon">🛡️</span>
          <div><b>Dokumentasi Otentik Samira Travel & Mitra Resmi:</b> Seluruh foto dan video merupakan dokumentasi nyata dari kegiatan pelayanan mitra resmi Evi Handayani, manasik, penerbangan jamaah, dan bimbingan ibadah ke Baitullah.</div>
        </div>

        <!-- Section 1: Dokumentasi Mitra Resmi Evi Handayani -->
        <div class="mitra-doc-split">
          <div class="mitra-doc-photo-col" onclick="openLightbox('${m.photo}', '${m.name} — ${m.role}')" role="button" tabindex="0" title="Klik untuk memperbesar foto">
            <img src="${m.photo}" alt="${m.name} Samira Travel" loading="eager">
            <div class="mitra-photo-overlay-badge">
              <div>
                <strong>${m.name}</strong>
                <small>${m.agency}</small>
              </div>
              <span style="font-size:0.75rem; background:var(--ios-green); padding:3px 10px; border-radius:999px; font-weight:700;">🔍 Klik Zoom</span>
            </div>
          </div>
          <div>
            <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: var(--ios-green); color:#fff;">🌟 Dokumentasi Mitra Resmi</span>
            <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.6rem, 2.5vw, 2.1rem); color: var(--ios-navy); margin: 8px 0 12px;">
              Evi Handayani — Konsultan & Tour Leader BNSP
            </h2>
            <p style="color: var(--ios-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 14px;">
              Dokumentasi resmi <b>Evi Handayani</b> berseragam resmi Samira Travel. Memegang sertifikasi kompetensi Pemimpin Perjalanan Wisata (Tour Leader) dari BNSP serta siap mendampingi proses konsultasi, pendaftaran, hingga keberangkatan jamaah dengan penuh keramahan dan transparansi.
            </p>
            <div class="profile-meta-chips" style="margin-bottom: 20px;">
              <span class="profile-meta-chip">📜 Sertifikasi BNSP Resmi</span>
              <span class="profile-meta-chip">📍 Wilayah Jakarta Timur & Nasional</span>
              <span class="profile-meta-chip">🕋 Layanan Ibadah Sepenuh Hati</span>
              <span class="profile-meta-chip">✈️ Mitra PPIU No. 137 Th 2020</span>
            </div>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <button class="btn btn-green" onclick="openLightbox('${m.photo}', '${m.name} — ${m.role}')">
                Perbesar Foto Mitra HD ↗
              </button>
              <a class="btn btn-gold" target="_blank" rel="noreferrer" href="https://wa.me/${SITE.phone}?text=${encodeURIComponent('Assalamu’alaikum Bu Evi, saya ingin konsultasi paket Umroh Samira Travel.')}">
                Hubungi via WhatsApp →
              </a>
            </div>
          </div>
        </div>

        <!-- Section 2: Dokumentasi Video Penerbangan Kabin Pesawat Batik Air -->
        <div class="cabin-video-card">
          <div class="cabin-video-grid">
            <div class="cabin-video-player-wrap">
              <span class="cabin-video-live-pill">Dokumentasi Video Penerbangan</span>
              <video
                controls
                playsinline
                preload="metadata"
                poster="${m.video.poster}"
                src="${m.video.src}">
                Browser Anda tidak mendukung tag video.
              </video>
            </div>
            <div>
              <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background: #dc2626; color:#fff;">📹 Video Dokumentasi Kabin</span>
              <h3 style="font-family: var(--ios-display-font); font-size: 1.45rem; color: var(--ios-navy); margin: 6px 0 10px;">
                ${m.video.title}
              </h3>
              <p style="color: var(--ios-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 12px;">
                Momen seru dan penuh kekompakan para jamaah Samira Travel bersama Tour Leader di kabin penerbangan Batik Air menuju Baitullah. Semangat ibadah, kehangatan kekeluargaan, dan saling mendoakan terjalin harmonis di setiap penerbangan.
              </p>
              
              <div class="cabin-chants-box">
                <div style="font-size:0.75rem; font-weight:800; text-transform:uppercase; color:var(--ios-secondary); letter-spacing:0.05em; margin-bottom:10px;">
                  Yel-Yel & Seruan Semangat Jamaah:
                </div>
                ${m.video.chants.map(c => `
                  <div class="cabin-chant-row">
                    <span class="chant-label">${c.q}</span>
                    <span class="chant-response">${c.a}</span>
                  </div>
                `).join('')}
              </div>

              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-green" onclick="openLightbox('${m.video.poster}', 'Keceriaan Jamaah Samira Travel di Kabin Pesawat Menuju Baitullah')">
                  Lihat Foto Kabin HD 🔍
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Featured Section: Dokumentasi Keberangkatan Akbar -->
        <div class="profile-overview-card" style="margin-bottom: 36px;">
          <div style="display: grid; grid-template-columns: 1.25fr 1fr; gap: 28px; align-items: center;" class="detail-layout">
            <div class="profile-bento-img" style="margin: 0; cursor: pointer;" onclick="openLightbox('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg', 'Dokumentasi Keberangkatan Akbar — 12 Titik Perjalanan Jamaah Samira Travel')">
              <img src="assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg" alt="Dokumentasi Keberangkatan Jamaah Samira Travel">
              <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(9, 41, 56, 0.85); color: #fff; padding: 6px 14px; border-radius: 999px; font-size: 0.78rem; backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2);">
                🔍 Klik untuk Zoom
              </div>
            </div>
            <div>
              <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content; background: #0c706b; color:#fff;">✈️ Dokumentasi Utama</span>
              <h2 style="font-family: var(--ios-display-font); font-size: clamp(1.6rem, 2.5vw, 2.1rem); color: var(--ios-navy); margin: 8px 0 14px;">
                Dokumentasi Keberangkatan Akbar Jamaah
              </h2>
              <p style="color: var(--ios-secondary); font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px;">
                Kompilasi 12 momen penting perjalanan jamaah Samira Travel: mulai dari kekhidmatan manasik akbar di tanah air, kebersamaan di bandara internasional, kenyamanan penerbangan charter pesawat penuh, ziarah bersejarah di Madinah, hingga pelaksanaan ibadah thawaf dan sa'i di Makkah Al-Mukarramah.
              </p>
              <div class="profile-meta-chips" style="margin-bottom: 16px;">
                <span class="profile-meta-chip">🕋 Ziarah Makkah & Madinah</span>
                <span class="profile-meta-chip">✈️ Charter 1 Pesawat Penuh</span>
                <span class="profile-meta-chip">🏨 Hotel Berbintang Dekat Masjid</span>
                <span class="profile-meta-chip">👥 Muthowwif & Muthowwiffah Mukim</span>
              </div>
              <button class="btn btn-green" onclick="openLightbox('assets/dokumentasi/dokumentasi-keberangkatan-poster.jpg', 'Dokumentasi Keberangkatan Akbar — 12 Titik Perjalanan Jamaah Samira Travel')">
                Lihat Poster Resolusi Penuh ↗
              </button>
            </div>
          </div>
        </div>

        <!-- Grid Dokumentasi Kegiatan & Pelayanan -->
        <div class="section-head">
          <div>
            <div class="eyebrow">Galeri Kegiatan Nyata</div>
            <h2 class="section-title">Dokumentasi Pelayanan & Jamaah</h2>
          </div>
          <span class="meta-chip">Klik foto untuk melihat ukuran penuh</span>
        </div>

        <div class="profile-docs-grid">
          ${documentationPhotos.map(doc => `
            <div class="profile-doc-card" onclick="openLightbox('${doc.image}', '${doc.title} — ${doc.caption}')" role="button" tabindex="0">
              <div class="profile-doc-img-wrap">
                <img src="${doc.image}" alt="${doc.title}" loading="lazy">
                <span class="profile-doc-badge">${doc.category}</span>
              </div>
              <div class="profile-doc-body">
                <h4 style="margin: 0 0 6px; font-size: 1rem; color: var(--ios-navy); font-weight: 700;">${doc.title}</h4>
                <p style="margin: 0 0 10px; font-size: 0.85rem; color: var(--ios-secondary); line-height: 1.5;">${doc.caption}</p>
                <div class="profile-doc-hint">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  Perbesar Foto
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${ctaBand()}
  `;
}

function testi() {
  return `
    ${pageHero('Testimoni Jamaah', 'Cerita dan kesan nyata para jamaah dalam berkonsultasi, beribadah, serta merasakan bimbingan ibadah terpercaya bersama Samira Travel.')}
    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Video Pengalaman Jamaah</div>
            <h2 class="section-title">Cerita Langsung dari Jamaah</h2>
          </div>
          <span class="meta-chip">✦ Dokumentasi Resmi Samira Travel</span>
        </div>
        <div class="video-testimonial-grid">
          ${testimonialVideos.map(videoCard).join('')}
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="container">
        <div class="section-head">
          <div>
            <div class="eyebrow">Ulasan & Kesan</div>
            <h2 class="section-title">Kesan Jamaah Bersama Evi Samira</h2>
          </div>
        </div>
        <div class="quote-grid">
          ${testimonials.map(quoteCard).join('')}
        </div>
      </div>
    </section>
    ${ctaBand()}
  `;
}

function articlesPage() {
  return `
    ${pageHero('Artikel & Panduan Umroh', 'Informasi dan wawasan bermanfaat untuk membantu Anda mempersiapkan perjalanan ibadah ke Tanah Suci.')}
    <section class="section">
      <div class="container article-grid">
        ${articles.map(a => `
          <article class="article-card">
            <span class="package-badge" style="position:static; margin-bottom:12px; width:fit-content;">${a.category}</span>
            <h3>${a.title}</h3>
            <div class="article-date">${a.date}</div>
            <p>${a.excerpt}</p>
            <a class="article-link" href="#/artikel/${a.slug}">Baca selengkapnya →</a>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function article(slug) {
  let a = articles.find(x => x.slug === slug) || articles[0];
  return `
    ${pageHero(a.title, a.excerpt)}
    <section class="section">
      <article class="container detail-main-card" style="max-width: 820px; padding: 40px;">
        <span class="package-badge" style="position:static; margin-bottom:14px; width:fit-content;">${a.category}</span>
        <div class="article-date" style="margin-bottom: 18px;">Dipublikasikan: ${a.date}</div>
        <h2 style="font-family: var(--ios-display-font); font-size: 2rem; color: var(--ios-navy); margin-bottom: 20px;">Persiapan Matang Menuju Tanah Suci</h2>
        <p style="color: var(--ios-secondary); line-height: 1.8; margin-bottom: 20px;">Halaman ini merupakan struktur artikel panduan. Sebelum memutuskan paket dan waktu keberangkatan, penting bagi calon jamaah untuk menanyakan aspek legalitas, akomodasi hotel, jarak ke Masjidil Haram dan Nabawi, serta fasilitas pendampingan selama di Tanah Suci.</p>
        <p style="color: var(--ios-secondary); line-height: 1.8; margin-bottom: 30px;">Melalui konsultasi personal dengan Evi Samira Jakarta Timur, Anda dapat mendiskusikan kebutuhan khusus anggota keluarga, lansia, maupun preferensi penerbangan secara terbuka.</p>
        <a class="btn btn-green" target="_blank" rel="noreferrer" href="${generalWA()}">Konsultasi Panduan via WhatsApp ↗</a>
      </article>
    </section>
  `;
}

function faq() {
  return `
    ${pageHero('Pertanyaan Umum (FAQ)', 'Jawaban singkat atas pertanyaan yang sering diajukan. Kami siap melanjutkan obrolan secara personal via WhatsApp.')}
    <section class="section">
      <div class="container faq-wrap">
        ${faqs.map(([q, a]) => `
          <details class="faq-item">
            <summary>${q}</summary>
            <p>${a}</p>
          </details>
        `).join('')}
      </div>
    </section>
    ${ctaBand()}
  `;
}

function legal() {
  return `
    ${pageHero('Legalitas & Keamanan', 'Transparansi dan integritas adalah fondasi rasa aman dalam merencanakan ibadah suci Anda.')}
    <section class="section">
      <div class="container legal-grid">
        <article class="legal-card">
          <span class="package-badge" style="position:static; margin-bottom:10px; width:fit-content; background:#0c706b; color:#fff;">Izin Resmi Kemenag</span>
          <h3>Izin PPIU No. 137 Tahun 2020</h3>
          <p>Induk penyelenggara adalah <b>PT. SAMIRA ALI WISATA (Samira Travel)</b> dengan izin resmi Penyelenggara Perjalanan Ibadah Umroh (PPIU) No. 137 Tahun 2020 dari Kementerian Agama RI. Evi Samira Jakarta Timur beroperasi sebagai mitra resmi terpercaya.</p>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
            <a class="btn btn-gold" href="#/profil-samira">Buka Profil & Bukti Dokumen SK ↗</a>
            <a class="btn btn-glass" href="https://www.samiratravel.co.id/" target="_blank" rel="noreferrer">Portal Resmi Samira ↗</a>
          </div>
        </article>
        <article class="legal-card">
          <h3>Dokumen & Sertifikasi</h3>
          <p>Seluruh materi informasi, sertifikat BNSP Tour Leader, dan referensi resmi dapat diverifikasi langsung untuk menjaga keabsahan dan rasa tenang calon jamaah.</p>
          <p style="font-size: 0.8rem; color: var(--ios-tertiary); font-style: italic;">Tidak ada klaim izin yang dibuat tanpa dokumen legalitas pendukung yang sah.</p>
        </article>
        <article class="legal-card">
          <h3>Keamanan Data Jamaah</h3>
          <p>Formulir konsultasi pada website ini langsung diarahkan ke pesan WhatsApp pribadi Evi Samira tanpa penyimpanan di database publik pihak ketiga.</p>
        </article>
        <article class="legal-card">
          <h3>Konfirmasi Pembayaran</h3>
          <p>Pastikan konfirmasi nomor rekening resmi perusahaan Samira Travel sebelum melakukan transaksi demi keamanan ibadah Anda.</p>
        </article>
      </div>
    </section>
  `;
}

function lead() {
  let preset = new URLSearchParams(location.hash.split('?')[1] || '').get('paket') || '';
  return `
    ${pageHero('Formulir Minat Umroh', 'Isi data singkat di bawah ini. Informasi akan langsung diformat rapi dan diteruskan ke WhatsApp Evi Samira.')}
    <section class="section">
      <div class="container" style="max-width: 880px;">
        <div class="form-card">
          <div class="notice">
            <span class="notice-icon">ⓘ</span>
            <div>Data tidak disimpan di server website. Begitu Anda klik tombol kirim, pesan WhatsApp akan terbuka otomatis dengan data kebutuhan Anda.</div>
          </div>
          <form id="lead-form" class="lead-form">
            <div class="form-group">
              <label>Nama Lengkap</label>
              <input required name="nama" placeholder="Contoh: Muhammad Ilham">
            </div>
            <div class="form-group">
              <label>Nomor WhatsApp</label>
              <input required name="whatsapp" type="tel" placeholder="Contoh: 08123456789">
            </div>
            <div class="form-group">
              <label>Kota Domisili</label>
              <input required name="kota" placeholder="Contoh: Jakarta Timur">
            </div>
            <div class="form-group">
              <label>Jumlah Calon Jamaah</label>
              <input required name="jumlah" type="number" min="1" placeholder="Contoh: 2">
            </div>
            <div class="form-group">
              <label>Paket yang Diminati</label>
              <select name="paket">
                <option value="">-- Pilih Paket --</option>
                ${packages.map(p => `<option ${preset === p.name ? 'selected' : ''}>${p.name}</option>`).join('')}
                <option>Lainnya / Perlu Konsultasi Dulu</option>
              </select>
            </div>
            <div class="form-group">
              <label>Perkiraan Bulan Keberangkatan</label>
              <input name="rencana" placeholder="Contoh: November 2026">
            </div>
            <div class="form-group full">
              <label>Catatan / Kebutuhan Khusus</label>
              <textarea name="pesan" rows="4" placeholder="Misal: Membawa lansia dengan kursi roda, pilihan kamar keluarga, dll."></textarea>
            </div>
            <button class="btn btn-green full" type="submit" style="padding: 16px; font-size: 1rem;">
              Kirim ke WhatsApp Evi Samira ↗
            </button>
          </form>
        </div>
      </div>
    </section>
  `;
}

function contact() {
  return `
    ${pageHero('Hubungi Evi Samira', 'Kami siap membantu Anda memulai langkah awal dengan konsultasi yang ramah dan bersahabat.')}
    <section class="section">
      <div class="container" style="max-width: 720px;">
        <div class="legal-card" style="text-align: center; padding: 48px 32px;">
          <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--ios-green-subtle); display: grid; place-content: center; margin: 0 auto 20px; font-size: 2rem; color: var(--ios-green);">💬</div>
          <h3>Konsultasi Langsung via WhatsApp</h3>
          <p style="max-width: 480px; margin: 0 auto 24px;">Silakan klik tombol di bawah untuk terhubung langsung dengan Evi Handayani (Mitra Samira Travel Jakarta Timur).</p>
          <div style="display: inline-block; background: rgba(9, 41, 56, 0.04); padding: 12px 24px; border-radius: var(--ios-radius-pill); margin-bottom: 24px;">
            <span style="font-size: 0.85rem; color: var(--ios-secondary);">Nomor WhatsApp Resmi:</span><br>
            <strong style="font-size: 1.2rem; color: var(--ios-navy);">${SITE.phoneDisplay}</strong>
          </div>
          <div>
            <a class="btn btn-gold" style="font-size: 1rem; padding: 14px 32px;" target="_blank" rel="noreferrer" href="${generalWA()}">Mulai Obrolan WhatsApp ↗</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function route() {
  let r = location.hash.slice(1) || '/';
  let path = r.split('?')[0], parts = path.split('/').filter(Boolean);
  let activeNav = parts[0] || 'beranda';
  updateActiveNav(activeNav);

  let view = home();
  if (parts[0] === 'paket' && parts[1]) view = detail(packages.find(p => p.slug === parts[1]) || packages[0]);
  else if (parts[0] === 'paket') view = packagesPage();
  else if (parts[0] === 'jadwal') view = schedule();
  else if (parts[0] === 'tentang') view = about();
  else if (parts[0] === 'dokumentasi') view = gallery();
  else if (parts[0] === 'testimoni') view = testi();
  else if (parts[0] === 'artikel' && parts[1]) view = article(parts[1]);
  else if (parts[0] === 'artikel') view = articlesPage();
  else if (parts[0] === 'profil-samira' || parts[0] === 'profil') view = samiraProfilePage();
  else if (parts[0] === 'faq') view = faq();
  else if (parts[0] === 'legalitas') view = legal();
  else if (parts[0] === 'daftar') view = lead();
  else if (parts[0] === 'kontak') view = contact();

  $('#app').innerHTML = view;
  window.scrollTo(0, 0);

  let f = $('#lead-form');
  if (f) {
    f.onsubmit = (e) => {
      e.preventDefault();
      let d = new FormData(f);
      let m = `Assalamu'alaikum, saya ingin mendaftar minat Umroh melalui Evi Samira Jakarta Timur.\n\n` +
              `Nama: ${d.get('nama')}\n` +
              `WhatsApp: ${d.get('whatsapp')}\n` +
              `Kota: ${d.get('kota')}\n` +
              `Jumlah jamaah: ${d.get('jumlah')}\n` +
              `Paket diminati: ${d.get('paket')}\n` +
              `Rencana keberangkatan: ${d.get('rencana')}\n` +
              `Catatan: ${d.get('pesan')}`;
      window.open(wa(m), '_blank', 'noopener');
    };
  }
}

window.openLightbox = function(src, caption) {
  const m = $('#lightbox-modal');
  const img = $('#lightbox-img');
  const cap = $('#lightbox-caption');
  if (m && img && cap) {
    img.src = src;
    cap.textContent = caption || '';
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
};

window.closeLightbox = function(e) {
  const m = $('#lightbox-modal');
  if (m) {
    m.classList.remove('open');
    document.body.style.overflow = '';
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeLightbox();
  }
});

initTheme();
nav();
footer();
window.addEventListener('hashchange', route);
route();
