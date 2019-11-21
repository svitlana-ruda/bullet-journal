<template>
  <main>
    <CardSingle />
  </main>
</template>

<script>
// @ is an alias to /src
import CardSingle from '@/components/CardSingle.vue'

export default {
  name: 'card-list',
  components: {
    CardSingle
  }
}
</script>

<style lang="scss" scoped>
main {
  flex: 1;
}
</style>
