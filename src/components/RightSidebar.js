import React , {PropTypes} from 'react';
import { Tabs, Icon, Popover } from 'antd';

import FileTree from './RightSidebar/FileTree';
import CloumnLayout from './RightSidebar/CloumnLayout';
import Attr from './RightSidebar/Attr';
import SettingPanel from './RightSidebar/SettingPanel';

const TabPane = Tabs.TabPane;

import { connect } from 'dva';

const RightSidebar = (props) => {

	var handleTabChanged = function(key) {
		props.dispatch({
			type: 'rightbar/handleTabChanged',
			payload: key
		});
	}

	var styles = {
		tab: {
			minHeight: '100vh'
		},

		icon: {
			marginRight: '0px',
			marginBottom: '8px'
		},

		span: {
		 	writingMode: 'tb-rl'
		}
	}

	let maxHeight = document.documentElement.clientHeight - 38;

	const RightSidebarComponent = () => {

		if(window.isWeapp) {

		  	return (<Tabs tabPosition="right" activeKey={props.rightbar.activeMenu} onChange={handleTabChanged}>
				    	<TabPane style={styles.tab} tab={<span style={styles.span}>
				    		<Icon style={styles.icon} type="exception" />属性</span>} 
				    		key="attr"
				    		disabled={window.disabled}
				    	>
				    		<div style={{height: maxHeight, overflow: 'auto'}}>
				    			<Attr></Attr>
				    		</div>
				    	</TabPane>    	
				  	</Tabs>
		  	);

		}else {

		 	// return (<Tabs tabPosition="right" activeKey={props.rightbar.activeMenu} onChange={handleTabChanged}>
			// 	  	</Tabs>
			// );
			
			return '';
		}

	}

	return (
		<div className="RightSidebar">
			{RightSidebarComponent()}
		</div>
	);

}

function mapStateToProps({ rightbar, devpanel }) {
  return { rightbar, devpanel };
}

export default connect(mapStateToProps)(RightSidebar);
