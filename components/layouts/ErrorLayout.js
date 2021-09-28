import {CenterLayout} from 'components/layouts'
import {Typography, Container, Box} from '@material-ui/core'

export default function ErrorLayout({title, children}) {
  return (
    <CenterLayout>
      <Container maxWidth="sm">
        <Box mb={3}>
          <Box fontSize="h4.fontSize" fontWeight="fontWeightBold">{title}</Box>
        </Box>
        <Box>{children}</Box>
      </Container>
    </CenterLayout>
  )
}