const passwordSmallLetter = (password) => {
  return !/[a-z]/g.test(password)
}

const passwordCapitalLetter = (password) => {
  return !/[A-Z]/g.test(password)
}

const passwordNumber = (password) => {
  return !/[0-9]/g.test(password)
}

const passwordSpecialChar = (password) => {
  return !/[!@#$%^&)(+=.-]/g.test(password)
}

const passwordLength = (password) => {
  return !/[a-zA-Z0-9!@#$%^&)(+=.-]{6}/g.test(password)
}

const validateEmail = (email) => {
  return !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(email)
}

export {
  passwordSmallLetter,
  passwordCapitalLetter,
  passwordNumber,
  passwordSpecialChar,
  passwordLength,
  validateEmail
}