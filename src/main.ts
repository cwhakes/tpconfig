function myFunction() {
    var myfile = <HTMLInputElement> document.getElementById("myFile");
    var x = myfile.files[0];
    var fr = new FileReader();
    fr.onload = function(e){
      //var text1 = <HTMLInputElement> document.getElementById("text1");
      //text1.value = fr.result;
      parseXML(fr.result);
    };
    fr.readAsText(x);

}

function parseXML(xmlinput: String) {
  var configVersion_field = <HTMLInputElement> document.getElementById("configVersion");
  var developerKey_field = <HTMLInputElement> document.getElementById("developerKey");

  var parser = new DOMParser();
  var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
  var tripos = the_dom.getElementsByTagName('tripos')[0];

  //configVersion_field.value = <string> get_value(tripos, "configVersion");
  //developerKey_field.value = <string> get_value(tripos, "developers/developer/developerKey");

  paths().split(" ").filter(checkEmpty).forEach( function(path) {
    var checkpoints = path.split("/");
    var element_name = checkpoints[checkpoints.length - 1];
    var field = <HTMLInputElement> document.getElementById(element_name);

    try {
      field.value = <string> get_value(tripos, path);
    } catch(err) {
      var ignore = err;
      field.value = "ERROR";
      field.style.backgroundColor = "Red";
    }
  });
}

function checkEmpty(str: String) {
  if (str.trim().length > 0) {
    return str;
  }
}

function get_value(tripos:Element, path: String): String {
  var location = tripos;
  var checkpoints = path.split("/");

  checkpoints.forEach( function(cp) {
    location = location.getElementsByTagName(cp)[0];
  });

  return location.textContent;
}
