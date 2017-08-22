function myFunction() {
    var myfile = document.getElementById("myFile");
    var x = myfile.files[0];
    var fr = new FileReader();
    fr.onload = function (e) {
        var text1 = document.getElementById("text1");
        text1.value = fr.result;
        parseXML(fr.result);
    };
    fr.readAsText(x);
}
function parseXML(xmlinput) {
    var parser = new DOMParser();
    var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
    var tripos = the_dom.getElementsByTagName('tripos')[0];
    var configVersion = tripos.getElementsByTagName('configVersion')[0];
    var text2 = document.getElementById("text2");
    text2.value = configVersion.textContent.toString();
}
//# sourceMappingURL=main.js.map