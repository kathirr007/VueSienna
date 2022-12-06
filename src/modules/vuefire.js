import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire'
import { app as firebaseApp } from '@/firebase'

export const install = app => {
  app.use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth(), VueFireFirestoreOptionsAPI()],
  })
  log('VueFire initialized.')
}
