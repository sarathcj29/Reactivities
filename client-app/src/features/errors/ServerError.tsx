import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

const ServerError = () => {
  const { commonStore } = useStore();
  return (
    <Container>
      <Header as="h1" content="Server Error" />
      <Header sub as="h5" color="red" content={commonStore.error?.message} />
      {commonStore.error?.details && (
        <Segment>
          <Header as="h4" content="Stack trace" color="red" />
          <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
        </Segment>
      )}
      <Button as={Link} to="/errors" primary>
        Return to Errors page
      </Button>
    </Container>
  );
};

export default observer(ServerError);
