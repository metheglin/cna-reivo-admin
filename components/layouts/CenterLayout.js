import React from 'react';
import { makeStyles } from '@material-ui/core';
import PlainLayout from './PlainLayout'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CenterLayout = ({children}) => {
  const classes = useStyles();

  return (
    <PlainLayout>
      <div className={classes.root}>
        {children}
      </div>
    </PlainLayout>
  );
};

export default CenterLayout;