import moment from 'moment'
import { Http, Echo } from '@/js/utils'
import Cookie from 'js-cookie'
import _ from 'lodash'
import { queryClient } from './query/ReactQueryProvider'


//Export common functions to windows
// Force Update: 1
window._ = _
window.moment = moment
window.Http = Http
window.Cookie = Cookie
window.Echo = Echo
window.queryClient = queryClient
