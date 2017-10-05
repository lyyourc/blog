import { css } from 'styled-components'

const blue = '#005cc5'
const red = '#d73a49'
const purple = '#6f42c1'
const green = '#22863a'
const comment = '#6a737d'
const black = '#032f62'
const yellow = 'ffff00'
const background = '#f6f8fa'
const foreground = '#24292e'

const codeblock = `
  background: ${background};
  margin: 1.6em 0;
  padding: 3em 1.8em;
  overflow: auto;
  color: ${foreground};
  line-height: 1.4;
`

const highlight = css`
  .gatsby-highlight-code-line {
    background-color: #e6ffed;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 0.75em;
    border-left: 0.25em solid #acffbe;
  }

  .gatsby-highlight pre[class*='language-'] {
    min-width: 100%;
  }

  /* highlight like github */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${comment};
    font-style: italic;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.string {
    color: ${black};
  }

  .token.url,
  .token.symbol,
  .token.number,
  .token.boolean,
  .token.variable,
  .token.constant,
  .token.inserted {
    color: ${blue};
  }
  .token.class-name,
  .language-json .token.property {
    color: ${purple};
  }

  /* .token.punctuation, */
  .token.operator,
  .token.atrule,
  .token.keyword,
  .token.attr-value,
  .language-autohotkey .token.selector,
  .language-json .token.boolean,
  .language-json .token.number,
  code[class*='language-css'] {
    color: ${red};
  }

  .token.selector,
  .token.function {
    color: ${purple};
  }
  .token.deleted,
  .language-autohotkey .token.tag {
    color: #9a050f;
  }

  .token.selector,
  .language-autohotkey .token.keyword {
    color: #00009f;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  /* html */
  .token.tag {
    color: ${green};
  }

  .token.attr-name,
  .token.property,
  .token.regex,
  .token.entity {
    color: ${purple};
  }
  .token.attr-value {
    color: ${black};
  }

  .token.directive.tag .tag {
    background: ${yellow};
    color: ${blue};
  }
`

export default css`
  a {
    text-decoration: none;
    color: ${props => props.theme.color.blue};
  }

  h2,
  h3,
  h4,
  h5 {
    margin-bottom: 1em;
  }

  h2 {
    margin-top: 3em;
  }

  h3 {
    margin-top: 2em;
  }

  h4 {
    margin-top: 1.5em;
  }

  blockquote {
    margin: 2.5em 1em;
    padding: 0 0 0 1em;
    border-left: 4px solid ${props => props.theme.color.border};

    p {
      margin: 0;
    }
  }

  pre,
  code {
    font-family: ${props => props.theme.font.mono};
  }

  code {
    background: ${props => props.theme.color.bgDark};
    padding: 2px 3px;
    border-radius: 2px;
  }

  pre {
    ${codeblock};

    code {
      background: none;
      text-shadow: none;
      padding: 0;
    }
  }

  ${highlight};
`
