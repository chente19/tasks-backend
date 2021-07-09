import jwt from 'jsonwebtoken';
import models from './../models';


async function refreshToken(token) {
  let refresh_user_number = null;
  try {
    const { user_number } = await jwt.decode(token);
    refresh_user_number = user_number;
  } catch (e) {
    return false;
  }
  const aUser = await models.TheUser.findOne({ user_number: refresh_user_number, user_state: 1 });
  if (aUser) {
    const token = jwt.sign({ user_number: refresh_user_number }, 'YOURSECRETKEY', { expiresIn: '1d' });
    return { token, user_role: aUser.user_role };
  } else {
    return false
  }
}

export default {
  encode: async (role, a_number) => {
    const token = jwt.sign({ user_role: role, user_number:a_number }, 'YOURSECRETKEY', { expiresIn: '1d' });
    return token;
  },
  decode: async (token) => {
    try {
      const { user_number } = await jwt.verify(token, 'YOURSECRETKEY');
      const user = await models.TheUser.findOne({ user_number, user_state: 1 });
      if (user) {
        return user;
      } else {
        return false;
      }

    } catch (e) {
      const newToken = await refreshToken(token);
      return newToken;
    }
  }
} 