import React, {useState, useEffect, useCallback} from 'react'
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import {
  Table, TableBody, TableHead, TableRow, TableFooter, TablePagination, IconButton, 
} from '@mui/material'
import {default as MuiTableCell} from '@mui/material/TableCell'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import useUpdater from 'modules/rvadmin/core/useUpdater'
import {useTranslation} from 'react-i18next'

export default function newRowsPager(props) {
  const {t} = useTranslation()
  const defaultLimit = props.defaultLimit || 60
  const {onPage, rowComponent, headers, tableProps} = props
  const headersTranslated = headers.map(x=>t(x))

  const [lastUpdatedAt, update] = useUpdater()
  const [loading, setLoading] = useState(false)

  const [limit, setLimit] = useState(defaultLimit)
  const [page, setPage] = useState(0)
  const [baseQuery, setBaseQuery] = useState({})
  const turnPage = useCallback((newQuery={}, newPage=0, newLimit=null) => {
    newLimit = newLimit || limit
    setLoading(true)
    setPage(newPage)
    setBaseQuery(newQuery)
    const offset = newLimit * newPage
    onPage({limit: newLimit, offset, baseQuery: newQuery, updateRows}).then(x=>setLoading(false))
  }, [page, limit])

  const [rows, setRows] = useState([])
  const [total, setTotal] = useState(0)
  const updateRows = (rows, total) => {
    setRows(rows)
    setTotal(total)
  }
  const updateRowById = (row) => {
    setRows(rows.map(x=>{
      if (row.id === x.id) return row
      return x
    }))
  }

  const render = (
    <ItemListTemplate {...{tableProps,rows,rowComponent,update,updateRowById}} headers={headersTranslated}>
      <TablePagination colSpan={headers ? headers.length : 10}
        rowsPerPageOptions={[defaultLimit, defaultLimit*2]}
        count={total}
        rowsPerPage={limit}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onPageChange={(event, newPage)=>turnPage(baseQuery, newPage)}
        onRowsPerPageChange={(e)=>{
          const newLimit = parseInt(e.target.value, 10)
          setLimit(newLimit)
          turnPage(baseQuery, 0, newLimit)
        }}
        ActionsComponent={TablePaginationActions}
      />
    </ItemListTemplate>
  )

  return {
    rows, total, limit, page, render, turnPage, loading,
  }
}

const TableCell = withStyles({
  head: {fontWeight: 600},
})(MuiTableCell)

export const ItemListTemplate = ({tableProps, headers, rows, rowComponent, children, 
  update, updateRowById}) => (
  <Table size="small" {...tableProps}>
    {headers && <TableHead>
      <TableRow>
        {headers.map((x,i)=><TableCell key={i}>{x}</TableCell>)}
      </TableRow>
    </TableHead>}
    <TableBody>
      {rows.map((row,i) => (
        <TableRow key={i}>
          {rowComponent({index: i, row, update, updateRowById})}
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        {children}
      </TableRow>
    </TableFooter>
  </Table>
)

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}))

const TablePaginationActions = (props) => {
  const classes = useStyles1()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = event => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = event => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        size="large">
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        size="large">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        size="large">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        size="large">
        <LastPageIcon />
      </IconButton>
    </div>
  );
}
