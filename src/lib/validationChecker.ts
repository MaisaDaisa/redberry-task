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
    return value.split(" ").length >= wordCount;
}