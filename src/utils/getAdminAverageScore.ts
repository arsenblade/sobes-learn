import { ITopic } from '../types/topic.types';
import { IPointTest, IStatUser, IUser } from '../types/user.types';
import {ITest} from '../types/question.types';

export const getAdminAverageScore = (allUsers: IUser[], allTopics: ITopic[], allTest: ITest[]) => {
  const sortAllTopics = allTopics.sort((a, b) => a.numberTopic - b.numberTopic);
  const dictionaryTopics = new Map();
  sortAllTopics.forEach((topic) => {
    dictionaryTopics.set(topic.relatedQuestionsId, { idTest: topic.relatedQuestionsId, points: 0, isFilled: false, count: 0 });
  });

  allUsers.forEach((user) => {
    user.pointTests.forEach((pointTest) => {
      const points = dictionaryTopics.get(pointTest.idTest).points + pointTest.points;
      dictionaryTopics.set(pointTest.idTest, { idTest: pointTest.idTest, points, isFilled: true, count: dictionaryTopics.get(pointTest.idTest).count + 1 });
    });
  });
  const resultArray:IStatUser[] = [];

  dictionaryTopics.forEach((pointsTopic) => {
    const currentTest = allTest.find((test) => test.id === pointsTopic.idTest);

    if (currentTest) {
      resultArray.push({ isFilled: pointsTopic.isFilled, value: Math.floor(((pointsTopic.points / pointsTopic.count) / currentTest.questions.length) * 100) });
    }
  });

  return resultArray;
};
