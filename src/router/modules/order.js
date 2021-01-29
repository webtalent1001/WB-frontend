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
  },
  children: [
    {
      path: 'form',
      component: () => import('@/views/orders/form1'),
      name: 'OrderForm',
      meta: { title: 'WB New PO', icon: 'el-icon-plus', roles: ['manage_order_pending'] }
    },
    {
      path: 'archive0',
      component: () => import('@/views/orders/archive0'),
      name: 'OrderPending',
      meta: { title: 'WB Pending PO', icon: 'el-icon-folder-opened', roles: ['manage_order_pending'] }
    },
    {
      path: 'archive1',
      component: () => import('@/views/orders/archive1'),
      name: 'OrderFulfillment',
      meta: { title: 'Walnut Fulfillment', icon: 'el-icon-folder-opened', permissions: ['manage_order_pending'] }
    },
    {
      path: 'archive2',
      component: () => import('@/views/orders/archive2'),
      name: 'OrderFulfilled',
      meta: { title: 'Walnut to Deliver', icon: 'el-icon-folder-opened', permissions: ['manage_order_pending'] }
    },
    {
      path: 'archive4',
      component: () => import('@/views/orders/archive4'),
      name: 'Walnut Delivered',
      meta: { title: 'Walnut Delivered', icon: 'el-icon-folder-opened', permissions: ['manage_order_pending'] }
    },
    {
      path: 'archive5',
      component: () => import('@/views/orders/archive5'),
      name: 'Walnut Financial',
      meta: { title: 'Walnut Financial', icon: 'el-icon-folder-opened', permissions: ['manage_order_pending'] }
    }
  ]
}

export default orderRoutes
