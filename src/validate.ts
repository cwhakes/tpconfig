function validateInput(event: Event) {
  var e = <HTMLInputElement> event.target;
  eval(e.dataset.callback);
}

function validateHex(self: HTMLInputElement): void {
  var data = <String> self.value.split("-").join("");
  var array = data.match("^[0-9a-fA-F]*$");
  if (array != null) {
    self.style.backgroundColor = "white";
  } else {
    self.style.backgroundColor = "red";
  }
}

function validateInt(self: HTMLInputElement): void {
  if (!isNaN(Number(self.value))) {
    self.style.backgroundColor = "white";
  } else {
    self.style.backgroundColor = "red";
  }
}


function validateStringInt(self: HTMLInputElement): void {

}

function validateBool(self: HTMLElement): void {
  var label = <HTMLElement> self.nextElementSibling;
  label.style.backgroundColor = "White";
}
