import React, {useMemo} from 'react'
import {List} from '@mui/material'
import SidebarItem from './SidebarItem'
import sidebarProps from 'constants/sidebar'

const getSidebarPages = ({ability_kind}) => {
  if (ability_kind === 'master') return sidebarProps.master
  const type = `${ability_kind}`
  return sidebarProps[type] || sidebarProps.default
}

export default function Sidebar(props) {
  const pages = getSidebarPages(props)
  return <SidebarWithPages pages={pages} {...props} />
}

export function SidebarWithPages({pages, ...props}) {
  // TODO
  const activePage = null
  const onClose = () => {}
  // 
  const navItems = useMemo(()=>{
    return renderItems({onClose, pages, activePage, depth: 0, ...props})
  })
  return (<React.Fragment>{navItems}</React.Fragment>)
}

const renderItems = ({pages, ...props}) => {
  return (
    <List disablePadding>
      {
        pages.reduce((items, page) => reduceItems({items, page, ...props}), [],)
      }
    </List>
  )
}

const reduceItems = (context) => {
  // const {page, items} = context
  const {onClose, activePage, items, depth, t} = context
  let {page} = context
  const title = pageToTitle(page, t)
  if (page.children && page.children.length > 1) {
    const topLevel = activePage ? activePage.pathname.indexOf(`${page.pathname}/`) === 0 : false
    items.push(
      <SidebarItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        topLevel={topLevel && !page.subheader}
        openImmediately={topLevel || Boolean(page.subheader)}
        title={title}
      >
        {renderItems({ onClose, pages: page.children, activePage, depth: depth + 1, t })}
      </SidebarItem>
    )
  } else {
    page = page.children && page.children.length === 1 ? page.children[0] : page
    items.push(
      <SidebarItem
        linkProps={page.linkProps}
        depth={depth}
        key={title}
        title={title}
        href={page.pathname}
        onClick={onClose}
      />,
    )
  }
  return items
}

const pageToTitle = (page, t) => {
  const title = page.subheader || page.pathname.split(/[\/\-]/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  return t(title)
}
