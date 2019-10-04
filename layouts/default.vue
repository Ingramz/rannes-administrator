<template>
  <div>
    <a class="absolute hidden md:block" href="https://github.com/Ingramz/rannes-administrator">
      <img width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_left_orange_ff7600.png?resize=149%2C149" alt="Fork me on GitHub">
    </a>

    <nav class="navbar">
      <div class="site-title">
        <span>Rannes Administrator</span>
      </div>

      <div class="links">
        <div class="links-left">
          <nuxt-link to="/">
            Home
          </nuxt-link>

          <nuxt-link v-if="$store.state.email" to="/admin">
            Edit articles
          </nuxt-link>
        </div>

        <div v-if="$store.state.email">
          <nuxt-link to="/profile">
            Profile
          </nuxt-link>

          <a href="#" @click.prevent="logout">
            Logout
          </a>
        </div>

        <div v-else>
          <nuxt-link to="/login">
            Login
          </nuxt-link>
        </div>
      </div>
    </nav>

    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$axios
        .get('/api/logout')
        .finally(() => {
          this.$store.commit('logout')
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style lang="scss">
.navbar {
  @apply flex items-center justify-between flex-wrap bg-teal-500 p-6 mb-2;

  .site-title {
    @apply flex items-center flex-shrink-0 text-white mr-6;

    span {
      @apply font-semibold text-xl tracking-tight;
    }
  }

  .links {
    @apply w-full block flex-grow;

    @screen lg {
      @apply flex items-center w-auto;
    }

    .links-left {
      @apply flex-grow;
    }

    div a {
      @apply block mt-4 text-teal-200 mr-4;

      @screen lg {
        @apply inline-block mt-0;
      }

      &:hover {
        @apply text-white;
      }
    }
  }
}

.container {
  @apply container mx-auto px-4;
}
</style>
