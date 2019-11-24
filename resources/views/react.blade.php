<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <title>React Frontend</title>

    <link rel="stylesheet" type="text/css" href="{{ asset('build/app.css') }}">
</head>
<body>

    <div id="root"></div>

    <script type="text/javascript">
    	window.app = {
    		csrfToken: '{{ csrf_token() }}',
    	};
    </script>
    <script src="{{ asset('build/app.js') }}" type="text/javascript"></script>

</body>
</html>
