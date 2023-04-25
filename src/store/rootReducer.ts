import { combineReducers } from 'redux';
import { reducer as authReducer } from './auth/auth.slice';
import { reducer as currentTestReducer } from './currentTest/currentTest.slice';
// import { reducer as adminCreateTest } from './adminCreateTest/adminCreateTest.slice';
import { reducer as authModalReducer } from './authModal/authModal.slice';
import { reducer as commentsReducer } from './comments/comments.slice';
import { reducer as userReducer } from './user/user.slice';

export const rootReducers = combineReducers({
  auth: authReducer,
  currentTest: currentTestReducer,
  // adminCreateTest,
  authModal: authModalReducer,
  comments: commentsReducer,
  user: userReducer,
});
