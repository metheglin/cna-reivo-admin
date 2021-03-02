import React from 'react'
import {Box} from '@material-ui/core'
import DashBar from 'components/DashBar'
export default function Component({prefix}) {
  return (
    <Box mb={3}>
      <DashBar title={<React.Fragment>Label <code>{prefix}</code></React.Fragment>} 
        iconLinks={[{url: '/labels/new', icon: 'add_circle', title: 'New'}]} />
    </Box>
  )
}