
function importWrapper() {
  var myfile = <HTMLInputElement> document.getElementById("myFile");
  importXml(myfile);
}

//imports xml to string
function importXml(myfile: HTMLInputElement) {

    var x = myfile.files[0];
    var fr = new FileReader();

    var inputButton = <HTMLInputElement> document.getElementById("inputButton");

    if (typeof(sessionStorage) == "undefined") {
      alert("No sessionStorage");
    }

    inputButton.disabled = true;

    fr.onload = function(e){
      window.sessionStorage.the_dom = fr.result;
      //parseXml(fr.result);
      parseXml()
      inputButton.disabled = false;
    };
    fr.readAsText(x);
}

//parses xml and put into fields
function parseXml() {

  var parser = new DOMParser();
  var xmlinput: String = window.sessionStorage.the_dom;
  var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");

  sessionStorage.setItem("the_dom", xmlinput.toString());

  var tripos = the_dom.getElementsByTagName('tripos')[0];

  paths().split(" ").filter(checkEmpty).forEach( function(path) {importTextbox(tripos, path)});
  paths_checkboxes().split(" ").filter(checkEmpty).forEach( function(path) {importCheckbox(tripos, path)});
  importDropdownUnique(tripos, "host/driver", "host_driver");
  importDropdownUnique(tripos, "lanes/serialLane/pinpad/driver", "pinpad_driver");
  paths_dropdowns().split(" ").filter(checkEmpty).forEach( function(path) {importDropdown(tripos, path)});
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
