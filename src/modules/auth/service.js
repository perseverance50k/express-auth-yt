const bcrypt = require("bcrypt");

const {
  registrationValidationSchema,
  loginValidationSchema,
} = require("./validation");

const { getCollection } = require("../database");

const USERS_COLLECTION = "users";
const SALT_ROUNDS = +process.env.SALT_ROUNDS || 10;

const add = async (credentials) => {
  const collection = getCollection(USERS_COLLECTION);

  const validationResult = registrationValidationSchema.validate(credentials);

  if (validationResult.error) {
    throw new Error("Incorrect credentials provided!");
  }

  const isUserExist = await collection.findOne({ email: credentials.email });

  if (isUserExist) {
    throw new Error("Incorrect credentials provided!");
  }

  const hashedPassword = await bcrypt.hash(credentials.password, SALT_ROUNDS);

  const userWithHashedPassword = {
    ...credentials,
    password: hashedPassword,
  };

  const response = await collection.insertOne(userWithHashedPassword);

  const userWithIdButWithoutPassword = {
    _id: response.insertedId,
    ...credentials,
    password: undefined,
  };

  return userWithIdButWithoutPassword;
};

const verify = async (credentials) => {
  const collection = getCollection(USERS_COLLECTION);

  const validationResult = loginValidationSchema.validate(credentials);

  if (validationResult.error) {
    throw new Error("Incorrect credentials provided!");
  }

  const { email, password } = credentials;
  const user = await collection.findOne({ email });

  if (!user) {
    throw new Error("Incorrect credentials provided!");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw new Error("Error occurred while authenticating a user!");
  }

  delete user.password;
  delete user._id;

  return user;
};

module.exports = {
  add,
  verify,
};
