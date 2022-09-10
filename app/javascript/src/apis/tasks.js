import axios from "axios";

const list = () => axios.get("/tasks");

const tasksApis = { list };

export default tasksApis;
