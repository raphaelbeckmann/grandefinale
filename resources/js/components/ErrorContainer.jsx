import React from 'react';


export default function ErrorContainer(props) {
  if (props.error === null) {
    return false;
  }

  if (props.error.status === 422) {
    const validierungsFehler = JSON.parse(props.error.text);
    const fehlerhafteFelder = validierungsFehler.errors;

    return (
      <ul>
        {Object.keys(fehlerhafteFelder).map((feld) => {
          return (
            <li key={feld}>{fehlerhafteFelder[feld]}</li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      Unbehandelter Fehler: {props.error.status} ({props.error.statusText})
      <br/>
      Fehlermeldung: {props.error.text}
    </div>
  );
}
