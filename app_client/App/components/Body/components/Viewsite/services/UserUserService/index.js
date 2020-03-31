// Include required modules
import axios from 'axios';

// Import the API location
import { API_LOCATION } from 'Constants';

class UserUserService {

  /*
   * HTTP call used to read all User's Users
   */
  readAllUserUsers(requestData) {
    return axios({
      url: '/read_all/user_users',
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
   * HTTP call used to update an existing User
   */
  updateUserUser(requestData) {
    return axios({
      url: '/update/user_users',
      method: 'put',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId,
        'username': requestData.username,
        'permissionLevel': requestData.permissionLevel
      }
    });
  }

  /*
   * HTTP call used to delete an existing User
   */
  deleteUserUser(requestData) {
    return axios({
      url: '/delete/user_users',
      method: 'delete',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId,
        'username': requestData.username
      }
    });
  }

}

// Export the HTTP service
export default UserUserService;
