const OHNO = require('./OHNO.vue')

module.exports.install = function(Vue, options) {
  Vue.component('oh-no', OHNO)

  const $OHNO = new Vue({
    data() {
      return {
        isShow: false,
        error: {
          code: 404,
          msg: 'Page Not Found',
        },
      }
    },
    methods: {
      show({ response, message } = {}) {
        this.error = response
          ? { code: response.status, msg: response.data }
          : { code: 404, msg: message || 'Page Not Found' }

        this.isShow = true
      },
      hide() {
        this.isShow = false
      },
    }
  })

  Vue.prototype.$OHNO = $OHNO
}