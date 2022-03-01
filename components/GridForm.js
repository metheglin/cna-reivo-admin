import React, {useState} from 'react'
import {Grid, Button, CircularProgress} from '@mui/material'
import {useTranslation} from 'react-i18next'

const renderRecursive = (objects, key) => {
  if (!objects) return null
  if (objects instanceof Array) {
    return objects.map((x,i)=>renderRecursive(x,i))
  }
  if (typeof objects.render !== 'undefined') {
    return (<Grid key={key} item xs={12}>{objects.render}</Grid>)
  }
  return (<Grid key={key} item xs={12}>{objects}</Grid>)
}

export default function GridForm({variant, handleSave, ...props}) {
  const [saving, setSaving] = useState(false)

  const onSave = () => {
    setSaving(true)
    handleSave().then(x=>setSaving(false)).catch(err=>{
      setSaving(false)
      throw err
    })
  }

  const props2 = {saving, setSaving, onSave, handleSave}

  if (variant === 'single') {
    return (<GridFormSingle {...props} {...props2} />)
  } else {
    return (<GridFormDouble {...props} {...props2} />)
  }
}

function GridFormDouble({children, forms, subforms, saving, setSaving, onSave, handleSave}) {
  const {t} = useTranslation()
  return (
    <Grid container spacing={4}>
      <Grid item container alignItems="flex-start" justifyContent="space-between" spacing={2}>
        <Grid item container sm={12} md={7} spacing={2}>
          {renderRecursive(forms)}
        </Grid>
        {subforms && subforms.length>0 && <Grid item container sm={12} md={5} spacing={0}>
          {renderRecursive(subforms)}
        </Grid>}
      </Grid>
      {children && <Grid item xs={12}>{children}</Grid>}
      {handleSave && <Grid item xs={12}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={onSave}
          disabled={saving}>
          {saving ? <CircularProgress size={20} /> : t("Save")}
        </Button>
      </Grid>}
    </Grid>
  );
}

function GridFormSingle({children, forms, subforms, saving, setSaving, onSave, handleSave}) {
  const {t} = useTranslation()
  return (
    <Grid container spacing={4}>
      <Grid item container spacing={2}>
        {renderRecursive(forms)}
      </Grid>
      {subforms && subforms.length>0 && <Grid item container spacing={2}>
        {renderRecursive(subforms)}
      </Grid>}
      {children && <Grid item>{children}</Grid>}
      {handleSave && <Grid item>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          onClick={onSave}
          disabled={saving}>
          {saving ? <CircularProgress size={20} /> : t("Save")}
        </Button>
      </Grid>}
    </Grid>
  )
}