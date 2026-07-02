// script.js — mouse/touch parallax controller
(function(){
  const stage = document.querySelector('.stage');
  const layers = Array.from(document.querySelectorAll('.layer'));

  function setParallax(x, y){
    const cx = stage.clientWidth/2;
    const cy = stage.clientHeight/2;
    const dx = (x - cx)/cx; // -1..1
    const dy = (y - cy)/cy;

    layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 0.2;
      const moveX = dx * depth * 30; // px
      const moveY = dy * depth * 18;
      const rotY = dx * depth * 4; // deg
      const rotX = -dy * depth * 4;
      layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  }

  function onMove(e){
    const rect = stage.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    setParallax(x, y);
  }

  // center on load
  window.addEventListener('load', ()=>{
    setParallax(stage.clientWidth/2, stage.clientHeight/2);
  });

  stage.addEventListener('mousemove', onMove);
  stage.addEventListener('touchmove', onMove, {passive:true});

})();
