let mathLineInput = document.querySelector('#mathLineInput');
let currentTex = document.querySelector('#texPreview');

mathLineInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        let mathLine = document.createElement('p');
        mathLine.classList.add('mathLine');
        mathLine.innerText = `$ ${mathLineInput.value} $`
        mathLine.dataset.rawLaTeX = mathLineInput.value;

        mathLine.addEventListener('mousedown', (e) => {
            let mathLineEditor = document.createElement('input');
            mathLineEditor.type = 'text';
            mathLineEditor.classList.add('mathLineEditor');

            document.querySelector('#mathLineHolder').insertBefore(mathLineEditor, mathLine);

            mathLine.style.display = "none";
            mathLineEditor.value = mathLine.dataset.rawLaTeX;
            mathLineEditor.focus();

            mathLineEditor.addEventListener('keydown', (e) => {
                if (e.key == 'Enter') {
                    mathLine.dataset.rawLaTeX = mathLineEditor.value;
                    mathLine.innerText = `$ ${mathLineEditor.value} $`;
                    mathLine.style.display = 'block';
                    mathLineEditor.remove();
                    MathJax.typeset();
                    mathLineInput.focus();
                }
            });
        });

        mathLineInput.value = '';
        currentTex.innerHTML = '&nbsp;';
        document.querySelector('#mathLineHolder').appendChild(mathLine);
        MathJax.typeset();
        mathLine.scrollIntoView();
    }
    
});

mathLineInput.addEventListener('keyup', (e) => {
    if (e.key != 'Enter') {
        currentTex.innerText = `$ ${mathLineInput.value} $`
        MathJax.typeset();
    }
})
