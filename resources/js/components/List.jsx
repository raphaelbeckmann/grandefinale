import React, { useState, useEffect } from 'react';


export default function List() {
  const [kunden, setKunden] = useState([]);

  useEffect(() => {
    async function fetchKunden() {
      const response = await fetch('/api/list', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const kunden = await response.json();

        setKunden(kunden);
      }
    }

    fetchKunden();
  }, []);

  return (
    <div className="card col-sm-12 col-md-12 col-lg-8 offset-lg-2">
      <div className="card-body">
        <h1>Liste</h1>

        <table className="table table-striped table-responsive">
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
            {kunden.map((kunde) => {
              return (
                <tr key={kunde.id}>
                  <td>{kunde.anrede}</td>
                  <td>{kunde.name}</td>
                  <td>{kunde.strasse}</td>
                  <td>{kunde.plz}</td>
                  <td>{kunde.ort}</td>
                  <td>{kunde.jahreszeit}</td>
                  <td>{kunde.wuensche}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
