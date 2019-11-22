<!-- formular: siehe aufgabe 3.13 aus webtechnologien -->

<?php

$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "grandefinale";

function test_post($post)
{

    if (! isset($_POST[$post])) {
        return '';
    }

    $data = $_POST[$post];

    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $result['anrede'] = test_post('anrede');
    $result['name'] = test_post('name');
    $result['strasse'] = test_post('strasse');
    $result['plz'] = test_post('plz');
    $result['ort'] = test_post('ort');
    $result['jahreszeit'] = test_post('jahreszeit');
    $result['wuensche'] = test_post('wuensche');

    if (! empty($result['name']) AND
        ! empty($result['strasse']) AND
        ! empty($result['plz']) AND
        ! empty($result['ort'])
    ) {

        // connect
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_errno) {
            die("Verbindung fehlgeschlagen: " . $conn->connect_error);
        }

        // write data to database
        $sql = 'INSERT INTO `grandefinale`
                    (`anrede`, `name`, `strasse`, `plz`, `ort`, `jahreszeit`, `wuensche`) VALUES
                    ("' . $result['anrede'] . '", "' . $result['name'] . '", "' . $result['strasse'] . '", "' . $result['plz'] . '", "' . $result['ort'] . '", "' . $result['jahreszeit'] . '", "' . $result['wuensche'] . '");
                   ';

        if (mysqli_query($conn, $sql)) {
            $daten_eingegangen = true;
        }
        else {
            die("Fehler: " . mysqli_error($conn));
        }
    }
}

// todo: übergebene werte wieder im formular anzeigen
// todo: kann man die prüfung auf error im formular noch verbessern?

?>


<!doctype html>
<html lang="de">
<head>

    <meta charset="utf-8">
    <title>Formular</title>

    <style>

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

    <form method="post">

        <p>
            <label for="anrede">Anrede:</label>
            <select id="anrede" name="anrede">
                <option>Herr</option>
                <option>Frau</option>
                <option>Familie</option>
            </select>
        </p>

        <p>
            <label for="Name">Name *</label>
            <input <?php if ($_SERVER['REQUEST_METHOD'] == 'POST' AND empty($_POST['name'])) {
                echo 'class="error"';
            } ?> type="text" id="name" name="name" placeholder="Bitte Vor- und Nachnamen eingeben">
        </p>

        <p>
            <label for="strasse">Straße *</label>
            <input <?php if ($_SERVER['REQUEST_METHOD'] == 'POST' AND empty($_POST['strasse'])) {
                echo 'class="error"';
            } ?>type="text" id="strasse" name="strasse">
        </p>

        <p>
            <label for="plz">PLZ *</label>
            <input <?php if ($_SERVER['REQUEST_METHOD'] == 'POST' AND empty($_POST['plz'])) {
                echo 'class="error"';
            } ?>type="text" id="plz" name="plz" maxlength="5">
            <!-- kein type="number", da es postleitzahlen gibt, die mit "0" beginnen -->
        </p>

        <p>
            <label for="ort">Ort *</label>
            <input <?php if ($_SERVER['REQUEST_METHOD'] == 'POST' AND empty($_POST['ort'])) {
                echo 'class="error"';
            } ?>type="text" id="ort" name="ort">
        </p>

        <p>
            Ich beabsichtige einen Aufenthalt im<br>
            <input type="radio" name="jahreszeit" value="sommer" id="jahreszeit-sommer"><label for="jahreszeit-sommer">Sommer</label><br>
            <input type="radio" name="jahreszeit" value="winter" id="jahreszeit-winter"><label for="jahreszeit-winter">Winter</label>
        </p>

        <p>
            <label for="wuensche">Ich habe folgende Wünsche:</label><br>
            <textarea id="wuensche" name="wuensche"></textarea>
        </p>

        <p>
            <input type="submit" value="absenden"><input type="reset" value="Formular leeren">
        </p>

    </form>

    <?php

    if (isset($daten_eingegangen) AND $daten_eingegangen) {

        ?>

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

                <?php

                $query = 'SELECT * FROM grandefinale';
                $result = mysqli_query($conn, $query);

                if (mysqli_num_rows($result) > 0) {

                    while ($row = mysqli_fetch_assoc($result)) {
                        echo '
                                        <tr>
                                            <td>' . $row['anrede'] . '</td>
                                            <td>' . $row['name'] . '</td>
                                            <td>' . $row['strasse'] . '</td>
                                            <td>' . $row['plz'] . '</td>
                                            <td>' . $row['ort'] . '</td>
                                            <td>' . $row['jahreszeit'] . '</td>
                                            <td>' . $row['wuensche'] . '</td>
                                        </tr>';
                    }

                }
                else {

                    die('keine Einträge gefunden');
                }

                ?>
            </tbody>
        </table>

        <?php

    }

    ?>

</body>
</html>
