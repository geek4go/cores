import React , {PropTypes} from 'react';
import { connect } from 'dva';

import { Button, Modal } from 'antd';
import { Tabs, Icon } from 'antd';
import { Tooltip } from 'antd';
import { Collapse } from 'antd';
import { Radio, Popover } from 'antd';

import { Tree, Form, Input, Cascader, Select, Row, Col, Checkbox, Menu, Dropdown, message, Tag, Table, Popconfirm} from 'antd';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const Panel = Collapse.Panel;
const TabPane = Tabs.TabPane;

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const Component = (props) => {

    const formItemLayout = {
      	labelCol: { span: 8 },
      	wrapperCol: { span: 16 }
    };

    const customAttrProps = {
    	creatorContent: (
	      	<Form>
				<FormItem {...formItemLayout} label="key">
					<Input size="small" />
				</FormItem>
				<FormItem {...formItemLayout} label="value">
					<Input size="small" />
				</FormItem>
			</Form>
    	),

    	modifyContent: (
	      	<Form>
				<FormItem {...formItemLayout} label="key">
					<Input />
				</FormItem>
				<FormItem {...formItemLayout} label="value">
					<Input />
				</FormItem>
			</Form>
    	),

    	onVisibleChange () {

    	}
    }

  	return (

  		<div className="vdctrl-pane-wrapper">
			<Collapse bordered={false} defaultActiveKey={['basic', 'link', 'custom-attr', 'heading-type']}>
			    <Panel header="基础设置" key="basic">

			      	<Form>
						<FormItem {...formItemLayout} label="ID">
							<Input size="small" />
						</FormItem>

						<FormItem {...formItemLayout} label="可视屏幕">
							<Select
							    multiple
							    style={{ width: '100%' }}
							    placeholder="Please select"
							    defaultValue={['a10', 'c12']}
							    size="small"
							 >
							    {children}
						  	</Select>
						</FormItem>

						<FormItem {...formItemLayout} label="标题大小">
						    <Select size="small" value="请选择">
						      	<Option key="sss" value="h1">h1</Option>
						    </Select>
						</FormItem>
			      	</Form>

			    </Panel>
			    <Panel header="链接属性" key="link">
			      	<p>段落</p>
			    </Panel>
			    <Panel header="自定义属性" key="custom-attr">
			    	<Form>
						<FormItem {...formItemLayout} label="">
							<Popover
					        	content={customAttrProps.creatorContent}
					        	title="新建 自定义属性"
					        	trigger="click"
					      	>
								<Button type="circle" size="small"><Icon type="plus" /></Button>
					      	</Popover>
						</FormItem>

					    <ul style={{marginTop: '-15px'}} className="ant-dropdown-menu ant-dropdown-menu-vertical ant-dropdown-menu-light ant-dropdown-menu-root symbol-list" role="menu">
					      <li className="ant-dropdown-menu-item" role="menuitem">
					        <Row>
					          <Col span={18}>
					            <p>key1="val2"</p>
					          </Col>
					          <Col span={3}>

								<Popover
						        	content={customAttrProps.modifyContent}
						        	title="修改 自定义属性"
						        	trigger="click"
						      	>
					            	<Icon type="edit" />
						      	</Popover>

					          </Col>
					          <Col span={3}>
					            <Popconfirm title="确认删除吗？" okText="确定" cancelText="取消">
									<Icon type="delete" />
  								</Popconfirm>
					          </Col>
					        </Row>
					      </li>
					      <li className="ant-dropdown-menu-item-divider"></li>

					      <li className="ant-dropdown-menu-item" role="menuitem">
					        <Row>
					          <Col span={18}>
					            <p>key="val"</p>
					          </Col>
					          <Col span={3}>
								<Popover
						        	content={customAttrProps.modifyContent}
						        	title="修改 自定义属性"
						        	trigger="click"
						      	>
					            	<Icon type="edit" />
						      	</Popover>
					          </Col>
					          <Col span={3}>
					            <Popconfirm title="确认删除吗？" okText="确定" cancelText="取消">
									<Icon type="delete" />
  								</Popconfirm>
					          </Col>
					        </Row>
					      </li>
					      <li className=" ant-dropdown-menu-item-divider"></li>
					    </ul>

					</Form>
			    </Panel>
			</Collapse>
  		</div>

  	);

};

function mapSateToProps({ vdcore }) {
  return { vdcore };
}

export default connect(mapSateToProps)(Component);