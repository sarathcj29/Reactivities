import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RVTextInput from '../../../app/common/form/RvTextInput';
import RVTextArea from '../../../app/common/form/RVTextArea';
import RVSelectInput from '../../../app/common/form/RVSelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import RVDateInput from '../../../app/common/form/RVDateInput';
import { Activity } from '../../../models/activity';

const ActivityForm = () => {
  const history = useHistory();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    description: '',
    category: '',
    date: null,
    city: '',
    venue: '',
  });

  const validationSchema = Yup.object({
    title: Yup.string().required('Activity Title is required'),
    description: Yup.string().required('Activity Description is required'),
    category: Yup.string().required('Activity Category is required'),
    date: Yup.string().required('Activity Date is required').nullable(),
    venue: Yup.string().required('Activity Venue is required'),
    city: Yup.string().required('Activity City is required'),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }
  };

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="blue" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <RVTextInput name="title" placeholder="Title" />
            <RVTextArea rows={3} placeholder="Description" name="description" />
            <RVSelectInput options={categoryOptions} placeholder="Category" name="category" />
            <RVDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <RVTextInput placeholder="City" name="city" />
            <RVTextInput placeholder="Venue" name="venue" />
            <Button
              disabled={isSubmitting || !isValid || !dirty}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={NavLink}
              to={`/activities`}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ActivityForm);
