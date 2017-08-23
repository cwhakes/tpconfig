function importCheckbox(root:Element, path:String) {
  var checkpoints = path.trim().split("/");
  var element_name = checkpoints[checkpoints.length - 1];
  var field = <HTMLInputElement> document.getElementById(element_name);

  try {
    field.checked = <boolean> toBool(get_value(root, path));
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
    var value = <String> get_value(root, path);

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
