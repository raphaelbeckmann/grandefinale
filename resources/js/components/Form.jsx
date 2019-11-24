import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import Validator from 'validatorjs';


const VALIDIERUNGSREGELN = {
  'anrede': 'in:Frau,Herr,Familie',
  'name': 'required|max:255',
  'strasse': 'required|max:255',
  'plz': 'required|numeric',
  'ort': 'required|max:255',
  'jahreszeit': 'in:Sommer,Winter',
  'wuensche': '',
};

const UEBERSETZUNGEN = {
  'in.anrede': 'Die gewählte Anrede ist ungültig.',
  'required.name': 'Bitte gib deinen Namen an.',
  'max.name': 'Die Eingabe ist zu lang.',
  'required.strasse': 'Bitte gib den Namen deiner Straße an.',
  'max.strasse': 'Die Eingabe ist zu lang.',
  'required.plz': 'Bitte gib deine Postleitzahl an.',
  'numeric.plz': 'Bitte gib eine numerische Postleitzahl an.',
  'required.ort': 'Bitte gib deinen Ort an.',
  'max.ort': 'Die Eingabe ist zu lang.',
  'in.jahreszeit': 'Die gewählte Jahreszeit ist ungültig.',
};

function zeigeEingabeFehler(validierungsFehler, feld) {
  if (typeof validierungsFehler[feld] == 'undefined') {
    return false;
  }

  const fehler = Array.isArray(validierungsFehler[feld])
    ? validierungsFehler[feld][0]
    : validierungsFehler[feld];

  return (
    <div className="invalid-feedback d-block">
      {fehler}
    </div>
  );
}

