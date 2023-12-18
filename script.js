//Create all the variables

const inputSlider = document.querySelector("[data-lengthSlider]"); //Input Tag for the slider with range 1 to 20
const lengthDisplay = document.querySelector("[data-lengthNumber]"); //p tag containing a number that changes when you move the slider
const passwordDisplay = document.querySelector("[data-passwordDisplay]"); //input read only tag that displays the generated password
const copyBtn = document.querySelector("[data-copy]"); //copy button containing span and img tag 
const copyMsg = document.querySelector("[data-copyMsg]"); //span tag that displays copied when the copy button is clicked
const uppercaseCheck = document.querySelector("#uppercase"); // uppercaseCheck will store the input tag whose id is uppercase
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]"); //Round colour changing div showing srength of your password
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = `'~!@#$%^&*()_-+={[}]|:;"<,>.?/`;
//const symbols = `~!@#$%^&*()_-+={[}]|:`;
//const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
//~`!@#$%^&*()_-+={[}]|\:";<>,.?/

let password = ""; //initially the password field will be empty 
let passwordLength = 10; //Initially the slifer will be in the middle and number will be 10
let checkCount = 0; //none of the checkboxes will be checked initially
handleSlider(); //Updates the UI using passwordLength's value
setIndicator("#fff");



//sets password length and slider 
function handleSlider() {
  inputSlider.value = passwordLength; //the value of slider will be equal to the value of password length
  lengthDisplay.innerText = passwordLength; //The value of p tag will be equal to passwordLength
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "%100%";
}

