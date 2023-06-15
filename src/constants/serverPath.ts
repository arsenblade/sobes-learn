export const API_URL = 'https://sobes-learn-back.onrender.com';

export const getLoginUrl = () => '/login';
export const getRegisterUrl = () => '/users';
export const getUsersUrl = () => '/users';
export const getUserUrl = (id: string) => `/users/${id}`;
export const getAllTopics = () => '/topicsOfStudy';
export const getByIdTopic = (id: string) => `/topicsOfStudy/${id}`;
export const getAllComments = () => '/allComments';
export const getCommentsByTopicId = (id: string) => `/allComments/${id}`;
export const getRankById = (id: string) => `/commentsRank/${id}`;
export const getAllRanks = () => '/commentsRank';
export const getByIdQuestions = (id: string) => `/allTests/${id}`;
export const getAllTest = () => '/allTests';
export const getTestAnswers = (id: string) => `/answersToTests/${id}`;
