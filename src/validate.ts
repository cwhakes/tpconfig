/* Name: validate.ts
Description: Validates all the field on the form and
  ensures they match formatting specifics
Collaborators: Eva Goins, Will Hakes
Date: 8/22/17-8/23/17

*/

//validates everything on input
function validateInput(event: Event) {
  var e = <HTMLInputElement> event.target;
  eval(e.dataset.callback);
}

//validates a string only includes alphanumeric
function validateHex(self: HTMLInputElement): void {
  var data = <String> self.value.split("-").join("");
  var result = data.match("^[0-9a-fA-F]*$");
  if (result != null && result[0].length > 0) {
    self.style.backgroundColor = "white";
  } else {
    self.style.backgroundColor = "red";
  }
}

//validates a string only includes integers
function validateInt(self: HTMLInputElement): void {
  if (!isNaN(Number(self.value))) {
    self.style.backgroundColor = "white";
  } else {
    self.style.backgroundColor = "red";
  }
}

//validates a string to include only integers and
//takes into consideration a %, a comma, and a space
function validateStringInt(self: HTMLInputElement): void {
  var regex = "/[^0-9%,\s]+/g";
  var result = self.value.match(regex);
  if (result != null && result[0].length > 0) {
	self.style.backgroundColor = "white";
  } else {
	self.style.backgroundColor = "red";
  }
}

//validates boolean values
function validateBool(self: HTMLElement): void {
  var label = <HTMLElement> self.nextElementSibling;
  label.style.backgroundColor = "White";
}
