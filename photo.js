// file: photo.js
function initPhotoUpload() {
  const photoBtn = document.getElementById("photoBtn");
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");

  photoBtn.addEventListener("click", () => {
    photoInput.click();
  });

  photoInput.addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = e => {
      photoPreview.innerHTML = `<img src="${e.target.result}" alt="Student Photo">`;
    };

    reader.readAsDataURL(file);
  });
}