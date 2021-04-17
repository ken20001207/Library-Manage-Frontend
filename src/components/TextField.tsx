import { ControlLabel, FormControl, FormGroup } from 'rsuite';
import React, { Component } from 'react';

class TextField extends Component<any, {}> {
  render() {
    const { name, label, accepter } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label}</ControlLabel>
        <FormControl name={name} accepter={accepter} {...this.props}/>
      </FormGroup>
    );
  }
}

export default TextField;
