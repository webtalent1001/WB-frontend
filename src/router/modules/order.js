/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout'

const orderRoutes = {
  path: '/orders',
  component: Layout,
  redirect: '/orders/form1',
  name: 'Walnut Order',
  alwaysShow: true,
  meta: {
    title: 'Walnut Order',
    icon: 'el-icon-notebook-2',
    roles: ['admin']
  },
  children: [
    {
      path: 'form',
      component: () => import('@/views/orders/form1'),
      name: 'OrderForm',
      meta: { title: 'WB New PO', icon: 'el-icon-plus', permissions: ['manage customer'] }
    },
    {
      path: 'archive0',
      component: () => import('@/views/orders/archive0'),
      name: 'OrderPending',
      meta: { title: 'WB Pending PO', icon: 'el-icon-folder-opened', permissions: ['manage customer'] }
    },
    {
      path: 'archive1',
      component: () => import('@/views/orders/archive1'),
      name: 'OrderPending',
      meta: { title: 'Walnut Fulfillment', icon: 'el-icon-folder-opened', permissions: ['manage customer'] }
    },
    {
      path: 'archive2',
      component: () => import('@/views/orders/archive2'),
      name: 'OrderFulfilled',
      meta: { title: 'Walnut to Deliver', icon: 'el-icon-folder-opened', permissions: ['manage customer'] }
    },
    {
      path: 'archive4',
      component: () => import('@/views/orders/archive4'),
      name: 'Walnut Delivered',
      meta: { title: 'Walnut Delivered', icon: 'el-icon-folder-opened', permissions: ['manage customer'] }
    },
    {
      path: 'archive5',
      component: () => import('@/views/orders/archive5'),
      name: 'Walnut Financial',
      meta: { title: 'Walnut Financial', icon: 'el-icon-folder-opened', permissions: ['manage customer'] }
    }
  ]
}

export default orderRoutes
