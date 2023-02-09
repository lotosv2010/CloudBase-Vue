const app = require("./db");

const addTodo = async (event) => {
  const todo = {
    ...event,
    createTime: Date.now(),
    done: false,
  }

  const result = await app
    .collection("todo")
    .add(todo);
  return result
}

exports.main = async (event, context) => {
  return addTodo(event);
};
