import React, {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@material-ui/core'
import newTextField from 'modules/mui-binder/libs/newTextField'
import newSelectableAssets, {useImages, useModalRender as useAssetsModalRender} from 'modules/mui-binder/libs/newSelectableAssets'
import newDateTimeRange from 'modules/mui-binder/libs/newDateTimeRange'
import {newTinyMceEditorWithModalPicker} from 'modules/mui-binder/libs/newTinyMceEditor'
import newSelectableLabels, {useLabels, useModalRender as useLabelsModalRender} from 'modules/mui-binder/libs/newSelectableLabels'
import HelpTip from 'components/HelpTip'
import GridForm from 'components/GridForm'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

export default function Form({save, subject}) {
  subject = subject || {}
  const session = useSession()
  
  const publishRange = newDateTimeRange({
    startAtProps: { defaultValue: subject.start_at, required: true },
    endAtProps: { defaultValue: subject.end_at || "2099-12-31", required: true },
  })
  const slug = newTextField({
    defaultValue: subject.slug || "", 
    label: "Slug", required: true,
    fullWidth: true, disabled: !!subject.slug,
  })
  const title = newTextField({defaultValue: subject.title || "", label: "Title", required: true, fullWidth: true})

  const assetsModule = useImages({
    baseQuery: {
      limit: 18,
      channel: 'residentapp/board',
    },
    api: session.api,
    apiUpload: session.apiRaw,
  })
  const image = newSelectableAssets({
    assetsModule,
    defaultValue: Array.of(subject.images).filter(x=>x),
    max: 5,
  })
  const imageRender = useAssetsModalRender(image, {label: 'Images'})

  const labelsModule = useLabels({
    baseQuery: {
      limit: 24,
      // prefix: '/board/cat',
      prefix: '/faq',
    },
    api: session.api,
  })
  const labels = newSelectableLabels({
    labelsModule,
    defaultValue: (subject.labels || []),
    max: 10,
  })
  const labelRender = useLabelsModalRender(labels, {label: 'Labels'})

  const content = newTinyMceEditorWithModalPicker({defaultValue: subject.content_text}, {assetsModule})
  // const contentRender = useModalPicker(content, {assetsModule})

  const body = {
    start_at: publishRange.startAt.value,
    end_at: publishRange.endAt.value,
    slug: slug.value,
    title: title.value,
    content_text: content.value,
    image_id: image.hasValues() ? image.values[0].id : null,
    label_ids: labels.values.map(x=>x.id),
  }

  return (
    <GridForm
      forms={[
        publishRange, slug, title, content,
        // image.renderSelector,
      ]}
      subforms={[imageRender, labelRender]}
      handleSave={()=>save(body)} />
  )
}