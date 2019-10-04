<template>
  <div class="login-wrapper">
    <div v-if="message" role="message" class="message-wrapper">
      <div class="message-heading">
        Message
      </div>

      <div class="message-body">
        <p>{{ message }}</p>
      </div>
    </div>

    <div v-if="error" role="alert" class="alert-wrapper">
      <div class="alert-heading">
        Error
      </div>

      <div class="alert-body">
        <p>{{ error }}</p>
      </div>
    </div>

    <form class="login-form" @submit.prevent="send">
      <div class="mb-6">
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

      <div class="flex items-center justify-between">
        <button class="btn" type="submit">
          Send
        </button>
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
      message: null,
      email: ''
    }
  },
  methods: {
    send () {
      this.$axios
        .get('/api/forgot', { params: { email: this.email } })
        .then(({ data: { message } }) => {
          if (message) {
            this.message = message
          }

          this.error = null
        })
        .catch(({ response: { data: { error } } }) => {
          this.message = null

          if (error) {
            this.error = error
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

.message-wrapper {
  .message-heading {
    @apply bg-blue-500 text-white font-bold rounded-t px-4 py-2;
  }

  .message-body {
    @apply border border-t-0 border-blue-400 rounded-b bg-blue-100 px-4 py-3 text-blue-700;
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
</style>
