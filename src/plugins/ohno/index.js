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
      show({ code, msg }) {
        this.error = { code: code || 404, msg: msg || 'Page Not Found' }
        this.isShow = true
      },
      hide() {
        this.isShow = false
      },
    }
  })

  Vue.prototype.$OHNO = $OHNO
}