import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import PeopleComponent from './people';

export default class PeopleSearchComponent extends Component {
  render() {
    return (
      <div>
        <FormGroup>
          <InputGroup>
            <FormControl type="text" />
            <InputGroup.Button>
              <Button>Найти</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <PeopleComponent />
        <PeopleComponent />
        <PeopleComponent />
        <PeopleComponent />
        <PeopleComponent />
      </div>
    );
  }
}
