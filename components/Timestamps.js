import {Chip, Tooltip} from '@mui/material'
import {format, formatDistance} from 'date-fns'
import {en, ja} from 'date-fns/locale'
import {useTranslation} from 'react-i18next'

const locales = {en, ja}

export function Timestamp({prefix, datetime}) {
  if (!datetime) return null
  const {t, i18n} = useTranslation()
  const label = [prefix, formatDistance(new Date(datetime), new Date(), {locale: locales[i18n.language], addSuffix: true})].filter(x=>x).join(' ')
  return (
    <Tooltip title={format(new Date(datetime), "yyyy-MM-dd HH:mm:ssxxx")}>
      <Chip size="small" variant="outlined" label={label} />
    </Tooltip>
  )
}

export function CreatedAt({created_at}) {
  const {t} = useTranslation()
  return (<Timestamp datetime={created_at} prefix={t("Created")} />)
}

export function UpdatedAt({updated_at}) {
  const {t} = useTranslation()
  return (<Timestamp datetime={updated_at} prefix={t("Updated")} />)
}

export function TimestampFormat({prefix, datetime, f}) {
  const label = [prefix, format(new Date(datetime), f)].filter(x=>x).join(' ')
  return (
    <Chip size="small" variant="outlined" label={label} />
  )
}

export function TimestampRange({start_at, end_at, f="yyyy-MM-dd HH:mm:ss"}) {
  return [start_at, end_at].filter(x=>x).map(x=><TimestampFormat datetime={x} f={f} />).reduce((acc,x)=>[acc, ' - ', x])
}
