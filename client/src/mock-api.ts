import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import bots from "../../data/bots.json";
import workers from "../../data/workers.json";
import logs from "../../data/logs.json";

const axiosInstance = axios.create({ baseURL: "http://servisbot.com/api" });
const mock = new MockAdapter(axiosInstance, {
  onNoMatch: "passthrough",
  delayResponse: 300,
});

//GET /bots
mock.onGet("/bots").reply(200, {
  bots,
});

//GET /bots/:botId/workers
mock.onGet(/\/bots\/[\w-]+\/workers$/).reply((config) => {
  const { url } = config;
  const id = url?.match(/\/bots\/([\w-]+)\/workers/)?.[1];
  const workerData = workers.filter((w) => w.bot === id);
  return [200, workerData];
});

//GET /bots/:botId/logs
mock.onGet(/\/bots\/[\w-]+\/logs/).reply((config) => {
  const { url } = config;
  const id = url?.match(/\/bots\/([\w-]+)\/logs/)?.[1];
  const logData = logs.filter((log) => log.bot === id);
  return [200, logData];
});

//GET /bots/:botId/workers/:workerId/logs
mock.onGet(/\/bots\/[\w-]+\/workers\/[\w-]+\/logs/).reply((config) => {
  const { url } = config;
  const match = url?.match(/\/bots\/([\w-]+)\/workers\/([\w-]+)\/logs/);
  const logData = logs.filter(
    (log) => log.bot === match?.[1] && log.worker === match?.[2]
  );
  return [200, logData];
});

export default axiosInstance;
