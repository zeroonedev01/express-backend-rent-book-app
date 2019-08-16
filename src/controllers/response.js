exports.response = (rs, message, status, values) => {
  let messages = {
    status: status || 200,
    message: message || null,
    values: values || null

  }
  return rs.json(messages)
}