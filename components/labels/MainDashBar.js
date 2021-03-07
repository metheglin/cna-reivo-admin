import React from 'react'
import {MainDashBar} from 'components/DashBar'
export default function Component({prefix, ...props}) {
  return (
    <MainDashBar {...props}
      iconLinks={[
        {url: `/labels/new${prefix}`, icon: 'add_circle', title: 'New'}, 
        // {url: '/labels/22', icon: 'star'}, 
        // {url: '/labels/21', icon: 'circle'}
      ]} />
  )
}