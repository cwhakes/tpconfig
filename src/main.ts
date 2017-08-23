
function importWrapper() {
  var myfile = <HTMLInputElement> document.getElementById("myFile");
  importXml(myfile);
}

//imports xml to string
function importXml(myfile: HTMLInputElement) {

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

  var parser = new DOMParser();
  var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
  var tripos = the_dom.getElementsByTagName('tripos')[0];

  paths().split(" ").filter(checkEmpty).forEach( function(path) {importTextbox(tripos, path)});
  paths_checkboxes().split(" ").filter(checkEmpty).forEach( function(path) {importCheckbox(tripos, path)});
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
