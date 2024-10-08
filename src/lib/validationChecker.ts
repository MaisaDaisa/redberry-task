export const minimumSymbols = (value: string, numOfSymbols: number = 2) => {
  return value.length >= numOfSymbols
}

export const checkEmail = (
  value: string,
  emailDomain: string = '@redberry.ge'
) => {
  // Check if the email ends with the specified domain
  return value.endsWith(emailDomain)
}

export const checkNumbers = (value: string) => {
  return !isNaN(Number(value)) && Number(value) >= 1 && value !== ''
}

export const checkOneNumber = (value: string) => {
  // Check if the value is a number and has only one digit
  return checkNumbers(value) && value.length === 1
}

export const smallIntChecker = (value: string) => {
  // Check if the value is a number, is a whole number, and is between 0 and 255
  const numberValue = Number(value)
  return checkNumbers(value) && numberValue <= 255 && numberValue % 1 === 0
}
export const checkPhoneNumbers = (value: string) => {
  // Check if the number starts with 5 and has 9 digits
  return checkNumbers(value) && value.length === 9 && value.startsWith('5')
}

export const checkWordCount = (value: string, wordCount: number = 5) => {
  const words = value.split(' ')
  /* 
    If the user presses space at the last word, the last element of the array 
    will be an empty string at will trick the function if not checked.
    */
  return words.length >= wordCount + Number(words.at(-1) === '')
}
