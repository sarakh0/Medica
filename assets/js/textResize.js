const resizeBtns = document.querySelectorAll('.text-resize-btn');
const textContainer = document.getElementById('text');

window.addEventListener('DOMContentLoaded', () => {
    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
        textContainer.style.fontSize = savedSize;
        resizeBtns.forEach(btn => {
            if (btn.getAttribute('data-size') === savedSize) {
                btn.classList.add('active');
            }
        });
    }
});

resizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // remove active class from all
        resizeBtns.forEach(b => b.classList.remove('active'));

        // add active to clicked one
        btn.classList.add('active');

        // update font size
        const size = btn.getAttribute('data-size');
        setSizePreference(size);
        textContainer.style.fontSize = size;
    });
});

function setSizePreference(size) {
    localStorage.setItem('fontSize', size);
}