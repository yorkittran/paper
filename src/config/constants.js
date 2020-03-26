export const API = 'http://192.168.137.233:231/api'

export const URL_LOGIN  = API + '/login'
export const URL_LOGOUT = API + '/logout'

export const URL_USER         = API + '/user'
export const URL_PROFILE      = API + '/profile'
export const URL_NOTIFICATION = API + '/notification'
export const URL_GROUP        = API + '/group'
export const URL_TASK         = API + '/task'

export const URL_USER_MEMBERS  = URL_USER + '/members'
export const URL_USER_MANAGERS = URL_USER + '/managers'

export const URL_TASK_OLD      = URL_TASK + '/old'
export const URL_TASK_APPROVE  = URL_TASK + '/approve'
export const URL_TASK_REJECT   = URL_TASK + '/reject'
export const URL_TASK_UPDATE   = URL_TASK + '/update'
export const URL_TASK_COMMIT   = URL_TASK + '/commit'
export const URL_TASK_EVALUATE = URL_TASK + '/evaluate'

export const ADMIN         = 'Admin'
export const MANAGER       = 'Manager'
export const MEMBER        = 'Member'
export const ADMIN_VALUE   = '0'
export const MANAGER_VALUE = '1'
export const MEMBER_VALUE  = '2'