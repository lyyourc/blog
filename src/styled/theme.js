import { lighten } from 'polished'

const base = '#000'

const theme = {
  color: {
    base,
    baseLight: lighten(0.6, base),
    baseDark: '#232324',

    border: '#e6e6e8',

    bg: '#fff',
    bgDark: '#fbfbfb',

    active: '#E5637C',
  },

  gutter: '10px',
  gutterLarge: '20px',

  font: {
    familySans:
      '"PingFang SC", Verdana, "Helvetica Neue","Microsoft Yahei", "Hiragino Sans GB","Microsoft Sans Serif", "WenQuanYi Micro Hei", sans-serif;',
  },
}

export default theme
