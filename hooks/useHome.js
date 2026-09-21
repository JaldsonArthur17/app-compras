import axios from 'axios';
import { useEffect, useState } from 'react';

const CAT_LABEL = {
  all: 'Todos', smartphones: 'Smartphones', laptops: 'Laptops',
  'home-decoration': 'Casa', fragrances: 'Fragrâncias',
  skincare: 'Skincare', groceries: 'Mercado', furniture: 'Móveis',
  tops: 'Tops', 'womens-dresses': 'Vestidos', 'womens-shoes': 'Calç. F',
  'mens-shirts': 'Camisas', 'mens-shoes': 'Calç. M',
  'mens-watches': 'Relóg. M', 'womens-watches': 'Relóg. F',
  'womens-bags': 'Bolsas', 'womens-jewellery': 'Joias',
  sunglasses: 'Óculos', automotive: 'Autos',
  motorcycle: 'Motos', lighting: 'Iluminação',
};

export const SORT_OPTIONS = [
  { key: 'recent',     label: 'Mais recentes'  },
  { key: 'price_asc',  label: 'Menor preço'    },
  { key: 'price_desc', label: 'Maior preço'    },
  { key: 'rating',     label: 'Mais populares' },
];

export const catLabel = (cat) => CAT_LABEL[cat] ?? cat;

export const toBRL = (usd) =>
  (usd * 5.2).toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export default function useHome() {
  const [products,   setProducts]   = useState([]);
  const [filtered,   setFiltered]   = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [selCat,     setSelCat]     = useState('all');
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [modalVis,   setModalVis]   = useState(false);
  const [pendCat,    setPendCat]    = useState('all');
  const [pendSort,   setPendSort]   = useState('recent');
  const [activeSort, setActiveSort] = useState('recent');

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=10')
      .then(({ data }) => {
        setProducts(data.products);
        const cats = ['all', ...new Set(data.products.map(p => p.category))];
        setCategories(cats);
      })
      .catch(() => setError('Erro ao carregar produtos.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let list = [...products];

    if (search.trim())
      list = list.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()));

    if (selCat !== 'all')
      list = list.filter(p => p.category === selCat);

    switch (activeSort) {
      case 'price_asc':  list.sort((a, b) => a.price  - b.price);  break;
      case 'price_desc': list.sort((a, b) => b.price  - a.price);  break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      default:           list.sort((a, b) => a.id - b.id);
    }

    setFiltered(list);
  }, [products, search, selCat, activeSort]);

  const openModal = () => {
    setPendCat(selCat);
    setPendSort(activeSort);
    setModalVis(true);
  };

  const applyModal = () => {
    setSelCat(pendCat);
    setActiveSort(pendSort);
    setModalVis(false);
  };

  const clearAll = () => {
    setSelCat('all');
    setPendCat('all');
    setActiveSort('recent');
    setPendSort('recent');
    setModalVis(false);
  };

  const hasFilters = selCat !== 'all' || activeSort !== 'recent';

  return {
    filtered, categories, selCat, setSelCat,
    search, setSearch, loading, error,
    modalVis, setModalVis, pendCat, setPendCat,
    pendSort, setPendSort, hasFilters,
    openModal, applyModal, clearAll,
  };
}