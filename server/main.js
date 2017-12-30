// Only execute on the server

import _ from 'lodash';
import { image, helpers } from 'faker';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';


Meteor.startup(() => {
  // Check to see if data exists in the collection
  // See if the collection has any records
  const numberRecords = Employees.find({}).count();
  if(!numberRecords) {
    // Generate some data..
    _.times(5000, () => {
      const {name, email, phone} = helpers.createCard();
      Employees.insert({
        name,
        email,
        phone,
        avatar: image.avatar()
      });
    });
  }

  Meteor.publish('employees', (PER_PAGE = 20) => {
    return Employees.find({}, { limit: PER_PAGE });
  });
});