<template>
  <header>
    <nav class="container">
      <router-link to="/">
        <h1>
          <img alt="Logo" src="../assets/logo.png" />
          Bullet Journal
        </h1>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'card-header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
header {
  background: #7f93ab;
  padding: 5px 0;
}
a {
  color: #fef6aa;
  &:hover,
  &:focus {
    text-decoration: none;
    color: #d1cb91;
  }
}
h1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  font-size: 225%;
}
img {
  object-fit: contain;
}
.container {
  width: 300px;
}
</style>
