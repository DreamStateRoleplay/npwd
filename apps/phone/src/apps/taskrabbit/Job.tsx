import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Box, Button, Typography, Paper } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from '@os/snackbar/hooks/useSnackbar';
import { grabRabbitTaskById } from './hooks/useTaskRabbit';
import { MessageEvents } from '@typings/messages';
import fetchNui from '@utils/fetchNui';
import { TaskRabbitJobs } from './TaskRabbitListing';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    width: '100%',
    color: 'white',
    background: '#03bb85',
    '&:hover': {
      background: '#121212',
    },
  },
  paper: {
    overflow: 'auto',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'flex',
    borderWidth: 2,
    height: 'auto',
    background: theme.palette.background.paper,
    marginBottom: 20,
    textAlign: 'center',
  },
}));

export const Job: React.FC<TaskRabbitJobs> = () => {
  const classes = useStyles();
  const history = useHistory();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const [job, setJob] = useState<TaskRabbitJobs>(null);

  useEffect(() => {
    setJob(grabRabbitTaskById(parseInt(id)));
  }, [id]);

  const { addAlert } = useSnackbar();

  const handleSetWaypoint = () => {
    // sets GPS waypoint.
    fetchNui(MessageEvents.MESSAGES_SET_WAYPOINT, {
      coords: job.blip_location,
    });

    // Alerts user of the GPS waypoint.
    addAlert({
      message: 'Job Location has been marked on your GPS.',
      type: 'success',
    });

    // Brings user back to homepage.
    history.goBack();
    history.goBack();
  };

  return (
    <Box height="100%" width="100%" p={2}>
      {job == null ? (
        <CircularProgress />
      ) : (
        <Paper variant="outlined" className={classes.paper}>
          <div style={{ margin: 10 }}>
            <Typography style={{ margin: 5 }} variant="h5">
              {job.title}
            </Typography>
            <hr />
            <Typography style={{ margin: 5 }} variant="h5">
              {job.description}
            </Typography>
          </div>
          <Button className={classes.buttonStyle} onClick={handleSetWaypoint}>
            Start Job Now
          </Button>
        </Paper>
      )}
    </Box>
  );
};
