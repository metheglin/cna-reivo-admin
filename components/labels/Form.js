import React, {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@material-ui/core'
import newTextField from 'modules/mui-binder/libs/newTextField'
import {useSelector} from 'modules/mui-binder/libs/newSelectableList'
import {useAssets, useImageUploader, AssetsSelectorModal} from 'modules/mui-binder/libs/asset'
// import newSelectableAssets, {useImages, useModalRender} from 'modules/mui-binder/libs/newSelectableAssets'
// import useImages from 'modules/rvadmin/core/useImages'
import HelpTip from 'components/HelpTip'
import GridForm from 'components/GridForm'
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
    defaultValue: subject.serial_code, label: "Serial Code", type: 'number',
    helperText: 'Sorted from larger to smaller',
  })
  const assetQuery = {channel: 'label'}
  const sourceAssets = useAssets({baseQuery: assetQuery})
  const sourceUploader = useImageUploader({baseQuery: assetQuery, onUploaded: sourceAssets.addItem})
  const image = useSelector({defaultValue: Array.of(subject.image).filter(x=>x) || [], max: 1})

  const body = {
    path: displayPrefix ? `${displayPrefix}/${path.value}` : path.value,
    name: name.value,
    serial_code: serial_code.value,
    image_id: image.hasValues() ? image.values[0].id : null,
  }

  return (
    <GridForm 
      forms={[path, name, serial_code,]}
      subforms={[
        <AssetsSelectorModal selector={image} sourceAssets={sourceAssets} sourceUploader={sourceUploader} label="Image" />
      ]}
      handleSave={()=>save(body)} />
  )
}