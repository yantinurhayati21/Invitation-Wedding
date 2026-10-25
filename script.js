/**
 * THE WEDDING OF RIAN & EVI
 * Main Interactive Application Script
 */

// Global State
let isMusicPlaying = false;
const audioPlayer = document.getElementById('weddingMusic');
const musicDisc = document.getElementById('musicDisc');
const musicStatusText = document.getElementById('musicStatusText');

// Default Seed Wishes (Authentic messages from guests)
const defaultWishes = [
  {
    id: 1,
    nama: "Th nurul",
    ucapan: "Slamat menempuh hidup baru buat bestyyykuuuu, campur aduk rasanya antara seneng dan sedihh. Intinya lancar sampe hari-H 🥰🤗",
    kehadiran: "1",
    jumlah: "1",
    time: "2 hari yang lalu"
  },
  {
    id: 2,
    nama: "hani",
    ucapan: "hadir ga hadir tapi insyaallah diusahakan..., tapi selamattt sudah mau menikahh, samawa eviii 🫶🏻",
    kehadiran: "0",
    jumlah: "0",
    time: "2 hari yang lalu"
  },
  {
    id: 3,
    nama: "Salfa",
    ucapan: "yeyyy akhirnyaa selamat yaa teh evii semogaa lancar sampai hari h ❤️❤️❤️ spertinya aku tidak bisa hadir :((",
    kehadiran: "0",
    jumlah: "0",
    time: "3 hari yang lalu"
  },
  {
    id: 4,
    nama: "Dina aulia",
    ucapan: "Masya allahhh seng 🥺🫶🏻, lancar-lancar sampai hari h 💗",
    kehadiran: "1",
    jumlah: "1",
    time: "3 hari yang lalu"
  },
  {
    id: 5,
    nama: "Rian fauzi",
    ucapan: "Wilujeng vi, lancar-lancar smpe hari H 🤙🏼🙏🏼",
    kehadiran: "0",
    jumlah: "0",
    time: "4 hari yang lalu"
  },
  {
    id: 6,
    nama: "Rida",
    ucapan: "Masyaallahh barakallah vii ♥️🫂 ikut seneng denger kabar bahagia ini, semoga dimudahkan dan dilancarkan niat baiknya aamiin ya Alloh",
    kehadiran: "1",
    jumlah: "1",
    time: "4 hari yang lalu"
  },
  {
    id: 7,
    nama: "Alumni 9A: Dinda",
    ucapan: "Lancar sampai hari-H eviii, semoga jadi pasangan yang samawa sampai akhir hayat 🤲🏼 Untuk kehadiran insyaallah diusahakan, soalnya lagi masa² akhir magang ❤️",
    kehadiran: "1",
    jumlah: "1",
    time: "5 hari yang lalu"
  },
  {
    id: 8,
    nama: "TITIM ROHAENI",
    ucapan: "Sedih banget rasanya melepas sahabat dari kecil untuk menikah 🥺 tapi gpp asal jangan lupa ya kalau sahabat seperti ku tidak ada yang sama 🥰 semoga samawa ya Ceu selamat menempuh hidup baru",
    kehadiran: "1",
    jumlah: "5",
    time: "5 hari yang lalu"
  },
  {
    id: 9,
    nama: "Bumil kadal",
    ucapan: "Awww semogaa lancarr, sakinah mawadah warahmah 🥰🤲🏼 insyaallah hadir gmna kondisi utunn 😁🥹",
    kehadiran: "1",
    jumlah: "1",
    time: "6 hari yang lalu"
  },
  {
    id: 10,
    nama: "Jihan feriska",
    ucapan: "Finally, beb ikut bahagia for you, kaget banget secepet ini. Lancar sampai hari h ya! Love u 🥺🤍",
    kehadiran: "1",
    jumlah: "1",
    time: "1 minggu yang lalu"
  }
];

// ============================================================================
// 1. INITIALIZATION ON DOM CONTENT LOADED
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Lock scroll initially for cover overlay
  document.body.classList.add('lock-scroll');

  // Parse recipient name from URL
  parseGuestName();

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 60,
      easing: 'ease-out-cubic'
    });
  }

  // Initialize Countdown Timer
  initCountdownTimer();

  // Load and Render Wishes
  loadWishes();

  // Configure Save to Calendar link
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
// 2. RECIPIENT NAME URL PARSING (?kpd= or ?to= or ?nama=)
// ============================================================================
function parseGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get('kpd') || urlParams.get('to') || urlParams.get('nama');

  const guestRecipientEl = document.getElementById('guestRecipient');
  const rsvpNamaEl = document.getElementById('rsvpNama');

  if (guestName) {
    // Replace '+' with space and decode
    guestName = decodeURIComponent(guestName.replace(/\+/g, ' ')).trim();
    // Sanitize basic tags
    guestName = guestName.replace(/<[^>]*>?/gm, '');

    if (guestRecipientEl) guestRecipientEl.textContent = guestName;
    if (rsvpNamaEl) rsvpNamaEl.value = guestName;
  } else {
    if (guestRecipientEl) guestRecipientEl.textContent = 'Tamu Undangan';
  }
}

