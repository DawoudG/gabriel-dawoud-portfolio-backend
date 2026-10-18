
import User from '../models/user.model.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    return res.status(201).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email created updated')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({
        error: "User not found"
      })
    }
    req.profile = user
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user"
    })
  }
}

const read = (req, res) => {
  const user = req.profile.toObject()
  delete user.hashed_password
  delete user.salt
  return res.json(user)
}

const update = async (req, res) => {
  try {
    const user = req.profile

    if (req.body.name !== undefined) {
      user.name = req.body.name
    }

    if (req.body.email !== undefined) {
      user.email = req.body.email
    }

    if (req.body.password) {
      user.password = req.body.password
    }

    user.updated = Date.now()
    await user.save()

    const updatedUser = user.toObject()
    delete updatedUser.hashed_password
    delete updatedUser.salt

    res.json(updatedUser)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    await req.profile.deleteOne()
    res.json({
      message: "User deleted successfully!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeAll = async (req, res) => {
  try {
    await User.deleteMany({})
    res.json({
      message: "All users deleted successfully!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { create, list, userByID, read, update, remove, removeAll }
