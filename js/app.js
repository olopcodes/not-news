// geting the daily quote
$.ajax({
  method: "GET",
  async: true,
  url: "https://uselessfacts.jsph.pl//random.json?language=en",
  dataType: "json",
  success: function (data) {
    console.log(data.text);
    $(".daily-fact").html(`
        <h3>daily random fact</h3>
        <p>"${data.text}"</p>
    `);
  },
  error: function (xhr, status, err) {
    console.log(err);
  },
});
