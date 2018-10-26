import * as mongoose from 'mongoose'

export const setUpDb = () => {
  mongoose.connect('mongodb://localhost:27017/isTheCricketOn')

  mongoose.connection.on('error', () => {
    console.log( 'MongoDB failed to connect')
  })

  mongoose.connection.once('open', () => {
    console.log( 'MongoDB connected')
  })
}
