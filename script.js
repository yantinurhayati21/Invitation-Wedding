/**
 * THE WEDDING OF ASTRI DIANTI & RIYAN FEBRIANA FAWZI
 * Mahogany Luxury Edition - Interactive Script with Google Sheets Integration
 */

// ============================================================================
// CONFIGURATION: GOOGLE SHEETS ENDPOINT URL
// ============================================================================
// Masukkan URL Web App Google Apps Script Anda di sini.
// Panduan lengkap 2 menit ada di file: google-apps-script.js
// Contoh: const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyxxxxxxx/exec";
const GOOGLE_SHEET_URL = "";

// Global State
let isMusicPlaying = false;
const audioPlayer = document.getElementById('weddingMusic');
const musicDisc = document.getElementById('musicDisc');
const musicStatusText = document.getElementById('musicStatusText');

// Default Wishes (Clean slate - no dummy/sample wishes)
const defaultWishes = [];

// ============================================================================
// 1. INITIALIZATION ON DOM CONTENT LOADED
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Lock scroll initially for cover overlay
  document.body.classList.add('lock-scroll');

  // Clean up any legacy dummy sample wishes from localStorage
  cleanupLegacySampleWishes();

  // Parse recipient name from URL
  parseGuestName();

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 50,
      easing: 'ease-out-cubic'
    });
  }

  // Initialize Ambient Sparkles Canvas
  initAmbientSparkles();

  // Initialize Countdown Timer for 13 Desember 2026
  initCountdownTimer();

  // Load and Render Wishes (Fetches live from Google Sheets if configured)
  loadWishes();

  // Configure Save to Google Calendar link
  configureCalendarLink();

  // Setup Cover Open Button
  const btnOpen = document.getElementById('btnOpenInvitation');
  if (btnOpen) {
    btnOpen.addEventListener('click', openInvitation);
  }

  // Setup RSVP Form Submission
  const rsvpForm = document.getElementById('rsvpForm');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', handleRsvpSubmit);
  }

  // Setup ScrollSpy for Active Navigation Items
  initScrollSpy();
});

// ============================================================================
// 2. CLEANUP LEGACY SAMPLE DATA
// ============================================================================
function cleanupLegacySampleWishes() {
  const storageKey = 'wedding_wishes_astri_riyan';
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    if (stored.includes('Nisa & Keluarga') || stored.includes('Dede Kurniawan') || stored.includes('Th nurul')) {
      localStorage.removeItem(storageKey);
    }
  }
  if (localStorage.getItem('wedding_wishes_rian_evi')) {
    localStorage.removeItem('wedding_wishes_rian_evi');
  }
}

// ============================================================================
// 3. RECIPIENT NAME URL PARSING (?kpd= or ?to= or ?nama=)
// ============================================================================
function parseGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get('kpd') || urlParams.get('to') || urlParams.get('nama');

  const guestRecipientEl = document.getElementById('guestRecipient');
  const rsvpNamaEl = document.getElementById('rsvpNama');

  if (guestName) {
    guestName = decodeURIComponent(guestName.replace(/\+/g, ' ')).trim();
    guestName = guestName.replace(/<[^>]*>?/gm, '');

    if (guestRecipientEl) guestRecipientEl.textContent = guestName;
    if (rsvpNamaEl) rsvpNamaEl.value = guestName;
  } else {
    if (guestRecipientEl) guestRecipientEl.textContent = 'Tamu Undangan';
  }
}

// ============================================================================
// 4. OPEN INVITATION (TRANSITION & MUSIC AUTOPLAY)
// ============================================================================
function openInvitation() {
  const coverOverlay = document.getElementById('coverOverlay');

  // Unlock body scroll
  document.body.classList.remove('lock-scroll');

  // Slide cover up
  if (coverOverlay) {
    coverOverlay.classList.add('cover-hidden');
    setTimeout(() => {
      coverOverlay.style.display = 'none';
    }, 900);
  }

  // Play background music
  playMusic();

  // Refresh AOS animations
  if (typeof AOS !== 'undefined') {
    setTimeout(() => {
      AOS.refresh();
    }, 450);
  }

  // Start animated toast notifications
  startToastNotifications();
}

// ============================================================================
// 5. BACKGROUND MUSIC CONTROLS
// ============================================================================
function playMusic() {
  if (audioPlayer) {
    audioPlayer.play().then(() => {
      isMusicPlaying = true;
      updateMusicUI(true);
    }).catch(err => {
      console.warn("Autoplay audio blocked or waiting for user gesture:", err);
      isMusicPlaying = false;
      updateMusicUI(false);
    });
  }
}

function pauseMusic() {
  if (audioPlayer) {
    audioPlayer.pause();
    isMusicPlaying = false;
    updateMusicUI(false);
  }
}

