import { createRouter, createWebHistory } from 'vue-router'
import ChangelogView from '@/views/ChangelogView.vue'
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
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: ChangelogView
    }
  ]
})

router.beforeEach(({ name }) => {
  const userStore = useUserStore()
  const { id, username } = storeToRefs(userStore)
  const isUserValid = id.value && username.value

  if (name === 'changelog') return
  if (name === 'home' && isUserValid) return { name: 'user', params: { id: id.value } }
  else if (name !== 'home' && !isUserValid) return { name: 'home' }
})

export default router
