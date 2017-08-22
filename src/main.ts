function myFunction() {
    var myfile = <HTMLInputElement> document.getElementById("myFile");
    var x = myfile.files[0];
    var fr = new FileReader();
    fr.onload = function(e){
      var text1 = <HTMLInputElement> document.getElementById("text1");
      text1.value = fr.result;
      parseXML(fr.result);
    };
    fr.readAsText(x);

}

function parseXML(xmlinput: String) {
    var parser = new DOMParser();
    var the_dom = parser.parseFromString(xmlinput.toString(), "application/xml");
    var tripos = the_dom.getElementsByTagName('tripos')[0];
    var configVersion = tripos.getElementsByTagName('configVersion')[0];
    var text2 = <HTMLInputElement> document.getElementById("text2");
    text2.value = configVersion.textContent.toString();
}
