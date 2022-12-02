import React from 'react';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';

interface Props {
  openForm: () => void;
}

const NavigationBar = ({ openForm }: Props) => {
  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <MenuItem header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
            Reactivities
          </MenuItem>
          <MenuItem name="Activities"></MenuItem>
          <MenuItem>
            <Button onClick={openForm} positive content="Create Activity"></Button>
          </MenuItem>
        </Container>
      </Menu>
      {/* <div className="ui pointing menu">
        <a className="active item">Home</a>
        <a className="item">Messages</a>
        <a className="item">Friends</a>
        <div className="right menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default NavigationBar;
