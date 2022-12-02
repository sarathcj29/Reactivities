import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../models/activity';

interface Props {
  activity: Activity | undefined;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
}

const ActivityDetail = ({ activity, cancelSelectActivity, openForm }: Props) => {
  return (
    <>
      {activity && (
        <Card fluid>
          <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
          <Card.Content>
            <Card.Header>{activity.title}</Card.Header>
            <Card.Meta>
              <span>{activity.date.toString()}</span>
            </Card.Meta>
            <Card.Description>{activity.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button.Group widths="2">
              <Button
                onClick={() => {
                  openForm(activity.id);
                }}
                basic
                color="blue"
                content="Edit"
              />
              <Button onClick={cancelSelectActivity} basic color="grey" content="Cancel" />
            </Button.Group>
          </Card.Content>
        </Card>
      )}
    </>
  );
};

export default ActivityDetail;
