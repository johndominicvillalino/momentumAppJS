const dom = document;
let nameState = ''
const searchIcon = document.getElementById("searchImg");
const searchInput = dom.getElementById("searchSpan");
const searchInputVal = dom.getElementById('searchInput')
const time = dom.getElementById("time");
const greet = dom.getElementById("greetings");
const amPmGreet = dom.getElementById("amPm");
const body = dom.getElementById("body");
const html = dom.querySelector("html");
const storage = window.localStorage
const storageNames = storage.getItem('names')
const parsedName = JSON.parse(storageNames)
const registerNameSubmit = dom.getElementById('submitName')
const nameGreet = dom.getElementById('nameGreet')
const nameInput = dom.getElementById('nameinput')
const formSearchInput = dom.getElementById('formSearchInput')
const linkCardClicks = dom.querySelectorAll('.linkCardClicks')
const linkNav = dom.getElementById('linkNav')
const linkCard = dom.getElementById('linkCard')
const newLink = dom.getElementById('newLink')
const defaultSelection = dom.getElementById('defaultSelection')

const fadeInFunc = (el,sec) => {
  let loadCount = 0;
  const load = setInterval(fadeInLoad, sec);
  function fadeInLoad() {
    if (loadCount > 1) {
      clearInterval(load);
    } else {
      loadCount += 0.01;
      el.style.opacity = loadCount;
    }
  }
};


const fadeOutFunc = (el,sec) => {
  let loadCount = 1;
  const load = setInterval(fadeInLoad, sec);
  function fadeInLoad() {
    if (loadCount < 0) {
      clearInterval(load);
    } else {
      loadCount -= 0.01;
      el.style.opacity = loadCount;
    }
  }
};

const slideLeft = (el,sec,from,to) => {
  if(from >= to){         
    el.style.visibility = 'hidden';
    return;  
}
else {
    el.style.marginLeft = from + "px";
    setTimeout(function(){
        animateLeft(el, from + 1, to);
    }, sec) 
}

}

newLink.addEventListener('click', e => {
slideLeft(defaultSelection,1000,700,100)
})




//add user to local storage function
const registerName = (name) => {
const storageNamesInsideFunc = storage.getItem('names')
const parsedNameInsideFunc = JSON.parse(storageNamesInsideFunc)
const currentNameState = []

  let updateTo;
  if(parsedNameInsideFunc) {
    parsedName.push(name)
    updateTo = JSON.stringify(parsedName)
    localStorage.setItem('names',updateTo)
    
  } else {
    currentNameState.push(name)
    updateTo = JSON.stringify(currentNameState)
    localStorage.setItem('names',updateTo)
  }
 
}


const timeFunc = () => {

  let lastPerson = '';

  if(parsedName) {
    const len = parsedName.length - 1;
    lastPerson = parsedName[len]
  } else {
    lastPerson = nameState
  }

const amPmGlobal = new Date().getHours() > 12 ? "PM" : "AM";

const greetings = `Good ${
  amPmGlobal === "PM" ? "Evening" : "Morning"
} ${lastPerson}`;

greet.textContent = greetings;

 const amPm = new Date().getHours() > 12 ? "PM" : "AM";
  let hour =
    new Date().getHours() % 12 === 0
      ? new Date().getHours()
      : new Date().getHours() % 12;

  if(hour === 0) {
    hour = 12;
  }

  const minutes = new Date().getMinutes();
  const date = `${hour < 10 ? "0" + hour : hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;

  time.textContent = date;
  amPmGreet.textContent = amPm;

}

timeFunc()

