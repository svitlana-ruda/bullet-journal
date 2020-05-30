<template>
  <div class="col-2">
    <a href="#" data-toggle="modal" data-target="#Modal">
      <img src="../assets/color.png" width="34px" height="34px" />
    </a>
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
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  name: 'card-color',
  data() {
    return {
      selectedColor: 0,
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
  methods: {
    updateColor(index) {
      this.selectedColor = index
    },
    setBackground() {
      this.$emit('set-background')
    }
  },
  computed: {
    backgroundColor() {
      return this.colors[this.selectedColor].variantColor
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
.color-box {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 0.25rem;
  display: inline-block;
  margin-right: 0.89rem;
  cursor: pointer;
}
.modal-header {
  border-bottom: none;
  padding-bottom: 0;
}
</style>
