import React, { useState } from "react";
import "./App.css";
//returnの外にはjs記述できる

//todoの項目をTodo型として定義する
type Todo = {
  id: number;
  text: string;
  description: string;
  status: "未着手" | "着手" | "完了";
};

function App() {
  const [input, setInput] = useState<string>(""); //todo入力
  const [todos, setTodos] = useState<Todo[]>([]); //todos→todoの配列、後で使う

  //編集モード↓
  const [isEditingIndex, setIsEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const [nextId, setNextId] = useState<number>(1);

  const [description, setDescription] = useState<string>("");
  const [editDescription, setEditDescription] = useState(""); // ← 追加

  //todo追加
  const handleAddTodo = () => {
    if (input.trim() === "") return; //入力したtodoが空白かどうか→空なら関数から抜ける
    const newTodo: Todo = {
      id: nextId,
      text: input,
      description: description,
      status: "未着手",
    };
    setTodos([...todos, newTodo]); //todoの状態を更新→型注釈したらエラー直ったがなんで？
    setInput("");
    setDescription("");
    setNextId(nextId + 1);
  };

  //todo削除
  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  //ステータス変更
  const handleStatusChange = (id: number, newStatus) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );

    setTodos(updateTodos);
  };

  //編集モード
  const handleEditSave = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, text: editText, description: editDescription }
        : todo
    );

    setTodos(updatedTodos);
    setIsEditingIndex(null); // 編集モード終了
  };

  //以下(returnの中身)がブラウザに表示される

  return (
    <>
      <div className="App">
        <h1 className="app-title">🌻Todoリスト🌻</h1>
        <input //todo入力フォーム
          className="todoForm"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          placeholder="ここにTodoを入力"
        />

        <textarea
          className="descriptionForm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="詳細を入力"
        />

        <button onClick={handleAddTodo}>追加</button>

        <ul>
          {todos.map((todo) => (
            <li className="todoList" key={todo.id}>
              {isEditingIndex === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <button onClick={() => handleEditSave(todo.id)}>
                    編集を保存
                  </button>
                  <button onClick={() => setIsEditingIndex(null)}>
                    キャンセル
                  </button>
                </>
              ) : (
                <>
                  <span className="todoTitle">
                    {todo.id}:{todo.text}
                  </span>
                  <p>詳細: {todo.description}</p>
                  <select
                    className="statusSelect"
                    value={todo.status}
                    onChange={(e) =>
                      handleStatusChange(todo.id, e.target.value)
                    }
                  >
                    <option value="未着手">未着手</option>
                    <option value="着手">着手</option>
                    <option value="完了">完了</option>
                  </select>

                  <button
                    onClick={() => {
                      setIsEditingIndex(todo.id);
                      setEditText(todo.text);
                      setEditDescription(todo.description);
                    }}
                  >
                    編集
                  </button>

                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    削除
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
