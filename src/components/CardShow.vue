<template>
  <div>
    <h1>This is a {{ id }} card</h1>
    <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      title: 'Card # 1'
    }
  }
}
</script>

<style scoped></style>
