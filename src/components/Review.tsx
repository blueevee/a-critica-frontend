import React, {useState} from 'react';
// import axios from 'axios';
import {ReviewInterface} from '../interfaces/ReviewInterface'
import StarRating from './StarRating';
import Modal from 'react-modal';
import '../style/Review.css'

Modal.setAppElement('#root');

const Review: React.FC<ReviewInterface> = ({review}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (image: string) => {
                setSelectedImage(image);
                setModalIsOpen(true);
            };


    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className='review-card'>
            <div className='review-col-1'>
                <h3>{review.username}</h3>
                <p>{new Date(review.visit_date).toLocaleDateString('pt-BR')}</p>
            </div>
            <div className='review-col-2'>
                <StarRating rating={review.rating}/>
                <p>{review.comment}</p>
                <h3>Conta detalhada</h3>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Item</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {review.bill?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.amount} x</td>
                                    <td>{item.item}</td>
                                    <td>R${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
            <div className='review-col-3'>
                {review.images?.map((image, index) => (
                    <div className='review-image' key={index} onClick={() => openModal(image)}>
                        <img src={image} alt={`Imagem ${index + 1}`} />
                    </div>
                ))}
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Imagem selecionada"
                >
                    <button onClick={closeModal}>Fechar</button>
                    <img src={selectedImage} alt="Imagem selecionada" />
                </Modal>
            </div>

        </div>
    );
};

export default Review;
