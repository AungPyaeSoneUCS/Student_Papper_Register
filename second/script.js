document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("applicationForm");
    const clearBtn = document.getElementById("clearBtn");

    // 1. Clear Form Logic
    clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all inputs?")) {
            form.reset();
        }
    });

    // 2. Submit and Redirect Logic
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Stop standard page reloading

        // Optional: Perform simple validation checks before changing pages
        const supporterName = form.elements["supporter_name"].value.trim();
        const phone = form.elements["phone"].value.trim();

       // if (supporterName === "" || phone === "") {
        //    alert("Please fill out the primary fields (Name and Phone) before proceeding.");
         //   return;
       // }

        // Action: Navigate cleanly to the requested step
        window.location.href = "third/index.html";
    });
});