export const minimumSymbols = (value: string, numOfSymbols : number = 2) => {
    return value.length >= numOfSymbols;
};

export const checkEmail = (value : string, emailDomain : string = "@redberry.ge") => {
    return value.includes(emailDomain);
};

export const checkNumbers = (value : string) => {
    return !isNaN(Number(value))  
};

export const checkPhoneNumbers = (value : string) => {
    return checkNumbers(value) && value.length === 9 && value.startsWith("5"); 
};

export const checkWordCount = (value : string, wordCount : number = 5) => {
    const words = value.split(" ");
    /* 
    NOTE: If the user presses space at the last word, the last element of the array 
    will be an empty string at will trick the function if not checked.
    */
   console.log(words);
    return words.length >= wordCount + Number(words.at(-1) === "");
}