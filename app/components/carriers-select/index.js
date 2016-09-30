import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import styles from './styles.sass'

class CarriersSelect extends React.Component {

  render () {
    const { data } = this.props
    let options = [ <option key="all" value="">All airlines</option> ]
    if (data) {
      options = options.concat(data.map((item) => {
        return <option value={item} key={item}>{item}</option>
      }))
    }
    return <div className={styles.container}>
      <select className={styles.select} onChange={this.props.handleChange}>
        {options}
      </select>
    </div>
  }
}

CarriersSelect.propTypes = {
  data: ImmutablePropTypes.set,
  handleChange: React.PropTypes.func
}

export default CarriersSelect
