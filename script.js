// file: script.js
document.addEventListener("DOMContentLoaded", () => {
  initNrcBoxes();
  initAcademicFields();
  initPhotoUpload();

  const form = document.getElementById("admissionForm");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const invalidNrc = [...document.querySelectorAll(".nrc-box")].some(box => {
      const numberInput = box.querySelector(".nrc-number");
      return numberInput.value.trim() !== "" && !box.dataset.fullNrc;
    });

    if (invalidNrc) {
      alert("NRC number ကို ဂဏန်း ၆ လုံး ပြည့်အောင် ထည့်ပါ။");
      return;
    }

    alert("Demo Submit Success!");
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      resetNrcBoxes();
      resetAcademicFields();
      document.getElementById("photoPreview").innerHTML =
        "<span>ဓာတ်ပုံ(၄)ပုံ<br />ကပ်ရန်နေရာ</span>";
    }, 0);
  });
});