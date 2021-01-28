import request from '@/utils/request'
import Resource from '@/api/resource'

class WBOrderResource extends Resource {
  constructor() {
    super('wborder')
  }

  getFormInitial() {
    return request({
      url: '/' + this.uri + '/form/get_init_data',
      method: 'get'
    })
  }

  save(data) {
    return request({
      url: '/' + this.uri + '/form/store',
      method: 'post',
      data: data
    })
  }

  archive0(data) {
    return request({
      url: '/' + this.uri + '/archive0',
      method: 'get',
      params: data
    })
  }

  archive1(data) {
    return request({
      url: '/' + this.uri + '/archive1',
      method: 'get',
      params: data
    })
  }

  archive2F(data) {
    return request({
      url: '/' + this.uri + '/archive2/f',
      method: 'get',
      params: data
    })
  }
  archive2R(data) {
    return request({
      url: '/' + this.uri + '/archive2/r',
      method: 'get',
      params: data
    })
  }

  archive4(data) {
    return request({
      url: '/' + this.uri + '/archive4',
      method: 'get',
      params: data
    })
  }

  archive5Invoice(data) {
    return request({
      url: '/' + this.uri + '/archive5/invoices',
      method: 'get',
      params: data
    })
  }

  archive5Client(data) {
    return request({
      url: '/' + this.uri + '/archive5/clients',
      method: 'get',
      params: data
    })
  }

  getPendingDetail(id) {
    return request({
      url: '/' + this.uri + '/archive0/customer-detail?id=' + id,
      method: 'get'
    })
  }
  getOrderDetail(id) {
    return request({
      url: '/' + this.uri + '/detail/' + id,
      method: 'get'
    })
  }
}

export { WBOrderResource as default }
