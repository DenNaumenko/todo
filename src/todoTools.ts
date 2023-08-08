import TodoApp from "./todoApp";
import {ITodoItem} from "./interfaces";

export default class TodoTools extends TodoApp {
    constructor(inputId: string, listId: string) {
      super(inputId, listId);
    }

    renderTodos(): void {
        super.renderTodos();
        const buttons = this.todoListElement.querySelectorAll('button');
        this.handleActionBtn(buttons);
    }

    handleActionBtn(buttons: NodeListOf<Element>) {
        console.log('here');
      buttons.forEach(el => {
        el.addEventListener('click', (e: Event) => {
          let parentId: number = -1;
          const currentTarget = e.currentTarget as HTMLElement;
          const parentElement = currentTarget.parentNode as HTMLElement;
          const listElement = parentElement.parentNode as HTMLElement;

          if (listElement instanceof HTMLElement) {
            parentId = +listElement.id;
          }

          switch(currentTarget.className) {
            case 'btn_in_progress':
                this.toggleStatus(parentId, 'in_progress');
                break;
            case 'btn_done':
              this.toggleStatus(parentId, 'done');
              break;
            case 'btn_delete':
              this.deleteBtn(parentId);
              break;
          };

          this.saveTodos();
          this.renderTodos();
        });
      });
    }

    toggleStatus(id: number, toggleStatus: string) {
      const newList = this.todos.map((el) => {
        if (el.id === id) {
            el.status = el.status === toggleStatus ? 'todo' : toggleStatus;
        }

        return el;
      });

      this.todos = newList;
    }

    deleteBtn(id: number) {
          const newTodosList = this.todos.filter((el: ITodoItem) => el.id !== id);
          this.todos = newTodosList;
    }
}