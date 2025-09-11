// Minimal carousel controls for the Live page
(function(){
  const track = document.getElementById('liveCarousel');
  if (!track) return;
  const prev = document.querySelector('.carousel .prev');
  const next = document.querySelector('.carousel .next');

  const scrollByAmount = () => {
    // Scroll by approximately one image width plus gap
    const img = track.querySelector('img');
    const gap = 16; // must match inline style
    return (img ? img.getBoundingClientRect().width : 320) + gap;
  };

  function scroll(dir){
    track.scrollBy({ left: dir * scrollByAmount(), behavior: 'smooth' });
  }

  if (prev) prev.addEventListener('click', () => scroll(-1));
  if (next) next.addEventListener('click', () => scroll(1));
})();
