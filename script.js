// file: script.js
document.addEventListener("DOMContentLoaded", () => {
  initNrcBoxes();
  initAcademicFields();
  initExamHistoryFields();
  initPhotoUpload();

  const form = document.getElementById("admissionForm");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const invalidNrc = [...document.querySelectorAll(".nrc-box")].some(box => {
      const hasValue = [...box.querySelectorAll(".nrc-number-boxes input")]
        .some(input => input.value.trim() !== "");

      return hasValue && !box.dataset.fullNrc;
    });

    if (invalidNrc) {
      alert("NRC number ကို ဂဏန်း ၆ လုံး ပြည့်အောင် ထည့်ပါ။");
      return;
    }

    const data = {
      courseYear: document.getElementById("courseYear").selectedOptions[0].textContent,
      semester: document.getElementById("semester").value,
      major: document.getElementById("majorSubject").value,
      rollNo: document.getElementById("rollPrefix").textContent + document.getElementById("rollNumber").value,
      bloodGroup: document.getElementById("bloodGroup").value,
    };

    sessionStorage.setItem("studentFormData", JSON.stringify(data));

    window.location.href = "second/index.html";
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