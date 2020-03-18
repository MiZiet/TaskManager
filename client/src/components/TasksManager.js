import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from "reactstrap";
import Tasks from "./Tasks";
import Workers from "./Workers";

function TasksManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [navDisplay, setNavDisplay] = useState(true);

  const divTasks = (
    <div>
      <Tasks />
    </div>
  );

  const divWorkers = (
    <div>
      <Workers />
    </div>
  );

  const setWorkers = e => {
    e.preventDefault();
    setNavDisplay(false);
  };

  const setTasks = e => {
    e.preventDefault();
    setNavDisplay(true);
  };
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Task Manager</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink onClick={setWorkers}>Workers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={setTasks}>Tasks</NavLink>
              </NavItem>
            </Nav>
            <NavbarText>by ZNCU</NavbarText>
          </Collapse>
        </Navbar>
      </div>
      {navDisplay ? divTasks : divWorkers}
    </>
  );
}

export default TasksManager;
