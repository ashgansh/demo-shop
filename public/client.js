const REQUEST_URL = 'http://localhost:8000/#/pay-with-request/';

function goToRequest(signedRequest) {
  console.log(signedRequest);
  const data = encodeURIComponent(
    JSON.stringify({
      signedRequest,
      callbackUrl: window.location.href,
      networkId: 4,
    })
  );
  document.location.href = `${REQUEST_URL}${data}`;
}

$(() => {
  $('form').submit(function(event) {
    event.preventDefault();

    return $.post('/sign_request', {}, res => {
      if (res.status !== 'error') {
        goToRequest(res.status);
      }
    });
  });
});
