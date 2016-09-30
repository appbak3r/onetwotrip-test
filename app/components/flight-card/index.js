import React from 'react'
import styles from './styles.sass'

import moment from 'moment'

class FlightCard extends React.Component {

  state = { image: null, imageError: false }

  imagePreload = new Image()

  componentDidMount () {
    let imageId = this.props.data.id
    if (imageId > 1018) {
      imageId = imageId.toString().substr(-3)
    }
    this.imagePreload.src = `https://unsplash.it/250/200?image=` + imageId
    this.onImageLoad = this.onImageLoad.bind(this)
    this.onImageError = this.onImageError.bind(this)

    this.imagePreload.addEventListener('load', this.onImageLoad)
    this.imagePreload.addEventListener('error', this.onImageError)
  }

  componentWillUnmount () {
    this.imagePreload.removeEventListener('load', this.onImageLoad)
    this.imagePreload.removeEventListener('error', this.onImageError)
  }

  onImageLoad () {
    this.setState({ image: this.imagePreload.src, imageLoaded: true })
  }

  onImageError () {
    this.setState({ imageError: true })
  }

  render () {
    const { carrier, direction, arrival, departure } = this.props.data
    let pictureStyle = {}
    let pictureClassNames = styles.picture
    if (this.state.image) {
      pictureStyle[ 'backgroundImage' ] = `url(${this.state.image})`
    }

    if (this.state.imageError) {
      pictureClassNames += ' ' + styles.error
    }

    if (this.state.imageLoaded) {
      pictureClassNames += ' ' + styles.pictureLoaded
    }

    return <div className={styles.card}>
      <div style={pictureStyle} className={pictureClassNames} />
      <div className={styles.carrier}>{carrier}</div>
      <div className={styles.directions}>
        <div>{direction.from}</div>
        <div>{direction.to}</div>
      </div>
      <div><span className={styles.timeTitle}>departure</span>{moment(departure).format('DD MMM HH:mm')}</div>
      <div><span className={styles.timeTitle}>arrival</span>{moment(arrival).format('DD MMM HH:mm')}</div>
    </div>
  }
}

FlightCard.propTypes = {
  data: React.PropTypes.object
}

export default FlightCard
