export default function FailedRequest(error, sourceMessage) {
  const { response = {}, message } = error
  const { status, body } = response
  const errorCodes = body && body.error_codes

  this.message = `${sourceMessage}: ${message}`
  this.name = 'FailedRequest'
  this.statusCode = status
  this.errorCodes = errorCodes
}
