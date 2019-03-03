import { css } from '@emotion/core'

export const globalStyles = css`
  *:not(img) {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    -webkit-tap-highlight-color: transparent;
    -webkit-overflow-scrolling: touch;
    font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, Arial,
      'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', sans-serif;
    color: #484848;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`
