
  const form = document.getElementById('contact-form');
  const messageContainer = document.getElementById('form-message');

  const validation = new JustValidate('#contact-form', {
    errorLabelStyle: {
      color: '#D8000C',
      fontSize: '0.9rem',
    },
    validateBeforeSubmitting: true,
    focusInvalidField: true,
  });

  validation
    .addField('#nom', [
      {
        rule: 'required',
        errorMessage: 'Le nom est obligatoire',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'L\'email est obligatoire',
      },
      {
        rule: 'email',
        errorMessage: 'Adresse email invalide, la bonne forme est par exemple: nom@gmail.com',
      },
    ])
    .addField('#message', [
      {
        rule: 'required',
        errorMessage: 'Le message est obligatoire',
      },
    ])
    .onSuccess(async (event) => {
      event.preventDefault();
      messageContainer.className = 'form-message';
      messageContainer.style.display = 'block';
      messageContainer.textContent = '⏳ Message en cours d’envoi...';
    
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
    
      try {
        // Simule un appel serveur
        await new Promise(resolve => setTimeout(resolve, 1000));
    
        // Succès
        messageContainer.textContent = '✅ Merci pour votre message ! Nous vous répondrons rapidement.';
        messageContainer.classList.add('success');
        submitButton.disabled = false;
        form.reset();
      } catch (error) {
        messageContainer.textContent = '❌ Une erreur est survenue lors de l’envoi.';
        messageContainer.classList.add('error');
        submitButton.disabled = false;
        console.error(error);
      }
      
      });
    
