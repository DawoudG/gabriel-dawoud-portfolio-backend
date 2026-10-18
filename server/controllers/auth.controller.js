
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '../../config/config.js'

const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })

    if (!user || !await bcrypt.compare(password, user.hashed_password)) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { _id: user._id.toString() },
      config.jwtSecret,
      { expiresIn: '1h' }
    )

    return res.json({
      message: 'Successfully signed in!',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (err) {
    return res.status(500).json({ error: 'Sign in failed' })
  }
}

const signout = (req, res) => {
  res.json({ message: 'Successfully signed out!' })
}

const requireSignin = (req, res, next) => {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' })
  }

  try {
    const token = header.substring(7)
    req.auth = jwt.verify(token, config.jwtSecret)
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

const hasAuthorization = (req, res, next) => {
  if (req.profile._id.toString() !== req.auth._id) {
    return res.status(403).json({ error: 'Not authorized' })
  }
  next()
}

const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id)

    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        error: 'Administrator access required'
      })
    }

    next()
  } catch (err) {
    return res.status(500).json({
      error: 'Authorization failed'
    })
  }
}

export default { signin, signout, requireSignin, hasAuthorization, requireAdmin }
