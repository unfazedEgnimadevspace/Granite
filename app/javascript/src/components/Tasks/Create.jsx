import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { useHistory } from "react-router-dom";

import tasksApi from "apis/tasks";
import usersApi from "apis/users";
import Container from "components/Container";
import PageLoader from "components/PageLoader";

import Form from "./Form";

const Create = () => {
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const history = useHistory();
  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      await tasksApi.create({ title, assigned_user_id: userId });
      setLoading(false);
      history.push("/");
    } catch (error) {
      Logger.error(error);
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const {
        data: { users },
      } = await usersApi.list();
      setUsers(users);
      setUserId(users[0].id);
      setPageLoading(false);
    } catch (error) {
      Logger.error(error);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <Container>
      <Form
        assignedUser={users[0]}
        handleSubmit={handleSubmit}
        loading={loading}
        setTitle={setTitle}
        setUserId={setUserId}
        users={users}
      />
    </Container>
  );
};

export default Create;
