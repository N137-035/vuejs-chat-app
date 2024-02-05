import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue'
import HomeView from '@/views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import { name } from '@/utils/package'

const router = createRouter({
  history: createWebHistory(import.meta.env.PROD ? name : '/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/users/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
      name: 'user',
      component: UserView
    },
    {
      path: '/chats/:id([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})',
      name: 'chat',
      component: ChatView
    }
  ]
})

router.beforeEach(({ name }, _from, next) => {
  const userStore = useUserStore()
  const { id, username } = storeToRefs(userStore)

  if (name !== 'home' && (!id.value || !username.value)) next({ name: 'home' })
  else if (name === 'home' && id.value && username.value)
    next({ name: 'user', params: { id: id.value } })
  else next()
})

export default router
