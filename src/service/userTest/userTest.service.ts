import { axiosPrivate } from '../../api/interceptors';
import {
  getAllTest, getByIdQuestions, getTestAnswers, getUserUrl,
} from '../../constants/serverPath';
import { IUserAnswer } from '../../store/currentTest/currentTest.interface';
import { ICorrectAnswersToTest, ITest } from '../../types/question.types';
import { IUser } from '../../types/user.types';

const uuid = require('uuid');

export const userTest = {
  async getAll() {
    const response = await axiosPrivate.get<ITest[]>(getAllTest());
    return response;
  },

  async getById(id: string) {
    const response = await axiosPrivate.get<ITest>(getByIdQuestions(id));
    return response;
  },

  async getAnswersToTest(id: string) {
    const response = await axiosPrivate.get<ICorrectAnswersToTest>(getTestAnswers(id));
    return response;
  },

  async saveResultsTest(idUser: string, idTest: string, points: string) {
    const { data: userData } = await axiosPrivate.get<IUser>(getUserUrl(idUser));
    const pointTestIndex = userData.pointTests.findIndex((pTest) => pTest.idTest === idTest);

    if (pointTestIndex !== undefined && pointTestIndex !== -1) {
      userData.pointTests[pointTestIndex].points = Number(points);
    } else {
      userData.pointTests.push({
        idUser,
        idTest,
        points: Number(points),
      });
    }

    const response = await axiosPrivate.put<IUser>(getUserUrl(idUser), userData);

    return response;
  },
};
