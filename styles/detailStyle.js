import { Platform, StyleSheet } from 'react-native';

export const PRIMARY = '#5B5FEF';
export const BG      = '#F2F2F2';
export const CARD    = '#FFF';
export const TEXT    = '#111';
export const SUBTEXT = '#777';

export default StyleSheet.create({
  safe:         { flex: 1, backgroundColor: BG },
  header:       { flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn:      { paddingVertical: 4 },

  image:        { height: 260, backgroundColor: CARD },
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