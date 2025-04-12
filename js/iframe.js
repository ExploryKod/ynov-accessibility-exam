
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
  
  function toggleTranscript() {
    const transcriptContent = document.getElementById('transcript-content');
    const button = document.querySelector('.transcript-section button');
  
    // Récupère l'état actuel de aria-expanded
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
    // Toggle the visibility of the transcript content
    if (isExpanded) {
      transcriptContent.hidden = true;
      transcriptContent.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
      button.textContent = 'Afficher la transcription';
    } else {
      transcriptContent.hidden = false;
      transcriptContent.setAttribute('aria-hidden', 'false');
      button.setAttribute('aria-expanded', 'true');
      button.textContent = 'Fermer la transcription';
    }
  }
  
