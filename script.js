function updateAllNrcResult() {
  const boxes = document.querySelectorAll(".nrc-box");
  const result = document.getElementById("allNrcResult");
  const labels = ["ကျောင်းသား/သူ", "အဖ", "အမိ"];

  const lines = [...boxes].map((box, index) => {
    return `${labels[index]}: ${box.dataset.fullNrc || "မပြည့်စုံသေးပါ"}`;
  });

  result.innerHTML = lines.join("<br>");
}

document.addEventListener("DOMContentLoaded", () => {
  initNrcBoxes();
  initAcademicFields();
  initPhotoUpload();
  updateAllNrcResult();

  const form = document.getElementById("admissionForm");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const invalidNrc = [...document.querySelectorAll(".nrc-box")].some(box => !box.dataset.fullNrc);

    if (invalidNrc) {
      alert("Student / Father / Mother NRC number ကို ဂဏန်း ၆ လုံးစီ ပြည့်အောင် ထည့်ပါ။");
      return;
    }

    const academic = document.getElementById("academicPreview").textContent;
    const nrcResult = document.getElementById("allNrcResult").innerText;

    alert(`Demo Submit Success!\n\n${academic}\n\n${nrcResult}`);
  });

  form.addEventListener("reset", () => {
    setTimeout(() => {
      resetNrcBoxes();
      resetAcademicFields();
      document.getElementById("photoPreview").innerHTML = "<span>ဓာတ်ပုံ(၄)ပုံ<br />ကပ်ရန်နေရာ</span>";
    }, 0);
  });
});
