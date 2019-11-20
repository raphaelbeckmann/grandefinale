<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <title>Formular</title>

    <style>
        body {
            font-family: sans-serif;
        }

        label {
            min-width: 75px;
            display: inline-block;
        }

        input.error {
            border: 1px solid red;
        }

        table, tr, td, th {
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>
<body>

    <h1>Infomaterial</h1>

    <p>Bitte senden Sie mir Informationsmaterial!</p>

    <form method="post" action="{{ route('create') }}">
        {{ csrf_field() }}

        <p>
            <label for="anrede">Anrede:</label>
            <select id="anrede" name="anrede">
                <option>Herr</option>
                <option>Frau</option>
                <option>Familie</option>
            </select>
        </p>
        <p>
            <label for="name">Name *</label>
            <input type="text" id="name" name="name"
                   placeholder="Bitte Vor- und Nachnamen eingeben"
                   value="{{ old('name') }}"
                   class="{{ $errors->has('name') ? 'error' : '' }}">
        </p>
        <p>
            <label for="strasse">Straße *</label>
            <input type="text" id="strasse" name="strasse"
                   value="{{ old('strasse') }}"
                   class="{{ $errors->has('strasse') ? 'error' : '' }}">
        </p>
        <p>
            <label for="plz">PLZ *</label>
            <input type="text" id="plz" name="plz" maxlength="5"
                   value="{{ old('plz') }}"
                   class="{{ $errors->has('plz') ? 'error' : '' }}">
        </p>
        <p>
            <label for="ort">Ort *</label>
            <input type="text" id="ort" name="ort"
                   value="{{ old('ort') }}"
                   class="{{ $errors->has('ort') ? 'error' : '' }}">
        </p>
        <p>
            Ich beabsichtige einen Aufenthalt im<br>
            <label>
                <input type="radio" name="jahreszeit" value="Sommer" id="jahreszeit-sommer">
                Sommer
            </label><br>
            <label>
                <input type="radio" name="jahreszeit" value="Winter" id="jahreszeit-winter">
                Winter
            </label>
        </p>
        <p>
            <label for="wuensche">Ich habe folgende Wünsche:</label><br>
            <textarea id="wuensche" name="wuensche">{{ old('wuensche') }}</textarea>
        </p>

        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>

        <p>
            <input type="submit" value="absenden"><input type="reset" value="Formular leeren">
        </p>
    </form>

</body>
</html>
