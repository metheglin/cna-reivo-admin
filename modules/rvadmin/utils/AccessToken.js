import decode from 'jwt-decode'

export default class AccessToken {
  static get token() {
    return localStorage.getItem("access")
  }

  static setToken(token) {
    localStorage.setItem("access", token)
  }

  static get data() {
    if (!this.token) return null
    return decode(this.token)
  }

  static isValid() {
    if (!this.data) return false
    if (!this.data.exp) return false
    if (this.isExpired()) return false
    return true
  }

  static isAuthenticated() {
    return this.isValid() && (!! this.data.staff_id)
  }

  static isAuthorized() {
    return this.isValid() && (!! this.data.permission)
  }

  static isExpired() {
    return this.data.exp < (Date.now()/1000)
  }

  static get status() {
    if (this.isValid()) {
      if (this.isAuthenticated()) {
        if (this.isAuthorized()) {
          return "authorized"
        } else {
          return "authenticated"
        }
      } else {
        return "logout"
      }
    } else {
      return "logout"
    }
  }

  static get abilityKind() {
    if (!this.isAuthorized()) return null
    return this.data.permission.ability_kind
  }
}
