import React from 'react';
import { makeStyles, Box } from '@material-ui/core';
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
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
        >
          {children}
        </Box>
      </div>
    </PlainLayout>
  );
};

export default CenterLayout;