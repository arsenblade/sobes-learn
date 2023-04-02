import * as authActions from './auth/auth.actions';
import { currentTestSlice } from './currentTest/currentTest.slice';
import * as currentTestAction from './currentTest/currentTest.action';
import * as commentsActions from './comments/comments.action';
// import { createTestSlice } from './adminCreateTest/adminCreateTest.slice';
import { authModalSlice } from './authModal/authModal.slice';
import { commentsSlice } from './comments/comments.slice';

export const allActions = {
  ...authActions,
  ...currentTestAction,
  ...commentsActions,
  ...currentTestSlice.actions,
  // ...createTestSlice.actions,
  ...authModalSlice.actions,
  ...commentsSlice.actions,
};
// тута нада
