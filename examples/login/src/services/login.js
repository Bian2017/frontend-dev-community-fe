import request from '@/utils/request'

export const getCaptchaAsync = async () => request.get('/captcha')

export const forgetPasswordAsync = async params => request.post('/forget', params)

export default {}
