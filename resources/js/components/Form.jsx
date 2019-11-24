import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import ErrorContainer from './ErrorContainer';


export default function Form() {
  const [anrede, setAnrede] = useState('Herr');
  const [name, setName] = useState('');
  const [strasse, setStrasse] = useState('');
  const [plz, setPlz] = useState('');
  const [ort, setOrt] = useState('');
  const [jahreszeit, setJahreszeit] = useState('');
  const [wuensche, setWuensche] = useState('');
  const [error, setError] = useState(null);
  const [umleitung, setUmleitung] = useState(null);

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
      setError({
        status: response.status,
        statusText: response.statusText,
        text: await response.text(),
      });
    }
  }, [anrede, name, strasse, plz, ort, jahreszeit, wuensche]);

  const leeren = useCallback(() => {
    setAnrede('Herr');
    setName('');
    setStrasse('');
    setPlz('');
    setOrt('');
    setJahreszeit('');
    setWuensche('');
    setError(null);
  }, []);

  const hatFehlerhafteEingabe = useCallback((feld) => {
    if (error === null) {
      return false;
    }

    if (error.status !== 422) {
      return false;
    }

    const validierungsFehler = JSON.parse(error.text);

    return typeof validierungsFehler.errors[feld] != 'undefined';
  }, [error]);

  if (umleitung !== null) {
    return (
      <Redirect to={umleitung}/>
    );
  }

  return (
    <>
      <h1>Infomaterial</h1>

      <p>Bitte senden Sie mir Informationsmaterial!</p>

      <form onSubmit={absenden}>
        <p>
          <label htmlFor="anrede">Anrede:</label>
          <select
            id="anrede"
            value={anrede}
            onChange={(event) => setAnrede(event.target.value)}
          >
            <option>Herr</option>
            <option>Frau</option>
            <option>Familie</option>
          </select>
        </p>
        <p>
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Bitte Vor- und Nachnamen eingeben"
            className={hatFehlerhafteEingabe('name') ? 'error' : ''}
          />
        </p>
        <p>
          <label htmlFor="strasse">Straße *</label>
          <input
            id="strasse"
            type="text"
            value={strasse}
            onChange={(event) => setStrasse(event.target.value)}
            className={hatFehlerhafteEingabe('strasse') ? 'error' : ''}
          />
        </p>
        <p>
          <label htmlFor="plz">PLZ *</label>
          <input
            id="plz"
            type="text"
            value={plz}
            onChange={(event) => setPlz(event.target.value)}
            maxLength="5"
            className={hatFehlerhafteEingabe('plz') ? 'error' : ''}
          />
        </p>
        <p>
          <label htmlFor="ort">Ort *</label>
          <input
            id="ort"
            type="text"
            value={ort}
            onChange={(event) => setOrt(event.target.value)}
            className={hatFehlerhafteEingabe('ort') ? 'error' : ''}
          />
        </p>
        <p>
          Ich beabsichtige einen Aufenthalt im
          <br/>
          <label>
              <input
                id="jahreszeit-sommer"
                type="radio"
                checked={jahreszeit === 'Sommer'}
                onChange={() => setJahreszeit('Sommer')}
              />
              Sommer
          </label>
          <br/>
          <label>
              <input
                id="jahreszeit-winter"
                type="radio"
                checked={jahreszeit === 'Winter'}
                onChange={() => setJahreszeit('Winter')}
              />
              Winter
          </label>
        </p>
        <p>
          <label htmlFor="wuensche">Ich habe folgende Wünsche:</label>
          <br/>
          <textarea
            id="wuensche"
            value={wuensche}
            onChange={(event) => setWuensche(event.target.value)}
          />
        </p>

        <ErrorContainer error={error}/>

        <p>
          <button type="submit">Absenden</button>
          <button type="button" onClick={leeren}>Formular leeren</button>
        </p>
      </form>
    </>
  );
}
