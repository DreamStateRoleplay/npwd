import React from 'react';
import { Box } from '@mui/material';
import { List } from '@ui/components/List';
import { useTaskRabbitListings } from './hooks/useTaskRabbit';
import { TaskRabbitListing } from './TaskRabbitListing';

export const TaskRabbitApp: React.FC = () => {
  const availableJobs = useTaskRabbitListings();

  return (
    <Box height="100%" width="100%" p={2}>
      <List>
        {availableJobs.map((job) => (
          <TaskRabbitListing key={job.id} {...job} />
        ))}
      </List>
    </Box>
  );
};
