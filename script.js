// Menú responsive
const toggleBtn = document.getElementById('btn-toggle-nav');
const nav = document.querySelector('nav');
toggleBtn.addEventListener('click', () => nav.classList.toggle('show'));

// Carrusel
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const dots = document.querySelector('.dots');
  let current = 0;
  let autoplay;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    slides[index].classList.add('active');
    dots.querySelectorAll('button')[index].classList.add('active');
    current = index;
  }

  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    if(i===0) btn.classList.add('active');
    btn.addEventListener('click', ()=>{showSlide(i); resetAutoplay();});
    dots.appendChild(btn);
  });

  function nextSlide() { showSlide((current+1)%slides.length); }
  function prevSlide() { showSlide((current-1+slides.length)%slides.length); }

  next.addEventListener('click', ()=>{ nextSlide(); resetAutoplay(); });
  prev.addEventListener('click', ()=>{ prevSlide(); resetAutoplay(); });

  function startAutoplay() { autoplay = setInterval(nextSlide,5000); }
  function resetAutoplay(){ clearInterval(autoplay); startAutoplay(); }
  startAutoplay();
});

// Filtro por temas
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#tema-grid .card');
filterBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c=>{
      c.style.display = (f==='all'||c.dataset.tags.includes(f))?'block':'none';
    });
  });
});

// GOOGLE MAPS
function initMap(){
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:20,lng:0}, zoom:2
  });
  const museums={
    louvre:{lat:48.8606,lng:2.3376},
    met:{lat:40.7794,lng:-73.9632},
    britanico:{lat:51.5194,lng:-0.1270},
    vaticanos:{lat:41.9065,lng:12.4536},
    prado:{lat:40.4138,lng:-3.6921},
    hermitage:{lat:59.9398,lng:30.3146},
    moma:{lat:40.7614,lng:-73.9776},
    galeria:{lat:51.5089,lng:-0.1283},
    antropologia:{lat:19.4260,lng:-99.1860},
    orsay:{lat:48.8600,lng:2.3266}
  };
  const select = document.getElementById('museum-select');
  const btn = document.getElementById('open-google');

  select.addEventListener('change',()=>{
    const val = select.value;
    if(val==='all'){ map.setZoom(2); map.setCenter({lat:20,lng:0}); return; }
    const coords = museums[val];
    map.setCenter(coords); map.setZoom(14);
    new google.maps.Marker({position:coords,map:map});
  });

  btn.addEventListener('click',()=>{
    const val = select.value;
    if(val==='all') return window.open('https://www.google.com/maps','_blank');
    const c = museums[val];
    window.open(`https://www.google.com/maps?q=${c.lat},${c.lng}`,'_blank');
  });

  // Marcadores de todos los museos
  Object.values(museums).forEach(c=>{ new google.maps.Marker({position:c,map:map}); });
}
  
  const carousel = document.getElementById('carousel');
  if (carousel) {
    carousel.setAttribute('aria-live', 'polite');
    carousel.setAttribute('aria-atomic', 'true');
  };

document.addEventListener('keydown', function(e) {
  const activeSlide = document.querySelector('.slide.active');
  if (!activeSlide) return;
  
  if (e.key === 'ArrowLeft') {
    document.querySelector('.prev').click();
  } else if (e.key === 'ArrowRight') {
    document.querySelector('.next').click();
  }
});