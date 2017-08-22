function myFunction() {
    var x = document.getElementById("myFile").files[0];
    var fr = new FileReader();
    fr.onload = function (e) {
        document.getElementById("output").innerHTML = fr.result;
    };
    fr.readAsText(x);
}
//# sourceMappingURL=main.js.map