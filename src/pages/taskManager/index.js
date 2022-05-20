import topTasks from "../../components/topTasks";



export default class Page {
    subElements = {};
    components = {};

    render() {

        const element = document.createElement('div');
        element.innerHTML = this.getTemplate();

        this.element = element.firstElementChild;

        this.subElements = this.getSubElements();
        console.log(this.element);
        this.initComponents();
        this.renderComponents();
        // this.initEventListeners();

        return this.element;
    }


    initComponents() {
        const toptasks = new topTasks();

        this.components = {
            toptasks,
        }


    }

    renderComponents() {
        Object.keys(this.components).forEach(component => {
            const root = this.subElements[component];
            const { element } = this.components[component];
            root.append(element);
        })
    }


    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]');
        console.log(elements);
        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }
        return this.subElements;
    }

    removeEventListeners() {
       
    }

    remove() {
        if (this.element) {
            this.element.remove()
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;


        for (const component of Object.values(this.components)) {
            component.destroy();
        }
    }


    getTemplate() {
        return `<div class="topTasks">
           <div data-element="toptasks">
            
           </div>
    </div>
        `
    }
}