import React, {useState} from 'react'
import clsx from 'clsx'
import {alpha} from '@mui/material/styles'
import {makeStyles} from '@mui/styles';
import {Collapse, ButtonBase} from '@mui/material'
import Link from 'components/Link'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

const useStyles = makeStyles((theme) => ({
  li: {
    padding: '1px 0',
    display: 'block',
  },
  liRoot: {
    padding: '0 8px',
  },
  item: {
    ...theme.typography.body2,
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    outline: 0,
    width: '100%',
    padding: '8px 0',
    justifyContent: 'flex-start',
    fontWeight: theme.typography.fontWeightMedium,
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
    },
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette.action.focus,
    },
    [theme.breakpoints.up('md')]: {
      padding: '6px 0',
    },
  },
  button: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '& svg': {
      fontSize: 18,
      marginLeft: -19,
      color: theme.palette.text.secondary,
    },
    '& svg$open': {
      transform: 'rotate(90deg)',
    },
    '&:hover svg': {
      color: theme.palette.text.primary,
    },
  },
  open: {},
  link: {
    color: theme.palette.text.secondary,
    '&.app-drawer-active': {
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      '&:hover': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      },
      '&.Mui-focusVisible': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity,
        ),
      },
    },
  },
}));

export default function SidebarItem(props) {
  const {
    children,
    depth,
    href,
    onClick,
    openImmediately = false,
    topLevel = false,
    title,
    linkProps,
    ...other
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(openImmediately);

  const handleClick = () => {
    setOpen((oldOpen) => !oldOpen);
  };

  const style = {
    paddingLeft: 8 * (3 + 1.5 * depth),
  };

  if (href) {
    return (
      <li
        className={clsx(classes.li, {
          [classes.liRoot]: depth === 0,
        })}
        {...other}
      >
        <Link
          activeClassName="app-drawer-active"
          href={href}
          underline="none"
          className={clsx(classes.item, classes.link)}
          onClick={onClick}
          style={style}
          {...linkProps}
        >
          {title}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={clsx(classes.li, {
        [classes.liRoot]: depth === 0,
      })}
      {...other}
    >
      <ButtonBase
        disableRipple
        className={clsx(classes.item, classes.button, {
          'algolia-lvl0': topLevel,
        })}
        onClick={handleClick}
        style={style}
      >
        <ArrowRightIcon className={open ? classes.open : ''} />
        {title}
      </ButtonBase>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </li>
  );
}