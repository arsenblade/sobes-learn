import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { topicService } from '../../../../service/topics/topics.service';
import { userService } from '../../../../service/user/user.service';
import { ITopic } from '../../../../types/topic.types';
import { IStatUser, IUser } from '../../../../types/user.types';
import { getAdminAverageScore } from '../../../../utils/getAdminAverageScore';
import { getCourseGraduates } from '../../../../utils/getCourseGraduates';
import { getPercentTopicCovered } from '../../../../utils/getPercentTopicCovered';
import StatisticsTable from '../../../ui/StatisticsTable/StatisticsTable';
import styles from './AdminStatistics.module.scss';
import {userTest} from '../../../../service/userTest/userTest.service';
import {ITest} from '../../../../types/question.types';

const adminAnimation = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const statsGraphAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const AdminStatistics = () => {
  const [averageUsersScores, setAverageUsersScores] = useState<IStatUser[]>([]);
  const [countCoveredTopic, setCountCoveredTopic] = useState<IStatUser[]>([]);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [allTopics, setAllTopics] = useState<ITopic[]>([]);
  const [allTest, setAllTest] = useState<ITest[]>([]);

  useEffect(() => {
    getAllUsers();
    getAllTopics();
    getAllTests();
  }, []);

  useEffect(() => {
    if (allTopics.length > 0 && allUsers.length > 0 && allTest.length > 0) {
      setAverageUsersScores(getAdminAverageScore(allUsers, allTopics, allTest));
      setCountCoveredTopic(getPercentTopicCovered(allUsers, allTopics));
    }
  }, [allUsers, allTopics, allTest]);

  async function getAllUsers() {
    const { data: userData } = await userService.getAll();
    setAllUsers(userData);
  }

  async function getAllTopics() {
    const { data: topicData } = await topicService.getAll();
    setAllTopics(topicData);
  }

  const getAllTests = async () => {
    const { data: allTest } = await userTest.getAll();
    setAllTest(allTest);
  };

  return (
    <div className={styles.adminStatistics}>
      <div className={styles.containerGraphs}>
        <div className={styles.graph}>
          <motion.h2
            className={styles.title}
            variants={statsGraphAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
          >
            Средние баллы пользователей за&nbsp;каждую&nbsp;тему
          </motion.h2>
          <StatisticsTable data={averageUsersScores} color="pink" percent />
        </div>
        <div className={styles.graph}>
          <motion.h2
            className={styles.title}
            variants={statsGraphAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
          >
            Процент пользователей закончивших&nbsp;темы
          </motion.h2>
          <StatisticsTable data={countCoveredTopic} color="violet" percent />
        </div>
      </div>
      <div className={styles.containerStats}>
        <motion.div
          className={styles.filledTests}
          variants={adminAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
        >
          <h2>Количество пользователей</h2>
          <h3>{allUsers.length}</h3>
        </motion.div>
        <motion.div
          className={styles.averageScore}
          variants={adminAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
        >
          <h2>Пользователи окончившие курс</h2>
          <h3>{getCourseGraduates(allUsers, allTopics)}</h3>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminStatistics;
