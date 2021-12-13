/// Оборачивает каждый символ внутри блока с классом horrorText в em тег
let elems = document.querySelectorAll(".horrorText");

elems.forEach(element => {

    var newText = "";
    let oldText = element.innerHTML;
    for (var i = 0; i < oldText.length; i++) {
        newText += `<em>${oldText[i]}</em>`;
    };
    element.innerHTML = newText;
});