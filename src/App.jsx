import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Todo from "./components/Todo/Todo";
import AddTodoModal from "./components/AddTodoModal/AddTodoModal";
import NoTodo from "./components/NoTodo/NoTodo";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  const addTodo = (title, description, isImportant) => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      description,
      isImportant,
      isComplete: false,
    };

    setTodos([...todos, newTodo]);
    setIsModalOpen(false);
  };

  const doTodo = (id) => {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = true;
      }

      return todo;
    });

    setTodos(updatedTodo);
  };

  const removeTodo = (id) => {
    const updatedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  };
  return (
    <>
      <Header />

      <main className="container pb-25">
        <div id="headline" className="space-y-3">
          <h1 className="title">
            <img src="/images/hourglass.png" className="size-8" />
            <span> مدیریت و برنامه ریزی </span>
          </h1>
          <p className="max-w-[750px] text-zinc-700 text-sm font-Vazir-Medium!">
            سبز تسک ابزاری قدرتمند برای سازماندهی وظایف روزمره، برنامه‌ریزی
            پروژه‌ها و افزایش بهره‌وری شماست. با رابط کاربری ساده و امکانات
            پیشرفته، از پیگیری وظایف تا همکاری تیمی را به آسانی مدیریت کنید.
          </p>
        </div>

        <div className="mt-14 border-b w-full border-zinc-200 flex items-center py-3 justify-between">
          <div></div>
          <div className="flex items-center gap-2">
            <div className="dropdown">
              <input id="dd-toggle" type="checkbox" hidden />

              <label className="dd-btn" htmlFor="dd-toggle">
                <span>نمایش فقط</span>
                <i className="fa-solid fa-chevron-down"></i>
              </label>

              <div className="dropdown_menu" role="menu">
                <div className="dropdown-label">
                  <p className="text-start text-xs opacity-60">نمایش فقط</p>
                </div>
                <div className="py-1">
                  <label htmlFor="dd-toggle" className="menu-item">
                    همه
                  </label>
                  <label htmlFor="dd-toggle" className="menu-item">
                    تکمیل شده ها
                  </label>
                  <label htmlFor="dd-toggle" className="menu-item">
                    در انتظار انجام
                  </label>
                </div>
              </div>
            </div>

            <button
              id="open-dialog"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              <span> ایجاد جدید </span>
              <div className="btn-divider"></div>
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </button>
          </div>
        </div>
        {todos.length ? (
          <section id="tasks" className="space-y-30 mt-5">
            <div className="space-y-5">
              <p className="text-sm">تسک های موجود:</p>
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  {...todo}
                  onDo={doTodo}
                  onRemove={removeTodo}
                />
              ))}
            </div>
            <div className="space-y-5">
              <p className="text-sm">تسک‌های تکمیل‌شده</p>
              {todos
                .filter((todo) => todo.isComplete)
                .map((todo) => (
                  <Todo
                    key={todo.id}
                    {...todo}
                    onDo={doTodo}
                    onRemove={removeTodo}
                  />
                ))}
            </div>
          </section>
        ) : (
          <NoTodo />
        )}
      </main>

      {isModalOpen && (
        <AddTodoModal
          onClose={() => setIsModalOpen(false)}
          addTodoHandler={addTodo}
        />
      )}

      <Footer />
    </>
  );
}

export default App;
