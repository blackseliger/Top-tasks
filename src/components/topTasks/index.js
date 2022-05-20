import filterArr from "../../utils/filter-arr";

export default class topTasks {
    subElements = {};
    tasks = [
        { name: 'first task', pinned: false },
        { name: 'second task', pinned: false },
        { name: 'third task', pinned: false },
        { name: 'four task', pinned: false },
        { name: 'five task', pinned: false }
    ]

    pinnedTasks = [
        { name: 'six task', pinned: true },
        { name: 'seven task', pinned: true },
    ]


    onFilter = (event) => {

        const { listPinned, listDefault } = this.subElements;

        const text = event.target.value.toLowerCase();
        this.filterDefault = filterArr(this.tasks, text);
        this.filterPin = filterArr(this.pinnedTasks, text);

        // listPinned.innerHTML = this.getListTasks(this.filterPin);
        listDefault.innerHTML = this.getListTasks(this.filterDefault);
        this.showHidden();

    }

    onCreate = (event) => {
        if (event.code !== "Enter") return null;
        if (event.target.value.trim() === '') return null;
        const text = event.target.value;

        const { listDefault, listPinned, hiddenPined, hiddenDefault } = this.subElements;
        this.tasks.push({ name: text, pinned: false })



        listDefault.innerHTML = this.getListTasks(this.tasks);
        listPinned.innerHTML = this.getListTasks(this.pinnedTasks);
        hiddenPined.classList.add('topTask__hidden-pinned');
        hiddenDefault.classList.add('topTask__hidden-default')

    }

    onPin = (event) => {
        if (event.target.dataset.pin) {
            const { listPinned, hiddenDefault, hiddenPined } = this.subElements;

            const name = event.target.closest('.topTasks__task').textContent.trim();
            this.tasks = [...this.tasks].filter((task) => task.name !== name);
            this.pinnedTasks.push({name: name, pinned: true})

            hiddenPined.classList.add('topTask__hidden-pinned');
            if (!this.tasks.length) hiddenDefault.classList.remove('topTask__hidden-default') 

            event.target.classList.add('topTasks__icon-pinned');
            listPinned.append(event.target.closest('.topTasks__task'));
        }
    }

    unPin = (event) => {
        if (event.target.dataset.pin) {
            const { listDefault, hiddenPined, hiddenDefault } = this.subElements;

            const name = event.target.closest('.topTasks__task').textContent.trim();
            this.pinnedTasks = [...this.pinnedTasks].filter((task) => task.name !== name)
            this.tasks.push({name: name, pinned: false});

            hiddenDefault.classList.add('topTask__hidden-default');
            if (!this.pinnedTasks.length) hiddenPined.classList.remove('topTask__hidden-pinned');

            event.target.classList.remove('topTasks__icon-pinned');
            listDefault.append(event.target.closest('.topTasks__task'));

        }
    }


    showHidden() {

        const { hiddenPined, hiddenDefault } = this.subElements;

        (!this.filterPin.length) ? hiddenPined.classList.remove('topTask__hidden-pinned') : hiddenPined.classList.add('topTask__hidden-pinned');

        (!this.filterDefault.length) ? hiddenDefault.classList.remove('topTask__hidden-default') : hiddenDefault.classList.add('topTask__hidden-default');
    }


    constructor() {
        this.filterPin = [];
        this.filterDefault = [];
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();
        this.element = wrapper.firstElementChild;

        this.subElements = this.getSubElements();
        this.initEventListeners();
    }




    initEventListeners() {
        const { inputTask, listDefault, listPinned } = this.subElements;
        console.log(inputTask);
        inputTask.addEventListener('input', this.onFilter);
        inputTask.addEventListener('keydown', this.onCreate);
        listDefault.addEventListener('click', this.onPin);
        listPinned.addEventListener('click', this.unPin);
    }




    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]');

        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }

        return this.subElements;
    }



    getListTasks(typeTask) {
        return typeTask.map((task) => {
            if (task.pinned) {
                return `<div class="topTasks__task">
                ${task.name}
                <div class="topTasks__icon topTasks__icon-pinned" data-pin="pin">  
                </div>
            </div>`
            } else {
                return `<div class="topTasks__task">
                ${task.name}
                <div class="topTasks__icon" data-pin="pin">  
                </div>
            </div>`
            }
        }).join('')
    }

    getTemplate() {
        return ` <div class="topTasks__table">
        <h1 class="topTasks__header">Top Tasks</h1>
        <input class="topTasks__input" type="text" required placeholder="name task" data-element="inputTask">
        <h2 class="topTasks__header">Pinned:</h2>
        <div class="topTasks__task-list topTasks__task-list_pinned" data-element="listPinned">
            ${this.getListTasks(this.pinnedTasks)}
        </div>
        <div class="topTask__hidden topTask__hidden-pinned" data-element="hiddenPined">No pinned tasks</div>
        <h2 class="topTasks__header">All Taks:</h2>
        <div class="topTasks__task-list topTasks__task-list_default" data-element="listDefault">
            ${this.getListTasks(this.tasks)}
        </div>
        <div class="topTask__hidden topTask__hidden-default" data-element="hiddenDefault">No all tasks</div>
    </div>`
    }



    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;
    }


}