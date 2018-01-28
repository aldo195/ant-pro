import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
  Form,
  Button,
} from 'antd';
import numeral from 'numeral';
import {
  ChartCard,
  yuan,
  MiniArea,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import Result from '../../components/Result';
import { getTimeDistance } from '../../utils/utils';
import TableList from '../../routes/List/TableList';
import StandardTable from '../../components/StandardTable';

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const FormItem = Form.Item;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `Zip 工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({ chart, loading }) => ({
  chart,
  loading: loading.effects['chart/fetch'],
  submitting: loading.effects['form/submitRegularForm'],
}))
export default class Analysis extends Component {
  state = {
    salesType: 'all',
    currentTabKey: '',
    currentRule: '',
    rangePickerValue: getTimeDistance('year'),
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = (key) => {
    console.log('changing tab');
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = (rangePickerValue) => {
    console.log('Here I am');
    this.setState({
      rangePickerValue,
    });
  };

  handleSkipButton = () => {
    console.log('Skip');
    this.setState({
      currentTabKey: 0,
    });
  };


  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  render() {
    const { selectedRows, modalVisible } = this.state;

    const { rangePickerValue, salesType, currentTabKey, currentRule } = this.state;
    const { chart, loading } = this.props;
    const { submitting } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      csfCategories,
    } = chart;

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    const activeRule = currentRule || (visitData2[0] && visitData2[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            passing={data.passing}
            failing={data.failing}
            pending={data.pending}
            gap={2}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={((data.passing) / ((data.passing) + (data.failing) + 0.01)) * 100 + 0.01}
            height={64}
          />
        </Col>
      </Row>
    );
{/* TODO: Get the buttons aligned to center, see https://ant.design/components/form/ */}
    return (
      <div>
        <Card  title="Valhalla Policy Advisor" className={styles.card} bordered={true}>
          <Form>
            <Result
              title={activeRule}
              description="CSF Category: PROTECT (PR.AC-6)"
              //advice={advice}

              style={{ marginTop: 48, marginBottom: 16 }}
            />
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              Add
            </Button>
            <Button style={{ marginLeft: 30 }} onClick={this.handleSkipButton}>Skip</Button>
          </FormItem>
          </Form>
        </Card>
        <Card title="Sigma Security Policy" className={styles.card} bordered={true}>
          <Tabs activeKey={activeKey} onChange={this.handleTabChange}>
            {offlineData.map(shop => (
              <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
              </TabPane>
            ))}
          </Tabs>
          <TableList/>
        </Card>
      </div>
    );
  }
}
