<template>
  <div>
    <div v-for="article in articles" :key="article.title">
      <h1 class="heading">
        {{ article.title }}
      </h1>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="content" v-html="article.content" />

      <hr>
    </div>
  </div>
</template>

<script>
export default {
  asyncData ({ $axios }) {
    return $axios
      .get('/api/guides')
      .then(({ data }) => ({ articles: data }))
  }
}
</script>

<style lang="scss">
.content {
  h2 {
    @apply text-xl mb-2 mt-4;
  }

  h4 {
    @apply text-lg mb-2 mt-4;
  }

  p {
    @apply mb-2;
  }

  a {
    @apply text-teal-600;

    &:hover {
      @apply text-teal-700;
    }
  }
}
</style>
