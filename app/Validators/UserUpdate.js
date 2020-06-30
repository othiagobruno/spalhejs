'use strict';

const { rule } = use('Validator');

class UserUpdate {
  get rules() {
    return {
      name: 'required|string|min:3',
      username: [
        rule('required'),
        rule('string'),
        rule('regex', /^(?=[a-z_\d]*[a-z])[a-z._\d]{5,}$/gim),
      ],
      biography: 'string|max:150',
      website: 'string|url|max:40',
    };
  }
}

module.exports = UserUpdate;
