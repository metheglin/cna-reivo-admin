import React from 'react'
import {Grid, InputAdornment} from '@material-ui/core'
import newTextField from 'modules/mui-binder/libs/newTextField'
import newSelectableAssets from 'modules/mui-binder/libs/newSelectableAssets'

import HelpTip from 'components/HelpTip'

import useGridForm from 'modules/rvadmin/core/useGridForm'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

export default function Form({save, prefix, subject}) {
  const session = useSession()
  subject = subject || {}
  const path = newTextField({
    defaultValue: subject.path || "", 
    label: "Path", required: true,
    fullWidth: true, disabled: !!subject.path,
    InputProps: prefix ?
      {startAdornment: <InputAdornment position="start">{`${prefix}/`}</InputAdornment>} :
      null
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
      channel: 'label',
      // content_type: 'image',
    },
    api: session.api,
    apiUpload: session.apiRaw,
  })
  const body = {
    path: prefix ? `${prefix}/${path.value}` : path.value,
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