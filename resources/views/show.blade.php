<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>Kunden anzeigen - Grande Finale in Laravel</title>

    <style>
        body {
            font-family: sans-serif;
        }
    </style>
</head>
<body>

    <h1>Vielen Dank für Ihre Daten!</h1>

    <p>An dieser Adresse werden wir Sie zukünftig mit Werbung belästigen:</p>

    <table>
        <tbody>
            <tr>
                <td>Anrede</td>
                <td>{{ $kunde->anrede }}</td>
            </tr>
            <tr>
                <td>Name</td>
                <td>{{ $kunde->name }}</td>
            </tr>
            <tr>
                <td>Strasse</td>
                <td>{{ $kunde->strasse }}</td>
            </tr>
            <tr>
                <td>PLZ</td>
                <td>{{ $kunde->plz }}</td>
            </tr>
            <tr>
                <td>Ort</td>
                <td>{{ $kunde->ort }}</td>
            </tr>
            <tr>
                <td>Jahreszeit</td>
                <td>{{ $kunde->jahreszeit }}</td>
            </tr>
            <tr>
                <td>Wünsche</td>
                <td>{{ $kunde->wuensche }}</td>
            </tr>
        </tbody>
    </table>

</body>
</html>
