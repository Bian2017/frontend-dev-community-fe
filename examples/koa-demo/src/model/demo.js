import User from './test'

// 增
const user = {
  name: 'Wang',
  age: 20,
  email: 'wang@qq.com'
}

const addUser = async () => {
  const data = new User(user)

  const res = await data.save()

  console.log('res:', res)
}

// 查
const queryUser = async () => {
  const res = await User.find()

  console.log('res:', res)
}

// 改
const updateUser = async () => {
  const res = await User.updateOne({ name: 'Wang' }, { age: 60 })

  console.log('res:', res)
}

// 删
const deleteUser = async () => {
  const res = await User.deleteOne({ name: 'Wang' }, { age: 60 })

  console.log('res:', res)
}

deleteUser()
