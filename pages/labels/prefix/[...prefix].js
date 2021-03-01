import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {
  Box,Button,Container,Grid,TextField,Typography,makeStyles,CircularProgress,
  Chip, TableCell, Paper, Toolbar, Tooltip, IconButton, TableContainer
} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import Api from 'modules/rvadmin/utils/Api'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

import newRowsPager from 'modules/mui-binder/newRowsPager'
// import ButtonResourceStatus from 'components/atoms/ButtonResourceStatus'
import AddCircleIcon from '@material-ui/icons/AddCircle'

export const normalizePath = (value) => {
  const components = Array.isArray(value) ? value : (value || "").split('/')
  const extracted = components.filter(x=>x).join('/')
  return `/${extracted}`
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
  const {handleApiError} = useFlash()
  const api = Api.json({token: session.token.token, handleApiError})

  const pager = newRowsPager({
    // defaultLimit: 4,
    tableProps: {size: 'medium'},
    headers: ['path', 'name', 'status', 'action'],
    onPage: ({offset, limit, baseQuery, updateRows}) => {
      return api.fetch(`/labels`, {params: {prefix, offset, limit}}).then(response=>{
        updateRows(response.data, response.total)
      }).catch(handleApiError)
    },
    rowComponent: ({row, updateRowById}) => (
      <React.Fragment>
        <TableCell>
          <Link href={`/labels/${row.id}`}>
            {row.path}
          </Link>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell><Chip size="small" label={row.status} /></TableCell>
        <TableCell>
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

  const classes = {}

  return (
    <FrameLayout 
      breadcrumb={[{title: "Home", url: "/"}, {title: "About", url: "/about"}]}>
      
      <Paper spacing={2}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Labels　<Chip size="small" label={prefix} />
          </Typography>

          <Tooltip title="Filter list">
            <IconButton aria-label="filter list" onClick={()=>router.push(`/labels/new${prefix}`)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
        <TableContainer>{pager.render}</TableContainer>
      </Paper>
    </FrameLayout>
  )
}

export default Page
