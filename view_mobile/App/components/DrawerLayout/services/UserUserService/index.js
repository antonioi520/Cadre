// Include required modules
import axios from 'axios';

class UserUserService {
  /*
   * HTTP call used to read the active User session
   */
  readOneUserUser(requestData) {
    return axios({
      url: '/read_one/user_users',
      method: 'post',
      baseURL: 'http://159.203.105.123:3000/api/v1/',
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
      baseURL: 'http://159.203.105.123:3000/api/v1/',
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
      baseURL: 'http://159.203.105.123:3000/api/v1/',
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
      baseURL: 'http://159.203.105.123:3000/api/v1/'
    });
  }
}

// Export the HTTP service
export default UserUserService;
