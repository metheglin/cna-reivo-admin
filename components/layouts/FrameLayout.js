import React from 'react';
import clsx from 'clsx'
import Link from 'components/Link'
import {
  makeStyles, CssBaseline, Drawer, AppBar, Toolbar, List, Container, Box, Divider,
  IconButton, Grid, Typography, Chip, Paper,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import AccountMenu from 'components/AccountMenu'
import Breadcrumb from 'components/Breadcrumb'
import Sidebar from 'components/Sidebar'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

const drawerWidth = 260
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.level1,
    minHeight: '100%',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    minHeight: 48,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  // appBar: {
  //   color: theme.palette.mode === 'light' ? null : '#fff',
  //   backgroundColor: theme.palette.mode === 'light' ? null : theme.palette.background.level2,
  //   transition: theme.transitions.create('width'),
  // },
  // appBarHome: {
  //   boxShadow: 'none',
  // },
  // appBarShift: {
  //   [theme.breakpoints.up('lg')]: {
  //     width: 'calc(100% - 240px)',
  //   },
  // },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.mode === 'light' ? null : theme.palette.background.level2,
    color: theme.palette.mode === 'light' ? null : '#fff',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  menuButton: {
    // marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  // drawer: {
  //   [theme.breakpoints.up('lg')]: {
  //     flexShrink: 0,
  //     width: 240,
  //   },
  // },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  // breadcrumbPaper: {
  //   margin: theme.spacing(1),
  // },
  // breadcrumbToolbar: {
  //   minHeight: 'auto',
  //   paddingTop: theme.spacing(1),
  //   paddingBottom: theme.spacing(1),
  // },
  content: {
    flexGrow: 1,
  },
}));

const FrameLayout = ({title, url, dashBar, children}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const session = useSession()

  return (
    <div className={classes.root}>
      <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
            <MenuIcon />
          </IconButton>

          <Info title={title} url={url} />

          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={()=>setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Sidebar {...session.payload.permission} />
        <Divider />
        {/*<List></List>*/}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {dashBar}
        {children}
        {/*<Copyright />*/}
      </main>
    </div>
  );
};

export default FrameLayout;

const Info = ({title, url}) => {
  const classes = useStyles();

  const renderLink = () => {
    return (
      <IconButton size="small" color="inherit" component="a" target="_blank" href={url}>
        <OpenInNewIcon />
      </IconButton>
    )
  }
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <Typography variant="h6" color="inherit" noWrap className={classes.title}>
          <Link color="inherit" href='/'>{title || ""}</Link>
        </Typography>
      </Grid>
      <Grid item>
        <Chip size="small" label={process.env.NODE_ENV} color={process.env.NODE_ENV==='production' ? 'secondary' : 'default'} />
      </Grid>
      {url && <Grid item>
        {renderLink()}
      </Grid>}
    </Grid>
  )
}

export function Wrapper({children}) {
  return (
    <Container><Box py={4}>{children}</Box></Container>
  )
}
