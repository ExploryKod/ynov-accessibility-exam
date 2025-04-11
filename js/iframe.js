
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
  
  /* Pour les utilisateur pour qui la vidéo ne peux être lu, il y a cette alternative : la transcription */
  function toggleTranscript() {
  const transcriptContent = document.getElementById('transcript-content');
  const button = document.querySelector('.transcript-section button');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';

  // Toggle the visibility and aria-hidden attribute
  transcriptContent.hidden = !isExpanded;
  transcriptContent.setAttribute('aria-hidden', (!isExpanded).toString());

  // Toggle the aria-expanded attribute
  button.setAttribute('aria-expanded', (!isExpanded).toString());

  // Update the button text
  if (isExpanded) {
    button.textContent = 'Fermer la transcription';
  } else {
    button.textContent = 'Afficher la transcription';
  }
}

