const resizeBtns = document.querySelectorAll('.text-resize-btn');
const textContainer = document.getElementById('text');

window.addEventListener('DOMContentLoaded', () => {
    const savedSize = localStorage.getItem('fontSize');
    const savedLineHeight = localStorage.getItem('lineHeight');
    if (savedSize) {
        textContainer.style.fontSize = savedSize;
        resizeBtns.forEach(btn => {
            if (btn.getAttribute('data-size') === savedSize) {
                btn.classList.add('active');
            }
        });
    }
    if (savedLineHeight) {
        textContainer.style.lineHeight = savedLineHeight;
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
        const lineHeight = btn.getAttribute('data-lineheight');
        setSizePreference(size, lineHeight);

        textContainer.style.fontSize = size;

        // update line height
        if (lineHeight) {
            textContainer.style.lineHeight = lineHeight;
        }
    });
});

function setSizePreference(size, lineHeight) {
    localStorage.setItem('fontSize', size);
    if (lineHeight) {
        localStorage.setItem('lineHeight', lineHeight);
    }
}