const fileInput = document.querySelector('.file-input');
const progressArea = document.querySelector('.progress-area');
const uploadedArea = document.querySelector('.uploaded-area');
const submitBtn = document.querySelector('.submit');

// Trigger file selection when clicking the upload icon or text
const uploadIcon = document.querySelector('i.fas.fa-cloud-upload-alt');
const uploadText = document.querySelector('p');
uploadIcon.addEventListener('click', () => fileInput.click());
uploadText.addEventListener('click', () => fileInput.click());

// Fonction pour afficher le nom du fichier
const updateFileName = (fileName) => {
  const nameFileEl = document.querySelector('.name-file');
  if (fileName.length > 13) {
    let splitName = fileName.split('.');
    nameFileEl.textContent = splitName[0].substring(0, 13) + "... ." + splitName[1];
  } else {
    nameFileEl.textContent = fileName;
  }
};

// Gérer la sélection du fichier
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  updateFileName(file.name);
});

// Envoyer le fichier au serveur lors du clic sur le bouton "SEND"
submitBtn.addEventListener('click', (event) => {
  event.preventDefault(); // Empêcher le rechargement de la page

  const file = fileInput.files[0];

  // FormData pour envoyer le fichier
  const formData = new FormData();
  formData.append('file', file);

  // Envoyer une requête POST au serveur (remplacer avec votre endpoint)
  fetch('/votre-endpoint-serveur', {
    method: 'POST',
    body: formData,
    progress: (event) => {
      // Mettre à jour la barre de progression
      const percentCompleted = Math.round((event.loaded * 100) / event.total);
      progressArea.innerHTML = `<progress value="${percentCompleted}" max="100">${percentCompleted}%</progress>`;
    }
  })
  .then(response => response.json())
  .then(data => {
    // Gérer la réponse du serveur (afficher un message de succès ou d'erreur)
    console.log(data);
    progressArea.innerHTML = ''; // Nettoyer la barre de progression
    uploadedArea.textContent = 'Fichier téléchargé avec succès !';
  })
  .catch(error => {
    console.error(error);
    progressArea.innerHTML = ''; // Nettoyer la barre de progression
    uploadedArea.textContent = 'Échec du téléchargement.';
  });
});
