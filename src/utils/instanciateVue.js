import rootApp from '@/App.vue'

// Plugins
import '@/plugins'

// Styling
import '@/styles'

// needed while using local/custom fonts.
// github.com/stafyniaksacha/vite-plugin-fonts
import 'virtual:fonts.css'

let appMounted

async function mount() {
  appMounted = createApp(rootApp)

  // install all plugin modules.
  autoImportModules(appMounted)

  appMounted.mount('#app')
}

export const Vue = user => {
  if (!appMounted) mount()

  useAuthStore().user = user
  useAuthStore().profile = null
}
