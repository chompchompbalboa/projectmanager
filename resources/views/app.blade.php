<!DOCTYPE HTML>
<html>
  <head>
    <title>Project Manager</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/projectmanager.css"></link>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700">
  </head>
  <body>
      <div id="react"></div>
  </body>
  <script src="{{ mix('js/react.js') }}"></script>
</html>