import Api from '@/services/Api'

export default {
  index(params) {
    return Api().get('bookmarks', {
      params: params
    })
  },
  post(params) {
    console.log(params)
    return Api().post('bookmarks', {
      params: params
    })
  },
  delete(bookmarkId) {
    console.log(bookmarkId + ' ssssssss')
    return Api().delete(`bookmarks/${bookmarkId}`)
  }
}

/* AuthenticationService.register({
  email: 'testing@gmail.com',
  password: '123456'
}) */
