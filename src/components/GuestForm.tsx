import React, { useState } from 'react';
import axios from 'axios';
import '../style/GuestForm.css'


const ConfirmAttendanceForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/guest', formData);
      console.log(formData);

      setFormData({ name: '', phone: '', email: '' });
    } catch (error) {
      console.error('Erro ao enviar dados de novo convidado:', error);
    }
  };

  return (
    <div className='container'>
      <h3 className='title'>Adicione o restaurante da vez!</h3>
      <form className='form' onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            className='name-field'
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Telefone:
          <input
            className='phone-field'
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
          className='email-field'
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" className='button'>
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default ConfirmAttendanceForm;
