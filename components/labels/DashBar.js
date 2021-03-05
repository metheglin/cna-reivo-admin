import React from 'react'
import {Box} from '@material-ui/core'
import DashBar from 'components/DashBar'
export default function Component({prefix, ...props}) {
  return (
    <Box mb={3}>
      <DashBar {...props}
        iconLinks={[
          {url: `/labels/new${prefix}`, icon: 'add_circle', title: 'New'}, 
          // {url: '/labels/22', icon: 'star'}, 
          // {url: '/labels/21', icon: 'circle'}
        ]} />
    </Box>
  )
}