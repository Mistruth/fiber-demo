import { isContext } from 'vm'

const emptyObject = {}

export class Component {
  constructor(props, context, updater) {
    this.props = props

    this.context = context

    this.refs = emptyObject

    this.updater = updater
  }

  setState() {
    this.updater.enqueueSetState(this, partialState, callback, 'setState')
  }
}

export class PureComponent {
  constructor(props, context, updater) {
    this.props = props

    this.context = context

    this.refs = emptyObject

    this.updater = updater
  }
}
