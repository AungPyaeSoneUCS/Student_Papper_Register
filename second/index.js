// file: second/index.js
document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(sessionStorage.getItem("studentFormData")) || {};

  document.getElementById("showCourseYear").textContent = data.courseYear || "-";
  document.getElementById("showSemester").textContent = data.semester || "-";
  document.getElementById("showMajor").textContent = data.major || "-";
  document.getElementById("showRollNo").textContent = data.rollNo || "-";
});