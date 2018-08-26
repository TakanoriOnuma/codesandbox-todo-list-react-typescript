import * as React from 'react';
import { v4 as uuid } from 'uuid';
import { findIndex } from 'lodash';

import TodoInputter from './components/TodoInputter';
import TodoList from './components/TodoList';

interface Todo {
  id: string;
  isDone: boolean;
  text: string;
  deadline: Date;
}

// TODOリストの初期値
const INITIAL_TODO_LIST: Array<Todo> = [
  {
    id: uuid(),
    isDone: true,
    text: 'todo',
    deadline: new Date()
  },
  {
    id: uuid(),
    isDone: false,
    text: 'todo2',
    deadline: new Date()
  },
  {
    id: uuid(),
    isDone: false,
    text: 'todo3',
    deadline: new Date()
  },
  {
    id: uuid(),
    isDone: true,
    text: 'todo4',
    deadline: new Date()
  },
  {
    id: uuid(),
    isDone: false,
    text: 'todo5',
    deadline: new Date()
  }
];

interface Props {
}
interface State {
  todoList: Array<Todo>;
}
export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todoList: INITIAL_TODO_LIST
    };
  }

  /**
   * TODOの登録
   * @param todo - todo情報
   */
  onSubmitTodo = (todo: { text: string, deadline: Date }) => {
    const newTodo: Todo = {
      ...todo,
      id: uuid(),
      isDone: false
    };
    const { todoList } = this.state;
    this.setState({
      todoList: [newTodo].concat(todoList)
    });
  }

  /**
   * TODOステータスの切り替え
   * @param todoId - TODO ID
   */
  onTodoStatusChange = (todoId: string) => {
    const { todoList } = this.state;
    const index = findIndex(todoList, (todo) => todo.id === todoId);

    if (index === -1) {
      return;
    }

    const newTodoList = todoList.concat();
    newTodoList[index] = {
      ...newTodoList[index],
      isDone: !newTodoList[index].isDone
    };

    this.setState({
      todoList: newTodoList
    });
  }

  /**
   * TODOの削除
   * @param todoId - TODO ID
   */
  onTodoDelete = (todoId: string) => {
    const { todoList } = this.state;
    this.setState({
      todoList: todoList.filter((todo) => todo.id !== todoId)
    });
  }

  render() {
    const { todoList } = this.state;
    return (
      <div style={{ padding: '10px' }}>
        <TodoInputter
          onSubmitTodo={this.onSubmitTodo}
        />
        <TodoList
          todoList={todoList}
          onStatusChange={this.onTodoStatusChange}
          onDelete={this.onTodoDelete}
        />
     </div>
    );
  }
}
