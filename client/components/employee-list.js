import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees'

import EmployeeDetail from './employee-detail';


const PER_PAGE = 20;

class EmployeeList extends Component {
  componentWillMount()  {
    this.page = 2;
  }

  renderEmployee() {
    return this.props.employees.map((employee) => {
      return <EmployeeDetail key={employee._id} employee={employee} />;
    });
  }

  handleClick() {
    Meteor.subscribe('employees', PER_PAGE * this.page);
    this.page += 1;
  }

  render() {
    return (
      <div>
        <div className="employee-list">
          {this.renderEmployee()}
        </div>
        <button className="btn btn-primary" onClick={ this.handleClick.bind(this) }>load more</button>
      </div>
    )
  }
}

export default withTracker(props => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  Meteor.subscribe('employees', PER_PAGE);

  return {
    employees: Employees.find({}).fetch()
  };
})(EmployeeList);