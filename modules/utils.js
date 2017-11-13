const Utils = {
  getUrlParam: (name, url = window.location.search)  => {
    let match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
}

module.exports = Utils