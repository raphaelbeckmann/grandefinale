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
    <div className="card col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
      <div className="card-body">
        <h1>Übersicht</h1>

        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Vielen Dank für Ihre Daten!</h4>
          An dieser Adresse werden wir Sie zukünftig mit Werbung belästigen.
        </div>

        <div className="row">
          <label className="col-sm-3 col-form-label">Anrede:</label>
          <div className="col-sm-9">
            <p class="form-control-plaintext"><b>{kunde.anrede}</b></p>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 col-form-label">Name:</label>
          <div className="col-sm-9">
            <p class="form-control-plaintext"><b>{kunde.name}</b></p>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 col-form-label">Strasse:</label>
          <div className="col-sm-9">
            <p class="form-control-plaintext"><b>{kunde.strasse}</b></p>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 col-form-label">PLZ:</label>
          <div className="col-sm-9">
            <p class="form-control-plaintext"><b>{kunde.plz}</b></p>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 col-form-label">Ort:</label>
          <div className="col-sm-9">
            <p class="form-control-plaintext"><b>{kunde.ort}</b></p>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 col-form-label">Jahreszeit:</label>
          <div className="col-sm-9">
            <p class="form-control-plaintext"><b>{kunde.jahreszeit}</b></p>
          </div>
        </div>
        <div className="row">
          <label className="col-sm-3 col-form-label">Wünsche:</label>
          <div className="col-sm-9">
            <p class="form-control-plaintext"><b>{kunde.wuensche}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}
