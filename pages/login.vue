<template>
  <div class="login-wrapper">
    <div v-if="error" role="alert" class="alert-wrapper">
      <div class="alert-heading">
        Error
      </div>

      <div class="alert-body">
        <p>{{ error }}</p>
      </div>
    </div>

    <form class="login-form" @submit.prevent="send">
      <div class="mb-4">
        <label class="login-form-label" for="email">
          E-mail
        </label>

        <input
          id="email"
          v-model="email"
          class="login-form-input"
          type="email"
          placeholder="E-mail"
          required
        >
      </div>

      <div class="mb-6">
        <label class="login-form-label" for="password">
          Password
        </label>

        <input
          id="password"
          v-model="password"
          class="login-form-input"
          type="password"
          placeholder="Password"
          required
        >
      </div>

      <div class="flex items-center justify-between">
        <button class="btn" type="submit">
          Sign In
        </button>
        <nuxt-link to="/forgot" class="forgot-link">
          Forgot Password?
        </nuxt-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'unauthenticated',
  data () {
    return {
      error: null,
      email: '',
      password: ''
    }
  },
  methods: {
    send () {
      this.$axios
        .post('/api/login', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          if (data) {
            this.$store.commit('email', data)
            this.$router.push({ path: '/' })
          }

          this.error = null
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            this.error = error.response.data.error
          } else {
            this.error = 'Unknown error occurred'
          }
        })
    }
  }
}
</script>

<style lang="scss">
.login-wrapper {
  @apply w-full max-w-xs mx-auto mt-5;
}

.alert-wrapper {
  .alert-heading {
    @apply bg-red-500 text-white font-bold rounded-t px-4 py-2;
  }

  .alert-body {
    @apply border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700;
  }
}

.login-form {
  @apply bg-white px-8 pt-6 pb-8 mb-4;

  .login-form-label {
    @apply block text-gray-700 text-sm font-bold mb-2;
  }

  .login-form-input {
    @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;

    &:focus {
      @apply outline-none shadow-outline;
    }
  }
}

.forgot-link {
  @apply inline-block align-baseline font-bold text-sm text-teal-500;

  &:hover {
    @apply text-teal-800;
  }
}
</style>
