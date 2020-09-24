const User = require('../models/authModel.js')
const expressJwt = require('express-jwt')
const _ = require('lodash')
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//coustom error handler to get usefull error from database error
const { errorHandler } = require('../helpers/dbErrorHandling.js')

//email sent
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.MAIL_KEY);


// register and send activation mail
exports.registerController = (req, res) => {

    const {
        name,
        email,
        password
    } = req.body
    const errors = validationResult(req)

    //validation to req.body
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError
        })
    } else {
        User.findOne({
            email
        }).exec((err, user) => {

            //if user exists
            if (user) {
                return res.status(400).json({
                    errors: 'email is taken'
                })
            }
        })

        //Generate token 
        const token = jwt.sign({
                name,
                email,
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION, {
                expiresIn: '1d'
            }
        )

        const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Account activation link',
            html: `
                      <h1>Please use the following to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                      <hr />
                      <p>This email may containe sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `
        };

        sgMail
            .send(emailData)
            .then(sent => {
                return res.json({
                    message: `Email has been sent to ${email} Please activate the account`
                });
            })
            .catch(err => {
                return res.status(400).json({
                    success: false,
                    errors: errorHandler(err)
                });
            });

    }





}

//activation and save to database
exports.activationController = (req, res) => {

    const {
        token
    } = req.body;

    if (token) {

        //verify token valid or not, expires or not
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
            if (err) {
                console.log('Activation error');
                return res.status(401).json({
                    errors: 'Expired link. Please Signup again'
                });
            } else {
                //if valid save to database and get data from token
                const {
                    name,
                    email,
                    password
                } = jwt.decode(token);

                console.log(email);
                const user = new User({
                    name,
                    email,
                    password
                });

                user.save((err, user) => {
                    if (err) {
                        console.log('Save error', errorHandler(err));
                        return res.status(401).json({
                            errors: errorHandler(err)
                        });
                    } else {
                        return res.json({
                            success: true,
                            message: user,
                            message: 'Signup done'
                        });
                    }
                });
            }
        });
    } else {
        return res.json({
            message: 'error happening please try again' + err
        });
    }
}

//login 
exports.signinController = (req, res) => {

    const { email, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      })

    } else {

      // check if user exist
      User.findOne({
        email
      }).exec((err, user) => {
        if (err || !user) {
          return res.status(400).json({
            errors: 'email does not exist. Please signup'
          });
        }

        // authenticate
        if (!user.authenticate(password)) {
          return res.status(400).json({
            errors: 'Incorrect password'
          });
        }

        // generate a token
        const token = jwt.sign(
          {
            _id: user._id
          },
          process.env.JWT_SECRET,
          {
            expiresIn: '7d'
          }
        );

        const { _id, name, email, role } = user;
  
        return res.json({
          token,
          user: {
            _id,
            name,
            email,
            role
          }
        })
      })
    }
  }


  exports.forgotPasswordController = (req, res) => {
    const { email } = req.body;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {

    //find if user exists
      User.findOne(
        {
          email
        },
        (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: 'User with that email does not exist'
            });
          }
          
          //if exist generate token and valid for 15 min
          const token = jwt.sign(
            {
              _id: user._id
            },
            process.env.JWT_RESET_PASSWORD,
            {
              expiresIn: '15m'
            }
          );
            
          //sent email with this token
          const emailData = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Password Reset link`,
            html: `
                      <h1>Please use the following link to reset your password</h1>
                      <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
                      <hr />
                      <p>This email may contain sensetive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `
          };
  
          return user.updateOne(
            {
              resetPasswordLink: token
            },
            (err, success) => {
              if (err) {
                console.log('RESET PASSWORD LINK ERROR', err);
                return res.status(400).json({
                  error:
                    'Database connection error on user password forgot request'
                });
              } else {
                sgMail
                  .send(emailData)
                  .then(sent => {
                    // console.log('SIGNUP EMAIL SENT', sent)
                    return res.json({
                      message: `Email has been sent to ${email}. Follow the instruction to activate your account`
                    });
                  })
                  .catch(err => {
                    // console.log('SIGNUP EMAIL SENT ERROR', err)
                    return res.json({
                      message: err.message
                    });
                  });
              }
            }
          );
        }
      );
    }
  };
  
  exports.resetPasswordController = (req, res) => {
    const { resetPasswordLink, newPassword } = req.body;
  
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError
      });
    } else {
      if (resetPasswordLink) {
        jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, function(
          err,
          decoded
        ) {
          if (err) {
            return res.status(400).json({
              error: 'Expired link. Try again'
            });
          }
  
          User.findOne(
            {
              resetPasswordLink
            },
            (err, user) => {
              if (err || !user) {
                return res.status(400).json({
                  error: 'Something went wrong. Try later'
                });
              }
  
              const updatedFields = {
                password: newPassword,
                resetPasswordLink: ''
              };
  
              user = _.extend(user, updatedFields);
  
              user.save((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: 'Error resetting user password'
                  });
                }
                res.json({
                  message: `reset password sucessfully`
                });
              });
            }
          );
        });
      }
    }
  };


 