import React, {useState} from 'react'
import {Grid, Button, CircularProgress} from '@material-ui/core'

const renderRecursive = (objects, key) => {
  if (objects instanceof Array) {
    return objects.map((x,i)=>renderRecursive(x,i))
  }
  if (typeof objects.render !== 'undefined') {
    return (<Grid key={key} item xs={12}>{objects.render}</Grid>)
  }
  return (<Grid key={key} item xs={12}>{objects}</Grid>)
}

export default function useGridForm({forms, subforms, handleSave}) {
  const [saving, setSaving] = useState(false)

  const onSave = () => {
    setSaving(true)
    handleSave().then(x=>setSaving(false)).catch(err=>{
      setSaving(false)
      throw err
    })
  }

  const render = (
    <Grid container spacing={4}>
      <Grid item container alignItems="flex-start" justify="space-between" spacing={3}>
        <Grid item container sm={12} md={7} spacing={3}>
          {renderRecursive(forms)}
        </Grid>
        {subforms && subforms.length>0 && <Grid item container sm={12} md={5} spacing={0}>
          {renderRecursive(subforms)}
        </Grid>}
      </Grid>
      {handleSave && <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={onSave}
          disabled={saving}>
          {saving ? <CircularProgress size={20} /> : "Save"}
        </Button>
      </Grid>}
    </Grid>
  )

  return {render, saving}
}