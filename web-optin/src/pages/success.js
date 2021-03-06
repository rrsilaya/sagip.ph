import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import 'assets/font/proxima-nova.css';
import 'stylesheets/_index.scss';

import success from 'assets/icons/verified.svg';

class Success extends Component {
  handleExit = () => {
    window.close();
  }

  render() {
    return (
      <div className="container-emphasis">
        <Helmet><title>Success · sagip.ph</title></Helmet>
        <div className="container container-padded container-emphasis message">
          <div className="message-main">
            <img className="icon" src={success} alt=""/>
            <h1 className="heading-h1 heading-centered">
              Successfully Registered
            </h1>
            <h3 className="heading-h3 heading-centered typography-light">
              You can now go back to your application
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Success;