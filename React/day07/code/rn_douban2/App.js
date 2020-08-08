/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

// 导入 Tabbar 相关的组件
import TabNavigator from 'react-native-tab-navigator'

// 导入 Tab 栏的组件
import Home from './components/tabbars/Home.js'
import Search from './components/tabbars/Search.js'
import ShopCar from './components/tabbars/ShopCar.js'
import Me from './components/tabbars/Me.js'

// 当修改了 项目根目录中，Android 目录下的任何文件之后，如果想要看项目效果，不要使用 react-native start了，而是需要再一次编译安装一下项目 ，运行 react-native run-android
// 导入图标相关的组件
import Icon from 'react-native-vector-icons/FontAwesome'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'home' // 选中的tab栏名称
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {/* Tab栏区域 */}
        <TabNavigator>

          {/* 主页的 Tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'home'} // 判断当前的 tab栏是否被选中的
            title="主页" // 表示 tabbar 上展示的内容
            renderIcon={() => <Icon name="home" size={25} color="gray" />} // 未选中状态下，展示的图标
            renderSelectedIcon={() => <Icon name="home" size={25} color="#0079FF" />} // 选中状态下展示的图标
            onPress={() => this.setState({ selectedTab: 'home' })} // 点击Tab栏的操作
          >
            <Home></Home>
          </TabNavigator.Item>

          {/* 搜索的 Tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'search'}
            title="搜索"
            renderIcon={() => <Icon name="search" size={25} color="gray" />}
            renderSelectedIcon={() => <Icon name="search" size={25} color="#0079FF" />}
            onPress={() => this.setState({ selectedTab: 'search' })}
          >
            <Search></Search>
          </TabNavigator.Item>

          {/* 购物车的 Tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'shopcar'}
            title="购物车"
            badgeText="0"
            renderIcon={() => <Icon name="shopping-cart" size={25} color="gray" />}
            renderSelectedIcon={() => <Icon name="shopping-cart" size={25} color="#0079FF" />}
            onPress={() => this.setState({ selectedTab: 'shopcar' })}
          >
            <ShopCar></ShopCar>
          </TabNavigator.Item>

          {/* Me的 Tab栏 */}
          <TabNavigator.Item
            selected={this.state.selectedTab === 'me'}
            title="Me"
            renderIcon={() => <Icon name="user" size={25} color="red" />}
            renderSelectedIcon={() => <Icon name="user-o" size={25} color="#0079FF" />}
            onPress={() => this.setState({ selectedTab: 'me' })}
          >
            <Me></Me>
          </TabNavigator.Item>

        </TabNavigator>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});


// 不推荐使用 npm 下载包，首先：下载速度慢，其次，如果是 npm 5.x，在装新包的时候，会把一些老包删除
// 推荐使用 facebook 开发的 yarn 来安装包   yarn add 包名