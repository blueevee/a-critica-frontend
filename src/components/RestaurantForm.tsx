import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Restaurant} from '../interfaces/RestaurantInterface'
import { WithContext as ReactTags } from 'react-tag-input';
import { Toast } from '../components/Toast';
import '../style/RestaurantForm.css'

const KeyCodes = {
  comma: 188,
  enter: 13,
};


const delimiters = [KeyCodes.comma, KeyCodes.enter];

const RestaurantForm: React.FC<{ onSubmit: (data: Restaurant) => void }> = ({ onSubmit }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [name, setName] = useState('');
  const [adress, setAdress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<{ id: string; text: string }[]>([]);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      // Aqui você faria a chamada à API para buscar os restaurantes
      const data: Restaurant[] = [
        {
          id: 1,
          name: "Piqueta de cartoe ke",
          adress: "rua boulebardc aaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa",
          image_url: "https://freguesiacult.com.br/wp-content/uploads/restaurante-750x563.jpeg",
          reviews: 2,
          category: ['Italiana', 'Japonesa', 'Drinks', 'Pizza']
        },
        {
          id: 2,
          name: "Piqueta",
          image_url: "",
          adress: "rua bouleaaaaaaaaaaaa 12 sssbardc",
          reviews: 2,
          category: ['Hamburguér', 'Drinks', 'Pizza']
        },
        {
          id: 3,
          name: "Piqueta",
          adress: "rua boulebardceeee eeeee",
          reviews: 2,
          image_url: "",
          category: ['Bolos', 'Drinks', 'Pizza']
        },
        {
          id: 4,
          name: "Piqueta sj djj eyy",
          adress: "rua boulebardc",
          image_url: "",
          reviews: 2,
          category: ['Drinks', 'Pizza']
        },
        {
          id: 5,
          name: "Piqueta",
          adress: "rua boulebardc",
          image_url: "https://img.restaurantguru.com/w550/h367/ra36-pizza-Sweet-pizza-val-2023-01.jpg",
          reviews: 2,
          category: ['Doces', 'Pizza']
        },
        {
          id: 6,
          name: "Pecorino",
          reviews: 2,
          adress: "rua boulebardc",
          image_url: "",
          category: ['Pizza']
        },
        {
          id: 7,
          name: "Pecorino",
          reviews: 212,
          adress: "rua boulebardc",
          image_url: "https://freguesiacult.com.br/wp-content/uploads/restaurante-750x563.jpeg",
          category: ['Pizza']
        }
      ];

      const cuisines: string[] = [
        'Pizza',
        'Pidamio',
        'Italiana',
        'Francesa',
        'Japonesa',
        'Chinesa',
        'Árabe',
        'Hambúrguer'
      ]
      setCuisines(cuisines)
      setRestaurants(data)
    };

    fetchRestaurants();
  }, []);

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
        const restaurant = restaurants.find(r => r.name === selectedOption.value);
        if (restaurant) {
          setSelectedRestaurant(restaurant);
          setName(restaurant.name);
          setAdress(restaurant.adress);
          setImageUrl(restaurant.image_url);
          setCategory(restaurant.category.map(c => ({ id: c, text: c })));
        } else {
          setSelectedRestaurant(null);
          setName(selectedOption.value);
          setAdress('');
          setImageUrl('');
          setCategory([]);
        }
    } else {
      setSelectedRestaurant(null);
      setName('');
      setAdress('');
      setImageUrl('');
      setCategory([]);
    }
  };

  const handleDeleteTag = (i: number) => {
    setCategory(category.filter((tag, index) => index !== i));
  };

  const handleAddTag = (tag: { id: string; text: string }) => {
    if (cuisines.includes(tag.text)) {
        setCategory([...category, tag]);
    }
  };

  const options = restaurants.map(r => ({ value: r.name, label: r.name }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      id: selectedRestaurant ? selectedRestaurant.id : null,
      name,
      adress,
      image_url: imageUrl,
      category: category.map(tag => tag.text),
    });
    setToastVisible(true);
  };

  return (
    <form className='restaurant-form' onSubmit={handleSubmit}>
        <Toast
                message="Restaurante Confirmado!"
                isVisible={toastVisible}
                hideToast={() => setToastVisible(false)}
                className='toast--green'
            />

        <div className='old-restaurant'>
            <p>Escolha um restaurante já cadastrado:</p>
            <Select
                blurInputOnSelect
                closeMenuOnScroll
                className='restaurants-select'
                placeholder="Restaurantes Cadastrados"
                options={options}
                isClearable
                onChange={handleSelectChange}
                styles={{
                    control: (baseStyles) => ({
                      ...baseStyles,
                      borderColor: 'none',
                      backgroundColor: '#c6a67f6e',
                    }),
                    dropdownIndicator: (baseStyles) => ({
                        ...baseStyles,
                        color: '#6d4c2d',
                        cursor: 'pointer',
                    }),
                    placeholder: (baseStyles) => ({
                        ...baseStyles,
                        color: '#6d4c2d',
                    }),
                    input: (baseStyles) => ({
                        ...baseStyles,
                        color: '#6d4c2d',
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        color: '#6d4c2d',
                        backgroundColor: state.isFocused? '#c6a67fec': baseStyles.backgroundColor
                    }),
                    menu: (baseStyles) => ({
                        ...baseStyles,
                        backgroundColor: '#c6a67f6e',
                    }),
                }}
                />
        </div>
        <div className='new-restaurant'>
            <p>Ou, Cadastre um novo restaurante:</p>
            <input type="text" value={name} required onChange={e => setName(e.target.value)} placeholder="Nome do Restaurante" />
            <input type="text" value={adress} required onChange={e => setAdress(e.target.value)} placeholder="Endereço" />
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL de uma foto do lugar" />
            <ReactTags
                tags={category}
                classNames={{
                    suggestions: 'custom-suggestions',
                    tagInput: 'custom-tagInput',
                    tagInputField: 'custom-tagInputField',
                    selected: 'custom-selected',
                    tags: 'custom-tags',
                    tag: 'custom-tag',
                    remove: 'custom-remove',
                    activeSuggestion: 'custom-activeSuggestion'
                  }}
                suggestions={cuisines.map(cuisine => ({ id: cuisine, text: cuisine }))}
                handleDelete={handleDeleteTag}
                handleAddition={handleAddTag}
                delimiters={delimiters}
                placeholder="Adicione uma categoria"
            />
            <button type="submit" className='submit-restaurant'>
                Confirmar Restaurante
            </button>
        </div>
    </form>
  );
};

export default RestaurantForm;