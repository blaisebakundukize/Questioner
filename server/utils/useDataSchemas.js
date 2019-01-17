/**
 * Function to match data with its schema
 * @param {Object} data - Data to match with schema
 * @param {Number} dataId - Id to add to data
 * @param {Object} schema - Schema of data
 */
const userDataSchema = (data, dataId, schema) => {
  const propertyKeys = Object.keys(schema);
  const dataWithSchema = { ...schema };

  dataWithSchema.id = dataId;
  return new Promise((resolve, reject) => {
    propertyKeys.forEach((key) => {
      if (data[key]) {
        dataWithSchema[key] = data[key];
      }
      if (dataWithSchema[key] === undefined) {
        reject(new Error(`${key} is required`));
      }
    });
    resolve(dataWithSchema);
  });
};

export default userDataSchema;
