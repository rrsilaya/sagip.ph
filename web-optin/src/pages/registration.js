import React, { Component } from 'react';
import { Input } from '@common';

import 'assets/font/proxima-nova.css';
import 'stylesheets/_index.scss';

const professions = [
  { key: 'STUDENT', text: 'Student' },
  { key: 'POLICE', text: 'Police' },
  { key: 'TEACHER', text: 'Teacher' },
  { key: 'UTILITY', text: 'Utility' },
  { key: 'AGENCY', text: 'Agency' },
  { key: 'OTHERS', text: 'Others' },
];

class Registration extends Component {
  render() {
    return (
      <div className="container container-padded">
        <h1 className="heading-1 heading-gutter-bottom">Continue Registration</h1>
        <p className="typography-sub">To continue with your registration, please fill out all the necessary details below.</p>

        <form className="registration" method="POST">
          <div className="fields">
            <Input type="text" placeholder="Juan Dela Cruz" label="Name" required />
            <Input type="date" label="Birthdate" required />
            <Input type="select" label="Profession" placeholder="Select Profession" selectOptions={professions} required />
            <Input type="text" label="Affiliation" placeholder="N/A"/>
          </div>

          <button className="submit" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Registration;
