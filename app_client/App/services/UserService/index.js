// Include required modules
import axios from 'axios';

// Import the API location
import { API_LOCATION } from 'Constants';

class UserService {
  /*
   * HTTP call used to read the active User session
   */
  readOneUser(requestData) {
    return axios({
      url: '/read_one/users',
      method: 'get',
      baseURL: API_LOCATION + '/api/v1/'
    });
  }

  /*
   * HTTP call used to create a new User
   */
  createUser(requestData) {
    return axios({
      url: '/create/users',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'username': requestData.username,
        'password': requestData.password
      }
    });
  }

  /*
   * HTTP call used to update an existing User
   */
  updateUser(requestData) {
    return axios({
      url: '/update/users',
      method: 'put',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'username': requestData.username,
        'password': requestData.password
      }
    });
  }

  /*
   * HTTP call used to delete an existing User
   */
  deleteUser(requestData) {
    return axios({
      url: '/delete/users',
      method: 'delete',
      baseURL: API_LOCATION + '/api/v1/',
    });
  }

  /*
   * HTTP call used to begin a new session
   */
  loginUser(requestData) {
    return axios({
      url: '/login/users',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'username': requestData.username,
        'password': requestData.password
      }
    });
  }

  /*
   * HTTP call used to destroy the active session
   */
  logoutUser(requestData) {
    return axios({
      url: '/logout/users/',
      method: 'get',
      baseURL: API_LOCATION + '/api/v1/'
    });
  }
}

// Export the HTTP service
export default UserService;
