import React, {useState, useEffect, useCallback} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import useUpdater from 'modules/rvadmin/core/useUpdater'

export default (props) => {
  const defaultLimit = props.defaultLimit || 60
  const {onPage, rowComponent, headers, tableProps} = props

  const [lastUpdatedAt, update] = useUpdater()
  const [loading, setLoading] = useState(false)

  const [limit, setLimit] = useState(defaultLimit)
  const [page, setPage] = useState(0)
  const turnPage = useCallback((newPage=0, newLimit=null) => {
    newLimit = newLimit || limit
    setLoading(true)
    setPage(newPage)
    const offset = newLimit * newPage
    onPage({ limit: newLimit, offset, updateRows }).then(x=>setLoading(false))
  }, [onPage, page, limit])

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
    <ItemListTemplate tableProps={tableProps} headers={headers} rows={rows} 
      rowComponent={rowComponent} 
      update={update} updateRowById={updateRowById}>
      <TablePagination colSpan={headers ? headers.length : 10}
        rowsPerPageOptions={[defaultLimit, defaultLimit*2]}
        count={total}
        rowsPerPage={limit}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={(event, newPage)=>turnPage(newPage)}
        onChangeRowsPerPage={(e)=>{
          const newLimit = parseInt(e.target.value, 10)
          setLimit(newLimit)
          turnPage(0, newLimit)
        }}
        ActionsComponent={TablePaginationActions}
      />
    </ItemListTemplate>
  )

  return {
    rows, total, limit, page, render, turnPage, loading
  }
}

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
  const { count, page, rowsPerPage, onChangePage } = props

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0)
  }

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1)
  }

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1)
  }

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page">
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        <LastPageIcon />
      </IconButton>
    </div>
  )
}
