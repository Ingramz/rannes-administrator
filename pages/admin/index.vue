<template>
  <div>
    <h1 class="heading">
      Edit articles
    </h1>

    <div class="w-2/3 mx-auto">
      <div class="bg-white shadow-md rounded my-6">
        <table class="text-left w-full border-collapse">
          <thead>
            <tr>
              <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Title
              </th>

              <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                Published
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="article in articles" :key="article.id" class="hover:bg-grey-lighter">
              <td class="py-4 px-6 border-b border-grey-light">
                <nuxt-link :to="`/admin/edit/${article.id}`">
                  {{ article.title }}
                </nuxt-link>
              </td>

              <td class="py-4 px-6 border-b border-grey-light">
                {{ article.published ? 'Yes' : 'No' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated', 'admin'],
  asyncData ({ $axios }) {
    return $axios
      .get('/api/admin/list')
      .then(({ data }) => ({ articles: data }))
  }
}
</script>

<style>

</style>
