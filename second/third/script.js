document.addEventListener("DOMContentLoaded", () => {
    const rulesForm = document.getElementById("rulesForm");
    const backBtn = document.getElementById("backBtn");
    const clearFormBtn = document.getElementById("clearFormBtn");

    // 1. Back Navigation Button Event Link
    backBtn.addEventListener("click", () => {
        // Navigates back out to parent directory form system layout
        window.location.href = "../index.html";
    });

    // 2. Clear Form Data Event Link
    clearFormBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all inputs on this page?")) {
            rulesForm.reset();
        }
    });

    // 3. Form Submission Interceptor validation logic handler
    rulesForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Lock down normal page browser reload refreshes

        // Extract value fields cleanly to process dynamic form validations
        const studentName = rulesForm.elements["student_name"].value.trim();
        const rollNumber = rulesForm.elements["roll_number"].value.trim();
        const studentSig = rulesForm.elements["student_signature"].value.trim();

        if (studentName === "" || rollNumber === "") {
            alert("Please input your Name and current Roll Number fields before finishing registration.");
            return;
        }

        if (studentSig === "") {
            alert("Please type your name into the Applicant Signature section field to acknowledge and confirm compliance.");
            return;
        }

        // Processing Finish Sequence success endpoint placeholder alert 
        alert("Registration Data Submitted Successfully! Opening print window layout dashboard.");
        window.print();
    });
});