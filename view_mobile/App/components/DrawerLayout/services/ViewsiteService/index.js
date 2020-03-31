// Import required modules
import axios from 'axios';

class ViewsiteService {
  /*
   * HTTP call used to read a Viewsite
   */
  readOneViewsite(requestData) {
    return axios({
      url: '/read_one/viewsites/' + requestData.viewsiteName,
      method: 'get',
      baseURL: 'http://159.203.105.123:3000/api/v1/'
    });
  }
}

// Export the HTTP service
export default ViewsiteService;
