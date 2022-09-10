import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { isNil, isEmpty, either } from "ramda";

import tasksApis from "apis/tasks";
import Container from "components/Container";
import PageLoader from "components/PageLoader";
import Table from "components/Tasks/Table";

const DashBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const {
        data: { tasks },
      } = await tasksApis.list();
      setTasks(tasks);
      setLoading(false);
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  if (either(isNil, isEmpty)(tasks)) {
    return (
      <Container>
        <h1 className="text-center text-xl leading-5">
          You have no tasks assigned 😥
        </h1>
      </Container>
    );
  }

  return (
    <Container>
      <Table data={tasks} />
    </Container>
  );
};

export default DashBoard;
