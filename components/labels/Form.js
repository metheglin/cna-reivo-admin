import React, {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@material-ui/core'
import newTextField from 'modules/mui-binder/libs/newTextField'
import newSelectableAssets from 'modules/mui-binder/libs/newSelectableAssets'

import HelpTip from 'components/HelpTip'

import useGridForm from 'modules/rvadmin/core/useGridForm'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

export default function Form({save, prefix, subject}) {
  subject = subject || {}
  const session = useSession()
  const displayPrefix = prefix ?
    "/" + prefix.split('/').filter(x=>x).concat([""]).join('/') :
    ""
  const path = newTextField({
    defaultValue: subject.path || "", 
    label: "Path", required: true,
    fullWidth: true, disabled: !!subject.path,
    InputProps: {
      startAdornment: <InputAdornment position="start">{displayPrefix}</InputAdornment>
    }
  })
  const name = newTextField({defaultValue: subject.name || "", label: "Name", required: true, fullWidth: true})
  const serial_code = newTextField({
    defaultValue: subject.serial_code, label: "並び替え用コード", type: 'number',
    helperText: '数値が高い順に並んで表示されます',
  })
  const image = newSelectableAssets({
    defaultValue: Array.of(subject.image).filter(x=>x),
    max: 1,
    baseQuery: {
      limit: 18,
      // channel: 'label',
      // content_type: 'image',
    },
    api: session.api,
    apiUpload: session.apiRaw,
  })
  const body = {
    path: displayPrefix ? `${displayPrefix}/${path.value}` : path.value,
    name: name.value,
    serial_code: serial_code.value,
    image_id: image.hasValues() ? image.values[0].id : null,
  }

  const gridForm = useGridForm({
    forms: [
      path, name, serial_code,
    ],
    subforms: [image],
    handleSave: ()=>save(body),
  })

  return (<React.Fragment>{gridForm.render}</React.Fragment>)
}