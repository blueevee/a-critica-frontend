import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Review } from '../interfaces/ReviewInterface'
import { ptBR } from 'date-fns/locale';
import { useDropzone } from 'react-dropzone';
import { Toast } from './Toast';
import star from '../assets/rating-star.svg';
import decoration from '../assets/sep-decoration.svg';
import 'react-day-picker/dist/style.css';
import '../style/ReviewForm.css'

const ReviewForm: React.FC<{ onSubmit: (data: Review) => void }> = ({ onSubmit }) => {
    const [username, setUsername] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [visitDate, setVisitDate] = useState<Date>();
    const [imagePreview, setImagePreview] = useState<Array<string | ArrayBuffer | null>>([]);
    const [toastVisible, setToastVisible] = useState(false);
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
            // console.log("00000      ",uploadResults);
            files.push(uploadResults.secure_url)
          } catch (error) {
            console.error('Erro ao salvar imagens', error);
          }

    }

    let formatedDate: string = new Date().toISOString();
    if (visitDate !== undefined){
        formatedDate = visitDate.toISOString();
    }
    const newReview: Review = { username, rating, comment, visit_date: formatedDate, images: files};
    // setReview(newReview);
    setUsername('');
    setRating(0);
    setComment('');
    setVisitDate(new Date());
    setToastVisible(true);
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
                    <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)} placeholder="Um codenome pro dono dessa crítica..." />
                </label>
                <label>
                    <textarea value={comment} required onChange={(e) => setComment(e.target.value)} placeholder="Como foi sua visita?" />
                </label>
                <button className='add-review' type="submit">Adicionar comentário</button>
            </div>
        </form>
    </div>
  );
};

export default ReviewForm;
