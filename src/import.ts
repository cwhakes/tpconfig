function getField(path:String):HTMLInputElement {
  var checkpoints = path.trim().split("/");
  var element_name = checkpoints[checkpoints.length - 1];
  var field = <HTMLInputElement> document.getElementById(element_name);
  return field;
}

//get the xml element specified by a path
function getValue(tripos:Element, path: String): String {
  var location = tripos;
  var checkpoints = path.split("/");

  checkpoints.forEach( function(cp) {
    location = location.getElementsByTagName(cp.trim())[0];
  });

  return location.textContent;
}

function importTextbox(root:Element, path:String) {
    var field = getField(path);

    try {
      field.value = <string> getValue(root, path);
      field.style.backgroundColor = "White";
    } catch(err) {
      var ignore = err;
      field.value = "ERROR";
      field.style.backgroundColor = "Red";
    }

    var e = field;
    eval(e.dataset.callback);
}

function importCheckbox(root:Element, path:String) {
  var field = getField(path);
  try {
    field.checked = <boolean> toBool(getValue(root, path));
    var label = <HTMLElement> field.nextElementSibling;
    label.style.backgroundColor = "White";
  } catch(err) {
    var ignore = err;
    var label = <HTMLElement> field.nextElementSibling;
    label.style.backgroundColor = "Red";
  }
}

function importDropdown(root: Element, path:String) {
  //var checkpoints = path.trim().split("/");
  //var element_name = checkpoints[checkpoints.length - 1];
  //var field = <HTMLInputElement> document.getElementById(element_name);
  var field = <HTMLInputElement> document.getElementById("host_driver");


  try {
    var value = <String> getValue(root, path);

    for (var i = 0; i <= field.children.length; i++) {
      var child = <HTMLInputElement> field.children[i];
      if (child.value == value) {
        field.value = value.toString();
        break;
      }
    }
    var label = <HTMLElement> field.previousElementSibling.previousElementSibling;
    label.style.backgroundColor = "White";
  } catch(err) {
    var ignore = err;
    var label = <HTMLElement> field.previousElementSibling.previousElementSibling;
    label.style.backgroundColor = "Red";
  }
}

function importDropdownUnique(root: Element, path:String, id:String) {
  var field = <HTMLInputElement> document.getElementById(id.toString());


  try {
    var value = <String> getValue(root, path);

    for (var i = 0; i <= field.children.length; i++) {
      var child = <HTMLInputElement> field.children[i];
      if (child.value == value) {
        field.value = value.toString();
        break;
      }
    }
    var label = <HTMLElement> field.previousElementSibling.previousElementSibling;
    label.style.backgroundColor = "White";
  } catch(err) {
    var ignore = err;
    var label = <HTMLElement> field.previousElementSibling.previousElementSibling;
    label.style.backgroundColor = "Red";
  }
}
