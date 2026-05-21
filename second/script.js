document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("applicationForm");
    const clearBtn = document.getElementById("clearBtn");
    const backBtn = document.getElementById("backBtn");

    // 1. Go Back Action
    backBtn.addEventListener("click", () => {
        window.location.href = "../index.html";
    });

    // 2. Clear Form Logic
    clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all inputs?")) {
            form.reset();
        }
    });

    // 3. Submit and Redirect Logic (Goes to third/index.html)
    form.addEventListener("submit", (event) => {
        event.preventDefault(); 

        const supporterName = form.elements["supporter_name"].value.trim();
        const phone = form.elements["phone"].value.trim();
        
        /*
        if (supporterName === "" || phone === "") {
            alert("Please fill out the primary fields (Name and Phone) before proceeding.");
            return;
        } 
            */

        window.location.href = "third/index.html";
    });
});