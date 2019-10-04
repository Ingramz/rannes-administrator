<template>
  <div>
    <h1 class="heading">
      Edit article ID {{ id }}
    </h1>

    <form class="profile-form">
      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-title">
            Title
          </label>

          <input id="grid-title" v-model="title" class="form-section-input" type="text" placeholder="Article title">
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <label class="form-section-label" for="grid-content">
            Content
          </label>

          <textarea
            id="grid-content"
            v-model="content"
            class="form-section-input"
            name="editor"
            rows="10"
            cols="80"
          />
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <label><input v-model="published" type="checkbox" name="published"> Published</label>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section-inner">
          <div v-tooltip="`Not implemented`" class="tooltip-wrapper">
            <button type="submit" class="btn" disabled>
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  middleware: ['authenticated', 'admin'],
  asyncData ({ $axios, params }) {
    return $axios
      .get(`/api/admin/edit/${params.id}`)
      .then(({ data }) => data)
      .catch()
  }
}
</script>
