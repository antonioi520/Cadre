// Import required modules
import axios from 'axios';

// Import the API location
import { API_LOCATION } from 'Constants';

class ViewsiteService {
  /*
   * HTTP call used to read a Viewsite
   */
  readOneViewsite(requestData) {
    return axios({
      url: '/read_one/viewsites/' + requestData.viewsiteName,
      method: 'get',
      baseURL: API_LOCATION + '/api/v1/'
    });
  }
}

// Export the HTTP service
export default ViewsiteService;
