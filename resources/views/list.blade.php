<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>Kundenliste - Grande Finale in Laravel</title>

    <style>
        body {
            font-family: sans-serif;
        }
    </style>
</head>
<body>

    @if ($kunden->isNotEmpty())
        <table>
            <thead>
                <tr>
                    <th>Anrede</th>
                    <th>Name</th>
                    <th>Strasse</th>
                    <th>PLZ</th>
                    <th>Ort</th>
                    <th>Jahreszeit</th>
                    <th>Wünsche</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($kunden as $kunde)
                    <tr>
                        <td>{{ $kunde->anrede }}</td>
                        <td>{{ $kunde->name }}</td>
                        <td>{{ $kunde->strasse }}</td>
                        <td>{{ $kunde->plz }}</td>
                        <td>{{ $kunde->ort }}</td>
                        <td>{{ $kunde->jahreszeit }}</td>
                        <td>{{ $kunde->wuensche }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @else
        Keine Einträge gefunden
    @endif

</body>
</html>
