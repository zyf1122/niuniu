import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Fantasy from '@/components/Fantasy/Fantasy'
import Introduce from '@/components/Introduce/Introduce'
import Introducelike from '@/components/Introduce/Introducelike'
import Reading from '@/components/Reading/Reading'
import Loding from '@/components/Loding/Loding'
import Search from '@/components/Search/Search'
import Bookshelf from '@/components/Bookshelf/Bookshelf'
import My from '@/components/My/My'
import Mes from '@/components/Final/Mes'
import Vip from '@/components/Final/Vip'
import Red from '@/components/Final/Red'
import Security from '@/components/Final/Security'
import Help from '@/components/Final/Help'
import QQ from '@/components/Loding/QQ'
import Message from '@/components/Loding/Message'
import Forget from '@/components/Loding/Forget'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Hello',
      component: Homepage
    },
    {
    	path:'/fantasy',
    	component:Fantasy
    },
    {
      path:'/introduce',
      component:Introduce
    },
    {
      path:'/introducelike',
      component:Introducelike
    },
    {
      path:'/reading',
      component:Reading
    },
    {
      path:'/',
      component:Loding
    },
    {
      path:'/search',
      component:Search
    },
    {
      path:'/bookshelf',
      component:Bookshelf
    },
    {
      path:'/my',
      component:My
    },
    {
      path:'/mes',
      component:Mes
    },
    {
      path:'/vip',
      component:Vip
    },
    {
      path:'/red',
      component:Red
    },
    {
      path:'/security',
      component:Security
    },
    {
      path:'/help',
      component:Help
    },
    {
      path:'/qq',
      component:QQ
    },
    {
      path:'/message',
      component:Message
    },
    {
      path:'/forget',
      component:Forget
    }
  ]
})
