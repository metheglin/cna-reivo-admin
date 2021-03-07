import React from 'react'
import {MainDashBar} from 'components/DashBar'
export default function Component(props) {
  return (
    <MainDashBar {...props}
      iconLinks={[
        {url: '/residentapp/boards/new', icon: 'add', title: 'New'},
      ]} />
  )
}