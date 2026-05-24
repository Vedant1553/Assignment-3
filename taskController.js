let tasks = [];

let currentId = 1;

const findTaskIndex = (id) => {
  return tasks.findIndex(task => task.id === id);
};

export const getTasks = (req, res) => {
  res.status(200).json(tasks);
};

export const getTaskById = (req, res) => {

  const id = parseInt(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: 'Task not found'
    });
  }

  res.status(200).json(task);
};

export const createTask = (req, res) => {

  const { text } = req.body;

  if (!text || text.trim() === '') {

    return res.status(400).json({
      error: 'Task text is required'
    });
  }

  const newTask = {
    id: currentId++,
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {

  const id = parseInt(req.params.id);

  const taskIndex = findTaskIndex(id);

  if (taskIndex === -1) {

    return res.status(404).json({
      error: 'Task not found'
    });
  }

  const { text, completed } = req.body;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    text: text || tasks[taskIndex].text,
    completed: completed !== undefined
      ? completed
      : tasks[taskIndex].completed
  };

  res.status(200).json(tasks[taskIndex]);
};

export const deleteTask = (req, res) => {

  const id = parseInt(req.params.id);

  const initialLength = tasks.length;

  tasks = tasks.filter(task => task.id !== id);

  if (tasks.length === initialLength) {

    return res.status(404).json({
      error: 'Task not found'
    });
  }

  res.status(204).end();
};