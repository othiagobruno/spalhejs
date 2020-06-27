const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Validator = use('Validator');
  const Database = use('Database');

  const exists = async (data, field, message, args, get) => {
    const valueField = get(data, field);

    const [table, column] = args;
    const thereisRecord = await Database.table(table)
      .where(column, valueField)
      .first();

    if (!thereisRecord) {
      throw message;
    }
  };

  Validator.extend('exists', exists);
});
