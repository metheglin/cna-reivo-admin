import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {
  Button, Chip, TableCell, TableContainer, Paper, 
} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

import newRowsPager from 'modules/mui-binder/newRowsPager'
// import ButtonResourceStatus from 'components/atoms/ButtonResourceStatus'
import PublishStatus from 'components/PublishStatus'

import {MainDashBar} from 'components/residentapp/boards'
import {formatDistance} from 'date-fns'

const getBreadcrumb = () => ([
  {title: "Boards",}
])

const Page = () => {
  const router = useRouter()
  const session = useSession()

  const pager = newRowsPager({
    tableProps: {size: 'medium'},
    headers: ['slug', 'title', 'created', 'status', 'action'],
    onPage: ({offset, limit, baseQuery, updateRows}) => {
      return session.api.fetch(`/residentapp/boards`, {params: {offset, limit}}).then(response=>{
        updateRows(response.data, response.total)
      })
    },
    rowComponent: ({row, updateRowById}) => (
      <React.Fragment>
        <TableCell>
          <Link href={`/residentapp/boards/${row.id}`}>
            {row.slug}
          </Link>
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{formatDistance(new Date(row.created_at), new Date())} ago</TableCell>
        <TableCell><PublishStatus {...row} /></TableCell>
        <TableCell>
          <Button disabled={true}>PUBLISH</Button>
          {/*<ButtonResourceStatus
            apiPrefix="/labels"
            resource={row}
            updateRowById={updateRowById}
            disabled={true}
          />*/}
        </TableCell>
      </React.Fragment>
    )
  })

  useEffect(()=>{
    pager.turnPage()
  }, [])

  return (
    <FrameLayout dashBar={<MainDashBar breadcrumb={getBreadcrumb()} />}>
      <FrameLayoutWrapper>
        <Paper><TableContainer>{pager.render}</TableContainer></Paper>
      </FrameLayoutWrapper>
    </FrameLayout>
  )
}

export default Page
