function validate_developerSecret(self: HTMLInputElement): void {
  var data = <String> self.value.split("-").join("");
  var array = data.match("^[0-9a-fA-F]*$");
  if (array != null) {
    self.style.backgroundColor = "white";
  } else {
    self.style.backgroundColor = "red";
  }
}
