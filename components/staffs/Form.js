import React, {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@mui/material'
import newTextField from 'modules/mui-binder/libs/newTextField'
import newSelectablePermissions from 'modules/mui-binder/libs/newSelectablePermissions'
import HelpTip from 'components/HelpTip'
import GridForm from 'components/GridForm'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useTranslation} from 'react-i18next'

export default function Form({save, subject}) {
  subject = subject || {}
  const {t} = useTranslation()
  const session = useSession()
  
  const name = newTextField({
    defaultValue: subject.name || "", 
    label: t("Name"),
    required: true,
    fullWidth: true,
  })
  const email = newTextField({
    defaultValue: subject.email || "", 
    label: t("Email"),
    required: true,
    fullWidth: true, disabled: !!subject.email,
  })
  const password = newTextField({
    defaultValue: subject.password || "", 
    label: t("Password"),
    required: true,
    fullWidth: true, disabled: !!subject.id,
    type: "password"
  })
  const password_confirmation = newTextField({
    defaultValue: subject.password_confirmation || "", 
    label: t("Password Confirmation"),
    required: true,
    fullWidth: true, disabled: !!subject.id,
    type: "password"
  })

  const permissions = newSelectablePermissions({
    defaultValue: subject.permissions || [],
    label: t("Permission"),
    permissions: [
      // {identifier: 'master', ability_kind: 'master', client: null},
      {identifier: 'admin', ability_kind: 'admin'},
    ]
  })

  const getBody = () => {
    const base = {
      email: email.value,
      name: name.value,
      permissions_attributes: permissions.values.map(({ability_kind, client})=>({ability_kind, client})),
    }
    const passwords = {
      password: password.value,
      password_confirmation: password_confirmation.value,
    }
    return subject.id ? base : {...base, ...passwords}
  }
  const body = getBody()

  return (
    <GridForm
      forms={[
        name, email, password, password_confirmation,
        /* publishRange, slug, title, content, */
      ]}
      subforms={[
        permissions,
        /* imageRender, labelRender, */
      ]}
      handleSave={()=>save(body)} />
  )
}
