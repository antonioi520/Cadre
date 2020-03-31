// Include required modules
import axios from 'axios';

class UserTableService {
  /*
   * HTTP call used to read a User Table
   */
  readOneUserTable(requestData) {
    return axios({
      url: '/read_one/user_tables',
      method: 'post',
      baseURL: 'http://159.203.105.123:3000/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "viewsiteId": requestData.viewsiteId,
        "elementId": requestData.elementId
      }
    });
  }

  /*
   * HTTP call used to read a list of User Tables
   */
  readAllUserTables(requestData) {
    return axios({
      url: '/read_all/user_tables',
      method: 'post',
      baseURL: 'http://159.203.105.123:3000/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "viewsiteId": requestData.viewsiteId,
        "elements": requestData.elements
      }
    });
  }
}

// Export the HTTP service
export default UserTableService;
