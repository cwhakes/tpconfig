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
    var configVersion_field = document.getElementById("configVersion");
    var developerKey_field = document.getElementById("developerKey");
    var parser = new DOMParser();
    var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
    var tripos = the_dom.getElementsByTagName('tripos')[0];
    var configVersion = tripos.getElementsByTagName('configVersion')[0];
    configVersion_field.value = configVersion.textContent;
    var developers = tripos.getElementsByTagName('developers')[0];
    var developer = developers.getElementsByTagName('developer')[0];
    var developerKey = developer.getElementsByTagName('developerKey')[0];
    developerKey_field.value = developerKey.textContent;
}
//# sourceMappingURL=main.js.map