// ============================================================================
// 3. OPEN INVITATION (TRANSITION & MUSIC AUTOPLAY)
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
    }, 850);
  }

  // Play background music
  playMusic();

  // Refresh AOS animations
  if (typeof AOS !== 'undefined') {
    setTimeout(() => {
      AOS.refresh();
    }, 400);
  }

  // Start animated toast notifications
  startToastNotifications();
}

// ============================================================================
// 4. BACKGROUND MUSIC CONTROLS
// ============================================================================
function playMusic() {
  if (audioPlayer) {
    audioPlayer.play().then(() => {
      isMusicPlaying = true;
      updateMusicUI(true);
    }).catch(err => {
      console.warn("Autoplay audio blocked or pending user interaction:", err);
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
// 5. COUNTDOWN TIMER
// ============================================================================
function initCountdownTimer() {
  // Target Wedding Date: October 1, 2025 at 07:00:00 WIB
  const targetDate = new Date('2025-10-01T07:00:00+07:00').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const now = new Date().getTime();
    let distance = targetDate - now;

    // If target date has passed, keep values at 00 or calculate anniversary
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
// 6. SAVE TO GOOGLE CALENDAR
// ============================================================================
function configureCalendarLink() {
  const btnCalendar = document.getElementById('btnSaveCalendar');
  if (!btnCalendar) return;

  const eventTitle = encodeURIComponent("The Wedding of Rian & Evi");
  const eventDetails = encodeURIComponent("Pernikahan Rian Hidayat & Evi Siti Fatimah. Bertempat di Dusun Sukamaju Rt/Rw 26/12 Desa Talagasari, Kec. Kawali, Kab. Ciamis.");
  const eventLocation = encodeURIComponent("Dusun Sukamaju Rt/Rw 26/12 Desa Talagasari, Kec. Kawali, Kab. Ciamis");
  
  // Format: YYYYMMDDTHHMMSSZ
  const startTime = "20251001T000000Z";
  const endTime = "20251001T100000Z";

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startTime}/${endTime}&details=${eventDetails}&location=${eventLocation}`;

  btnCalendar.href = calendarUrl;
}

// ============================================================================
// 7. SMOOTH NAVIGATION & SCROLLSPY
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
    const scrollPosition = window.pageYOffset + 220;

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
// 8. RSVP & GUESTBOOK (WISHES)
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
  const stored = localStorage.getItem('wedding_wishes_rian_evi');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing stored wishes:", e);
    }
  }
  return defaultWishes;
}

function saveWishesToStorage(wishes) {
  localStorage.setItem('wedding_wishes_rian_evi', JSON.stringify(wishes));
}

function loadWishes() {
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

  wishes.forEach(item => {
    const isHadir = item.kehadiran === '1';
    const badgeClass = isHadir ? 'hadir' : 'tidak-hadir';
    const badgeText = isHadir ? `Hadir (${item.jumlah || 1} org)` : 'Tidak Hadir';
    const initial = (item.nama || 'T').charAt(0).toUpperCase();

    const wishItem = document.createElement('div');
    wishItem.className = 'wish-item';
    wishItem.innerHTML = `
      <div class="wish-avatar">${initial}</div>
      <div class="wish-content">
        <div class="wish-header">
          <span class="wish-author">${escapeHtml(item.nama)}</span>
          <span class="wish-badge ${badgeClass}">${badgeText}</span>
        </div>
        <p class="wish-text">${escapeHtml(item.ucapan)}</p>
        <span class="wish-time"><i class="fa-regular fa-clock"></i> ${item.time || 'Baru saja'}</span>
      </div>
    `;

    feedEl.appendChild(wishItem);
  });
}

function handleRsvpSubmit(e) {
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
    btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Mengirim...</span>`;
  }

  setTimeout(() => {
    const currentWishes = getStoredWishes();

    const newWish = {
      id: Date.now(),
      nama: nama,
      ucapan: ucapan,
      kehadiran: kehadiran,
      jumlah: jumlah,
      time: "Baru saja"
    };

    // Prepend to list
    currentWishes.unshift(newWish);
    saveWishesToStorage(currentWishes);

    // Re-render wishes
    renderWishesFeed(currentWishes);

    // Reset button & form
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span>Kirim Konfirmasi &amp; Ucapan</span>`;
    }

    ucapanInput.value = '';
    kehadiranInput.value = '';
    toggleGuestCount('');

    // Show success alert
    if (alertSuccess) {
      alertSuccess.style.display = 'flex';
      setTimeout(() => {
        alertSuccess.style.display = 'none';
      }, 5000);
    }
  }, 600);
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
// 9. COPY TO CLIPBOARD FUNCTIONALITY
// ============================================================================
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>Tersalin!</span>`;
    btnElement.style.backgroundColor = '#28a745';

    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      btnElement.style.backgroundColor = '';
    }, 2000);
  }).catch(err => {
    console.error("Gagal menyalin text:", err);
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>Tersalin!</span>`;
    btnElement.style.backgroundColor = '#28a745';
    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      btnElement.style.backgroundColor = '';
    }, 2000);
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
// 10. MODAL DIALOGS (LIGHTBOX & KADO ADDRESS)
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
    return; // Don't close if clicking the image itself
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
// 11. FLOATING TOAST NOTIFICATION (POPUP UCAPAN TAMU)
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

  // Initial delay then repeat every 8 seconds
  setTimeout(() => {
    showRandomToast();
    setInterval(showRandomToast, 8500);
  }, 2500);
}
