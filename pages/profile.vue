<template>
  <div>
    <h1 class="heading">
      Profile
    </h1>

    <form class="profile-form">
      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-first-name">
            First name
          </label>

          <input
            id="grid-first-name"
            v-model="firstName"
            class="form-section-input"
            type="text"
            placeholder="First name"
          >
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-last-name">
            Last name
          </label>

          <input
            id="grid-last-name"
            v-model="lastName"
            class="form-section-input"
            type="text"
            placeholder="Last name"
          >
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-email">
            Email
          </label>

          <input
            id="grid-email"
            v-model="email"
            autocomplete="username"
            class="form-section-input"
            type="email"
            placeholder="E-mail"
          >
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-current-password">
            Current password
          </label>

          <input
            id="grid-current-password"
            v-model="currentPassword"
            autocomplete="current-password"
            class="form-section-input"
            type="password"
            placeholder="Current password"
          >
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-password">
            New password
          </label>

          <input
            id="grid-password"
            v-model="newPassword"
            autocomplete="new-password"
            class="form-section-input"
            type="password"
            placeholder="New password"
          >
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-password-repeat">
            Repeat new password
          </label>

          <input
            id="grid-password-repeat"
            v-model="newPasswordConfirm"
            autocomplete="new-password"
            class="form-section-input"
            type="password"
            placeholder="Repeat new password"
          >
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <div v-tooltip="`Not implemented`" class="tooltip-wrapper">
            <button type="submit" class="btn" disabled>
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    }
  },
  asyncData ({ $axios }) {
    return $axios
      .get('/api/profile')
      .then(({ data }) => data)
  }
}
</script>

<style lang="scss">
.tooltip-wrapper {
  display: inline-block;
}

.profile-form {
  @apply w-full max-w-lg;

  .form-section {
    @apply flex flex-wrap -mx-3 mb-6;

    .form-section-inner {
      @apply w-full px-3;

      .form-section-label {
        @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2;
      }

      .form-section-input {
        @apply appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight;

        &:focus {
          @apply outline-none bg-white border-gray-500;
        }
      }
    }
  }
}
</style>
