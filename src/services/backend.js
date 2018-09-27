import axios from 'axios';
import qs from 'qs';

const backend = axios.create();
const baseURL = process.env.API;
const masterKey = '6qzYQ9IdV7x9DCjslzeUVGykztQdTjEq';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';

console.log(`API: ${baseURL}`);

const auth = auth => {
  return new Promise((resolve, reject) => {
    var masterToken = qs.stringify({ access_token: masterKey });
    backend
      .post(`${baseURL}/auth`, masterToken, {
        auth: auth,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const post = (url, data, token) => {
  if (!token) {
    token = masterKey;
  }
  data.access_token = token;
  var qsToken = qs.stringify(data);

  return new Promise((resolve, reject) => {
    backend
      .post(`${baseURL}/${url}`, qsToken, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const put = (url, data, token) => {
  if (!token) {
    token = masterKey;
  }
  data.access_token = token;
  var qsToken = qs.stringify(data);

  return new Promise((resolve, reject) => {
    backend
      .put(`${baseURL}/${url}`, qsToken, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const del = (url, id, token) => {
  if (!token) {
    token = masterKey;
  }
  data.access_token = token;
  var qsToken = qs.stringify(data);

  return new Promise((resolve, reject) => {
    backend
      .delete(`${baseURL}/${url}/${id}`, qsToken, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const get = url => {
  return new Promise((resolve, reject) => {
    backend
      .get(`${baseURL}/${url}`)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const BackendClass = {
  auth: auth,
  post: post,
  put: put,
  del: del,
  get: get
};

export default BackendClass;
