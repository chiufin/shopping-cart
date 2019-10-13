import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './ImageCarousel.scss'

class ImageCarousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeImage: 1,
      imagesCount: props.images.length, // eslint-disable-line react/no-unused-state
    }
  }

  componentDidMount() {
    this.fadeImages()
  }

  componentWillUnmount() {
    this.clear()
  }

  clear = () => {
    clearInterval(this.timer)
  }

  fadeImages = () => {
    this.timer = setInterval(() => {
      this.setState((state) => {
        const activeImage = state.activeImage < state.imagesCount
          ? state.activeImage
          : 0
        return {
          activeImage: activeImage + 1,
          nextImage: activeImage + 2,
        }
      })
    }, 5000)
  }

  render() {
    const {
      images,
      imageAltText,
    } = this.props
    return (
      <div className={styles['image-slider']} onMouseLeave={this.fadeImages} onMouseEnter={this.clear}>
        {images.map((image, index) => {
          const imageClasses = classnames({
            [styles['image-container']]: true,
            [styles.active]: this.state.activeImage === index + 1,
            [styles.next]: this.state.nextImage === index + 1,
          })
          return (
            <div className={imageClasses} key={index}>
              <img src={image} alt={imageAltText} />
            </div>
          )
        })}
        <div className={styles['dots-container']}>
          {images.map((image, index) => {
            const dotClasses = classnames({
              [styles.dot]: true,
              [styles['dot-active']]: this.state.activeImage === index + 1,
            })
            return (
              <div className={dotClasses} key={`dot-${index}`} />
            )
          })}
        </div>
      </div>

    )
  }
}

ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  imageAltText: PropTypes.string,
}

export default ImageCarousel
