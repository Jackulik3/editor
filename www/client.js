const socket = io('http://localhost:9000');

const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: false,
    mode: "text/plain",
    autocomplete: true,
    theme: "midnight",
    lint: true,
    //gutters: ["CodeMirror-lint-markers"],
    extraKeys:{
        "Backspace": this.Backspace,
        "Ctrl-Space": "autocomplete"
    }
});

function changeTOjs() {
    editor.setOption("mode", "javascript")
    editor.setOption("lint", {options: {esversion: 2021}})
    editor.setOption("lineNumbers", true)
    editor.setOption("gutters", ["CodeMirror-lint-markers"])

}

function changeTOtext() {
    editor.setOption("mode", "text/plain")
    editor.setOption("lint", false)
    editor.setOption("lineNumbers", false)
}

function changeTOhtml() {
    editor.setOption("mode", "xml")
    editor.setOption("lint", true)
    editor.setOption("lineNumbers", true)
    editor.setOption("autoCloseTags", true)
    editor.setOption("gutters", ["CodeMirror-lint-markers"])
}


function changeTOdracula(){
    editor.setOption("theme", "dracula")
}

function changeTOmidnight(){
    editor.setOption("theme", "midnight")
}

function changeTOabcdef(){
    editor.setOption("theme", "abcdef")
}

editor.on("keyHandled",(cm, name, e)=>{
    if (name === "Backspace"){
        const text = cm.getDoc().getValue()
        socket.send(text)
    }
});

function download(){
    const s = editor.getDoc().getValue()
    function dataUrl(data) {return "data:x-application/text," + escape(data);}
    window.open(dataUrl(s));
}

editor.on("inputRead", function (){
    const text = editor.getDoc().getValue()
    socket.send(text)
});

socket.on('message', (data) => {
    editor.getDoc().setValue(data)
})