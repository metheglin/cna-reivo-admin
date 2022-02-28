import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {
  Button, Chip, TableCell, TableContainer, Paper, 
} from '@mui/material';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

import newRowsPager from 'modules/mui-binder/newRowsPager'
// import ButtonResourceStatus from 'components/atoms/ButtonResourceStatus'

import {MainDashBar, normalizePath} from 'components/labels'

const getBreadcrumb = (prefix) => {
  return [
    {title: `Labels (${prefix})`},
  ]
}

const Page = () => {
  const router = useRouter()
  const {prefix} = router.query
  const inner = useMemo(()=><PageInner prefix={normalizePath(prefix)} />, [normalizePath(prefix)])
  return inner
}

const PageInner = ({prefix}) => {
  const router = useRouter()
  const session = useSession()

  const pager = newRowsPager({
    // defaultLimit: 4,
    tableProps: {size: 'medium'},
    headers: ['Path', 'Name', 'Serial Code', 'Status'],
    onPage: ({offset, limit, baseQuery, updateRows}) => {
      return session.api.fetch(`/labels`, {params: {...baseQuery, offset, limit}}).then(response=>{
        updateRows(response.data, response.total)
      })
    },
    rowComponent: ({row, updateRowById}) => (
      <React.Fragment>
        <TableCell>
          <Link href={{pathname: `/labels/${row.id}`, query: {prefix}}}>
            {row.path}
          </Link>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell><Chip size="small" label={row.serial_code} /></TableCell>
        <TableCell><Chip size="small" label={row.status} /></TableCell>
      </React.Fragment>
    )
  })

  useEffect(()=>{
    pager.turnPage({prefix})
  }, [prefix])

  return (
    <FrameLayout 
      dashBar={<MainDashBar prefix={prefix} breadcrumb={getBreadcrumb(prefix)} />}>
      <FrameLayoutWrapper>
        <Paper><TableContainer>{pager.render}</TableContainer></Paper>
      </FrameLayoutWrapper>
    </FrameLayout>
  )
}

export default Page