function setIndicator(color) {
  indicator.style.backgroundColor = color; //Colour of the rounded div indicator.
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`; //The read-only style property of the HTMLElement returns the inline style of an element in the form of a live CSSStyleDeclaration object that contains a list of all styles properties for that element with values assigned only for the attributes that are defined in the element's inline style attribute.
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRndNumber() {
  console.log("Inside generateRndNumber method");
  console.log(getRndInteger(0, 9));
  return getRndInteger(0, 9);
}

function generateLowercase() {
  console.log("Inside generateLowercase method");
  //console.log(String.fromCharCode(getRndInteger(97,123)));
  return String.fromCharCode(getRndInteger(97, 123)); //getRndInteger(97,123) - This will give an integer value. To convert it into a string so that it gives random characters between a and z String.fromCharCode. The String.fromCharCode() static method returns a string created from the specified sequence of UTF-16 code units.
}

function generateUppercase() {
  console.log("Inside generateUppercase method");
  console.log(String.fromCharCode(getRndInteger(65, 91)));
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const rndNum = getRndInteger(0, symbols.length);
  console.log("Inside generateSymbol method");
  console.log(rndNum);
  console.log(symbols.charAt(rndNum));
  //return rndNum;
  return symbols.charAt(rndNum);
}

//Calculating the strength of the password by the help of rounded div indicator. Declare a variable of all checkboxes as false.
function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNumber = false;
  let hasSym = false;
  if (uppercaseCheck.checked) hasUpper = true; //The .checked property sets or returns the checked state of a checkbox. If the if condition is true then set hasUpper as true. DO the same for all.
  if (lowercaseCheck.checked) hasLower = true;
  if (symbolCheck.checked) hasSym = true;
  if (numberCheck.checked) hasNumber = true;
  if (hasUpper && hasLower && (hasNumber || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  }
  else if ((hasLower || hasUpper) && (hasNumber || hasSym) && passwordLength >= 6) {
    setIndicator("#ff0");
  }
  else {
    setIndicator("#f00");
  }
}

//JavaScript is Synchronous in nature which means that it has an event loop that allows you to queue up an action that won’t take place until the loop is available sometime after the code that queued the action has finished executing. But there are a lot of functionalities in our program which make our code Asynchronous and one of them is the Async/Await functionality.
//The keyword async before a function makes the function return a promise. Async simply allows us to write promises-based code as if it was synchronous and it checks that we are not breaking the execution thread. It operates asynchronously via the event loop. Async functions will always return a value. It makes sure that a promise is returned and if it is not returned then JavaScript automatically wraps it in a promise which is resolved with its value.
// The await keyword can only be used inside an async function. The await keyword makes the function pause the execution and wait for a resolved promise before it continues. Await function is used to wait for the promise. It could be used within the async block only. It makes the code wait until the promise returns a result. It only makes the async block wait.
//await navigator.clipboard.writeText(passwordDisplay.value). This statement uses the clipboard Api to write the generated password to clipboard. The writeText() method of the Clipboard interface writes the provided text to clipboard. 
//By using the await keyword before navigator.clipboard.writeText(passwordDisplay.value) statement the code waits until the promise resolves before moving to the next line of code whch ensures the password is successfully written to the clipboard before any further actions are taken.
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = 'copied';
  }
  catch (e) {
    copyMsg.innerText = 'failed';
  }
  copyMsg.classList.add("active");

  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

//After the password is randomly created,every 4 characters from the beginning will contain an uppercase, lowercase, symbol and a number if all the boxes are checked. The order of occurance will be the same no matter how many boxes are checked. 
//To make the password completely random, we put if in an array and shuffle it using fischer yates method which is basically running a loop from the end of the array and randomly finding an index and swapping the value. this array is put in a string through loop and the string is returned
function shufflePassword(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

//IF you tick or untick any checkbox this function will count the number of checkboxes ticked each time.
function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked)
      checkCount++;
  });
  //If the length of the password in the input is smaller than the number of checkboxes checked then make the length of the password length equal to the checkbox count because you cant output a 3 character password containing upppercase, lowercase, numbers and symbol(i.e all 4 boxes are ticked and the password length is 3). Accordingly update the slider and number 
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

//every single time that any of the four checkboxes are being changed call the handlecheckboxchange method to check the number of checkboxes checked and store the count in checkCount variable. Also check is the length of password is smaller than the checkCount
allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckBoxChange);
})

// An event listener is a procedure in JavaScript that waits for an event to occur. The addEventListener() is an inbuilt function in JavaScript which takes the event to listen for, and a second argument to be called whenever the described event gets fired. Any number of event handlers can be added to a single element without overwriting existing event handlers. 
//The target event property in HTML DOM is used to return the element that triggered the event. If any input is given in the input slider the event listener will be triggered and the passwordLengt will be changed according to the slider as handleSlider method will be called.
inputSlider.addEventListener('input', (e) => {
  passwordLength = e.target.value; //
  handleSlider();
})

//EventListener on copy button. It will copy only if there is a value in the passwordDisplay ie it is non empty then copy
copyBtn.addEventListener('click', () => {
  if (passwordDisplay.value)
    copyContent();
})


generateBtn.addEventListener('click', () => {
  //If none of the checkboxes are checked 
  if (checkCount == 0)
    return;
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
  password = "";
  console.log("Removing the old Password");
  // if(uppercaseCheck.checked){
  //     password += generateUppercase();
  // }
  // if(lowercaseCheck.checked){
  //     password += generateLowercase();
  // }
  // if(numberCheck.checked){
  //     password += generateRndNumber();
  // }
  // if(symbolCheck.checked){
  //     password += generateSymbol();
  // }
  let funArr = [];
  if (uppercaseCheck.checked) {
    funArr.push(generateUppercase);
  }
  if (lowercaseCheck.checked) {
    funArr.push(generateLowercase);
    //console.log(funArr.push(generateLowercase));
  }
  if (numberCheck.checked) {
    funArr.push(generateRndNumber);
  }
  if (symbolCheck.checked) {
    console.log("Inside generateBtn symbol");
    funArr.push(generateSymbol);
  }

  for (let i = 0; i < funArr.length; i++) {
    console.log(funArr[i]());
    password += funArr[i]();
  }

  console.log(password);
  console.log("Appending those characters which are checked in order.")

  for (let i = 0; i < passwordLength - funArr.length; i++) {
    let randIndex = getRndInteger(0, funArr.length);
    console.log("randIndex" + randIndex);
    password += funArr[randIndex]();
  }
  console.log("Adding the rest of the charactes in the array")
  password = shufflePassword(Array.from(password));
  console.log("shufflePassword method called with password as the argument as an array")
  passwordDisplay.value = password;
  console.log("Updated in the UI");

  calcStrength();
});