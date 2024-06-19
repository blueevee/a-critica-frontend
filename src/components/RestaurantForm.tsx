import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Restaurant, Cuisine} from '../interfaces/RestaurantInterface'
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
  const [allCuisines, setAllCuisines] = useState<string[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [name, setName] = useState('');
  const [address, setaddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [cuisines, setCuisines] = useState<{ id: string; text: string }[]>([]);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/restaurants`)
        .then((response) => {
          setRestaurants(response.data)
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/cuisines`)
        .then((response) => {
          setAllCuisines(response.data.map((cuisine: Cuisine) => (cuisine.cuisine_name)))
        })
        .catch((error) => {
          console.log(error);
        });
      // const data: Restaurant[] = [
      //   {
      //     id: 1,
      //     name: "Piqueta de cartoe ke",
      //     address: "rua boulebardc aaaaaaaa aaaaaaaaaa aaaaaaaaa aaaaaaa aaaaaaaaaa aaaaaaa",
      //     background_image: "https://freguesiacult.com.br/wp-content/uploads/restaurante-750x563.jpeg",
      //     reviews: 2,
      //     cuisines: ['Italiana', 'Japonesa', 'Drinks', 'Pizza']
      //   },
      //   {
      //     id: 2,
      //     name: "Piqueta",
      //     background_image: "",
      //     address: "rua bouleaaaaaaaaaaaa 12 sssbardc",
      //     reviews: 2,
      //     cuisines: ['Hamburguér', 'Drinks', 'Pizza']
      //   },
      //   {
      //     id: 3,
      //     name: "Piqueta",
      //     address: "rua boulebardceeee eeeee",
      //     reviews: 2,
      //     background_image: "",
      //     cuisines: ['Bolos', 'Drinks', 'Pizza']
      //   },
      //   {
      //     id: 4,
      //     name: "Piqueta sj djj eyy",
      //     address: "rua boulebardc",
      //     background_image: "",
      //     reviews: 2,
      //     cuisines: ['Drinks', 'Pizza']
      //   },
      //   {
      //     id: 5,
      //     name: "Piqueta",
      //     address: "rua boulebardc",
      //     background_image: "https://img.restaurantguru.com/w550/h367/ra36-pizza-Sweet-pizza-val-2023-01.jpg",
      //     reviews: 2,
      //     cuisines: ['Doces', 'Pizza']
      //   },
      //   {
      //     id: 6,
      //     name: "Pecorino",
      //     reviews: 2,
      //     address: "rua boulebardc",
      //     background_image: "",
      //     cuisines: ['Pizza']
      //   },
      //   {
      //     id: 7,
      //     name: "Pecorino",
      //     reviews: 212,
      //     address: "rua boulebardc",
      //     background_image: "https://freguesiacult.com.br/wp-content/uploads/restaurante-750x563.jpeg",
      //     cuisines: ['Pizza']
      //   }
      // ];

      // const allCuisines: string[] = [
      //   'Pizza',
      //   'Pidamio',
      //   'Italiana',
      //   'Francesa',
      //   'Japonesa',
      //   'Chinesa',
      //   'Árabe',
      //   'Hambúrguer',
      //   'Cafeteria',
      //   'Contemporânea',
      //   'Confeitaria'
      // ]
    };

    fetchRestaurants();
  }, []);

  const handleSelectChange = async (selectedOption: any) => {
    if (selectedOption) {
        const restaurant = restaurants.find(r => r.name === selectedOption.value);
        if (restaurant) {
          setSelectedRestaurant(restaurant);
          setName(restaurant.name);
          setaddress(restaurant.address);
          setImageUrl(restaurant.background_image);
          const findRestaurantCuisines = await fetch(`${import.meta.env.VITE_API_BASE_URL}/restaurant_cuisines/${restaurant.id}`);
          const restaurantCuisines = await findRestaurantCuisines.json();
          setCuisines(restaurantCuisines.map((c: String) => ({ id: c, text: c })));
        } else {
          setSelectedRestaurant(null);
          setName(selectedOption.value);
          setaddress('');
          setImageUrl('');
          setCuisines([]);
        }
    } else {
      setSelectedRestaurant(null);
      setName('');
      setaddress('');
      setImageUrl('');
      setCuisines([]);
    }
  };

  const handleDeleteTag = (i: number) => {
    setCuisines(cuisines.filter((tag, index) => index !== i));
  };

  const handleAddTag = (tag: { id: string; text: string }) => {
    if (allCuisines.includes(tag.text)) {
        setCuisines([...cuisines, tag]);
    }
  };

  const options = restaurants.map(r => ({ value: r.name, label: r.name }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({
      id: selectedRestaurant ? selectedRestaurant.id : null,
      name,
      address,
      background_image: imageUrl,
      cuisines: cuisines.map(tag => tag.text),
    });
    setToastVisible(true);
    setSelectedRestaurant(null);
    setName('');
    setaddress('');
    setImageUrl('');
    setCuisines([]);
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
            <input type="text" value={address} required onChange={e => setaddress(e.target.value)} placeholder="Endereço" />
            <input type="text" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="URL de uma foto do lugar" />
            <ReactTags
                tags={cuisines}
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
                suggestions={allCuisines.map(cuisine => ({ id: cuisine, text: cuisine }))}
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