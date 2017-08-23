
//imports xml to string
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

//parses xml and put into fields
function parseXML(xmlinput: String) {
  //var configVersion_field = <HTMLInputElement> document.getElementById("configVersion");
  //var developerKey_field = <HTMLInputElement> document.getElementById("developerKey");

  var parser = new DOMParser();
  var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
  var tripos = the_dom.getElementsByTagName('tripos')[0];

  //configVersion_field.value = <string> get_value(tripos, "configVersion");
  //developerKey_field.value = <string> get_value(tripos, "developers/developer/developerKey");

  paths().split(" ").filter(checkEmpty).forEach( function(path) {
    var checkpoints = path.trim().split("/");
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

  paths_checkboxes().split(" ").filter(checkEmpty).forEach( function(path) {
    var checkpoints = path.trim().split("/");
    var element_name = checkpoints[checkpoints.length - 1];
    var field = <HTMLInputElement> document.getElementById(element_name);

    try {
      field.checked = <boolean> toBool(get_value(tripos, path));
    } catch(err) {
      var ignore = err;
      var label = <HTMLElement> field.nextElementSibling;
      label.style.backgroundColor = "Red";
    }
  });
}

function toBool(str: String) {
  if (str.toLowerCase() == "false") {
    return false;
  } else if (str.toLowerCase() == "true") {
    return true;
  } else {
    throw "typeErr"
  }
}

//checks if string is empty
function checkEmpty(str: String) {
  if (str.trim().length > 0) {
    return str;
  }
}

//get the xml element specified by a path
function get_value(tripos:Element, path: String): String {
  var location = tripos;
  var checkpoints = path.split("/");

  checkpoints.forEach( function(cp) {
    location = location.getElementsByTagName(cp.trim())[0];
  });

  return location.textContent;
}
