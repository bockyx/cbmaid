// Mongoose connection

// Imports
import Mongoose from 'mongoose';

export default class MongoConnection {
  public init() {
    // Mongoose options
    const dbOptions: Mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };

    // Server url
    Mongoose.connect('mongodb://localhost/cb', dbOptions);
    Mongoose.set('useFindAndModify', false);
    Mongoose.Promise = global.Promise;

    /* #region ConnectionHandler  */
    Mongoose.connection.on('connected', () => {
      console.log('Mongoose has successfully connected!');
    });

    Mongoose.connection.on('err', (err) => {
      console.error(`Mongoose connection error: \n${err.stack}`);
    });

    Mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose connection lost');
    });
    /* #endregion */
  }
}
