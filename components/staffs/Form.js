import React, {useState, useEffect} from 'react'
import {Grid, InputAdornment} from '@material-ui/core'
import newTextField from 'modules/mui-binder/libs/newTextField'
import newSelectablePermissions from 'modules/mui-binder/libs/newSelectablePermissions'
import HelpTip from 'components/HelpTip'
import GridForm from 'components/GridForm'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

export default function Form({save, subject}) {
  subject = subject || {}
  const session = useSession()
  
  const name = newTextField({
    defaultValue: subject.name || "", 
    label: "氏名 Name",
    required: true,
    fullWidth: true,
  })
  const email = newTextField({
    defaultValue: subject.email || "", 
    label: "メールアドレス Email",
    required: true,
    fullWidth: true, disabled: !!subject.email,
  })
  const password = newTextField({
    defaultValue: subject.password || "", 
    label: "パスワード Password",
    required: true,
    fullWidth: true, disabled: !!subject.id,
    type: "password"
  })
  const password_confirmation = newTextField({
    defaultValue: subject.password_confirmation || "", 
    label: "確認用パスワード Password Confirmation",
    required: true,
    fullWidth: true, disabled: !!subject.id,
    type: "password"
  })

  const permissions = newSelectablePermissions({
    defaultValue: subject.permissions || [],
    label: "権限 Permission",
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
