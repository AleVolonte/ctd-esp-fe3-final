import React, { useState } from 'react';

const Form = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (nombre.trim() === '') {
      validationErrors.nombre = 'Ingresa tu nombre';
    } else if (nombre.trim().length < 5) {
      validationErrors.nombre = 'Por favor, ingresa al menos 5 caracteres';
    }

    if (email.trim() === '') {
      validationErrors.email = 'Ingresa tu email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Formato de email inválido';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitted(true);
    setNombre('');
    setEmail('');
    setErrors({});
  };

  return (
    <div className="form-container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Nombre"
              className={errors.nombre ? 'error' : ''}
            />
            {errors.nombre && <p className="error-message">{errors.nombre}</p>}
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <button type="submit">Enviar</button>
        </form>
      ) : (
        <p>
          Gracias {nombre}, te contactaremos lo antes posible vía correo electrónico.
        </p>
      )}
    </div>
  );
};

export default Form;