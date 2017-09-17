const breakpointsObject = {
  mobile: '32em',
  tablet: '48em',
  desktop: '64em',
}

const breakpoints = Object.keys(breakpointsObject).map(key => {
  const point = breakpointsObject[key].slice(0, 2)
  return Number(point)
})

export default {
  color: {
    base: '#000',
    baseLight: '#605F5F',

    border: '#eaecef',
    bg: '#fbfbfb',
    primary: '#E5637C',
  },
  font: {
    sans:
      '"PingFang SC", "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Microsoft Yahei", "WenQuanYi Micro Hei", sans-serif',
    mono: '"Source Code Pro", Consolas, Monaco, Menlo, monospace',
  },

  headerHeight: '4em',
  sidebarWidth: '18em',

  breakpoints,
  breakpointsObject,
}
