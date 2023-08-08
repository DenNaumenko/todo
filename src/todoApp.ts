class Todo {
    constructor(public id: number, public text: string, public status: string) {}
}

export default class TodoApp {
    private initialId: number = 0;
    public todos: Todo[] = [];
    public todoListElement: HTMLUListElement;
    private inputElement: HTMLInputElement;

    constructor(inputId: string, listId: string) {
        this.inputElement = document.getElementById(inputId) as HTMLInputElement;
        this.todoListElement = document.getElementById(listId) as HTMLUListElement;
        const initialIdString = localStorage.getItem('initialId');
        if (initialIdString) {
            this.initialId = JSON.parse(initialIdString);
        }

        this.loadTodos();
        this.renderTodos();
    }

    loadTodos() {
        const todosString = localStorage.getItem('todos');
        if (todosString) {
            this.todos = JSON.parse(todosString);
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
        localStorage.setItem('initialId', JSON.stringify(this.initialId));

    }

    renderTodos() {
        console.log(this.todos);
        this.todoListElement.innerHTML = '';
        this.todos.forEach(({id, text, status}) => {
            const listItem = document.createElement('li');
            const btnInProgress = document.createElement('button');
            const btnDone = document.createElement('button');
            const btnDelete = document.createElement('button');
            const statusElement = document.createElement('div');
            const listItemText = document.createElement('span');
            const buttonsWrapper = document.createElement('div');
            const textWrapper = document.createElement('div');

            listItem.setAttribute('id', id.toString());
            listItem.setAttribute('class', status);

            statusElement.setAttribute('class', 'status');
            buttonsWrapper.setAttribute('class', 'buttons_wrapper');
            textWrapper.setAttribute('class', 'text_wrapper');

            btnInProgress.classList.add('btn_in_progress');
            btnDone.classList.add('btn_done');
            btnDelete.classList.add('btn_delete');

            statusElement.textContent = `Status: ${status.replace('_', ' ')}`;
            btnInProgress.textContent = status.replace('_', ' ') === 'in progress' ? 'todo' : 'in progress';
            btnDone.textContent = 'done';
            btnDelete.textContent = 'X';
            listItemText.textContent = `Label: ${text}`;

            textWrapper.appendChild(listItemText);
            textWrapper.appendChild(statusElement);

            buttonsWrapper.appendChild(btnInProgress);
            buttonsWrapper.appendChild(btnDone);
            buttonsWrapper.appendChild(btnDelete);

            listItem.appendChild(textWrapper);
            listItem.appendChild(buttonsWrapper);
            this.todoListElement.appendChild(listItem);
        });
    }

    addTodo() {
        this.initialId += 1;
        const text = this.inputElement.value.trim();
        if (text) {
            const newTodo = new Todo(this.initialId, text, 'todo');
            this.todos.push(newTodo);
            this.saveTodos();
            this.renderTodos();
            this.inputElement.value = '';
        }
    }
  }