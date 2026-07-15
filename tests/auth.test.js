const test = require('node:test');
const assert = require('node:assert/strict');
const Module = require('module');

const originalLoad = Module._load;

test('signup returns success payload with created user data', async () => {
  function AuthModel(data) {
    this.data = data;
  }

  AuthModel.findOne = async () => null;
  AuthModel.prototype.save = async function () {
    return { _id: '123', ...this.data };
  };

  Module._load = function (request, parent, isMain) {
    if (request === '../Model/auth_schema') {
      return AuthModel;
    }
    return originalLoad.apply(this, arguments);
  };

  delete require.cache[require.resolve('../Controller/auth')];
  process.env.SECRET_KEY = 'test-secret';

  const { Signup } = require('../Controller/auth');
  const req = {
    body: {
      name: 'Supriti Paul',
      email: 'paulsupriti211@gmail.com',
      password: '1234',
      confirmPassword: '1234',
      role: 'employee'
    }
  };

  const res = {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };

  await Signup(req, res);

  assert.equal(res.statusCode, 201);
  assert.equal(res.body.success, true);
  assert.equal(res.body.email, 'paulsupriti211@gmail.com');
  assert.equal(res.body.role, 'employee');

  Module._load = originalLoad;
});
