
function playVideo() {
    const iframe = document.getElementById('bordeaux-iframe');
    const posterContainer = document.querySelector('.poster-container');
    if (iframe && posterContainer) {
      posterContainer.style.display = 'none'; 
      iframe.src += "&autoplay=1"; 
    }
  }
  
/* Pour les utilisateur du clavier seulement, il suffira d'appuyer sur entrée pour démarrer ma vidéo */
  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      playVideo();
    }
  }
  


