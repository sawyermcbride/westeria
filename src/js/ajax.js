const ajax = (function() {
  function get (url, cb) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      }
    };

    xhr.open('GET',url);
    xhr.send();
  };

  function post() {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        cb(JSON.parse(xhr.responseText));
      }
    };

    xhr.open('POST',url);
    xhr.send();
    };
  return {
      get,
      post
  }
})();


export default ajax;
