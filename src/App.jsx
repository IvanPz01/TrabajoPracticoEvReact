import React, { useState, useEffect, useContext } from 'react';

// Creamos un contexto para el estado de las tareas
const TaskContext = React.createContext();

// Componente de Tarea
const Task = ({ task }) => {
  const { tasks, setTasks } = useContext(TaskContext);

  const handleDelete = () => {
    setTasks(tasks.filter(t => t.id !== task.id));
  };

  return (
    <div>
      <p>{task.text}</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

// Componente de Lista de Tareas
const TaskList = () => {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      <h2>Lista de Tareas</h2>
      {tasks.map(task => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

// Componente Formulario para agregar tarea
const TaskForm = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text };
    setTasks([...tasks, newTask]);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Ingrese una nueva tarea"
      />
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

// Componente Principal de la Aplicación
const App = () => {
  const [tasks, setTasks] = useState([]);

  // Simulación de useEffect para cargar tareas desde un API
  useEffect(() => {
    // Aquí se simularía la llamada a un API para obtener las tareas
    const fetchedTasks = [
      { id: 1, text: 'Hacer la compra' },
      { id: 2, text: 'Estudiar React' },
      { id: 3, text: 'Hacer ejercicio' }
    ];
    setTasks(fetchedTasks);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      <div>
        <h1>Aplicación de Lista de Tareas</h1>
        <TaskForm />
        <TaskList />
      </div>
    </TaskContext.Provider>
  );
};

export default App;
