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
