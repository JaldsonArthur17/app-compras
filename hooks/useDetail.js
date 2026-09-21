import { useState } from 'react';
import { Dimensions } from 'react-native';

export const { width } = Dimensions.get('window');

export const toBRL = (usd) =>
  (usd * 5.2).toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const CAT_LABEL = {
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

export default function useDetail(product) {
  const [liked,      setLiked]      = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const images = product.images?.length > 0
    ? product.images
    : [product.thumbnail];

  const catLabel = CAT_LABEL[product.category] ?? product.category;

  const toggleLike = () => setLiked(prev => !prev);

  const onScroll = (e) =>
    setCurrentImg(Math.round(e.nativeEvent.contentOffset.x / width));

  return { liked, toggleLike, currentImg, onScroll, images, catLabel };
}