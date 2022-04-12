dom.addEventListener("DOMContentLoaded", (e) => {
  //fade in document
  fadeInFunc(html, 5);
  //time and quote
  setInterval(timeFunc, 1000);

  const quote = setInterval(showQuotes, 10000);

  //load links
  checkLinkFunc();

  //add on click to all new links
  dom.querySelectorAll(".imgClickLink").forEach((e) => {
    e.addEventListener("click", (el) => {
      const link = el.target.getAttribute("linkprop");
      if (link.includes("https://")) {
        window.open(`https://${link}`, "_blank");
      } else if (!link.includes("https://") && link.includes(".com")) {
        window.open(`https://${link}`, "_blank");
      } else {
        window.open(`https://google.com/search?q=${link}`, "_blank");
      }
    });
  });

  //load name if exist and lock
  if (storage.getItem("name")) {
    console.log(storage.getItem("name"));
    nameGreet.value = storage.getItem("name");
    nameGreet.readOnly = true;
  }

  //load check task if exist
  checkTask();

  //change handle to update task state
  const taskClass = dom.querySelectorAll(".taskClass");
  taskClass.forEach((el) => {
    el.addEventListener("change", (data) => {
      const { name, value } = data.target;
      taskState[name] = value;
    });
  });

  //default task time
  let d = new Date();
  const dateForm = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`;
  dueDate.value = dateForm;

  const focusStorage = storage.getItem("focus");

  if (focusStorage) {
    checkFocus();
  }

  addQuote.addEventListener('click', () => {
    clearInterval(quote)
    quotesContainerSpan.setAttribute('contentEditable',true)
    quotesContainerSpan.textContent = ''
    quotesContainerSpan.focus()
  })

});



const interVals = []

quotesContainerSpan.addEventListener('focusin', () => {

  if(interVals.length>0) {
    const len = interVals.length -1
    clearInterval(interVals[len])
  }


})

quotesContainerSpan.addEventListener('focusout', () => {
  const changeVal = quotesContainerSpan.textContent
  quotesContainerSpan.setAttribute('contentEditable',false)
  quotes.push(changeVal);
  const quoteTwo = setInterval(showQuotes, 10000);
  interVals.push(quoteTwo)

  
})

//search input fade
searchIcon.addEventListener("mouseover", (e) => {
  searchInput.style.opacity = 0.5;
});

searchInput.addEventListener("focusin", (e) => {
  searchInput.style.opacity = 1;
});

searchInput.addEventListener("focusout", (e) => {
  fadeOutFunc(searchInput, 5);
});

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
    window.open(`https://google.com`);
  } else {
    window.open(`https://google.com/search?q=${searchThis}`);
  }
  searchInputVal.value = "";
});

let cardFadeCount = 0;
linkNav.addEventListener("click", () => {
  cardFadeCount += 1;
  if (cardFadeCount % 2 === 0) {
    fadeOutFunc(linkCard, 5);
    linkCard.style.zIndex = -20;
  } else {
    fadeInFunc(linkCard, 5);
    linkCard.style.zIndex = 1;
  }
});

//link card actions
linkCardClicks.forEach((e) => {
  e.addEventListener("click", (el) => {
    const { id } = el.target;
    if (id === "chromeLink") {
      window.open("app.html?page=apps");
    } else {
      window.open("app.html");
    }
  });
});

//card slide
newLink.addEventListener("click", (e) => {
  let slideCount = 0;
  const slideNow = setInterval(function () {
    slideCount -= 20;
    newLinkcard.style.display = "block";
    defaultSelection.style.marginLeft = `${slideCount}px`;
    newLinkcard.style.marginLeft = `${slideCount}px`;
    newLinkcard.style.opacity = 1;
    if (slideCount === -260) {
      clearInterval(slideNow);
      fadeOutFunc(defaultSelection, 5);
      defaultSelection.style.display = "none";
      newLinkcard.style.marginLeft = 0;
      linkCard.style.width = "fit-content";
    }
  }, 10);
});

backCard.addEventListener("click", (e) => {
  backFunc();
  nameLink.style.borderColor = "#6e6e6e";
  linkToAdd.style.borderColor = "#6e6e6e";
});

formLinkCard.addEventListener("change", (e) => {
  const { value, id } = e.target;
  linkState[id] = value;
});

