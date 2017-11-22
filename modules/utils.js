const Utils = {
  getUrlParam: (name, url = window.location.search)  => {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  },
  getRandom: (n = 10) => {
    return Math.round(Math.random()*(n-1)+1)
  }
}

module.exports = Utils