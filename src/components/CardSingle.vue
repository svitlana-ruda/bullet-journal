<template>
  <section class="card container" :style="{ backgroundColor }">
    <div class="row align-items-center input-main">
      <div class="col-10">
        <input
          type="text"
          name="item"
          id="item"
          placeholder="Enter new task..."
          v-model="newTask"
          autofocus
          @keyup.enter="addTask"
        />
      </div>
      <div class="col-2">
        <a href="#" data-toggle="modal" data-target="#Modal">
          <img src="../assets/color.png" width="34px" height="34px" />
        </a>
      </div>
    </div>
    <div v-for="(task, index) in tasks" :key="task.id">
      <div class="task-styling">
        <input type="checkbox" v-model="task.completed" />
        <div
          v-if="!task.editing"
          @dblclick="editTask(task)"
          class="task-title"
          :class="{ completed: task.completed }"
        >
          {{ task.title }}
        </div>
        <input
          v-else
          class="task-input"
          type="text"
          v-model="task.title"
          @blur="doneEdit(task)"
          @keyup.enter="doneEdit(task)"
          @keyup.esc="cancelEdit(task)"
          v-focus
        />
        <button type="button" class="close" @click="removeTask(index)">
          <span>&times;</span>
        </button>
      </div>
    </div>
    <aside>
      <div class="modal fade" id="Modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="ModalLabel">
                Choose a background color:
              </h6>
              <button type="button" class="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div
                class="color-box"
                v-for="(color, index) in colors"
                :key="color.colorId"
                :style="{ backgroundColor: color.variantColor }"
                @click="updateColor(index)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'card-single',
  data() {
    return {
      selectedColor: 0,
      newTask: '',
      idForTask: 2,
      beforeEditCache: '',
      tasks: [
        {
          id: 1,
          title: 'Edit by double-click',
          completed: false,
          editing: false
        }
      ],
      colors: [
        {
          colorId: 1,
          variantColor: '#b0c4de'
        },
        {
          colorId: 2,
          variantColor: '#7ab1e6'
        },
        {
          colorId: 3,
          variantColor: '#f3f3f3'
        },
        {
          colorId: 4,
          variantColor: '#8fcfd1'
        },
        {
          colorId: 5,
          variantColor: '#ffb4ff'
        },
        {
          colorId: 6,
          variantColor: '#fafad2'
        }
      ]
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus()
      }
    }
  },
  methods: {
    updateColor(index) {
      this.selectedColor = index
    },
    addTask() {
      if (this.newTask.trim().length === 0) {
        return
      }

      this.tasks.push({
        id: this.idForTask,
        title: this.newTask,
        completed: false,
        editing: false
      })

      this.newTask = ''
      this.idForTask++
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    },
    editTask(task) {
      this.beforeEditCache = task.title
      task.editing = true
    },
    doneEdit(task) {
      if (task.title.trim() === '') {
        task.title = this.beforeEditCache
      }
      task.editing = false
    },
    cancelEdit(task) {
      task.title = this.beforeEditCache
      task.editing = false
    }
  },
  computed: {
    backgroundColor() {
      return this.colors[this.selectedColor].variantColor
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  padding: 10px;
  border-radius: 0.25rem;
  width: 100%;
  outline-color: #99afc5;
  border: none;
  background-color: white;
}
.input-main {
  margin-bottom: 15px;
}
input[type='checkbox'] {
  width: initial;
  height: 20px;
  width: 20px;
}
.card {
  background: #e1e2e1;
  margin: 10px auto;
  padding: 15px;
}
.color-box {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 0.25rem;
  display: inline-block;
  margin-right: 0.89rem;
  cursor: pointer;
}
.task-title,
.task-input {
  padding: 5px;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 0.25rem;
  margin: 0 2%;
}
.task-input {
  background-color: white;
}
.task-title {
  overflow: hidden;
}
.completed {
  text-decoration: line-through;
  color: #99afc5;
}
h6 {
  font-size: 1.14rem;
}
button {
  outline: none;
}
.modal-header {
  border-bottom: none;
  padding-bottom: 0;
}
.task-styling {
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
}
</style>
