const dom = document;
let nameState = "";
let taskState = {};
const searchIcon = document.getElementById("searchImg");
const searchInput = dom.getElementById("searchSpan");
const searchInputVal = dom.getElementById("searchInput");
const time = dom.getElementById("time");
const greet = dom.getElementById("greetings");
const amPmGreet = dom.getElementById("amPm");
const body = dom.getElementById("body");
const html = dom.querySelector("html");
const storage = window.localStorage;
const storageNames = storage.getItem("names");
const parsedName = JSON.parse(storageNames);
const registerNameSubmit = dom.getElementById("submitName");
const nameGreet = dom.getElementById("nameGreet");
const nameInput = dom.getElementById("nameinput");
const formSearchInput = dom.getElementById("formSearchInput");
const linkCardClicks = dom.querySelectorAll(".linkCardClicks");
const linkNav = dom.getElementById("linkNav");
const linkCard = dom.getElementById("linkCard");
const newLink = dom.getElementById("newLink");
const defaultSelection = dom.getElementById("defaultSelection");
const newLinkcard = dom.querySelector(".newLinkcard");
const linkButton = dom.getElementById("linkButton");
const newLInksHere = dom.getElementById("newLInksHere");
const appsLink = dom.getElementById("appsLink");
const nameLink = dom.getElementById("nameOfLink");
const linkToAdd = dom.getElementById("linkToAdd");
const taskCreate = dom.getElementById("taskCreate");
const taskCounter = dom.getElementById("taskCounter");
const todoSection = dom.getElementById("todoSection");
const selectTaskSched = dom.getElementById("selectTaskSched");
const innerTaskCardContainer = dom.querySelector('.innerTaskCardContainer')
const dueDate = dom.getElementById('dueDate')

const linkState = {};