function toggleMusic() {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function updateMusicUI(isPlaying) {
  if (!musicDisc || !musicStatusText) return;

  if (isPlaying) {
    musicDisc.classList.add('is-spinning');
    musicStatusText.textContent = 'Pause';
  } else {
    musicDisc.classList.remove('is-spinning');
    musicStatusText.textContent = 'Play';
  }
}

// ============================================================================
// 6. COUNTDOWN TIMER (TARGET: 13 DESEMBER 2026, 08:00 WIB)
// ============================================================================
function initCountdownTimer() {
  const targetDate = new Date('2026-12-13T08:00:00+07:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    if (distance < 0) {
      distance = 0;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ============================================================================
// 7. SAVE TO GOOGLE CALENDAR
// ============================================================================
function configureCalendarLink() {
  const btnCalendar = document.getElementById('btnSaveCalendar');
  if (!btnCalendar) return;

  const eventTitle = encodeURIComponent("The Wedding of Astri & Riyan");
  const eventDetails = encodeURIComponent("Pernikahan Astri Dianti & Riyan Febriana Fawzi. Bertempat di Dusun Kiaralawang RT 1/RW 2, Kecamatan Kawali, Kabupaten Ciamis, Jawa Barat.");
  const eventLocation = encodeURIComponent("Dusun Kiaralawang RT 1/RW 2, Kecamatan Kawali, Kabupaten Ciamis, Jawa Barat");
  
  const startTime = "20261213T010000Z";
  const endTime = "20261213T100000Z";

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&details=${eventDetails}&location=${eventLocation}`;

  btnCalendar.href = calendarUrl;
}

// ============================================================================
// 8. SMOOTH NAVIGATION & SCROLLSPY
// ============================================================================
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navItems = document.querySelectorAll('.bottom-nav-inner .nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.pageYOffset + 240;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navItems.forEach(item => {
        item.classList.remove('active');
        const onclickAttr = item.getAttribute('onclick') || '';
        if (onclickAttr.includes(`'${currentId}'`)) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ============================================================================
// 9. RSVP & GUESTBOOK (WISHES & GOOGLE SHEETS SYNC)
// ============================================================================
function toggleGuestCount(val) {
  const groupGuest = document.getElementById('groupGuestCount');
  if (groupGuest) {
    if (val === '1') {
      groupGuest.style.display = 'block';
    } else {
      groupGuest.style.display = 'none';
    }
  }
}

function getStoredWishes() {
  const storageKey = 'wedding_wishes_astri_riyan';
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.error("Error parsing stored wishes:", e);
    }
  }
  return defaultWishes;
}

function saveWishesToStorage(wishes) {
  localStorage.setItem('wedding_wishes_astri_riyan', JSON.stringify(wishes));
}

// Load wishes: if GOOGLE_SHEET_URL is set, fetch from Google Sheets; otherwise use local storage
async function loadWishes() {
  if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim() !== "") {
    try {
      const response = await fetch(GOOGLE_SHEET_URL);
      if (response.ok) {
        const liveWishes = await response.json();
        if (Array.isArray(liveWishes)) {
          saveWishesToStorage(liveWishes);
          renderWishesFeed(liveWishes);
          return;
        }
      }
    } catch (err) {
      console.warn("Gagal memuat ucapan dari Google Sheet, menggunakan cadangan lokal:", err);
    }
  }

  // Fallback to local storage
  const wishes = getStoredWishes();
  renderWishesFeed(wishes);
}

function renderWishesFeed(wishes) {
  const feedEl = document.getElementById('wishesFeed');
  const countEl = document.getElementById('wishesCount');

  if (!feedEl) return;

  if (countEl) {
    countEl.textContent = `${wishes.length} Ucapan`;
  }

  feedEl.innerHTML = '';

  if (!wishes || wishes.length === 0) {
    feedEl.innerHTML = `
      <div class="empty-wishes-state">
        <div class="empty-icon-wrap">
          <i class="fa-regular fa-comment-dots"></i>
        </div>
        <p class="empty-title">Belum Ada Ucapan</p>
        <span class="empty-desc">Jadilah yang pertama mengirimkan ucapan &amp; doa restu untuk Astri &amp; Riyan!</span>
      </div>
    `;
    return;
  }

  wishes.forEach(item => {
    const isHadir = item.kehadiran === '1';
    const badgeClass = isHadir ? 'hadir' : 'tidak-hadir';
    const badgeText = isHadir ? `Hadir (${item.jumlah || 1} org)` : 'Tidak Hadir';
    const initial = (item.nama || 'T').charAt(0).toUpperCase();

    const wishItem = document.createElement('div');
    wishItem.className = 'wish-single-card';
    wishItem.innerHTML = `
      <div class="wish-initial-badge">${initial}</div>
      <div class="wish-detail-body">
        <div class="wish-meta-row">
          <span class="wish-user-name">${escapeHtml(item.nama)}</span>
          <span class="attendance-tag ${badgeClass}">${badgeText}</span>
        </div>
        <p class="wish-message-body">${escapeHtml(item.ucapan)}</p>
        <span class="wish-timestamp"><i class="fa-regular fa-clock"></i> ${item.time || 'Baru saja'}</span>
      </div>
    `;

    feedEl.appendChild(wishItem);
  });
}

async function handleRsvpSubmit(e) {
  e.preventDefault();

  const namaInput = document.getElementById('rsvpNama');
  const ucapanInput = document.getElementById('rsvpUcapan');
  const kehadiranInput = document.getElementById('rsvpKehadiran');
  const jumlahInput = document.getElementById('rsvpJumlah');
  const btnSubmit = document.getElementById('btnSubmitRsvp');
  const alertSuccess = document.getElementById('rsvpSuccessAlert');

  const nama = namaInput.value.trim();
  const ucapan = ucapanInput.value.trim();
  const kehadiran = kehadiranInput.value;
  const jumlah = kehadiran === '1' ? (jumlahInput ? jumlahInput.value : '1') : '0';

  if (!nama || !ucapan || !kehadiran) {
    alert("Mohon lengkapi formulir sebelum mengirim!");
    return;
  }

  // Button loading state
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Menyimpan Doa...</span>`;
  }

  const newWish = {
    id: Date.now(),
    nama: nama,
    ucapan: ucapan,
    kehadiran: kehadiran,
    jumlah: jumlah,
    time: "Baru saja"
  };

  // Instantly render in UI so there is zero delay for the user
  const currentWishes = getStoredWishes();
  currentWishes.unshift(newWish);
  saveWishesToStorage(currentWishes);
  renderWishesFeed(currentWishes);

  // Send to Google Sheets if configured
  if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.trim() !== "") {
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newWish)
      });
    } catch (err) {
      console.warn("Pengiriman data ke Google Sheet menemui kendala:", err);
    }
  }

  // Reset form
  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Kirim Konfirmasi &amp; Doa</span>`;
  }

  ucapanInput.value = '';
  kehadiranInput.value = '';
  toggleGuestCount('');

  if (alertSuccess) {
    alertSuccess.style.display = 'flex';
    setTimeout(() => {
      alertSuccess.style.display = 'none';
    }, 5000);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// 10. COPY TO CLIPBOARD FUNCTIONALITY
// ============================================================================
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>Nomor BRI Tersalin!</span>`;
    btnElement.style.background = '#2E7D32';
    btnElement.style.color = '#FFFFFF';

    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      btnElement.style.background = '';
      btnElement.style.color = '';
    }, 2500);
  }).catch(err => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>Nomor BRI Tersalin!</span>`;
    btnElement.style.background = '#2E7D32';
    btnElement.style.color = '#FFFFFF';
    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      btnElement.style.background = '';
      btnElement.style.color = '';
    }, 2500);
  });
}

function copyAddressToClipboard() {
  const fullAddress = document.getElementById('fullAddress').textContent.trim();
  const btnText = document.getElementById('btnCopyAddressText');

  navigator.clipboard.writeText(fullAddress).then(() => {
    if (btnText) btnText.textContent = "Alamat Berhasil Disalin!";
    setTimeout(() => {
      if (btnText) btnText.textContent = "Salin Alamat Lengkap";
    }, 2500);
  });
}

// ============================================================================
// 11. MODAL DIALOGS (LIGHTBOX & KADO ADDRESS)
// ============================================================================
function openLightbox(imgSrc) {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');

  if (lightboxModal && lightboxImg) {
    lightboxImg.src = imgSrc;
    lightboxModal.classList.add('active');
  }
}

function closeLightbox(event) {
  if (event && event.target && event.target.id === 'lightboxImg') {
    return;
  }
  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    lightboxModal.classList.remove('active');
  }
}

function openKadoAddressModal() {
  const kadoModal = document.getElementById('kadoModal');
  if (kadoModal) {
    kadoModal.classList.add('active');
  }
}

function closeKadoModal() {
  const kadoModal = document.getElementById('kadoModal');
  if (kadoModal) {
    kadoModal.classList.remove('active');
  }
}

function closeKadoModalOnBackdrop(event) {
  if (event.target && event.target.id === 'kadoModal') {
    closeKadoModal();
  }
}

// ============================================================================
// 12. FLOATING TOAST NOTIFICATION (POPUP UCAPAN TAMU)
// ============================================================================
function startToastNotifications() {
  const toastEl = document.getElementById('toastNotification');
  const toastAuthor = document.getElementById('toastAuthor');
  const toastMsg = document.getElementById('toastMessage');

  if (!toastEl || !toastAuthor || !toastMsg) return;

  function showRandomToast() {
    const wishes = getStoredWishes();
    if (!wishes || wishes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * wishes.length);
    const item = wishes[randomIndex];

    toastAuthor.textContent = item.nama;
    toastMsg.textContent = item.ucapan;

    toastEl.classList.add('toast-show');

    setTimeout(() => {
      toastEl.classList.remove('toast-show');
    }, 4500);
  }

  setInterval(showRandomToast, 9500);
}

// ============================================================================
// 13. AMBIENT GOLDEN SPARKLES CANVAS
// ============================================================================
function initAmbientSparkles() {
  const canvas = document.getElementById('ambientCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 28;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      pulse: Math.random() * 0.02 + 0.01
    });
  }

  function renderSparkles() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += Math.sin(Date.now() * 0.002) * 0.01;

      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 150, 97, ${Math.max(0.15, Math.min(0.85, p.opacity))})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#F3DCB8";
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(renderSparkles);
  }

  renderSparkles();
}
