function myFunction() {
    var myfile = document.getElementById("myFile");
    var x = myfile.files[0];
    var fr = new FileReader();
    fr.onload = function (e) {
        parseXML(fr.result);
    };
    fr.readAsText(x);
}
function parseXML(xmlinput) {
    var text1 = document.getElementById("text1");
    var text2 = document.getElementById("text2");
    var parser = new DOMParser();
    var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
    var tripos = the_dom.getElementsByTagName('tripos')[0];
    var configVersion = tripos.getElementsByTagName('configVersion')[0];
    text1.value = configVersion.textContent;
    var developers = tripos.getElementsByTagName('developers')[0];
    var developer = developers.getElementsByTagName('developer')[0];
    var developerKey = developer.getElementsByTagName('developerKey')[0];
    text2.value = developerKey.textContent;
}
//# sourceMappingURL=main.js.map