const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Validator = use('Validator');
  const Database = use('Database');

  const notExists = async (data, field, message, args, get) => {
    const valueField = get(data, field);

    const [table, column] = args;
    const thereisRecord = await Database.table(table)
      .where(column, valueField)
      .first();

    if (!thereisRecord) {
      throw message;
    }
  };

  const includeKey = async (data, field, message, args, get) => {
    const valueField = get(data, field);

    if (!args.includes(valueField)) {
      throw message;
    }
  };

  const exists = async (data, field, message, args, get) => {
    const valueField = get(data, field);

    const [table, column] = args;
    const thereisRecord = await Database.table(table)
      .where(column, valueField)
      .first();

    if (thereisRecord) {
      throw message;
    }
  };

  Validator.extend('notExists', notExists);
  Validator.extend('exists', exists);
  Validator.extend('keys', includeKey);
});