//add link to card
linkButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (nameLink.value.length < 1 && linkToAdd.value.length < 1) {
    nameLink.style.borderColor = "red";
    linkToAdd.style.borderColor = "red";
    return;
  }

  const uploadLocal = linkState;
  storageUpload("links", uploadLocal);
  const li = dom.createElement("li");
  li.setAttribute("class", "linkCardClicks flex-reverse newLinkClass");
  const img = dom.createElement("img");
  img.setAttribute("src", "./assets/forward.svg");
  img.setAttribute("class", "width20 imgClickLink");
  li.innerText = linkState.nameOfLink;

  img.setAttribute("onclick", `openLink('${linkState.linkToAdd}')`);
  li.appendChild(img);

  const del = dom.createElement("img");
  del.setAttribute("class", "deleteLink width20");
  del.setAttribute("src", "./assets/delete.svg");
  del.setAttribute("onclick", `deleteLink('${linkState.nameOfLink}')`);

  li.appendChild(del);
  appsLink.after(li);

  backFunc();
  nameLink.value = "";
  linkToAdd.value = "";

  nameLink.style.borderColor = "#6e6e6e";
  linkToAdd.style.borderColor = "#6e6e6e";
});

//onclick new link func outside init
function openLink(el) {
  if (el.includes("https://")) {
    window.open(`https://${el}`, "_blank");
  } else if (!el.includes("https://") && el.includes(".com")) {
    window.open(`https://${el}`, "_blank");
  } else {
    window.open(`https://google.com/search?q=${el}`, "_blank");
  }
}
//delete link
function deleteLink(el) {
  console.log(el);
  dom.querySelectorAll(".newLinkClass").forEach((e) => {
    if (e.textContent === el) {
      fadeOutFunc(e, 5);
      setTimeout(() => {
        e.style.display = "none";
      }, 600);
    }
  });

  storageDelete(el, "links");
}

//name change update
nameGreet.addEventListener("focusout", (e) => {
  const { value } = e.target;
  storage.setItem("name", value);
  nameGreet.readOnly = true;
});
nameGreet.addEventListener("change", (e) => {
  const { value } = e.target;
  storage.setItem("name", value);
  nameGreet.readOnly = true;
});

let clickCountOfGreet = 0;
nameGreet.addEventListener("click", () => {
  clickCountOfGreet += 1;
  if (clickCountOfGreet % 2 === 0) {
    nameGreet.readOnly = false;
  }

  setTimeout(function () {
    clickCountOfGreet = 0;
  }, 1000);
});

//task upload

const taskNameInput = dom.getElementById("taskNameInput");

taskCreate.addEventListener("click", (e) => {
  e.preventDefault();

  if (!taskState.taskName) {
    taskNameInput.style.borderBottom = "2px solid red";
    return;
  }

  taskState.dueDate = dueDate.value;

  storageUpload("tasks", taskState);

  shakeFunc(todoSection, 6);

  taskCounter.style.background = "red";

  let tasks = storage.getItem("tasks");
  tasks = JSON.parse(tasks);
  tasks = tasks.length;
  taskCounter.style.background = "red";

  const li = dom.createElement("li");
  console.log(taskState);
  li.textContent = taskState.taskName;
  li.setAttribute("class", "todoTasks");
  const input = dom.createElement("input");
  input.setAttribute("id", taskState.taskName);
  input.setAttribute("type", "checkbox");
  input.setAttribute("onchange", `taskTodoChange('${taskState.taskName}')`);
  li.appendChild(input);

  innerTaskCardContainer.appendChild(li);
  taskCounter.textContent = tasks;
  taskNameInput.style.borderBottom = "2px solid rgb(110, 110, 110)";
  taskNameInput.value = "";



  //trigger change
  const event = new Event("change");
  selectTaskSched.dispatchEvent(event);
  taskState = {};
});

function taskTodoChange(e) {
  dom.querySelectorAll(".todoTasks").forEach((el) => {
    if (el.textContent === e) {
      el.style.textDecoration = "line-through";
      fadeOutFunc(el, 5);
      setTimeout(function () {
        el.style.display = "none";
      }, 600);
    }
  });
  storageDeleteTask(e, "tasks");
  let counter = storage.getItem("tasks");
  counter = JSON.parse(counter);
  counter = counter.length;

  if (counter == 0) {
    taskCounter.textContent = "";
    taskCounter.style.backgroundColor = "transparent";
  } else {
    taskCounter.textContent = counter;
  }
}

//fade in add todo card
const addTaskButton = dom.getElementById("addTaskButton");
const addTodo = dom.querySelector(".addTodo");
let addClickButton = 0;
addTaskButton.addEventListener("click", (e) => {
  addClickButton += 1;
  if (addClickButton % 2 === 0) {
    fadeOutFunc(addTodo, 5);
    addTodo.style.zIndex = "-20";
  } else {
    fadeInFunc(addTodo, 5);
    addTodo.style.zIndex = "1";
  }
});

