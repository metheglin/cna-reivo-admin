import React, {useState, useEffect, useMemo, useCallback} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import {
  Button, Chip, TableCell, TableContainer, Paper, Grid,
} from '@mui/material';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
// import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import newRowsPager from 'modules/mui-binder/newRowsPager'
import {MainDashBar, StaffStatus} from 'components/staffs'
import {CreatedAt} from 'components/Timestamps'

// NOTE: Comment-in to enable search
// import {TextField} from '@mui/material'
// import {SearchPaper} from 'components/SearchPaper'

const getBreadcrumb = () => ([
  {title: "Staffs",}
])

const Page = () => {
  // const router = useRouter()
  const session = useSession()

  const [searchQuery, setSearchQuery] = useState({})
  // NOTE: Comment-in to enable search
  // const [keyword, setKeyword] = useState()
  // const resetSearchQuery = () => {
  //   setKeyword("")
  //   setSearchQuery({})
  // }

  const pager = newRowsPager({
    tableProps: {size: 'medium'},
    headers: ['Email', 'Name', 'Status', 'Create At'],
    onPage: ({offset, limit, baseQuery, updateRows}) => {
      return session.api.fetch(`/staffs`, {params: {offset, limit}}).then(response=>{
        updateRows(response.data, response.total)
      })
    },
    rowComponent: ({row, updateRowById}) => (
      <React.Fragment>
        <TableCell>
          <Link href={`/staffs/${row.id}`}>
            {row.email}
          </Link>
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell><StaffStatus {...row} /></TableCell>
        <TableCell><CreatedAt {...row} /></TableCell>
      </React.Fragment>
    )
  })

  useDeepCompareEffect(()=>{
    pager.turnPage(searchQuery)
  }, [searchQuery])

  return (
    <FrameLayout dashBar={<MainDashBar breadcrumb={getBreadcrumb()} />}>
      <FrameLayoutWrapper>
        <Grid container spacing={2}>
          {/*<Grid item xs={12}>
            <SearchPaper 
              onSearch={()=>setSearchQuery({keyword: keyword})}
              onReset={()=>resetSearchQuery()}>
              <TextField fullWidth label="Keyword"
                placeholder="Search with keyword"
                value={keyword} 
                onChange={(e)=>setKeyword(e.target.value)} />
            </SearchPaper>
          </Grid>*/}
          <Grid item xs={12}>
            <Paper><TableContainer>{pager.render}</TableContainer></Paper>
          </Grid>
        </Grid>
      </FrameLayoutWrapper>
    </FrameLayout>
  )
}

export default Page
