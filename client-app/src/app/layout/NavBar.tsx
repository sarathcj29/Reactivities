import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';

const NavigationBar = () => {
  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <MenuItem as={NavLink} to="/" exact header>
            <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
            Reactivities
          </MenuItem>
          <MenuItem as={NavLink} to="/activities" name="Activities"></MenuItem>
          <MenuItem>
            <Button as={NavLink} to="/createActivity" positive content="Create Activity"></Button>
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
