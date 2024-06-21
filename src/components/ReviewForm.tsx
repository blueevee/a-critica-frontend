import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { DayPicker } from 'react-day-picker';
import { Review, ItemBill} from '../interfaces/ReviewInterface'
import { ptBR } from 'date-fns/locale';
import { useDropzone } from 'react-dropzone';
import { Toast } from './Toast';
import star from '../assets/rating-star.svg';
import decoration from '../assets/sep-decoration.svg';
import 'react-day-picker/dist/style.css';
import '../style/ReviewForm.css'

const ReviewForm: React.FC<{ onSubmit: (data: Review) => void }> = ({ onSubmit }) => {
    const [pseudonym, setPseudonym] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [visitDate, setVisitDate] = useState<Date>();
    const [imagePreview, setImagePreview] = useState<Array<string | ArrayBuffer | null>>([]);
    const [toastVisible, setToastVisible] = useState(false);
    const [bill, setBill] = useState<ItemBill[]>([{ item_description: "", amount: 1, price: 0 }]);
    const [files, setFiles] = useState<Array<string>>([]);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    setImagePreview([])
    acceptedFiles.forEach(file => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            if (typeof fileReader.result === 'string'){
                setImagePreview(prev => [...prev, fileReader.result]);
            }
        };
        fileReader.readAsDataURL(file);
      });
    }, []);

    const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

	const handleBillChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const values = [...bill];
		const name = event.target.name as keyof ItemBill;
		let value = event.target.value;
		if (name === "amount") {
			value = value.replace(/[^0-9]/g, '');
			if (value.length > 2) {
				value = value.slice(0, 2);
			}
			values[index][name] = Number(value) as never;
		} else {
			values[index][name] = value as never;
		}
		setBill(values);
	};

	const defaultMaskOptions = {
		prefix: 'R$',
		suffix: '',
		includeThousandsSeparator: true,
		thousandsSeparatorSymbol: '.',
		allowDecimal: true,
		decimalSymbol: ',',
		decimalLimit: 2,
		integerLimit: 7,
		allowNegative: false,
		allowLeadingZeroes: false,
	}
	const currencyMask = createNumberMask(defaultMaskOptions)

	const addBillItem = (event: React.FormEvent) => {
        event?.preventDefault()
		setBill([...bill, { item_description: "", amount: 1, price: 0 }]);
	};

	const handlePriceChange = (index: number, value: string) => {
		const values = [...bill];
		const numericValue = value.replace('R$', '').replace(',', '.');
		values[index].price = Number(numericValue);
		setBill(values);
	};

    const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    for (let file of acceptedFiles) {
        const formData = new FormData();
        formData.append('file', file)
        formData.append('upload_preset', 'a-critica')
        formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY)

        try {
            const uploadResults = await fetch(import.meta.env.VITE_CLOUDINARY_UPLOAD_URL, {
                method: 'POST',
                body: formData
            }).then(r => r.json());
            files.push(uploadResults.secure_url)
          } catch (error) {
            console.error('ERRO: Não consegui salvar suas fotos desse comentário 😭😭', error);
          }

    }

    let formatedDate: string = new Date().toISOString();
    if (visitDate !== undefined){
        formatedDate = visitDate.toISOString();
    }
    const newReview: Review = { pseudonym, rating, comment, visit_date: formatedDate, images: files, bill};
    setPseudonym('');
    setRating(0);
    setComment('');
    setVisitDate(new Date());
    setToastVisible(true);
    setImagePreview([])
    setBill([{ item_description: "", amount: 1, price: 0 }])
    onSubmit(newReview);
  };


  let calendarFooter = <p>Escolha uma data.</p>;
  if (visitDate) {
    calendarFooter = <p><b>Data da visita: {format(visitDate, 'dd/MM/yyyy')}.</b></p>;
  }

  return (
    <div>
        <Toast
                message="Comentário adicionada com sucesso!"
                isVisible={toastVisible}
                hideToast={() => setToastVisible(false)}
                className='toast--green'
            />
        <div className='sep-decor'>
            <div className="sep-line"></div>
            <div>
                <img src={decoration} alt="arabesco retrô" />
            </div>
                <div className="sep-line"></div>
        </div>
        <h2>Adicione uma crítica!</h2>
        <form className='review-form' onSubmit={handleSubmit}>
            <div className='col-1'>
                <label className='named-field'>
                    <p><img src={star} alt="estrela" /> Nota ({rating}):</p>
                    <input type="range" min="0" max="10" step="0.1" value={rating} onChange={(e) => setRating(parseFloat(e.target.value))} />
                </label>
                <label>
                    <DayPicker
                        mode="single"
                        required
                        selected={visitDate}
                        onSelect={setVisitDate}
                        footer={calendarFooter}
                        disabled={{ after: new Date() }}
                        locale={ptBR}
						/>
                </label>
            </div>
            <div className='col-3'>
                <div className='upload-area'  {...getRootProps()}>
                    <input {...getInputProps()}
                        id="image"
                        type="file"
                        name="image"
                        multiple
                        accept='image/png, image/jpg'
						/>
                        {
							isDragActive ?
                            <p>Arraste algumas fotos pra cá...</p> :
                            <p>Arraste ou clique aqui para adicionar as fotos da visita.</p>
                        }
                    </div>
                <div className='preview-upload'>
                    {imagePreview.map((preview, index) => <img key={index} src={preview?.toString()} alt="" />)}
                </div>
            </div>
            <div className='col-2'>
                <label>
                    <input type="text" value={pseudonym} required onChange={(e) => setPseudonym(e.target.value)} placeholder="Um codenome pro dono dessa crítica..." />
                </label>
                <label>
                    <textarea value={comment} required onChange={(e) => setComment(e.target.value)} placeholder="Como foi sua visita?" />
                </label>
            	<div className='col-bill-itens'>
					<h2>Descreva os itens desse pedido:</h2>
					{bill.map((item, index) => (
    					<div key={index}>
                            <label ><strong>Qual item você pediu?</strong></label>
        					<input
            					type="text"
            					name="item_description"
            					value={item.item_description}
            					onChange={event => handleBillChange(index, event)}
            					placeholder="Descrição do item"
        					/>
                            <label ><strong>Quantidade do mesmo item:</strong></label>
        					<input
            					type="text"
            					name="amount"
            					value={item.amount.toString()}
            					onChange={event => handleBillChange(index, event)}
            					placeholder="Quantidade"
        					/>
            				<label ><strong>Preço Unitário:</strong></label>
        					<MaskedInput
            					mask={currencyMask}
            					value={`R$ ${item.price.toFixed(2).replace('.', ',')}`}
            					onChange={event => handlePriceChange(index, event.target.value)}
            					placeholder="Preço Unitário"
        					/>
    					</div>
					))}
					<button className='add-item' onClick={addBillItem}>Adicionar mais um item</button>
            	</div>
                <button className='add-review' type="submit">Adicionar comentário</button>
            </div>
        </form>
    </div>
  );
};

export default ReviewForm;
