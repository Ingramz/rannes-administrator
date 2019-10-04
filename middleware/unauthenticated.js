export default function ({ store, redirect }) {
  if (store.state.email) {
    return redirect('/')
  }
}
