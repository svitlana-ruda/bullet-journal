<template>
  <main>
    <div class="d-flex justify-content-center">
      <button
        type="submit"
        class="btn"
        @click="addCard"
        v-if="cards.length < 3"
      >
        Add another card
      </button>
      <button v-else class="btn btn-disabled">You've added enough</button>
    </div>
    <div class="container">
      <div class="row align-items-start">
        <CardSingle
          class="col-3"
          v-for="card in cards"
          :key="card.id"
          :card="card"
        />
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import CardSingle from '@/components/CardSingle.vue'
import EventService from '@/services/EventService.js'

export default {
  name: 'card-list',
  components: {
    CardSingle
  },
  data() {
    return {
      cards: []
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
  },
  methods: {
    addCard() {
      if (this.cards.length < 3) {
        this.cards.push({
          id: this.id
        })
      }

      this.id++
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  flex: 1;
}
.btn {
  width: 290px;
  margin-top: 10px;
  background-color: #7f93ab;
  color: white;
  box-shadow: none;
  border: none;
  &:hover,
  &:focus {
    color: #f5f5f6;
  }
}
.btn-disabled {
  opacity: 0.65;
}
</style>
