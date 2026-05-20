// Step validation and control routing mechanics
function nextStep(currentStepNum) {
    const currentStepElement = document.getElementById(`step-${currentStepNum}`);
    
    // Check validation properties for current inputs
    const inputs = currentStepElement.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = "#e74c3c"; // Highlight empty fields in red
        } else {
            input.style.borderColor = "#ccd1d9";
        }
    });

    if (!isValid) {
        alert("Please fill in all required fields before proceeding.");
        return;
    }

    // Change Visibility Configuration
    currentStepElement.classList.remove('active');
    const nextStepNum = currentStepNum + 1;
    document.getElementById(`step-${nextStepNum}`).classList.add('active');

    // Upgrade progress layout bar state
    document.getElementById(`step${nextStepNum}-indicator`).classList.add('active');
}

function prevStep(currentStepNum) {
    // Change Visibility Configuration back
    document.getElementById(`step-${currentStepNum}`).classList.remove('active');
    const prevStepNum = currentStepNum - 1;
    document.getElementById(`step-${prevStepNum}`).classList.add('active');

    // Downgrade active indicator configuration 
    document.getElementById(`step${currentStepNum}-indicator`).classList.remove('active');
}

// Final Interceptor Submit Action
document.getElementById('multiStepForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const agreeCheck = document.getElementById('agreeTerms');
    if(!agreeCheck.checked) {
        alert("You must agree to the university regulations rules to submit.");
        return;
    }

    alert("Application successfully compiled and submitted!");
    // You can process database fetch transactions or JSON stringification outputs here.
});