export default function ({ store, redirect }) {
  if (!store.state.admin) {
    return redirect('/admin/login')
  }
}
