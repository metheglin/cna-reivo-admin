import React, {useState} from 'react'
// import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const renderRecursive = (objects, key) => {
  if (objects instanceof Array) {
    return objects.map((x,i)=>renderRecursive(x,i))
  }
  if (typeof objects.render !== 'undefined') {
    return (<Grid key={key} item xs={12}>{objects.render}</Grid>)
  }
  return (<Grid key={key} item xs={12}>{objects}</Grid>)
}

export default ({ objects, handleSave, handleClick }) => {
  const [saving, setSaving] = useState(false)

  const onSave = () => {
    setSaving(true)
    handleSave().then(x=>setSaving(false)).catch(err=>{
      setSaving(false)
      throw err
    })
  }
  const onClick = handleClick || onSave

  return (
    <Grid container spacing={3}>
      {renderRecursive(objects)}
      
      <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={onClick}
          disabled={saving}
        >
          {saving ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </Grid>
    </Grid>
  )
}