const UserModel = require('../models/user');
const hashService = require('../utils/hashService');
const logger = require('../utils/logService');

const STATUS_CODE = require('../constants/httpStatus');



/**
 * This callback runs to transfer request to next middleware if needed.
 * @callback RequestCallbackNext
 */

/**
 * Controller to handle the registration of user.
 * @param {Request} req 
 * @param {Response} res 
 * @param {RequestCallbackNext} next 
 */
exports.register = (req,res,next)=>{
  const userObject = {
    username: req.body.username,
    password: req.body.password
  };
  logger.info('User Object received from request ');
  UserModel.findOne({ where:{ username: userObject['username']} })
    .then(user=>{
      logger.info('Email Search in DB during registration');
      if(user !== null && user !== undefined){
        res.status(STATUS_CODE.DUPLICATE_RESOURCE).json({ success: false, duplicateUsername: true });
        return;
      }
      hashService.generateHash(userObject['password'])
        .then(hashedPassword=>{
          // console.log(hashedPassword);
          logger.info('User Password hash generated ');
          userObject['password'] = hashedPassword;
          return UserModel.create(userObject);
        })
        .then(dbRes=>{
          // console.log('DB Res ->',dbRes);
          logger.info('DB Res after saving user details ');
          res.status(STATUS_CODE.CREATED).json({
            success: true
          });
        });
    })
    .catch(dbErr=>{
      // console.log('DB err ->',dbErr);
      logger.error('Database Error ',dbErr);
      res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        success: false
      });
    });
}

/**
 * Controller to handle the login of user.
 * @param {Request} req 
 * @param {Response} res 
 * @param {RequestCallbackNext} next 
 */
// exports.login = (req,res,next)=>{
//   const userObject = {
//     username: req.body.username,
//     password: req.body.password,
//   };

//   UserModel.findOne({ where: {username: userObject['username']}})
//     .then(user=>{
//       if(user === null || user === undefined){
//         res.status(STATUS_CODE.RESOURCE_NOT_FOUND).json({
//           success: false,
//           authToken: null,
//         });
//         return;
//       }
//       user = user['dataValues'];
//       // console.log(user,user['dataValues']);
//       hashService.comparePasswordHash(userObject['password'],user)
//     })
//     .catch(dbErr=>{
//       console.log(dbErr);
//       res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
//         success: false,
//         authToken: null,
//       });
//     });
// }
