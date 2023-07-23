const URL = {
  type: String,
  match: RegExp(
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
  ),
  trim: true,
};
DEFAULT_STRING_SCHEMA = {
  type: String,

  maxLength: 256,
  trim: true,
};
const DEFAULT_STRING_SCHEMA_REQUIRED = {
  ...DEFAULT_STRING_SCHEMA,
  required: true,
  minLength: 2,
};
module.exports = { URL, DEFAULT_STRING_SCHEMA, DEFAULT_STRING_SCHEMA_REQUIRED };
