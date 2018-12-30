import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

interface IPostEntry {
  path: string
  title: string
  date: string
}

export default function PostEntry({ path, title, date }: IPostEntry) {
  const [month, day] = date.split(' ')

  return (
    <Entry>
      <PostDate>
        <PostDay>{day}</PostDay>
        <small>{month}</small>
      </PostDate>

      <PostTitle>
        <Link to={path}>{title}</Link>
      </PostTitle>
    </Entry>
  )
}

const Entry = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

  &:first-of-type {
    margin-top: 0;
  }

  &:nth-of-type(6n) {
    margin-top: 1.5em;
  }
`

const PostDate = styled.div`
  text-align: center;
  letter-spacing: .5px;
  margin-right: .4em;
  width: 50px;
  margin-right: 10px;
  opacity: 0.7;

  @media (min-width: 768px) {
    margin-right: 20px;
  }
`

const PostDay = styled.span`
  text-align: right;
  margin-right: 0.2em;
`

const PostTitle = styled.div`
  flex: 5;
  min-width: 0;
  margin: 0;
  background: linear-gradient(to bottom, #f4f4f4, #f6f6f6);
  text-transform: capitalize;
  line-height: 1.2;
  font-weight: bold;

  & a {
    display: block;
    color: inherit;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: .4em;
    height: 100%;
    width: 100%;
  }
`