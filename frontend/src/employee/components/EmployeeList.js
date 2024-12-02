import React from 'react';

import EmployeeItem from './EmployeeItem';
import Card from '../../shared/components/UIElements/Card';
import './EmployeeList.css';

const EmployeeList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No employee found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="employee-list">
      {props.items.map(employee => (
        <EmployeeItem
          key={employee.Id}
          id={employee.Id}
          name={employee.Name}
          department={employee.Department}
        />
      ))}
    </ul>
  );
};

export default EmployeeList;
