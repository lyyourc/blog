import React from 'react'
import styled from '@/styles/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

interface IPostEntry {
  path: string
  title: string
  date: string
}

export default function PostEntry({ path, title, date }: IPostEntry) {
  const [day] = date.split(',')

  return (
    <Entry>
      <PostTitle>
        <Link to={path}>{title}</Link>
      </PostTitle>

      <PostDate>{day}</PostDate>
    </Entry>
  )
}

const Entry = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${props => props.theme.pallete.gray[0]};
  font-size: 18px;

  &:last-of-type {
    border-bottom-width: 5px;
  }
`

const PostDate = styled.div`
  letter-spacing: 0.5px;
  font-size: 12px;
`

const PostTitle = styled.div`
  text-transform: capitalize;
  font-weight: bold;
  text-shadow: 1px 1px 1px ${props => props.theme.pallete.gray[0]};

  & a {
    display: block;
    color: inherit;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100%;
    width: 100%;
  }
`
