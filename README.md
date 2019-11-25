# Grande Finale

Eine Beispielimplementierung des Projekts **Grande Finale** in
1. statischem HTML
2. als Single-Page-Application (mit React).

## Einrichtung der Entwicklungsumgebung

Damit du dieses Projekt auf deinem Computer starten kannst, benötigst du zunächst einen Webserver (**[Apache](https://httpd.apache.org)** oder **[nginx](https://www.nginx.com)**). Desweiteren muss auf deinem Computer **[PHP](https://www.php.net)** (v7.2+) und ein Datenbankserver (**[MySQL](https://www.mysql.com)** v5.6+ oder **[PostgreSQL](https://www.postgresql.org)** v9.4+ oder **[SQLite](https://www.sqlite.org)** v3.8.8+ oder **[SQL Server](https://www.microsoft.com/de-de/sql-server/sql-server-2019)** v2017+) installiert sein. 

Eine ausführliche Anleitung zur Einrichtung einer Laravel-Entwicklungsumgebung findest du in der [Laravel Dokumentation](https://laravel.com/docs/6.x/installation) unter dem Punkt *Local Development Server*.

## Installation

### Laravel

Nachdem dein Computer entsprechend eingerichtet ist, kannst du dir dieses Projekt als `.zip`-Archiv oder über den Befehl `git clone https://github.com/raphaelbeckmann/grandefinale.git` herunterladen (erfordert eine **[git](https://git-scm.com/)**-Installation).

Anschließend öffnest du in dem Ordner eine Kommandozeile bzw. ein Terminal und installierst alle Abhängigkeiten:

```
php composer install
```

Jetzt musst du die `.env`-Datei vorbereiten, in der alle Variablen definiert werden, die abhängig von der Serverumgebung sind, wie zum Beispiel Zugangsdaten für die Datenbank oder der sog. *[Application Key
](https://laravel.com/docs/6.x/installation#configuration)*.

```
cp .env.example .env
php artisan key:generate
```

Abschließend musst du deine Datenbank *[migrieren](https://laravel.com/docs/6.x/migrations)*.

```
php artisan migrate
```

Jetzt ist dein Laravel-Backend bereit zum Einsatz.

### React

Damit du auch die React-Implementierung bei dir ausprobieren kannst, ist es notwendig, dass du **[node](https://nodejs.org)** v10+ auf deinem Computer installierst.

Die Installation von **node** bringt auch das Programm **[npm](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm)** mit, mit dem Javascript-Abhängigkeiten verwaltet und installiert werden können. Diese installierst du in der Kommandozeile bzw. im Terminal über:

```
npm install
```

Nachdem die Abhängigkeiten installiert wurden, muss das Javascript, das ins Frontend übertragen werden soll, gebaut werden. Das machst du über den Befehl:

```
npm run build
```

## Starten

Je nachdem, wie du deinen Webserver installiert hast, kannst du diesen jetzt über **[Homestead](https://laravel.com/docs/6.x/homestead)**, **[Valet](https://laravel.com/docs/6.x/valet)** oder über das `php artisan serve`-Kommando starten.

## Im Browser

### Musterlösung

Um die Musterlösung im Browser aufzurufen, navigiere im Browser zu `http://<Server>/musterloesung`.

### Framework-basierte Lösung mit statischem HTML

Die durch das Laravel-Framework generierten HTML-Seiten kannst du über die folgenden URLs abrufen:
1. `http://<Server>/create` zum Erstellen eines Datensatzes
2. `http://<Server>/show/<id>` zum Anzeigen der Bestätigung der Speicherung
3. `http://<Server>/list` zum Auflisten aller Datensätze

### React-basierte Lösung als Single-Page-Application

Um die React-Version aufzurufen, gehe auf:
1. `http://<Server>/react/create` zum Erstellen eines Datensatzes
2. `http://<Server>/react/show/<id>` zum Anzeigen der Bestätigung der Speicherung
3. `http://<Server>/react/list` zum Auflisten aller Datensätze

## Relevante Dateien

### Laravel

Relevante Dateien, die im Rahmen des Grande Finale Projekts erstellt wurden, findest du unter:

1. `app/Http/Controllers/`: In diesem Ordner findest du Controller, die Anfragen vom Client annehmen.

   Dokumentation: https://laravel.com/docs/6.x/controllers
   
2. `database/migrations/`: Änderungen an der Datenbank werden hier definiert.

   Dokumentation: https://laravel.com/docs/6.x/migrations
   
3. `resources/views/`: Dieser Ordner beinhaltet alle Views.

   Dokumentation: https://laravel.com/docs/6.x/views

4. `routes/web.php`: Hier werden HTTP-Routen definiert.

	Dokumentation: https://laravel.com/docs/6.x/routing
	
### React

Für das Frontend relevanten Code findest du hier:

1. `resources/js/`: In diesem Ordner befinden sich das Startscript `app.js` und die auf der Seite genutzten *Components*.

2. `resources/sass/app.scss`: In dieser Datei können Anpassung am Aussehen der Seite vorgenommen werden.

## Parcel Development-Server (Live Updates)

Damit du bei Änderungen im Javascript oder der `app.scss`-Datei nicht ständig darauf warten musst, bis das Kommando `npm run build` endlich fertig ist, kannst du auch den **[Development-Server](https://parceljs.org/hmr.html)** starten, über den Änderungen direkt an das Frontend übermittelt werden.

Starte dafür an Stelle von `npm run build` das Kommando:

```
npm run dev
```

Wenn du jetzt Änderungen in der `app.js` oder irgendeiner von dieser Datei importierten Dateien vornimmst, sollte sich das Frontend automatisch aktualisieren.

**Wichtig hierbei ist**, dass du diese Funktion nur im Entwicklungsbetrieb benutzt, weil der Code vom Development-Server nicht "minifiziert" wird. Dadurch wird die Dateigröße des vom Bundler generierten Codes drastisch erhöht. Außerdem wird Debug-Code, der nur für die Entwicklung gedacht ist, nicht aus den erzeugten Javascript-Dateien entfernt.
