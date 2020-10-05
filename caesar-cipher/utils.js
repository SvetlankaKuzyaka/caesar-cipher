const allowedActions = new Set(["encode", "decode"]);

function isAlphabetString(string) {
  return /[a-zA-Z]/i.test(string);
}

function isUpperCase(string) {
  return string === string.toUpperCase();
}

function isInvalidArguments(action, shift) {
  return (
    !shift ||
    !action ||
    !allowedActions.has(action.toLowerCase()) ||
    !/^-?\d+$/.test(shift) ||
    shift < 0 ||
    shift >= 26
  );
}

module.exports = {
  isAlphabetString,
  isUpperCase,
  isInvalidArguments,
};
