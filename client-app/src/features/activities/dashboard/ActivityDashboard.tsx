import { Grid } from 'semantic-ui-react';
import React, { useEffect } from 'react';
import ActivityList from './ActivityList';
import ActivityDetail from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry, loadActivities]);

  if (activityStore.loadingInitial) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column className="ten wide">
        <ActivityList />
      </Grid.Column>
      <Grid.Column className="six wide">
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
