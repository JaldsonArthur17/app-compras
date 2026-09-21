import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal, SafeAreaView,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useHome, { catLabel, SORT_OPTIONS, toBRL } from '../hooks/useHome';

const PRIMARY = '#5B5FEF';
const BG      = '#F2F2F2';
const CARD    = '#FFF';
const TEXT    = '#111';
const SUBTEXT = '#777';

export default function HomeScreen({ navigation }) {
  const {
    filtered, categories, selCat, setSelCat,
    search, setSearch, loading, error,
    modalVis, setModalVis, pendCat, setPendCat,
    pendSort, setPendSort, hasFilters,
    openModal, applyModal, clearAll,
  } = useHome();

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={s.card}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Detail', { product: item })}
    >
      <Image source={{ uri: item.thumbnail }} style={s.cardImg} resizeMode="cover" />
      <View style={s.cardInfo}>
        <Text style={s.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={s.cardCat}>{catLabel(item.category)}</Text>
        <Text style={s.cardPrice}>R$ {toBRL(item.price)}</Text>
        <Text style={s.cardRating}>★ {item.rating.toFixed(1)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.safe}>

      <View style={s.header}>
        <Text style={s.headerTitle}>Product Explorer</Text>
      </View>

      <View style={s.searchRow}>
        <TextInput
          style={s.searchInput}
          placeholder="Buscar produto..."
          placeholderTextColor={SUBTEXT}
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={[s.filterBtn, hasFilters && s.filterBtnOn]}
          onPress={openModal}
        >
          <Text style={[s.filterBtnTxt, hasFilters && { color: '#fff' }]}>
            Filtrar{hasFilters ? ' ✓' : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.chipRow}
        style={{ marginBottom: 8 }}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[s.chip, selCat === cat && s.chipActive]}
            onPress={() => setSelCat(cat)}
          >
            <Text style={[s.chipTxt, selCat === cat && s.chipTxtActive]}>
              {catLabel(cat)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={s.countTxt}>{filtered.length} produto(s)</Text>

      {loading ? (
        <ActivityIndicator size="large" color={PRIMARY} style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={s.emptyTxt}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderProduct}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={s.emptyTxt}>Nenhum produto encontrado.</Text>}
        />
      )}

      <Modal visible={modalVis} animationType="slide" transparent>
        <View style={s.overlay}>
          <View style={s.modal}>

            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>Filtrar</Text>
              <TouchableOpacity onPress={() => setModalVis(false)}>
                <Text style={{ fontSize: 20, color: SUBTEXT }}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
              <Text style={s.modalSection}>Categoria</Text>
              <View style={s.catGrid}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat}
                    style={[s.gridItem, pendCat === cat && s.gridItemActive]}
                    onPress={() => setPendCat(cat)}
                  >
                    <Text style={[s.gridTxt, pendCat === cat && { color: '#fff' }]}>
                      {catLabel(cat)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={s.modalSection}>Ordenação</Text>
              {SORT_OPTIONS.map(opt => (
                <TouchableOpacity
                  key={opt.key}
                  style={s.sortRow}
                  onPress={() => setPendSort(opt.key)}
                >
                  <View style={[s.radio, pendSort === opt.key && s.radioOn]}>
                    {pendSort === opt.key && <View style={s.radioDot} />}
                  </View>
                  <Text style={s.sortTxt}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={s.modalActions}>
              <TouchableOpacity style={s.btnClear} onPress={clearAll}>
                <Text style={s.btnClearTxt}>Limpar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.btnApply} onPress={applyModal}>
                <Text style={s.btnApplyTxt}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: BG },
  header:       { paddingHorizontal: 16, paddingVertical: 14 },
  headerTitle:  { fontSize: 20, fontWeight: '700', color: TEXT },

  searchRow:    { flexDirection: 'row', paddingHorizontal: 16, gap: 8, marginBottom: 10 },
  searchInput:  { flex: 1, backgroundColor: CARD, borderRadius: 8, paddingHorizontal: 12,
                  paddingVertical: 9, fontSize: 14, color: TEXT,
                  borderWidth: 1, borderColor: '#DDD' },
  filterBtn:    { backgroundColor: CARD, borderRadius: 8, paddingHorizontal: 14,
                  paddingVertical: 9, borderWidth: 1, borderColor: '#DDD',
                  justifyContent: 'center' },
  filterBtnOn:  { backgroundColor: PRIMARY, borderColor: PRIMARY },
  filterBtnTxt: { fontSize: 13, fontWeight: '600', color: PRIMARY },

  chipRow:      { paddingHorizontal: 16, gap: 8 },
  chip:         { backgroundColor: CARD, borderRadius: 20, paddingHorizontal: 14,
                  paddingVertical: 7, borderWidth: 1, borderColor: '#DDD' },
  chipActive:   { backgroundColor: PRIMARY, borderColor: PRIMARY },
  chipTxt:      { fontSize: 12, fontWeight: '500', color: SUBTEXT },
  chipTxtActive:{ color: '#fff' },

  countTxt:     { fontSize: 12, color: SUBTEXT, paddingHorizontal: 16, marginBottom: 6, marginTop: 4 },

  list:         { paddingHorizontal: 16, paddingBottom: 30 },
  card:         { flexDirection: 'row', backgroundColor: CARD, borderRadius: 10,
                  padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#EEE' },
  cardImg:      { width: 72, height: 72, borderRadius: 8, backgroundColor: '#F0F0F0' },
  cardInfo:     { flex: 1, marginLeft: 12, justifyContent: 'center', gap: 3 },
  cardTitle:    { fontSize: 14, fontWeight: '600', color: TEXT },
  cardCat:      { fontSize: 12, color: PRIMARY },
  cardPrice:    { fontSize: 14, fontWeight: '700', color: TEXT },
  cardRating:   { fontSize: 12, color: '#F59E0B' },
  emptyTxt:     { textAlign: 'center', color: SUBTEXT, marginTop: 40 },

  overlay:      { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal:        { backgroundColor: CARD, borderTopLeftRadius: 20, borderTopRightRadius: 20,
                  padding: 20, maxHeight: '85%' },
  modalHeader:  { flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', marginBottom: 16 },
  modalTitle:   { fontSize: 16, fontWeight: '700', color: TEXT },
  modalSection: { fontSize: 13, fontWeight: '600', color: TEXT, marginBottom: 10, marginTop: 8 },

  catGrid:      { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  gridItem:     { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
                  borderWidth: 1, borderColor: '#DDD', backgroundColor: CARD },
  gridItemActive:{ backgroundColor: PRIMARY, borderColor: PRIMARY },
  gridTxt:      { fontSize: 12, fontWeight: '500', color: SUBTEXT },

  sortRow:      { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10,
                  borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  radio:        { width: 20, height: 20, borderRadius: 10, borderWidth: 2,
                  borderColor: '#CCC', alignItems: 'center', justifyContent: 'center' },
  radioOn:      { borderColor: PRIMARY },
  radioDot:     { width: 10, height: 10, borderRadius: 5, backgroundColor: PRIMARY },
  sortTxt:      { fontSize: 14, color: TEXT },

  modalActions: { flexDirection: 'row', gap: 10, marginTop: 16 },
  btnClear:     { flex: 1, paddingVertical: 13, borderRadius: 8,
                  borderWidth: 1, borderColor: '#DDD', alignItems: 'center' },
  btnClearTxt:  { color: SUBTEXT, fontWeight: '600' },
  btnApply:     { flex: 2, paddingVertical: 13, borderRadius: 8,
                  backgroundColor: PRIMARY, alignItems: 'center' },
  btnApplyTxt:  { color: '#fff', fontWeight: '700' },
});