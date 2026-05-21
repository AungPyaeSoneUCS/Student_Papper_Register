// file: academic.js
const yearNames = {
  "1": "First Year",
  "2": "Second Year",
  "3": "Third Year",
  "4": "Fourth Year",
  "5": "Fifth Year"
};

function getRollPrefix() {
  const courseYear = document.getElementById("courseYear").value;
  const major = document.getElementById("majorSubject").value;
  return `${courseYear}${major}-`;
}

function updateMajorOptions() {
  const courseYear = document.getElementById("courseYear").value;
  const majorSelect = document.getElementById("majorSubject");

  majorSelect.innerHTML = "";

  if (courseYear === "1") {
    majorSelect.innerHTML = `
      <option value="CST">Computer Science and Technology (CST)</option>
    `;
    majorSelect.value = "CST";
  } else {
    majorSelect.innerHTML = `
      <option value="CS">Computer Science (CS)</option>
      <option value="CT">Computer Technology (CT)</option>
    `;
    majorSelect.value = "CS";
  }

  updateAcademicPreview();
}

function updateAcademicPreview() {
  const rollNumber = document.getElementById("rollNumber");
  const rollPrefix = document.getElementById("rollPrefix");

  rollNumber.value = rollNumber.value.replace(/[^0-9]/g, "").slice(0, 3);
  rollPrefix.textContent = getRollPrefix();
}

function initAcademicFields() {
  document.getElementById("courseYear").addEventListener("change", updateMajorOptions);
  document.getElementById("semester").addEventListener("change", updateAcademicPreview);
  document.getElementById("majorSubject").addEventListener("change", updateAcademicPreview);
  document.getElementById("rollNumber").addEventListener("input", updateAcademicPreview);

  updateMajorOptions();
}

function resetAcademicFields() {
  document.getElementById("courseYear").value = "1";
  document.getElementById("semester").value = "First Semester";
  document.getElementById("rollNumber").value = "";
  updateMajorOptions();
}


// Exam History Fields

function initExamHistoryFields() {
  const currentYear = new Date().getFullYear();

  document.querySelectorAll(".exam-year-select").forEach(select => {
    select.innerHTML = "";

    for (let year = currentYear - 10; year <= currentYear + 1; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      select.appendChild(option);
    }

    select.value = currentYear;
  });

  document.querySelectorAll(".exam-major").forEach(select => {
    select.addEventListener("change", () => {
      const year = select.dataset.year;
      const prefix = select.closest("tr").querySelector(".exam-roll-prefix");
      prefix.textContent = `${year}${select.value}-`;
    });
  });

  document.querySelectorAll(".exam-roll-row input").forEach(input => {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, 3);
    });
  });
}