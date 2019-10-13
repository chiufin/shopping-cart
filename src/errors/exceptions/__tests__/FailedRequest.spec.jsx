import { FailedRequest } from '../..'

const mockError = {
  message: 'Internal Server Error',
  response: {
    status: 500,
  },
}

const mockErrorCodes = {
  message: 'Internal Server Error',
  response: {
    body: {
      error_codes: ['404', '403'],
    },
    status: 500,
  },
}

const mockNoResponse = {
  message: 'Internal Server Error',
}

describe('FailedRequest', () => {
  it('should render', () => {
    const failRequest = new FailedRequest(mockError, 'Example')
    expect(failRequest).toEqual({
      errorCodes: undefined,
      message: 'Example: Internal Server Error',
      name: 'FailedRequest',
      statusCode: 500,
    })
  })

  it('should render with error codes', () => {
    const failRequest = new FailedRequest(mockErrorCodes, 'Example')
    expect(failRequest).toEqual({
      errorCodes: mockErrorCodes.response.body.error_codes,
      message: 'Example: Internal Server Error',
      name: 'FailedRequest',
      statusCode: 500,
    })
  })

  it('should render with no response', () => {
    const failRequest = new FailedRequest(mockNoResponse, 'Example')
    expect(failRequest).toEqual({
      errorCodes: undefined,
      message: 'Example: Internal Server Error',
      name: 'FailedRequest',
      statusCode: undefined,
    })
  })
})
