document.addEventListener("DOMContentLoaded", () => {
    console.log("University form ready.");

    const inputs = document.querySelectorAll('.line-input, .box-textarea');
    inputs.forEach(input => {
        input.addEventListener('dblclick', () => {
            input.value = '';
        });
    });
});