import queryString from 'query-string'
import AccessToken from './AccessToken'

class ApiBase {
  constructor({apiPrefix, defaultHeaders, handleApiError, requestFilter, responseFilter}) {
    this.apiPrefix = apiPrefix ? apiPrefix : process.env.NEXT_PUBLIC_API_PREFIX
    this.defaultHeaders = defaultHeaders
    this.handleApiError = handleApiError
    this.requestFilter = requestFilter
    this.responseFilter = responseFilter
  }

  fetch(_path, _request={}) {
    const [path, request] = this.buildRequest(_path, _request)
    return this.fetchBare(path, request)
  }

  fetchBare(path, request={}) {
    let req = fetch(path, request).then(response=>{
      // this.responseDebugPrint( response ) 
      if (!response.ok) {
        throw(response)
      }
      return response
    })
    if (this.responseFilter) {
      req = req.then(this.responseFilter)
    }
    if (this.handleApiError) {
      req = req.catch(this.handleApiError)
    }
    return req
  }

  buildRequest(_path, _request) {
    const [path, request] = this.requestFilter ?
      this.requestFilter(_path, _request) :
      [_path, _request]
    return [
      `${this.apiPrefix}${path}`,
      {...request, headers: {...request.headers, ...this.defaultHeaders}}
    ]
  }
}

const errors = {
  authentication_failed: "メールアドレスかパスワードが間違っています。",
}

export const getHandleError = ({messenger, disableAbort}) => {
  return (error) => {
    if (error instanceof Error) {
      messenger( error.message )
      return disableAbort ? undefined : Promise.reject(error)
    }

    error.json().then(response => {
      if ( response.message ) {
        messenger( response.message )
      } else {
        const msg = errors[response.code]
        messenger( msg || "エラーが発生しました。継続する場合は運営にお問い合わせください。" )
      }
    }).catch(errorOfError=>{
      // Error Response is not JSON
      messenger( `${error.status} ${error.statusText}` )
    })

    return disableAbort ? undefined : Promise.reject(error)
  }
}

// USAGE:
// ---------
// const api = Api.json({
//   token: Api.token, 
//   handleApiError: Api.getHandleError({messenger})
// })
// api.fetch('/api/v1/notices', {
//   params: {
//     keyword: 'test'
//   }
// }).then(json=>{
//   // setNotices(json)
// })
export default {
  getHandleError: getHandleError,
  get token() {
    return AccessToken.token
  },
  raw({apiPrefix, token, handleApiError}) {
    const authHeader = {'Authorization': `Bearer ${token || this.token}`}
    return new ApiBase({
      apiPrefix,
      handleApiError,
      defaultHeaders: {...authHeader},
    })
  },
  json({apiPrefix, token, handleApiError}) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    const authHeader = {'Authorization': `Bearer ${token || this.token}`}
    return new ApiBase({
      apiPrefix,
      handleApiError,
      defaultHeaders: {...headers, ...authHeader},
      requestFilter(_path, _req) {
        let path = _path, request = _req
        if (request.params) {
          const {params, ...req} = request
          const qs = queryString.stringify(params, {arrayFormat: 'bracket'})
          path = `${path}?${qs}`
          request = req
        }
        if (request.body && typeof request.body === 'object') {
          request = {...request, body: JSON.stringify(request.body)}
        }
        return [path, request]
      },
      responseFilter(response) {
        return response.json()
      },
    })
  },
  // client({handleApiError}) {
  //   const apiPrefix = `${process.env.NEXT_PUBLIC_API_PREFIX}/${AccessToken.data.client_name}`
  //   return this.json({apiPrefix, handleApiError})
  // }
}
