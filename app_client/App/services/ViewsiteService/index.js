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

  /*
   * HTTP call used to read top-level informatin on all Viewsite a User owns
   */
  readAllViewsites(requestData) {
    return axios({
      url: '/read_all/viewsites',
      method: 'get',
      baseURL: API_LOCATION + '/api/v1/'
    });
  }

  /*
   * HTTP call used to create a Viewsite
   */
  createViewsite(requestData) {
    return axios({
      url: '/create/viewsites',
      method: 'post',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteName': requestData.viewsiteName,
        'viewsiteTheme': requestData.viewsiteTheme,
        'loginEnabled': requestData.loginEnabled
      }
    });
  }

  /*
   * HTTP call used to update a Viewsite
   */
  updateViewsite(requestData) {
    return axios({
      url: '/update/viewsites',
      method: 'put',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId,
        'viewsiteName': requestData.viewsiteName,
        'viewsiteTheme': requestData.viewsiteTheme,
        'loginEnabled': requestData.loginEnabled
      }
    });
  }

  /*
   * HTTP call used to delete a Viewsite
   */
  deleteViewsite(requestData) {
    return axios({
      url: '/delete/viewsites',
      method: 'delete',
      baseURL: API_LOCATION + '/api/v1/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        'viewsiteId': requestData.viewsiteId
      }
    });
  }
}

// Export the HTTP service
export default ViewsiteService;
