
import Contact from '../models/contact.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
  const contact = new Contact(req.body)
  try {
    await contact.save()
    return res.status(201).json({
      message: "Successfully created!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const contactByID = async (req, res, next, id) => {
  try {
    const contact = await Contact.findById(id)
    if (!contact) {
      return res.status(404).json({
        error: "Contact not found"
      })
    }
    req.contact = contact
    next()
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve contact"
    })
  }
}

const read = (req, res) => {
  return res.json(req.contact)
}

const update = async (req, res) => {
  try {
    let contact = req.contact
    contact = extend(contact, req.body)
    await contact.save()
    res.json(contact)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    await req.contact.deleteOne()
    res.json({ message: "Contact deleted successfully!" })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeAll = async (req, res) => {
  try {
    await Contact.deleteMany({})
    res.json({ message: "All contacts deleted successfully!" })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { create, contactByID, read, list, remove, removeAll, update }
