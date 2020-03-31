// Include required modules
import axios from 'axios';

// Include required modules
import { API_LOCATION } from 'Constants';

class UserTableService {
  /*
   * HTTP call used to create User Records
   */
  readOneUserTable(requestData) {
    return axios({
      url: '/read_one/user_tables',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "viewsiteId": requestData.viewsiteId,
        "elementId": requestData.elementId
      }
    });
  }
}

// Export the HTTP service
export default UserTableService;
