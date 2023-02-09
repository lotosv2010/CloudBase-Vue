const app = require("./db");

const removeTodo = async (event) => {
  const result = await app
    .collection("todo")
    .doc(event.id)
    .remove();
  return result
}

exports.main = async (event, context) => {
  return removeTodo(event);
};