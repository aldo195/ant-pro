import { getUrlParams } from './utils';

// mock tableListDataSource
let tableListDataSource = [];

tableListDataSource.push({
  key: 0,
  title: `All email domains are configured to protect against spoofing`,
  owner: 'Andrey Fedorov',
  description: 'Email service providers for us and our customers are instructed to discard emails that do not appear to originate from us or our vendors.',
  status: 3,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-25 14:00:00`),
});

tableListDataSource.push({
  key: 1,
  title: `All email domains are configured with an aggregator service for forgery reports`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 3,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-25 14:00:00`),
});

tableListDataSource.push({
  key: 2,
  title: `Accounts for terminated employees are suspended within 24 hours`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 3,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-18 14:00:00`),
});

tableListDataSource.push({
  key: 3,
  title: `GCP users with “owner” role are authorized company admins`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 3,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-10 14:00:00`),
});

tableListDataSource.push({
  key: 4,
  title: `All exceptions in Stackdriver have URL/IP specified to support debugging`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 3,
  updatedAt: new Date(`2018-01-18 14:15:00`),
  createdAt: new Date(`2018-01-10 14:00:00`),
});

tableListDataSource.push({
  key: 5,
  title: `All exceptions in Stackdriver are acknowledged within 1 hour`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 2,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-10 14:00:00`),
});

tableListDataSource.push({
  key: 6,
  title: `All exceptions in Stackdriver are resolved within 24 hours`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 2,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-10 14:00:00`),
});

tableListDataSource.push({
  key: 7,
  title: `Users with administrator privileges must be approved in policy`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 2,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-10 14:10:00`),
});

tableListDataSource.push({
  key: 8,
  title: `User logins require 2-Step Verification`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 2,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-10 14:10:00`),
});

tableListDataSource.push({
  key: 9,
  title: `Globally accessible VM instances are approved`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 2,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-10 14:20:00`),
});

tableListDataSource.push({
  key: 10,
  title: `All VM instances outside of GKE are approved`,
  owner: 'Andrey Fedorov',
  description: '',
  status: 2,
  updatedAt: new Date(`2018-01-25 14:00:00`),
  createdAt: new Date(`2018-01-10 14:20:00`),
});


export function getRule(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = getUrlParams(url);

  let dataSource = [...tableListDataSource];

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach((s) => {
      filterDataSource = filterDataSource.concat(
        [...dataSource].filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.no) {
    dataSource = dataSource.filter(data => data.no.indexOf(params.no) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export function postRule(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, no, description } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => no.indexOf(item.no) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: ['https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png', 'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png'][i % 2],
        no: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        description,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  if (res && res.json) {
    res.json(result);
  } else {
    return result;
  }
}

export default {
  getRule,
  postRule,
};
