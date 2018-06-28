import Api from '@/services/Api'

export default {
  index(params) {
    return Api().get('histories', {
      params: params
    })
  },
  post(params) {
    console.log(params)
    return Api().post('histories', {
      params: params
    })
  }
}

/* AuthenticationService.register({
  email: 'testing@gmail.com',
  password: '123456'
}) */
