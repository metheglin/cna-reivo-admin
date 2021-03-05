import React from 'react'
import {Box} from '@material-ui/core'
import DashBar from 'components/DashBar'
export default function Component({prefix}) {
  return (
    <Box mb={3}>
      <DashBar title="Board"
        iconLinks={[
          {url: '/residentapp/boards/new', icon: 'add_circle', title: 'New'}, 
          {url: '/residentapp/boards/12', icon: 'star'}, 
          {url: '/residentapp/boards/4', icon: 'circle'}
        ]} />
    </Box>
  )
}