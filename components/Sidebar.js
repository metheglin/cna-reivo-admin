import React, {useMemo} from 'react'
import {List} from '@material-ui/core'
import SidebarItem from './SidebarItem'
import sidebarProps from 'constants/sidebar'

const getSidebarPages = ({ability_kind}) => {
  if (ability_kind === 'master') return sidebarProps.master
  const type = `${ability_kind}`
  return sidebarProps[type] || sidebarProps.default
}

export default function Sidebar(props) {
  const pages = getSidebarPages(props)
  return <SidebarWithPages pages={pages} />
}

export function SidebarWithPages({pages}) {
  // TODO
  const activePage = null
  const onClose = () => {}
  // 
  const navItems = useMemo(()=>{
    return renderItems({onClose, pages, activePage, depth: 0})
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
  const title = pageToTitleI18n(page, t)
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

const pageToTitleI18n = (page) => {
  return titleize(page.pathname)
  // const path = page.subheader || page.pathname;
  // return t(`pages.${path}`, { ignoreWarning: true }) || pageToTitle(page);
}
const titleize = (string) => string.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')








