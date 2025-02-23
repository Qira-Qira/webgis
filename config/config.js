document.addEventListener("DOMContentLoaded", function() {
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.2 };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));
  });
  
  window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    const headerHeight = document.querySelector('header').offsetHeight;
    if (window.scrollY > headerHeight * 0.8) {
      nav.classList.add('sticky-nav');
      // Hapus kelas layout awal agar tidak bentrok
      nav.classList.remove('absolute', 'bottom-8', 'rounded-full', 'bg-yellow-400', 'text-black');
    } else {
      nav.classList.remove('sticky-nav');
      // Kembalikan kelas awal
      nav.classList.add('absolute', 'bottom-8', 'rounded-full', 'bg-yellow-400', 'text-black');
    }
  });
  
  // Inisialisasi Leaflet Map di section "Peta Interaktif WebGIS"
  document.addEventListener("DOMContentLoaded", function() {
    // Atur tampilan awal ke Kabupaten Panajam, Kalimantan Selatan (aproksimasi Banjarmasin)
    var map = L.map('map').setView([-3.3167, 114.5833], 10);
    
    // Tambahkan layer peta dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Tambahkan marker dan popup
    L.marker([-3.3167, 114.5833]).addTo(map)
      .bindPopup('Kabupaten Panajam, Kalimantan Selatan')
      .openPopup();
  });

  window.addEventListener("DOMContentLoaded", function(){
    const scrollLinks = document.querySelectorAll('.scroll-link');

  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); 

      const targetID = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {

        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }); 
  });