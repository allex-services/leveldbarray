module.exports = {
  push : [
    {
      title : 'Item',
      anyOf : [{type : 'array'}, {type : 'object'}, {type : 'string'}, {type : 'number'}, {type : 'boolean'}]
    }
  ],
  pop : true,
  shift : true
};
