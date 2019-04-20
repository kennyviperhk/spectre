let { UserModel } = require('./user-model');

exports.list = function (req, res) {

  UserModel.getAll(function (err, users) {
    if (err) return error(res, err);
    res.status(200).send(users);
  });
};

exports.similar = function (req, res) {

  if (!req.params.hasOwnProperty('uid')) {
    return error(res, 'UserId required');
  }
  UserModel.findById(req.params.uid, function (err, user) {
    if (err) return error(res, 'Unable to find user #' + req.params.uid);
    user.findByOcean(res, 1, (users) => res.status(200).send(users));
  });
};

exports.create = function (req, res) {

  if (!req.body.loginType) return error
    (res, "Bad UserModel: no loginType");

  if (!req.body.login) return error
    (res, "Bad UserModel: no login");

  let user = new UserModel();
  Object.assign(user, req.body);

  user.save(function (err) {
    if (err) return error(res, err);
    res.status(200).send(user);
  });
};

exports.view = function (req, res) {

  UserModel.findById(req.params.uid, function (err, user) {
    if (err) return error
      (res, 'Unable to find user #' + req.params.uid);
    res.status(200).send(user);
  });
};

exports.update = function (req, res) {

  UserModel.findById(req.params.uid, function (err, user) {
    if (err) return error
      (res, 'Unable to update user #' + req.params.uid);
    Object.assign(user, req.params).save((err, user) => {
      if (err) return error
        (res, 'Unable to save user #' + req.params.uid);
      res.status(200).send(user);
    });
  });
};

exports.delete = function (req, res) {

  UserModel.remove({ _id: req.params.uid }, function (err, user) {
    if (err) return error(res, 'Unable to delete user #' + req.params.uid);
    res.status(200).send(req.params.uid);
  });
};

function error(res, err, code) {
  code = (typeof code !== 'undefined') ? code : 400;
  res.status(code).send({ error: err });
}
