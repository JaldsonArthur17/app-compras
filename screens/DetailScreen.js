import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import useDetail, { toBRL } from '../hooks/useDetail';
import s, { PRIMARY, SUBTEXT, TEXT } from '../styles/detailStyles';

const PRIMARY = '#5B5FEF';
const BG      = '#F2F2F2';
const CARD    = '#FFF';
const TEXT    = '#111';
const SUBTEXT = '#777';

const SpecRow = ({ label, value }) => (
  <View style={s.specRow}>
    <Text style={s.specLbl}>{label}:</Text>
    <Text style={s.specVal}>{value}</Text>
  </View>
);

export default function DetailScreen({ navigation, route }) {
  const { product } = route.params;
  const { liked, toggleLike, currentImg, onScroll, images, catLabel } = useDetail(product);

  return (
    <SafeAreaView style={s.safe}>

      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 18, color: TEXT }}>‹ Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLike}>
          <Text style={{ fontSize: 22, color: liked ? '#E74C3C' : '#CCC' }}>
            {liked ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScroll}
        >
          {images.map((uri, i) => (
            <Image key={i} source={{ uri }} style={s.image} resizeMode="contain" />
          ))}
        </ScrollView>

        {images.length > 1 && (
          <View style={s.dots}>
            {images.map((_, i) => (
              <View key={i} style={[s.dot, i === currentImg && s.dotActive]} />
            ))}
          </View>
        )}

        <View style={s.info}>

          <Text style={s.name}>{product.title}</Text>
          <Text style={s.cat}>{catLabel}</Text>
          <Text style={s.price}>R$ {toBRL(product.price)}</Text>

          <View style={s.ratingRow}>
            {[1,2,3,4,5].map(i => (
              <Text key={i} style={{ color: '#F59E0B', fontSize: 16 }}>
                {i <= Math.round(product.rating) ? '★' : '☆'}
              </Text>
            ))}
            <Text style={s.ratingVal}> {product.rating.toFixed(1)}</Text>
            <Text style={s.stock}>  ·  Estoque: {product.stock}</Text>
          </View>

          <Text style={s.sectionTitle}>Descrição</Text>
          <Text style={s.desc}>{product.description}</Text>

          <Text style={s.sectionTitle}>Especificações</Text>
          <View style={s.specsBox}>
            {product.brand && <SpecRow label="Marca"    value={product.brand} />}
            {product.sku   && <SpecRow label="SKU"      value={product.sku}   />}
            {product.weight && <SpecRow label="Peso"    value={`${product.weight}g`} />}
            {product.warrantyInformation && <SpecRow label="Garantia"  value={product.warrantyInformation} />}
            {product.shippingInformation && <SpecRow label="Envio"     value={product.shippingInformation} />}
            {product.returnPolicy        && <SpecRow label="Devolução" value={product.returnPolicy}        />}
          </View>

        </View>

      </ScrollView>

      <View style={s.footer}>
        <TouchableOpacity style={s.cartBtn}>
          <Text style={s.cartTxt}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}
