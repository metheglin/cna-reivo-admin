import {
  Button, Paper, Grid, Box,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import RotateLeftIcon from '@mui/icons-material/RotateLeft'
import {useTranslation} from 'react-i18next'

export function SearchPaper({children, onSearch, onReset}) {
  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {children}
          </Grid>
          <Grid item container xs={12} spacing={1}>
            {onSearch && <Grid item><SearchButton onClick={onSearch} /></Grid>}
            {onReset && <Grid item><ResetButton onClick={onReset} /></Grid>}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export function SearchButton({onClick, ...props}) {
  const {t} = useTranslation()
  return (
    <Button startIcon={<SearchIcon />} size="small" variant="contained" color="primary" 
      onClick={onClick} {...props}>{t('Search')}</Button>
  )
}

export function ResetButton({onClick, ...props}) {
  const {t} = useTranslation()
  return (
    <Button startIcon={<RotateLeftIcon />} size="small" variant="outlined"
      onClick={onClick} {...props}>{t('Reset')}</Button>
  )
}