import request from '@/utils/request'

export const getCaptchaAsync = async () => request.get('/captcha')

export default {}
