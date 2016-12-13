import './index.html';
import './index.less';
import dva from 'dva';
import { message } from 'antd';

import createLoading from 'dva-loading';

import packUIStage from './utils/packUIState.js';

localStorage.itemToCut = localStorage.itemToCut || undefined;
localStorage.itemToCopy = localStorage.itemToCopy || undefined;
import auth from './utils/auth';

window.flag = false;
window.fileFlag = false;
//认证和状态同步
auth();
localStorage.flashState = 'false'
// 1. Initialize
const app = dva({
	initialState: {
		products: [{
			name: 'dva',
			id: 1
		}, {
			name: 'antd',
			id: 2
		}]
	},

	onError(e) {

			console.log("============= error" + e.message + "==========");
	  	message.error(e.message);
	}
});
console.log(app);
// 2. Plugins
//app.use({});
app.use({
	onStateChange: () => {

		if(!window.appRouter) {
			window.appRouter = app._history;
		}

		if(localStorage.flashState == 'true') {
			console.log("=============flash UIState==========");
			var state = app._store.getState();
			var UIState = packUIStage(state);
			var state = {
				applicationId: localStorage.applicationId,
				UIState: UIState,
			};
			var escape = false
			localStorage.UIState = JSON.stringify(state,function(key,value){

				if(key == 'content' || ( key == 'value' && escape)){
					return undefined
				}else{
					return value;
				}
			});
		}
		// app._store.dispatch({
		// 	type: 'UIState/writeConfig',
		// 	payload: {
		// 		id: '',
		// 		application: '',
		// 		creator: '',
		// 		configs: UIState
		// 	}
		// })
		// console.log('onStateChange', UIState, app);
	}
});

app.use(createLoading());

// 3. Model
app.model(require('./models/products'));
app.model(require('./models/ModelLeftSidebar'));
app.model(require('./models/ModelRightSidebar'));
app.model(require('./models/ModelDevPanels'));
app.model(require('./models/editor/ModelTop'));
app.model(require('./models/editor/ModelEditor'));
app.model(require('./models/rightSidebar/ModelLayout'));
app.model(require('./models/rightSidebar/ModelFileTree'));
app.model(require('./models/rightSidebar/ModelAttr'));
app.model(require('./models/ModelDesigner'));
app.model(require('./models/ModelPreviewer'));
app.model(require('./models/ModelConstruction'));
app.model(require('./models/ModelUIState'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
