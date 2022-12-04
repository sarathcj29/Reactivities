import { Grid } from 'semantic-ui-react';
import React from 'react';
import ActivityList from './ActivityList';
import ActivityDetail from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
      <Grid.Column className="ten wide">
        <ActivityList />
      </Grid.Column>
      <Grid.Column className="six wide">
        {selectedActivity && !editMode && <ActivityDetail />}
        {editMode && <ActivityForm />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
