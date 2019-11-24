import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function Show() {
  const [kunde, setKunde] = useState(null);
  const { kundeId } = useParams();

  useEffect(() => {
    async function fetchKunde() {
      const response = await fetch(`/api/show/${kundeId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const kunde = await response.json();

        setKunde(kunde);
      }
    }

    fetchKunde();
  }, [kundeId]);

  if (kunde === null) {
    return false;
  }

  return (
    <>
      <h1>Vielen Dank für Ihre Daten!</h1>

      <p>An dieser Adresse werden wir Sie zukünftig mit Werbung belästigen:</p>

      <table>
        <tbody>
          <tr>
            <td>Anrede</td>
            <td>{kunde.anrede}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{kunde.name}</td>
          </tr>
          <tr>
            <td>Strasse</td>
            <td>{kunde.strasse}</td>
          </tr>
          <tr>
            <td>PLZ</td>
            <td>{kunde.plz}</td>
          </tr>
          <tr>
            <td>Ort</td>
            <td>{kunde.ort}</td>
          </tr>
          <tr>
            <td>Jahreszeit</td>
            <td>{kunde.jahreszeit}</td>
          </tr>
          <tr>
            <td>Wünsche</td>
            <td>{kunde.wuensche}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
