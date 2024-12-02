import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './EmployeeItem.css';

const EmployeeItem = (props) => {
  return (
    <li className="employee-item">
      <Card className="employee-item__content">
        <div className="employee-item__info">
          <h2 className="employee-item__name">{props.name}</h2>
          <p className="employee-item__id"><strong>ID:</strong> {props.id}</p>
          <p className="employee-item__department"><strong>Department:</strong> {props.department}</p>
        </div>
      </Card>
    </li>
  );
};

export default EmployeeItem;
