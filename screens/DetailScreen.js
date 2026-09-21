import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import useDetail, { toBRL, width } from '../hooks/useDetail';

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

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: BG },
  header:       { flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn:      { paddingVertical: 4 },

  image:        { width, height: 260, backgroundColor: CARD },
  dots:         { flexDirection: 'row', justifyContent: 'center', gap: 6, marginVertical: 10 },
  dot:          { width: 6, height: 6, borderRadius: 3, backgroundColor: '#CCC' },
  dotActive:    { backgroundColor: PRIMARY, width: 16 },

  info:         { padding: 16, gap: 4 },
  name:         { fontSize: 18, fontWeight: '700', color: TEXT },
  cat:          { fontSize: 13, color: PRIMARY, fontWeight: '500' },
  price:        { fontSize: 22, fontWeight: '800', color: TEXT, marginTop: 4 },

  ratingRow:    { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  ratingVal:    { fontSize: 13, fontWeight: '600', color: TEXT },
  stock:        { fontSize: 12, color: SUBTEXT },

  sectionTitle: { fontSize: 14, fontWeight: '700', color: TEXT, marginTop: 14, marginBottom: 6 },
  desc:         { fontSize: 14, color: SUBTEXT, lineHeight: 22 },

  specsBox:     { backgroundColor: CARD, borderRadius: 10, padding: 12,
                  borderWidth: 1, borderColor: '#EEE', gap: 8 },
  specRow:      { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  specLbl:      { fontSize: 13, fontWeight: '600', color: TEXT },
  specVal:      { fontSize: 13, color: SUBTEXT, flex: 1 },

  footer:       { padding: 16, paddingBottom: Platform.OS === 'ios' ? 28 : 16,
                  backgroundColor: CARD, borderTopWidth: 1, borderTopColor: '#EEE' },
  cartBtn:      { backgroundColor: PRIMARY, borderRadius: 10,
                  paddingVertical: 15, alignItems: 'center' },
  cartTxt:      { color: '#fff', fontWeight: '700', fontSize: 15 },
});