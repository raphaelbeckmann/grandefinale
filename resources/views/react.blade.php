<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>React Frontend</title>

    <style>
        body {
            font-family: sans-serif;
        }

        label {
            min-width: 75px;
            display: inline-block;
        }

        input.error {
            border: 2px solid red;
        }

        table, tr, td, th {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
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
