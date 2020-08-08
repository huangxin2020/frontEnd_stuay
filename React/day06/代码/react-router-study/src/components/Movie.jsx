import React from 'react'

export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      routeParams: props.match.params
    }
  }

  render() {
    console.log(this);
    // 如果想要从路由规则中，提取匹配到的参数，进行使用，可以使用 this.props.match.params.*** 来访问
    return <div>
      {/* Movie --- {this.props.match.params.type} --- {this.props.match.params.id} */}

      Movie --- {this.state.routeParams.type} --- {this.state.routeParams.id}

    </div>
  }
}