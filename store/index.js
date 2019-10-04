export const state = () => ({
  email: null,
  admin: false
})

export const mutations = {
  email (state, { email }) {
    state.email = email
  },
  admin (state, { admin }) {
    state.admin = admin
  },
  logout (state) {
    state.email = null
    state.admin = false
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.email) {
      commit('email', { email: req.session.email })
    }

    if (req.session.admin) {
      commit('admin', { admin: req.session.admin })
    }
  }
}
