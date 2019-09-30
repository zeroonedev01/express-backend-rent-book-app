module.exports = {
  response: (rs, message, status, values, err) => {
    const messages = {
      error: err || null,
      status: status || 200,
      message: message || null,
      values: values || null
    }
    return rs.status(status).json(messages)
  }
}