const fadeInFunc = (el, sec) => {
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

const shakeFunc = (el, sec) => {
  let loadCount = 0;
  const load = setInterval(shake, sec);
  function shake() {
    loadCount += 1;
    if (loadCount % 2 === 0) {
      el.style.right = "50px";
    } else {
      el.style.right = "55px";
    }
    if (loadCount == sec) {
      clearInterval(load);
    }
  }
};

const fadeOutFunc = (el, sec) => {
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

//add user to local storage function
const registerName = (name) => {
  const storageNamesInsideFunc = storage.getItem("names");
  const parsedNameInsideFunc = JSON.parse(storageNamesInsideFunc);
  const currentNameState = [];

  let updateTo;
  if (parsedNameInsideFunc) {
    parsedName.push(name);
    updateTo = JSON.stringify(parsedName);
    localStorage.setItem("names", updateTo);
  } else {
    currentNameState.push(name);
    updateTo = JSON.stringify(currentNameState);
    localStorage.setItem("names", updateTo);
  }
};

//storage Upload
const storageUpload = (holder, uploadLocal) => {
  let links = storage.getItem(holder);
  links = JSON.parse(links);
  if (links) {
    links.push(uploadLocal);
    storage.setItem(holder, JSON.stringify(links));
  } else {
    storage.setItem(holder, JSON.stringify([uploadLocal]));
  }
};

//stoage delete
const storageDelete = (deleteThis, holder) => {
  let links = storage.getItem("links");
  links = JSON.parse(links);
  links = links.filter((e) => e.nameOfLink !== deleteThis);
  storage.setItem(holder, JSON.stringify(links));
};
const storageDeleteTask = (deleteThis, holder) => {
  let links = storage.getItem(holder);
  links = JSON.parse(links);
  links = links.filter((e) => e.taskName !== deleteThis);
  storage.setItem(holder, JSON.stringify(links));
};

// check link on load
const checkLinkFunc = () => {
  let linksInStorage = storage.getItem("links");
  linksInStorage = JSON.parse(linksInStorage);
  try {
    linksInStorage.forEach((e) => {
      const li = dom.createElement("li");
      const img = dom.createElement("img");
      li.setAttribute("class", "linkCardClicks flex-reverse newLinkClass");
      img.setAttribute("linkProp", e.linkToAdd);

      img.setAttribute("class", "width20 imgClickLink");
      img.setAttribute("src", "./assets/forward.svg");
      const del = dom.createElement("img");
      del.setAttribute("class", "deleteLink width20");
      del.setAttribute("src", "./assets/delete.svg");
      del.setAttribute("onclick", `deleteLink('${e.nameOfLink}')`);

      li.innerText = e.nameOfLink;
      li.appendChild(img);
      li.appendChild(del);

      appsLink.after(li);
    });
  } catch (error) { }
};


const quotes = [
  "I accomplished great things without the support of people I needed to support me. I am proud of myself.",
  "I don't judge poverty by wealth. The poor are those who cannot afford to pay attention in life.",
  "Exception is one way of saying I can't",
  "XML is the lazy refuge of cowards who fear writing parsers.",
  "X Marks the spot",
  "If Mahal ka ng nanay mo, then, you are loved!",
  "Karma is accountability",
  "Keeping silence doesn’t show the weakness! It shows the patience to forgive.",
  "Machines can't be tempered but the top men controlling all operation can easily be influenced to favour anyone."

]

const quotesContainer = dom.getElementById('quotesContainer')
const quotesContainerSpan = dom.getElementById('quotesContainerSpan')

const showQuotes = () => {

  let quoteArr = []
  const quoteLen = quotes.length
  const ran = Math.floor(Math.random() * quoteLen)
  quoteArr.push(ran);
  let quote;
    fadeInFunc(quotesContainer,6)
    quote = quotes[ran]
    quoteArr = []
    quotesContainerSpan.textContent = `"${quote}"`
}


showQuotes()

const timeFunc = () => {
  let lastPerson = "";

  const amPmGlobal = new Date().getHours() >= 12 ? "PM" : "AM";
  const greetings = `Good ${amPmGlobal === "PM" ? "Evening," : "Morning,"}`;
  greet.textContent = greetings;
  const amPm = new Date().getHours() >= 12 ? "PM" : "AM";
  let hour =
    new Date().getHours() % 12 === 0
      ? new Date().getHours()
      : new Date().getHours() % 12;

  if (hour === 12) {
    hour = 12;
  }
  const minutes = new Date().getMinutes();
  const date = `${hour < 10 ? "0" + hour : hour}:${minutes < 10 ? "0" + minutes : minutes
    }`;

  time.textContent = date;
  amPmGreet.textContent = amPm;




};

timeFunc();



const backFunc = () => {
  let slideCount = 0;
  const slideNow = setInterval(function () {
    slideCount += 20;
    defaultSelection.style.opacity = 1;
    defaultSelection.style.display = "flex";
    defaultSelection.style.marginLeft = `${slideCount}px`;
    newLinkcard.style.marginLeft = `${slideCount}px`;
    newLinkcard.style.opacity = slideCount * -1;
    if (slideCount === 260) {
      clearInterval(slideNow);
      defaultSelection.style.marginLeft = 0;
      newLinkcard.style.display = "none";
    }
  }, 10);
  linkCard.style.width = "260px";
};

// check task func

const checkTask = () => {
  let tasks = storage.getItem("tasks");
  let taskData = JSON.parse(tasks);
  tasks = JSON.parse(tasks);
  try {
    tasks = tasks.length;
    if (tasks < 1) {
      taskCounter.style.background = "transparent";
    } else {
      taskCounter.style.background = "red";
      taskData.forEach((e) => {

        const li = dom.createElement('li')
        li.textContent = e.taskName
        const input = dom.createElement('input')
        li.setAttribute('class', 'todoTasks')
        input.setAttribute('id', e.taskName)
        input.setAttribute('onchange', `taskTodoChange('${e.taskName}')`)
        input.setAttribute('type', 'checkbox')
        li.appendChild(input);
        innerTaskCardContainer.appendChild(li)

      });
    }
  } catch (error) { }

  taskCounter.textContent = tasks == 0 ? '' : tasks;
};

