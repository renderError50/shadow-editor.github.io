require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs' }});

let editor;
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: '',
        language: 'javascript',
        theme: 'vs-dark'
    });
});

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            editor.setValue(e.target.result);
        };
        reader.readAsText(file);
    }
});

document.getElementById('saveButton').addEventListener('click', () => {
    const content = editor.getValue();
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.txt';
    a.click();
    URL.revokeObjectURL(a.href);
});