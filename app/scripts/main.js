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
    paths().split(" ").filter(checkEmpty).forEach(function (path) {
        var checkpoints = path.split("/");
        var element_name = checkpoints[checkpoints.length - 1];
        var field = document.getElementById(element_name);
        try {
            field.value = get_value(tripos, path);
        }
        catch (err) {
            var ignore = err;
            field.value = "ERROR";
            field.style.backgroundColor = "Red";
        }
    });
}
function checkEmpty(str) {
    if (str.trim().length > 0) {
        return str;
    }
}
function get_value(tripos, path) {
    var location = tripos;
    var checkpoints = path.split("/");
    checkpoints.forEach(function (cp) {
        location = location.getElementsByTagName(cp)[0];
    });
    return location.textContent;
}
function paths() {
    return " \
    configVersion \
    developers/developer/developerKey \
    developers/developer/developerSecret \
    server/listeningPort \
  ";
}
//# sourceMappingURL=main.js.map