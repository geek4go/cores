import React , {PropTypes} from 'react';
import { message, notification } from 'antd';
import request from './request'

const initApplication = function (application, props){

    if(localStorage.applicationId == application.id){
        window.reload = false;
    }else{
        window.reload = true;
    }
    if(location.hash.indexOf('project') == -1) {
        return false;
    }

    console.log(application);
    if(application.image == 'wechat:latest'){

        localStorage.image = application.image;
        localStorage.currentProject = application.name;
        localStorage.applicationId = application.id;

        props.dispatch({
            type: 'devpanel/handleImages',
            payload: { id: application.image }
        });
        props.dispatch({
          type: 'sidebar/hideModalSwitchApp'
        });
        props.dispatch({
          type: 'sidebar/setActiveMenu',
          payload: 'controllers'
        });

        localStorage.activeMenu = 'attr';

        var title = (
                <span>
                    <i className="fa fa-weixin"></i> Gospel 小程序 UI 设计器
                </span>
            ),

            type = 'designer';

        props.dispatch({
            type: 'devpanel/add',
            payload: {title, type}
        });

        props.dispatch({
            type: 'UIState/readConfig',
            payload: {
                id: application.id
            }
        });

        if(localStorage.UIState != '' && localStorage.UIState != null && localStorage.UIState != undefined && window.reload == false){

            var UIState = JSON.parse(localStorage.UIState);
            props.dispatch({
                type: 'designer/initState',
                payload: { UIState: UIState.UIState.designer }
            });
            var key = 'single'
            props.dispatch({
              type: 'layout/handleClick',
              payload: key
            });
        }else {
            props.dispatch({
                type: 'devpanel/wechatInit',
            });

            console.log('reload');
            props.dispatch({
              type: 'designer/getConfig',
              payload: { id : application.id}
            });
            console.log('reload');
            var key = 'single'
            props.dispatch({
              type: 'layout/handleClick',
              payload: key
            });
        }
        setTimeout(function() {
            props.dispatch({
              type: 'rightbar/setActiveMenu',
              payload: 'attr'
            });
        }, 200);
        localStorage.flashState = 'true'
        window.isWeapp = true;
    }else{
        props.dispatch({
            type: 'devpanel/showLoading',
            payload: {
              tips: '打开应用中...'
            }
        });

        window.isWeapp = false;
        // localStorage.defaultActiveKey = 'file';
        // localStorage.activeMenu = "setting";

        localStorage.dir = localStorage.user + '/' + application.docker.replace('gospel_project_', '') + "/";
        localStorage.currentFolder = localStorage.user + '/' + application.name + '_' + localStorage.userName;
        localStorage.baseURL = 'http://' + ( localStorage.host ) + ':9999/';
        localStorage.sshKey = application.sshKey;
        localStorage.exposePort = application.exposePort;

        if(application.domain != null && application.domain != ''){
            localStorage.domain = application.domain + '.gospely.com';
        }else{
            localStorage.domain = application.host + ':' + application.port;
        }

        if(application.version){
            localStorage.version = application.version;
        }else {
            localStorage.version = 'null';
        }

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
            props.dispatch({
                type: 'sidebar/initState',
                payload: { UIState: UIState.UIState.sidebar }
            });
            props.dispatch({
              type: 'devpanel/getConfig',
              payload: { id : application.id, UIState: UIState.UIState.devpanel}
            });

            props.dispatch({
                type: 'sidebar/setActiveMenu',
                payload: 'file'
            });

            setTimeout(function() {
                props.dispatch({
                    type: 'rightbar/setActiveMenu',
                    payload: 'setting'
                });
            }, 200);

            props.dispatch({
                type: 'rightbar/initState',
                payload: { UIState: UIState.UIState.rightbar }
            });
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
        localStorage.image = application.image;
        localStorage.docker = application.docker;
        localStorage.applicationId = application.id;
        var command = JSON.parse(application.cmds);

        if(command) {
            //初始化命令
            props.dispatch({
              type: 'sidebar/initRunCommond',
              payload: { command: command.default, port: application.exposePort}
            });

        }

        notification.open({
            message: '应用初始化成功'
        });
        props.dispatch({
            type: 'devpanel/hideLoading'
        });

    }


}

export default initApplication;
