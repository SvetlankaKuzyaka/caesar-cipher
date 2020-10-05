const { isAlphabetString, isUpperCase } = require("./utils");

function cipher(shift, input) {
  let output = "";

  for (let i = 0; i < input.length; i++) {
    if (isAlphabetString(input[i])) {
      output += isUpperCase(input[i])
        ? String.fromCharCode(((input.charCodeAt(i) + shift - 65) % 26) + 65)
        : String.fromCharCode(((input.charCodeAt(i) + shift - 97) % 26) + 97);
    } else {
      output += input[i];
    }
  }

  return output;
}

function encode(shift, input) {
  return cipher(shift, input);
}

function decode(shift, input) {
  return cipher((26 - shift) % 26, input);
}

module.exports = function cipher(action, shift, input) {
  switch (action) {
    case "encode":
      return encode(shift, input);
    case "decode":
      return decode(shift, input);
  }
};
