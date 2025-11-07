import React, { useEffect, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch todos from backend
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  // Add new todo
  const addTodo = async () => {
    if (!task.trim()) return;
    const res = await fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: task }),
    });
    if (res.ok) {
      setTask("");
      fetchTodos();
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:5000/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  // Update a todo
  const updateTodo = async (id) => {
    if (!editText.trim()) return;
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editText }),
    });
    setEditingId(null);
    setEditText("");
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          borderRadius: "15px",
          padding: "25px 30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#333",
            marginBottom: "20px",
            fontSize: "28px",
          }}
        >
          📝 My Todo List
        </h1>

        {/* Input box */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              fontSize: "15px",
              transition: "0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#74ebd5")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <button
            onClick={addTodo}
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 15px",
              fontSize: "15px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "#45a049")}
            onMouseLeave={(e) => (e.target.style.background = "#4CAF50")}
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {todos.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "#888",
                fontStyle: "italic",
              }}
            >
              No todos yet — add one!
            </p>
          ) : (
            todos.map((todo) => (
              <li
                key={todo._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: "#f7f7f7",
                  marginBottom: "10px",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#eafaf1")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#f7f7f7")
                }
              >
                {editingId === todo._id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{
                        flex: 1,
                        marginRight: "10px",
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none",
                      }}
                    />
                    <button
                      onClick={() => updateTodo(todo._id)}
                      style={{
                        background: "#2196F3",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        marginRight: "6px",
                        cursor: "pointer",
                      }}
                    >
                      💾
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{
                        background: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        cursor: "pointer",
                      }}
                    >
                      ❌
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#333",
                        wordBreak: "break-word",
                        flex: 1,
                      }}
                    >
                      {todo.title || todo.task}
                    </span>
                    <div>
                      <button
                        onClick={() => {
                          setEditingId(todo._id);
                          setEditText(todo.title || todo.task);
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "#2196F3",
                          fontSize: "18px",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "red",
                          fontSize: "18px",
                          cursor: "pointer",
                          transition: "0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.3)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
