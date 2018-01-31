import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Table } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import { Radar } from '../../components/Charts';
import Result from '../../components/Result';

import styles from './Workplace.less';

@connect(({ project, activities, chart, loading }) => ({
  project,
  activities,
  chart,
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
export default class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/fetchNotice',
    });
    dispatch({
      type: 'activities/fetchList',
    });
    dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map((item) => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
        if (item[key]) {
          return <a href={item[key].link} key={item[key].name}>{item[key].name}</a>;
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      project: { notice },
      projectLoading,
      activitiesLoading,
      chart: { radarData },
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>早安，曲丽丽，祝你开心每一天！</div>
          <div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>8<span> / 24</span></p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    const dataSource = [{
      name: 'Status',
      value: 'Failed'
    }, {
      name: 'System',
      value: 'Google Cloud Platform'
    },{
      name: 'Test Time',
      value: '2018-01-10 11:50:00 UTC '
    },{
      name: 'Reason',
      value: 'Unapproved user "Felix" has "owner" role'
    },{
      name: 'Rule Creation',
      value: 'January 30, 2018'
    },{
      name: 'Owner',
      value: 'Beth Goldman'
    },{
      name: 'CSF',
      value: 'PROTECT/Access Control (PR.AC)'
    },{
      name: 'Description',
      value: 'The "owner" role in GCP allows actions that can expose the organization to major risk. As such, it should be limited to the minimal users that are dedicated to infrastructure and user administration. Developers, for example, should generally not be granted the "owner" role.'
    },{
      name: 'Test Logic',
      value: 'Fail test if any user with owner role is not listed in “Approved Admins”'
    }];

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
    }, {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    }];



    return (
      <div>
        <Card
          bordered={true}
          >
          <Result
            type="google"
            title="G Suite oAuth Consent Required"
            description="Approve G Suite integration to enable rule validation"
            className={styles.result}
          />
        </Card>
        <Card
          bordered={true}
          title="Windows workstations are restarted within two business days of any security update install in order to complete the installation"
          >
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered={true}
            showHeader={false}/>
         </Card>
      </div>
    );
  }
}
