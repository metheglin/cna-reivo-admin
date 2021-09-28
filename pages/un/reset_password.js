import {Fragment, useState } from 'react'
import {
  Box,Button,Container,Grid,Link,TextField,Typography,makeStyles,CircularProgress
} from '@material-ui/core';
import {CenterLayout} from 'components/layouts'
// import {useRouter} from 'next/router'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import Api from 'modules/rvadmin/utils/Api'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Page = () => {
  const session = useSession()
  const [email, setEmail] = useState("")
  const [viewMode, setViewMode] = useState("form")

  const requestResetPassword = (email) => {
    session.api.fetch('/reset_password_tokens', {
      method: "POST",
      body: {email},
    }).then(response=>{
      setViewMode("processing")
    })
  }

  const renderForm = (
    <Fragment>
      <Box my={3}>
        <TextField
          fullWidth
          label="メールアドレス"
          margin="normal"
          name="email"
          onChange={e=>setEmail(e.target.value)}
          type="email"
          value={email}
          variant="outlined"
        />
      </Box>

      <Box my={2}>
        <Button
          color="primary"
          disabled={false}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          onClick={()=>requestResetPassword(email)}
        >
          <Box fontWeight="fontWeightBold">パスワードリセット手続きを開始</Box>
        </Button>
      </Box>
    </Fragment>
  )
  const renderProcessing = (
    <Box my={2}>
      <Grid container direction="row" spacing={1}>
        <Grid item><CheckCircleIcon color="primary" /></Grid>
        <Grid item style={{flex: 1}}>
          <Typography variant="body1">
            ご指定のメールアドレスにメールを送信しました。6時間以内にメールの指示にしたがってパスワードリセット手続きを完了させてください。
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )

  return (
    <CenterLayout>
      <Container maxWidth="sm">
        <Box mb={3}>
          <Box fontSize="h4.fontSize" fontWeight="fontWeightBold">パスワードリセット</Box>
        </Box>

        {viewMode === 'processing' ? renderProcessing : renderForm}

        <Typography color="textSecondary" variant="body1">
          アカウントをもっていない方はシステム管理者へお問い合わせください。
        </Typography>
        <Typography color="textSecondary" variant="body1">
          ログインは<Link href="/un/signin">こちら</Link>
        </Typography>
      </Container>
    </CenterLayout>
  )
}

export default Page
