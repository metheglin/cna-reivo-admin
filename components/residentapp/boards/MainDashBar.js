import React from 'react'
import {MainDashBar} from 'components/DashBar'
export default function Component(props) {
  return (
    <MainDashBar {...props}
      iconLinks={[
        {url: '/residentapp/boards/new', icon: 'add_circle', title: 'New'}, 
        {url: '/residentapp/boards/12', icon: 'star'}, 
        {url: '/residentapp/boards/4', icon: 'circle'}
      ]} />
  )
}