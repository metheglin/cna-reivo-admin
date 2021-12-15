import React from 'react'
import {MainDashBar} from 'components/DashBar'
export default function Component(props) {
  return (
    <MainDashBar {...props}
      iconLinks={[
        {url: '/staffs/new', icon: 'add', title: 'New', text: '新規作成'},
      ]} />
  )
}
