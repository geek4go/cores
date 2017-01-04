const initApplication = function (application, props){

    if(localStorage.applicationId == application.id){
        window.reload = false;
    }else{
        window.reload = true;
    }
    if(location.hash.indexOf('project') == -1) {
        return false;
    }

    if(application.image == 'wechat:latest'){
        localStorage.image = application.image;
        localStorage.currentProject = application.name;

        props.dispatch({
          type: 'sidebar/hideModalSwitchApp'
        });

        props.dispatch({
          type: 'sidebar/setActiveMenu',
          payload: 'controllers'
        });

        props.dispatch({
          type: 'rightbar/setActiveMenu',
          payload: 'attr'
        });

        window.isWeapp = true;
    }else{
        window.isWeapp = false;
        props.dispatch({
            type: 'devpanel/showLoading',
            payload: {
              tips: '打开应用中...'
            }
        });

        localStorage.dir = localStorage.user + '/' + application.docker.replace('gospel_project_', '') + "/";
        localStorage.currentFolder = localStorage.user + '/' + application.name + '_' + localStorage.userName;
        localStorage.baseURL = 'http://' + ( localStorage.host ) + ':9999/';
        localStorage.sshKey = application.sshKey;
        localStorage.exposePort = application.exposePort;

        props.dispatch({
            type: 'devpanel/initPanel'
        });
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
          type: 'sidebar/hideModalSwitchApp'
        });
        props.dispatch({
            type: 'devpanel/startDocker',
            payload: { docker:  application.docker, id: application.id}
        });
        props.dispatch({
            type: 'devpanel/handleImages',
            payload: { id: application.image}
        });
        if(localStorage.UIState != null && localStorage.UIState != undefined){

        var UIState = JSON.parse(localStorage.UIState);
        // props.dispatch({
        //     type: 'sidebar/initState',
        //     payload: { UIState: UIState.UIState.sidebar }
        // });
        props.dispatch({
          type: 'devpanel/getConfig',
          payload: { id : application.id, UIState: UIState.UIState.devpanel}
        });
        // props.dispatch({
        //     type: 'rightbar/initState',
        //     payload: { UIState: UIState.UIState.rightbar }
        // });
        // props.dispatch({
        //     type: 'designer/initState',
        //     payload: { UIState: UIState.UIState.designer }
        // });
        }else{
        props.dispatch({
          type: 'devpanel/getConfig',
          payload: { id : application.id}
        });
        }

        localStorage.currentProject = application.name;
        localStorage.port = application.port;
        localStorage.sshPort = application.sshPort;
        localStorage.socketPort = application.socketPort;
        localStorage.domain = application.domain;
        localStorage.image = application.image;
        localStorage.docker = application.docker;
        localStorage.applicationId = application.id;
        var command = JSON.parse(application.cmds);

        props.dispatch({
            type: 'devpanel/hideLoading'
        });

        if(command) {
            //初始化命令
            props.dispatch({
              type: 'sidebar/initRunCommond',
              payload: { command: command.default, port: application.exposePort}
            });

        }

    }

}

export default initApplication;
