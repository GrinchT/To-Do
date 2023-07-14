//let's goooo budy
const selectForm = document.querySelector('.form')
const taskList = document.querySelector('.tasks')
const deleteAll = document.querySelector('#delete-all')
const taskInput = document.querySelector('#taskInput')
const emptyList = document.querySelector('#empty-list')
const nightButton = document.querySelector('.btn')


selectForm.addEventListener('submit', addTask)

deleteAll.addEventListener('click', delteAllTasks)

taskList.addEventListener('click', deleteTask)

taskList.addEventListener('click', doneTask)

nightButton.addEventListener('click', nightMode)

let tasks = []

if (localStorage.getItem('darkmode') === 'on') {
    document.body.classList.add('night')
}


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach(element => renderTask(element))
}



checkEmptyList()



function addTask(event) {
    event.preventDefault()

    const userInput = taskInput.value

    const element = {
        id: Date.now(),
        text: userInput,
        done: false,

    }

    tasks.push(element)

    saveToLocalStorage()

    renderTask(element)


    taskInput.value = ''
    checkEmptyList()

}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li')

    const id = Number(parentNode.id)

    const taskIndex = tasks.findIndex((task) => task.id === id)


    tasks.splice(taskIndex, 1)


    parentNode.remove()

    saveToLocalStorage()


    checkEmptyList()
}

function delteAllTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
        tasks.length = 0
    }
    saveToLocalStorage()

    checkEmptyList()
}


function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('li')

    const id = Number(parentNode.id)

    const task = tasks.find((task) => task.id === id)

    task.done = !task.done

    saveToLocalStorage()
    parentNode.classList.toggle('task-strike')

}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyHtml = `<li id="empty-list">Empty list</li>`
        taskList.insertAdjacentHTML('afterbegin', emptyHtml)
    }

    if (tasks.length > 0) {
        const emptyListElement = document.querySelector('#empty-list')
        emptyListElement ? emptyListElement.remove() : null
    }
}


function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(element) {

    const cssClass = element.done ? 'task-item task-strike' : 'task-item'



    const taskHtml = `<li id="${element.id}" class="${cssClass}">
        <div class="task-content">
            ${element.text}
        </div>
        <div class="task-buttons">
            <button value="submit" data-action="done">
                <img src="img/icons8-done-32.png" alt="">
            </button>
            <button value="submit" data-action="delete">
                <img src="img/icons8-close-32.png" alt="">
            </button>
        </div>
    </li>`



    const addTask = taskList.insertAdjacentHTML('beforeend', taskHtml)

}


function nightMode() {
    const getBody = document.body
    const isDark = getBody.classList.toggle("night");

    if (isDark) {
        localStorage.setItem('darkmode', 'on')
    }

    if (!isDark) {
        localStorage.setItem('darkmode', 'off')
    }
}