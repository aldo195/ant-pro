import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar, Tabs } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BasicList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
export default class BasicList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  render() {
    const { list: { list }, loading } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="waiting">等待中</RadioButton>
        </RadioGroup>
        <Search
          className={styles.extraContentSearch}
          placeholder="请输入"
          onSearch={() => ({})}
        />
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { owner, createdAt, percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>Owner</span>
          <p>{owner}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>开始时间</span>
          <p>{moment(createdAt).format('YYYY-MM-DD HH:mm')}</p>
        </div>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item>
          <a>编辑</a>
        </Menu.Item>
        <Menu.Item>
          <a>删除</a>
        </Menu.Item>
      </Menu>
    );

    const MoreBtn = () => (
      <Dropdown overlay={menu}>
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const TabPane = Tabs.TabPane;

    if(list[0]){
      var tab1title = list[0].title;
      var tab1description = list[0].description;
      var tab2title = list[1].title;
      var tab2description = list[1].description;
      var tab3title = list[2].title;
      var tab3description = list[2].description;
      var tab4title = list[3].title;
      var tab4description = list[3].description;
    }

    return (
        <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={true}
          title="Approval Lists"
          style={{ marginTop: 24 }}
          bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
           <Tabs
             defaultActiveKey="1"
             tabPosition='left'
             style={{ height: 220 }}
           >
             <TabPane tab={tab1title} key="1">{tab1description}</TabPane>
             <TabPane tab={tab2title} key="2">{tab2description}</TabPane>
             <TabPane tab={tab3title} key="3">{tab3description}</TabPane>
             <TabPane tab={tab4title} key="4">{tab4description}</TabPane>
           </Tabs>
         </Card>
        </div>
    );
  }
}
