//lastperson
let lastPerson = '';
  if(parsedName) {
    const len = parsedName.length - 1;
    lastPerson = parsedName[len]
  } 

  const greetings = `Good ${
    amPm === "PM" ? "Evening" : "Morning"
  }`;
  greetings.textContent = lastPerson

dom.addEventListener("DOMContentLoaded", (e) => {



  //fade in document
  fadeInFunc(html, 5);

  //time
  setInterval(timeFunc, 1000);


});

//searchInput fade in
searchIcon.addEventListener("click", () => {
  fadeInFunc(searchInput, 5);
});

//searchInput fade out
searchInput.addEventListener("focusout", () => {
  fadeOutFunc(searchInput, 5);
});


//name input handler 
nameInput.addEventListener('change', e => {
  nameState = e.target.value
  
})

registerNameSubmit.addEventListener('click',e => {
  e.preventDefault()

  registerName(nameState)



})