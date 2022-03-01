import React, {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@mui/material'
import {useSelector} from 'modules/mui-binder/libs/newSelectableList'
import newTextField from 'modules/mui-binder/libs/newTextField'
import newDateTimeRange from 'modules/mui-binder/libs/newDateTimeRange'
import newTinyMceEditor, {newTinyMceEditorWithModalPicker} from 'modules/mui-binder/libs/newTinyMceEditor'
import newDraft from 'modules/mui-binder/libs/newDraft'
import {useAssets, useImageUploader, AssetsSelectorModal} from 'modules/mui-binder/libs/asset'
import {useLabels, LabelsSelectorModal} from 'modules/mui-binder/libs/label'
import HelpTip from 'components/HelpTip'
import GridForm from 'components/GridForm'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useTranslation} from 'react-i18next'

export default function Form({save, subject}) {
  subject = subject || {}
  const session = useSession()
  const {t} = useTranslation()
  
  const publishRange = newDateTimeRange({
    startAtProps: { defaultValue: subject.start_at || "", required: true },
    endAtProps: { defaultValue: subject.end_at || "2099-12-31", required: true },
  })
  const slug = newTextField({
    defaultValue: subject.slug || "", 
    label: "Slug", required: true,
    fullWidth: true, disabled: !!subject.slug,
  })
  const title = newTextField({defaultValue: subject.title || "", label: "Title", required: true, fullWidth: true})

  const assetQuery = {channel: 'column'}
  const sourceAssets = useAssets({baseQuery: assetQuery})
  const sourceUploader = useImageUploader({baseQuery: assetQuery, onUploaded: sourceAssets.addItem})
  const images = useSelector({defaultValue: Array.of(subject.images).filter(x=>x) || [], max: 5})

  const sourceCategories = useLabels({baseQuery: {prefix: '/c/cat'}})
  const categories = useSelector({
    defaultValue: (subject.labels || []).filter(x=>x.path.startsWith('/c/cat/')), 
    max: 20,
  })

  // const content = newTinyMceEditorWithModalPicker({defaultValue: subject.content_summary || ""}, {sourceAssets, sourceUploader})
  const content = newDraft({defaultValue: subject.content_json})

  const body = {
    start_at: publishRange.startAt.value,
    end_at: publishRange.endAt.value,
    slug: slug.value,
    title: title.value,
    content_summary: content.value,
    image_ids: images.values.map(x=>x.id),
    label_ids: categories.values.map(x=>x.id),
  }

  return (
    <GridForm
      forms={[
         publishRange, slug, title, content, 
      ]}
      subforms={[
        (<AssetsSelectorModal selector={images} sourceAssets={sourceAssets} sourceUploader={sourceUploader} label={t('Image')} />),
        (<LabelsSelectorModal selector={categories} sourceLabels={sourceCategories} label={t('Category')} />),
      ]}
      handleSave={()=>save(body)} />
  )
}