const app = require("./db");

const updateTodo = async (event) => {
  const id = event._id;
  const todo = {
    title: event.title,
    done: event.done
  }
  const result = await app
    .collection("todo")
    .doc(id)
    .update(todo);
  return result
}

exports.main = async (event, context) => {
  return updateTodo(event);
};
