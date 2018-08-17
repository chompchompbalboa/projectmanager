<!DOCTYPE HTML>
<html>
  <head>
    <title>Project Manager - @yield('title')</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/projectmanager.css"></link>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Muli">
  </head>
    <body>
        @section('sidebar')
            This is the master sidebar.
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
</html>