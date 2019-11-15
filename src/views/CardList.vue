<template>
  <div>
    <CardCreate />
    <CardShow />
  </div>
</template>

<script>
// @ is an alias to /src
import CardCreate from '@/components/CardCreate.vue'
import CardShow from '@/components/CardShow.vue'

export default {
  name: 'card-list',
  components: {
    CardCreate,
    CardShow
  }
}
</script>
