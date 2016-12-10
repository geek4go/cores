import fetch from 'dva/fetch';
import configs from '../configs.js';

import { message, Spin, notification } from 'antd';

const openNotificationWithIcon = (type, title, description) => (
  notification[type]({
    message: title,
    description: description,
  })
);

const initApplication = function (props){

  var applicationId = props.params.id,
  url = configs.baseURL + "applications/" + applicationId;
  console.log("===============initApplication===========");
	console.log(applicationId);
	console.log("===============initApplication different===========");
	if(applicationId != null && applicationId != undefined) {

		fetch(url).then(function(response){
			if (response.status >= 200 && response.status < 300) {
		    return response;
		  }
		  const error = new Error(response.statusText);
		  error.response = response;
		  openNotificationWithIcon('error', '出错了: ' + response.status, response.statusText);
		  throw error;
		})
    .then(function(response){
			return response.json();
		})
    .then(function(data){

			console.log(data);
			if(data.code == 200 || data.code == 1) {
		    if(data.message != null) {
		      message.success(data.message);
		    }
		  }else {
		    if(typeof data.length == 'number') {
		      return data;
		    }
		    openNotificationWithIcon('error', data.message, data.fields);
		  }
			var application = data.fields;
			localStorage.dir = localStorage.user + '/' + application.name + '_' + localStorage.userName + "/";
			localStorage.currentProject = application.name;
			localStorage.port = application.port;
			localStorage.sshPort = application.sshPort;
			localStorage.socketPort = application.socketPort;
			localStorage.domain = application.domain;
      localStorage.image = application.image;
			localStorage.currentFolder = localStorage.user + '/' + application.name + '_' + localStorage.userName;
      localStorage.applicationId = application.id;


			props.dispatch({
				type: 'file/fetchFileList'
			});
      props.dispatch({
        type: 'file/initFiles',
      });
      props.dispatch({
    		type: 'UIState/readConfig',
    		payload: {
    			id: application.id
    		}
    	});
      props.dispatch({
        type: 'devpanel/getConfig',
        payload: { id : applicationId }
      });

			props.dispatch({
				type: 'devpanel/handleImages',
				payload: { id : application.image}
			});
      props.dispatch({
        type: 'devpanel/startDocker',
        payload: { id: application.id}
      });
      props.dispatch({
        type: 'devpanel/openTerminal',
        payload: { id:  application.docker}
      });
      props.dispatch({
          type: 'sidebar/hideModalSwitchApp'
      });
		});
  }
	return true;

}
export default initApplication;
