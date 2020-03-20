export const API = 'http://172.16.1.184:231/api'

export const URL_LOGIN  = API + '/login'
export const URL_LOGOUT = API + '/logout'

export const URL_USER  = API + '/user'
export const URL_GROUP = API + '/group'
export const URL_TASK  = API + '/task'

export const URL_USER_LIST_OF_MANAGERS_AVAILABLED = URL_USER + '/managerAvailabled'
export const URL_USER_LIST_OF_MEMBERS_AVAILABLED  = URL_USER + '/memberAvailabled'
export const URL_USER_GET_ALL_USERS_EXCEPT_SELF   = URL_USER + '/exceptSelf'

export const ADMIN         = 'Admin'
export const MANAGER       = 'Manager'
export const MEMBER        = 'Member'
export const ADMIN_VALUE   = '0'
export const MANAGER_VALUE = '1'
export const MEMBER_VALUE  = '2'