selectTaskSched.addEventListener("change", (e) => {
  console.log("test");
  const filterTo = e.target.value;

  let tasks = storage.getItem("tasks");
  tasks = JSON.parse(tasks);

  const filtered = tasks.filter((e) => {
    const t = Date.parse(e.dueDate);
    const eMonth = new Date(t).getMonth() + 1;
    const eDate = new Date(t).getDate();
    const eYear = new Date(t).getFullYear();

    const tMonth = new Date().getMonth() + 1;
    const tDate = new Date().getDate();
    const tYear = new Date().getFullYear();

    if (filterTo == "all") {
      return e;
    }

    if (filterTo == "overdue") {
      if (
        eMonth < tMonth ||
        (eMonth == tMonth && eDate < tDate) ||
        eYear < tYear
      ) {
        return e;
      }
    }

    if (filterTo == "tomorrow") {
      if (
        eMonth > tMonth ||
        (eMonth == tMonth && eDate > tDate) ||
        eYear > tYear
      ) {
        return e;
      }
    }

    if (filterTo == "today") {
      if (eMonth == tMonth && eDate == tDate && eYear == tYear) {
        return e;
      }
    }
  });

  dom.querySelectorAll(".todoTasks").forEach((e) => {
    e.style.display = "none";
  });

  filtered.forEach((e) => {
    const li = dom.createElement("li");
    li.textContent = e.taskName;
    const input = dom.createElement("input");
    li.setAttribute("class", "todoTasks");
    input.setAttribute("id", e.taskName);
    input.setAttribute("onchange", `taskTodoChange('${e.taskName}')`);
    input.setAttribute("type", "checkbox");
    li.appendChild(input);
    innerTaskCardContainer.appendChild(li);
  });
});

// fade in todo lower card

const todoSpan = dom.getElementById("todoSpan");
const todoCard = dom.querySelector(".todoCard");
let addClickButtonLower = 0;
todoSpan.addEventListener("click", (e) => {
  addClickButtonLower += 1;
  if (addClickButtonLower % 2 === 0) {
    fadeOutFunc(todoCard, 5);
    todoCard.style.zIndex = "-20";
  } else {
    fadeInFunc(todoCard, 5);
    todoCard.style.zIndex = "1";
  }
});

//focus

const focusSpan = dom.getElementById("focusSpan");
const focus = dom.querySelector(".focus");
let z = 0;

if(storage.getItem("focus")) {
  z = 1;
}


focusInput.addEventListener("change", (e) => {

  const focusTodayDiv = dom.getElementById("focusToday");
  const { value } = e.target;
  storage.setItem("focus", value);
  const focusToday = storage.getItem("focus");
  fadeOutFunc(focusSpan, 5);
  setTimeout(function () {
    focusSpan.style.display = "none";
    z += 1;
   if (z !== 1) {
     
      focusTodayDiv.remove();
    }
    const div = dom.createElement("div");
    div.setAttribute("id", "focusToday");
    const input = dom.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "focusCheck");
    input.setAttribute("onchange", "checkFuncFocus()");
    div.appendChild(input);
    const span = dom.createElement("span");
    span.setAttribute("id", "focusTaskSpan");
    span.innerText = focusToday;
    div.style.opacity = 0;
    div.appendChild(span);
    focus.appendChild(div);

    const focusTodayId = dom.getElementById("focusToday");

    fadeInFunc(focusTodayId, 5);
  }, 600);

  e.target.value = "";
});

function checkFocus() {
  const focusToday = storage.getItem("focus");

  focusSpan.style.display = "none";
  const div = dom.createElement("div");
  div.setAttribute("id", "focusToday");
  const input = dom.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("id", "focusCheck");
  input.setAttribute("onchange", "checkFuncFocus()");
  div.appendChild(input);
  const span = dom.createElement("span");
  span.setAttribute("id", "focusTaskSpan");
  span.innerText = focusToday;
  div.style.opacity = 0;
  div.appendChild(span);
  focus.appendChild(div);
  const focusTodayId = dom.getElementById("focusToday");
  focusTodayId.style.opacity = 1;
}

function checkFuncFocus() {
  const storedFocus = storage.getItem("focus");

  const focusTaskSpan = dom.getElementById("focusTaskSpan");
  const focusToday = dom.getElementById("focusToday");
  const focusSpan = dom.getElementById("focusSpan");
  focusTaskSpan.style.textDecoration = "line-through";
  fadeOutFunc(focusToday, 5);
  setTimeout(function () {
    focusToday.style.display = "none";
    storage.removeItem("focus");
    focusToday.textContent = storedFocus;

    focusSpan.style.display = "block";
    fadeInFunc(focusSpan, 5);
  }, 500);
}

