import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal, SafeAreaView,
  ScrollView,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import useHome, { catLabel, SORT_OPTIONS, toBRL } from '../hooks/useHome';
import s, { PRIMARY, SUBTEXT } from '../styles/homeStyles';

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

