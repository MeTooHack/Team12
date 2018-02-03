class Location {
  constructor() {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      this.geolocation = navigator.geolocation;
    } else {
      /* geolocation IS NOT available */
    }
  }

  /**
   * @returns Promise<position|err>
   */
  get() {
    const self = this

    return new Promise((resolve, reject) => {
      try {
        self.geolocation.getCurrentPosition((position) =>
          resolve(position)
        )
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default new Location()
