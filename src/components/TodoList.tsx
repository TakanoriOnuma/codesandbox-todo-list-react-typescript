import * as React from 'react';
import classNames from 'classnames';
import FlipMove from 'react-flip-move';

// CSS modulesではないので注意
import './TodoList.css';

/**
 * 日付をフォーマットする
 * @param {Date} date - Dateインスタンス
 * @returns {string} - フォーマットされた文字列
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const day = ('00' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

// アニメーションの設定
const enterAnimation = {
  from: {
    opacity: 0,
    transform: 'translate3d(0, -30px, 0)'
  },
  to: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)'
  }
};
const leaveAnimation = {
  from: {},
  to: {
    opacity: 0,
    transform: 'translate3d(0, -30px, 0)'
  }
}

interface Props {
  todoList: Array<any>,
  onStatusChange: (todoId: string) => void,
  onDelete: (todoId: string) => void
}
interface State {
  isAppearAnimationFinish: boolean
}
export default class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isApperAnimationFinish: false // 最初のアニメーションを終了したか
    };
  }
  render() {
    const { isApperAnimationFinish } = this.state;
    const { todoList } = this.props;
    return (
      <div className="todo-list">
        <h1 className="todo-list__title">todolist</h1>
        <FlipMove
          typeName="ul"
          className="todo-list__list"
          easing="ease"
          duration={500}
          staggerDelayBy={isApperAnimationFinish ? 0 : 100}
          appearAnimation={enterAnimation}
          enterAnimation={enterAnimation}
          leaveAnimation={leaveAnimation}
          onFinishAll={() => { this.setState({ isApperAnimationFinish: true }); }}
        >
          {todoList.map((todo) => (
            <li
              key={todo.id}
              className={classNames('todo', {
                'todo--done': todo.isDone
              })}
            >
              <div className="todo__line">
                <button
                  className="todo__status"
                  type="button"
                  onClick={() => { this.props.onStatusChange(todo.id); }}
                >
                  {todo.isDone ? 'DONE' : 'DOING'}
                </button>
                <div className="todo__deadline">締切：{formatDate(todo.deadline)}</div>
                <div
                  className="todo__delete"
                  onClick={() => { this.props.onDelete(todo.id); }}
                />
              </div>
              <div className="todo__text">{todo.text}</div>
            </li>
          ))}
        </FlipMove>
      </div>
    );
  }
}
