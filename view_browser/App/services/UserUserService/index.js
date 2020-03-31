// Include required modules
import axios from 'axios';

// Import the API location
import { API_LOCATION } from 'Constants';

class UserUserService {
  /*
   * HTTP call used to read the active User session
   */
  readOneUserUser(requestData) {
    return axios({
      url: '/read_one/user_users',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId
      }
    });
  }

  /*
   * HTTP call used to create a new User
   */
  createUserUser(requestData) {
    return axios({
      url: '/create/user_users',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId,
        'username': requestData.username,
        'password': requestData.password
      }
    });
  }

  /*
   * HTTP call used to begin a new session
   */
  loginUserUser(requestData) {
    return axios({
      url: '/login/user_users',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId,
        'username': requestData.username,
        'password': requestData.password
      }
    });
  }

  /*
   * HTTP call used to destroy the active session
   */
  logoutUserUser(requestData) {
    return axios({
      url: '/logout/user_users/',
      method: 'get',
      baseURL: API_LOCATION + '/api/v1/'
    });
  }
}

// Export the HTTP service
export default UserUserService;
