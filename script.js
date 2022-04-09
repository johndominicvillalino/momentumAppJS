//lastperson
let lastPerson = "";
if (parsedName) {
  const len = parsedName.length - 1;
  lastPerson = parsedName[len];
}

const greetings = `Good ${amPm === "PM" ? "Evening" : "Morning"}`;
greetings.textContent = lastPerson;

dom.addEventListener("DOMContentLoaded", (e) => {
  //fade in document
  fadeInFunc(html, 5);
  //time
  setInterval(timeFunc, 1000);
});



//search input fade
searchIcon.addEventListener('mouseover', e => {
  searchInput.style.opacity = .5;
})

searchInput.addEventListener('focusin', e => {
  searchInput.style.opacity = 1;
})

searchInput.addEventListener('focusout', e => {
 fadeOutFunc(searchInput,5)
})


//name input handler
nameInput.addEventListener("change", (e) => {
  nameState = e.target.value;
});

registerNameSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  registerName(nameState);
});


//search google 
formSearchInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchThis = searchInputVal.value;
  fadeOutFunc(searchInput, 5);
  if (searchThis.length < 1) {
    window.open(`https://google.com`)
  } else {
    window.open(`https://google.com/search?q=${searchThis}`);
  }
  searchInputVal.value = "";
});

let cardFadeCount = 0
linkNav.addEventListener('click',() => {
  cardFadeCount+=1;
  if(cardFadeCount % 2 === 0) {
fadeOutFunc(linkCard,5)
  }else {
  fadeInFunc(linkCard,5)
}
})



//link card actions
linkCardClicks.forEach(e => {
  e.addEventListener('click', el => {
    const {id} = el.target
    if(id === 'chromeLink') {
      window.open('app.html?page=apps')
    } else {
      window.open('app.html')
    }
  })
})