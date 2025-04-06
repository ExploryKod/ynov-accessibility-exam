
  const form = document.getElementById('contact-form');

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
        errorMessage: 'Adresse email invalide',
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

      const formData = new FormData(form);

      try {
        const response = await fetch('/form.php', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        const result = await response.json();

        if (response.ok) {
          alert('Merci pour votre message !');
          form.reset();
        } else {
          alert(result.error || 'Une erreur est survenue.');
        }
      } catch (error) {
        alert('Erreur de communication avec le serveur.');
        console.error(error);
      }
    });
