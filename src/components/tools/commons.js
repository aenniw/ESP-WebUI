function prefixMocks(path) {
  if (process.env.NODE_ENV !== "production") return "mock-responses/" + path;
  return path;
}

class Requests {
  static get(path, options = {}, json = true) {
    return fetch(
      "/" + prefixMocks(path),
      Object.assign(
        {
          method: "GET",
          mode: "no-cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          redirect: "follow",
          referrer: "no-referrer"
        },
        options
      )
    )
      .then(response => (json ? response.json() : response))
      .then(response => {
        console.log("GET", path, "resp", response);
        return response;
      })
      .catch(error => {
        console.warn(error);
      });
  }

  static post(path, data = {}, options = {}, json = true) {
    return fetch(
      "/" + prefixMocks(path),
      Object.assign(
        {
          method: "POST",
          mode: "no-cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          redirect: "follow",
          referrer: "no-referrer",
          body: JSON.stringify(data)
        },
        options
      )
    )
      .then(response => (json ? response.json() : response))
      .then(response => {
        console.log("POST", path, data, "resp", response);
        return response;
      })
      .catch(error => {
        console.warn(error);
      });
  }
}

class AdminRequests {
  static logout() {
    return Requests.post("logout", {}, {}, false).then(() => location.reload);
  }

  static restart() {
    return Requests.post("restart", {}, {}, false).then(() => location.reload);
  }

  static reset() {
    return Requests.post("reset-config", {}, {}, false).then(
      AdminRequests.restart
    );
  }
}

class LightRequests {
  static getConfig() {
    return Requests.get("led-strip/get-config");
  }
  static setConfig(config) {
    Requests.post("led-strip/set-config", config);
  }

  static setAnimationMode(mode) {
    return Requests.post("led-strip/set-mode", {
      mode
    });
  }
  static setColor(color) {
    return Requests.post("led-strip/set-color", {
      rgb: color
    });
  }
  static setSpeed(speed) {
    return Requests.post("led-strip/set-speed", {
      speed: Math.round(speed)
    });
  }
  static setBrightness(brightness) {
    return Requests.post("led-strip/set-brightness", {
      brightness: Math.round(brightness)
    });
  }

  static getAnimationColors() {
    return Requests.get("led-strip/get-animation-colors").then(resp => {
      return {
        colors: resp["animation-colors"]
      };
    });
  }
  static setAnimationColors(colors = []) {
    return Requests.post("led-strip/set-animation-colors", {
      "animation-colors": colors
    });
  }
}

class Time {
  static period(millisec = 0) {
    const seconds = (millisec / 1000).toFixed(1);
    const minutes = (millisec / (1000 * 60)).toFixed(1);
    const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    if (seconds < 60) {
      return seconds + " Sec";
    } else if (minutes < 60) {
      return minutes + " Min";
    } else if (hours < 24) {
      return hours + " Hrs";
    }
    return days + " Days";
    
  }
}

class Conv {
  static d2h(d, prefix = "#") {
    let hex = Number(d)
      .toString(16)
      .toUpperCase();
    while (hex.length < 6) {
      hex = "0" + hex;
    }
    return prefix + hex;
  }
  static h2d(h) {
    return parseInt(h.indexOf("#") >= 0 ? h.substring(1) : h, 16);
  }
}

export { Requests, Time, LightRequests, AdminRequests, Conv };