export default function Form() {
  const [anrede, setAnrede] = useState('Herr');
  const [name, setName] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');
  const [jahreszeit, setJahreszeit] = useState('');
  const [wuensche, setWuensche] = useState('');
  const [validierungsFehler, setValidierungsFehler] = useState({});
  const [umleitung, setUmleitung] = useState(null);
  const formularDaten = {
    'anrede': anrede,
    'name': name,
    'strasse': strasse,
    'plz': plz,
    'ort': ort,
    'jahreszeit': jahreszeit,
    'wuensche': wuensche,
  };

  const validieren = useCallback((feld = null) => {
    const daten = feld === null
      ? formularDaten
      : { [feld]: formularDaten[feld] };
    const regeln = feld === null
      ? VALIDIERUNGSREGELN
      : { [feld]: VALIDIERUNGSREGELN[feld] };
    const validation = new Validator(daten, regeln, UEBERSETZUNGEN);

    if (validation.fails()) {
      setValidierungsFehler({
        ...validierungsFehler,
        ...validation.errors.all(),
      });
    }
    else {
      const neueValidierungsFehler = {
        ...validierungsFehler,
        [feld]: undefined,
      };

      setValidierungsFehler(neueValidierungsFehler);
    }
  }, [formularDaten, validierungsFehler]);

  const absenden = useCallback(async (event) => {
    event.preventDefault();

    const formularDaten = {
      '_token': window.app.csrfToken,
      'anrede': anrede,
      'name': name,
      'strasse': strasse,
      'plz': plz,
      'ort': ort,
      'jahreszeit': jahreszeit,
      'wuensche': wuensche,
    };

    const response = await fetch('/api/store', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formularDaten)
    });

    if (response.ok) {
      const data = await response.json();

      setUmleitung(`/show/${data.id}`);
    }
    else {
      if (response.status === 422) {
        const data = await response.json();

        setValidierungsFehler(data.errors);
      }
    }
  }, [formularDaten]);

  const leeren = useCallback(() => {
    setAnrede('Herr');
    setName('');
    setStrasse('');
    setPlz('');
    setOrt('');
    setJahreszeit('');
    setWuensche('');
    setValidierungsFehler({});
  }, []);

  const hatFehlerhafteEingabe = useCallback((feld) => {
    return typeof validierungsFehler[feld] != 'undefined';
  }, [validierungsFehler]);

  if (umleitung !== null) {
    return (
      <Redirect to={umleitung}/>
    );
  }

  return (
    <div className="card col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
      <div className="card-body">
        <h1>Infomaterial</h1>

        <p>Bitte senden Sie mir Informationsmaterial!</p>

        <form onSubmit={absenden}>
          <div className="form-group row">
            <label htmlFor="anrede" className="col-sm-3 col-form-label">Anrede</label>
            <div className="col-sm-9">
              <select
                id="anrede"
                className="form-control"
                value={anrede}
                onChange={(event) => setAnrede(event.target.value)}
                onBlur={() => validieren('anrede')}
              >
                <option>Herr</option>
                <option>Frau</option>
                <option>Familie</option>
              </select>
              {zeigeEingabeFehler(validierungsFehler, 'anrede')}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">Name *</label>
            <div className="col-sm-9">
              <input
                id="name"
                className={`form-control ${hatFehlerhafteEingabe('name') ? 'is-invalid' : ''}`}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => validieren('name')}
                placeholder="Bitte Vor- und Nachnamen eingeben"
              />
              {zeigeEingabeFehler(validierungsFehler, 'name')}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="strasse" className="col-sm-3 col-form-label">Straße *</label>
            <div className="col-sm-9">
              <input
                id="strasse"
                className={`form-control ${hatFehlerhafteEingabe('strasse') ? 'is-invalid' : ''}`}
                type="text"
                value={strasse}
                onChange={(event) => setStrasse(event.target.value)}
                onBlur={() => validieren('strasse')}
              />
              {zeigeEingabeFehler(validierungsFehler, 'strasse')}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="plz" className="col-sm-3 col-form-label">PLZ *</label>
            <div className="col-sm-9">
              <input
                id="plz"
                className={`form-control ${hatFehlerhafteEingabe('plz') ? 'is-invalid' : ''}`}
                type="text"
                value={plz}
                onChange={(event) => setPlz(event.target.value)}
                onBlur={() => validieren('plz')}
                maxLength="5"
              />
              {zeigeEingabeFehler(validierungsFehler, 'plz')}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="ort" className="col-sm-3 col-form-label">Ort *</label>
            <div className="col-sm-9">
              <input
                id="ort"
                className={`form-control ${hatFehlerhafteEingabe('ort') ? 'is-invalid' : ''}`}
                type="text"
                value={ort}
                onChange={(event) => setOrt(event.target.value)}
                onBlur={() => validieren('ort')}
              />
              {zeigeEingabeFehler(validierungsFehler, 'ort')}
            </div>
          </div>

          <hr/>

          <p>Ich beabsichtige einen Aufenthalt im:</p>

          <div className="form-group">
            <div className="btn-group">
              <button
                type="button"
                className={`btn ${jahreszeit === 'Sommer' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setJahreszeit('Sommer')}
                onBlur={() => validieren('jahreszeit')}
              >
                Sommer
              </button>
              <button
                type="button"
                className={`btn ${jahreszeit === 'Winter' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setJahreszeit('Winter')}
                onBlur={() => validieren('jahreszeit')}
              >
                Winter
              </button>
            </div>
            {zeigeEingabeFehler(validierungsFehler, 'jahreszeit')}
          </div>

          <div className="form-group row">
            <label htmlFor="wuensche" className="col-sm-3 col-form-label">Wünsche</label>
            <div className="col-sm-9">
              <textarea
                id="wuensche"
                className={`form-control ${hatFehlerhafteEingabe('wuensche') ? 'is-invalid' : ''}`}
                value={wuensche}
                onChange={(event) => setWuensche(event.target.value)}
                onBlur={() => validieren('wuensche')}
                placeholder="Ich habe folgende Wünsche..."
              />
              {zeigeEingabeFehler(validierungsFehler, 'wuensche')}
            </div>
          </div>

          <div className="form-group d-flex justify-content-between">
            <button className="btn btn-danger" type="button" onClick={leeren}>Formular leeren</button>
            {' '}
            <button className="btn btn-primary" type="submit">Absenden</button>
          </div>
        </form>
      </div>
    </div>
  );
}
