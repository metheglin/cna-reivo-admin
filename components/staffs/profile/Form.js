import React, {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@mui/material'
import newTextField from 'modules/mui-binder/libs/newTextField'
import newSelectablePermissions from 'modules/mui-binder/libs/newSelectablePermissions'
import HelpTip from 'components/HelpTip'
import GridForm from 'components/GridForm'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

import {useAssets, useImageUploader, AssetsSelectorModal} from 'modules/mui-binder/libs/asset'
import {useSelector} from 'modules/mui-binder/libs/newSelectableList'

export default function Form({save, subject}) {
  subject = subject || {}
  const session = useSession()
  
  const name = newTextField({
    defaultValue: subject.name || "", 
    label: "Name",
    required: true,
    fullWidth: true,
  })
  const description = newTextField({
    defaultValue: subject.description || "", 
    label: "Description",
    required: false, fullWidth: true, multiline: true, rows: 2,
  })

  const assetQuery = {channel: 'staff_profile'}
  const sourceAssets = useAssets({baseQuery: assetQuery})
  const sourceUploader = useImageUploader({baseQuery: assetQuery, onUploaded: sourceAssets.addItem})
  const images = useSelector({defaultValue: subject.image ? [subject.image] : [], max: 1,})
  
  const body = {
    name: name.value,
    description: description.value,
    image_id: images.values.length > 0 ? images.values.map(x=>x.id)[0] : null,
  }

  return (
    <GridForm variant="single"
      forms={[
        name, description,
        (<AssetsSelectorModal selector={images} sourceAssets={sourceAssets} sourceUploader={sourceUploader} label="Image" />),
      ]}
      handleSave={()=>save(body)} />
  )
}
