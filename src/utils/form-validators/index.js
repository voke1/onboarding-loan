export function validateEmail(value) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(value.toLowerCase());
}

export function validateFieldLength(value, minLength, maxLength, length) {
  let fieldIsValid = true;

  if (length) {
    return value.length == length;
  }

  if (minLength) {
    fieldIsValid = value.length >= minLength;
  }

  if (maxLength) {
    fieldIsValid = value.length <= maxLength;
  }

  return fieldIsValid;
}

export function validatePassword(value) {
  return value.length >= 8;

  var re = /[a-z]/;
  var re2 = /[A-Z]/;
  var re3 = /[0-9]/;
  
  return re.test(String(value)) && re2.test(String(value)) && re3.test(String(value)) && String(value).length >= 8
}

export function validateUrl(value) {
  const re = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  return re.test(value)
}
