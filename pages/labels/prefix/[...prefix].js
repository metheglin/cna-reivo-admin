import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {
  Button, Chip, TableCell, TableContainer, Paper, 
} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

import newRowsPager from 'modules/mui-binder/newRowsPager'
// import ButtonResourceStatus from 'components/atoms/ButtonResourceStatus'

import {DashBar, getBreadcrumb, normalizePath} from 'components/labels'

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
    headers: ['path', 'name', 'serial', 'status', 'action'],
    onPage: ({offset, limit, baseQuery, updateRows}) => {
      return session.api.fetch(`/labels`, {params: {prefix, offset, limit}}).then(response=>{
        updateRows(response.data, response.total)
      })
    },
    rowComponent: ({row, updateRowById}) => (
      <React.Fragment>
        <TableCell>
          <Link href={`/labels/${row.id}`}>
            {row.path}
          </Link>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell><Chip size="small" label={row.serial_code} /></TableCell>
        <TableCell><Chip size="small" label={row.status} /></TableCell>
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
  }, [prefix])

  return (
    <FrameLayout 
      breadcrumb={getBreadcrumb(prefix)}>
      <DashBar prefix={prefix} />
      <Paper><TableContainer>{pager.render}</TableContainer></Paper>
    </FrameLayout>
  )
}

export default Page