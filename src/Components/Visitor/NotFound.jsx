import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExclamationCircle, faFireExtinguisher} from '@fortawesome/free-solid-svg-icons';

const NotFound = () =>
  <div className="not-found">
    <h3><FontAwesomeIcon icon={faExclamationCircle} size="lg"/>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
    <h4><FontAwesomeIcon icon={faFireExtinguisher} size="2x"/></h4>
  </div>

export default NotFound;