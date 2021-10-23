const { CollectionsEnum } = require('../enums/CollectionsEnum')
const { validationMessage } = require('../../lib/database')
const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, validationMessage('nome')]
  },
  email: {
    type: String,
    unique: true,
    required: [true, validationMessage('email')]
  }
}, {
  timestamps: true
})

const User = mongoose.model(CollectionsEnum.Users, UserSchema, CollectionsEnum.Users)

module.exports = {
  User
}
