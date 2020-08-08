import React from 'react'

// 布局相关的组件
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// 导入路由相关的组件
import { Link, Route, Switch } from 'react-router-dom'
// 导入路由组件页面
import MovieList from './MovieList.jsx'
import MovieDetail from './MovieDetail.jsx'

export default class MovieContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Layout style={{ height: '100%' }}>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[window.location.hash.split('/')[2]]}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="in_theaters">
            <Link to="/movie/in_theaters/1">正在热映</Link>
          </Menu.Item>
          <Menu.Item key="coming_soon">
            <Link to="/movie/coming_soon/1">即将上映</Link>
          </Menu.Item>
          <Menu.Item key="top250">
            <Link to="/movie/top250/1">Top250</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ paddingLeft: '1px' }}>
        <Content style={{ background: '#fff', padding: 10, margin: 0, minHeight: 280 }}>
          {/* 在匹配路由规则的时候，这里提供了两个参数 */}
          {/* 如果想要从 路由规则中，提取 参数，需要使用 this.props.match.params */}
          {/* /movie/detail/2158490 */}
          {/* 注意：哪怕为 路由启用了 exact 精确匹配模式，也会从上到下，把所有的 路由规则匹配一遍 */}
          <Switch>
            {/* 使用 路由中的 Switch 组件，能够指定，如果前面的路由规则优先匹配到了，则放弃匹配后续的路由 */}
            <Route exact path="/movie/detail/:id" component={MovieDetail}></Route>
            <Route exact path="/movie/:type/:page" component={MovieList}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  }
}