import { CarroCategoria } from "./produtocategoria.enum";
import { Endereco } from './endereco.model';

export class Carros{
  id!: string;
  marca!: string;
  modelo!: string;
  ano!: number;
  categoria!: CarroCategoria;
  concessionaria!: string;
  cep!: string;
  logradouro!: string;  
  bairro!: string;
  localidade!: string;
  numero!: number;
  endereco!: Endereco;
}
