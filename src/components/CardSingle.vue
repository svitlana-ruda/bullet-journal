<template>
  <section
    class="card container"
    @set-background="setBackgroud"
    :style="{ backgroundColor }"
  >
    <div class="row align-items-center input-main">
      <div class="col-10">
        <input
          type="text"
          name="item"
          id="item"
          placeholder="Enter new task..."
          v-model="newTask"
          @keyup.enter="addTask"
          autofocus
        />
      </div>
      <CardColor />
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
  </section>
</template>

<script>
import EventService from '@/services/EventService.js'
import CardColor from '@/components/CardColor.vue'

export default {
  name: 'card-single',
  components: {
    CardColor
  },
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: 'Edit by double-click',
          completed: false,
          editing: false
        }
      ],
      newTask: '',
      idForTask: 2,
      beforeEditCache: ''
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
  created() {
    EventService.getCards()
      .then(response => {
        this.cards = response.data
      })
      .catch(error => {
        console.log(error.response)
      })
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
  max-width: 290px;
  min-width: 290px;
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
.task-styling {
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
}
</style>
