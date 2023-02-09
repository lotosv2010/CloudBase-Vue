<template>
  <div class="todos">
    <h1>{{ msg }}</h1>
    <template>
      <el-input placeholder="请输入任务名称" v-model="form.title">
        <el-button slot="append" icon="el-icon-plus" @click="addTodo">添加任务</el-button>
      </el-input>
    </template>
    <el-card class="box-card">
      <div v-for="todo in todos" :key="todo._id" class="todo">
        <div>
          <el-checkbox v-model="todo.done" @change="updateTodo(todo)"></el-checkbox>
          <el-link :underline="false" :type="todo.done ? 'info' : 'primary'" :class="{text: todo.done}">{{todo.title}}</el-link>
        </div>
        <el-button type="text" @click="removeTodo(todo)">删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Todos",
  data() {
    return {
      todos: [],
      form: {
        title: ''
      },
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    // 使用匿名登录
    const auth = this.$cloudbase.auth();
    auth.anonymousAuthProvider().signIn();

    this.getTodo();
  },
  methods: {
    async getTodo() {
      try {
        const {result: { data }} = await this.$cloudbase.callFunction({
          name: "gettodo",
        });
        this.todos = data || [];
      } catch (e) {
        console.error(e)
        this.$message.error('任务获取失败');
      }
    },
    async addTodo() {
      try {
        const { result } = await this.$cloudbase.callFunction({
          name: "addtodo",
          data: this.form,
        });
        if(result.id) {
          this.$message.success('任务添加成功');
          this.getTodo();
          this.form.title = '';
        }
      } catch (e) {
        console.error(e)
        this.$message.error('任务添加失败');
      }
    },
    async updateTodo(todo) {
      try {
        const { result } = await this.$cloudbase.callFunction({
          name: "updatetodo",
          data: {
            ...todo,
          },
        });
        if(result.updated) {
          this.$message.success('任务更新成功');
          this.getTodo();
        }
      } catch (e) {
        console.error(e)
        this.$message.error('任务更新失败');
      }
    },
    async removeTodo(todo) {
      try {
        const { result } = await this.$cloudbase.callFunction({
          name: "removetodo",
          data: {
            id: todo._id,
          },
        });
        if(result.deleted) {
          this.$message.success('任务删除成功');
          this.getTodo();
        }
      } catch (e) {
        console.error(e)
        this.$message.error('任务删除失败');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .todos {
    max-width: 700px;
    margin: 0 auto;
    text-align: left;
    word-break: break-all;
  }
  .todos h1 {
    text-align: center;
  }
  .todos .todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
  .todos .el-card {
    margin-top: 10px;
  }
  .todos .el-link {
    font-size: 20px;
  }
  .todos .text {
    text-decoration-line: line-through;
  }
  .todos .el-checkbox {
    margin-right: 10px;
  }
  .todos .todo .el-button {
    float: right;
  }
</style>
