import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Precisa ser um email válido')
    .required('campo obrigatório'),
  password: yup.string().min(8, 'Mínimo 8 letras').required('campo obrigatório')
});

export default yupResolver(schema);
