import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import * as Speech from 'expo-speech';

export default function App() {
  const [token, setToken] = useState(''); const [learner, setLearner] = useState('');
  const [login, setLogin] = useState(''); const [password, setPassword] = useState('');
  const [grades, setGrades] = useState<any[]>([]); const [unit, setUnit] = useState<any>(null);
  const [index, setIndex] = useState(0); const [reveal, setReveal] = useState(false);
  const [busy, setBusy] = useState(false); const [answer, setAnswer] = useState('');
  const [chat, setChat] = useState(false); const [history, setHistory] = useState<any[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  async function api(path: string, body?: unknown, session = token, profile = learner) {
    const response = await fetch(`https://english1234.vercel.app/api/mobile/${path}`, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session}`, 'x-learner-id': profile }, ...(body ? { body: JSON.stringify(body) } : {}) });
    const data = await response.json().catch(() => ({ error: 'Máy chủ chưa cập nhật API Android.' }));
    if (!response.ok) throw new Error(data.error || 'Không kết nối được máy chủ.'); return data;
  }
  async function load(session: string) { const me = await api('me', undefined, session); const id = me.profiles[0]?.id; if (!id) throw new Error('Hãy tạo hồ sơ trên website trước.'); const data = await api('curriculum', undefined, session, id); setLearner(id); setGrades(data.grades); setToken(session); }
  async function run(action: () => Promise<void>) { setBusy(true); try { await action(); } catch (e) { Alert.alert('English123', e instanceof Error ? e.message : 'Hãy thử lại.'); } finally { setBusy(false); } }
  useEffect(() => { void SecureStore.getItemAsync('session').then(saved => { if (saved) return run(() => load(saved)); }); return () => { void Speech.stop(); }; }, []);
  function button(title: string, action: () => void) { return <TouchableOpacity disabled={busy} style={styles.button} onPress={action}><Text style={{ color: 'white', fontWeight: '700' }}>{title}</Text></TouchableOpacity>; }
  function speak(text: string) { void Speech.stop(); Speech.speak(text, { language: 'en-US', rate: .85 }); }
  const activities = unit?.lessons.flatMap((l: any) => l.activities) || []; const current = activities[index]; const p = current?.payload || {};
  async function submit(value: unknown) { await run(async () => { const result = await api('attempts', { activityId: current.id, answer: value }); Alert.alert(`${result.score} điểm`, `Ôn lại: ${new Date(result.reviewDueAt).toLocaleString('vi-VN')}`); }); }
  return <SafeAreaProvider><SafeAreaView style={{ flex: 1, backgroundColor: '#eff6f1' }}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 20 }}><Text style={styles.title}>English123 · Android</Text>
    {!token ? <><Text>Dùng tài khoản đang học trên website.</Text><TextInput style={styles.input} placeholder="Tên đăng nhập" autoCapitalize="none" value={login} onChangeText={setLogin}/><TextInput style={styles.input} placeholder="Mật khẩu" secureTextEntry value={password} onChangeText={setPassword}/>{button('Đăng nhập', () => void run(async () => { const data = await api('login', { login, password }, ''); await load(data.token); await SecureStore.setItemAsync('session', data.token); setPassword(''); }))}</> : !unit ? <>
    {grades.map(grade => <View style={styles.card} key={grade.id}><Text style={styles.title}>{grade.name}</Text>{grade.courses.flatMap((c: any) => c.units).map((u: any) => <View key={u.id}>{button(u.title, () => void run(async () => { const data = await api(`units/${u.id}`); setUnit(data.unit); setIndex(0); setReveal(false); setChat(false); setHistory([]); }))}</View>)}</View>)}
    {button('Đăng xuất', () => void run(async () => { await api('logout', {}); await SecureStore.deleteItemAsync('session'); setToken(''); }))}</> : <>
    {button('← Lộ trình', () => { void Speech.stop(); setUnit(null); })}<Text style={styles.title}>{unit.title}</Text>{button(chat ? 'Bài học' : 'Chat AI theo Unit', () => { setChat(!chat); setAnswer(''); })}
    {chat ? <>{history.map((m, i) => <Text key={i} style={styles.card}>{m.role === 'user' ? 'Bạn' : 'AI'}: {m.content}</Text>)}<TextInput style={styles.input} maxLength={240} value={answer} onChangeText={setAnswer} placeholder="Nói gì đó bằng tiếng Anh…"/>{button('Gửi', () => void run(async () => { if (!answer.trim()) return; const data = await api('chat', { unitId: unit.id, message: answer, history: history.slice(-8) }); setHistory([...history, { role: 'user', content: answer }, { role: 'assistant', content: data.reply }]); setAnswer(''); speak(data.reply); }))}</> : current ? <View style={styles.card}><Text>Bước {index + 1}/{activities.length}</Text><Text style={styles.title}>{current.title}</Text><Text>{current.instruction}</Text>
    {p.imageUrl && <View style={{ width: 240, height: 240, overflow: 'hidden', alignSelf: 'center', marginVertical: 12, borderRadius: 14 }}><Image source={{ uri: p.imageUrl.startsWith('/') ? `https://english1234.vercel.app${p.imageUrl}` : p.imageUrl }} style={p.spriteIndex === undefined ? { width: 240, height: 240 } : { position: 'absolute', width: 240 * (p.spriteColumns || 3), height: 240 * (p.spriteRows || 2), left: -240 * (p.spriteIndex % (p.spriteColumns || 3)), top: -240 * Math.floor(p.spriteIndex / (p.spriteColumns || 3)) }} resizeMode={p.spriteIndex === undefined ? 'cover' : 'stretch'}/></View>}
    {current.type === 'FLASHCARD' ? <><Text>{p.definition}</Text>{button('Nghe từ', () => speak(p.front || ''))}{button('Xem đáp án', () => setReveal(true))}{reveal && <><Text style={styles.title}>{p.front}</Text><Text>{p.back}</Text>{button('Nhớ rồi', () => void submit({ known: true }))}{button('Chưa nhớ', () => void submit({ known: false }))}</>}</> : ['SENTENCE', 'LISTEN_TYPE', 'SHORT_WRITING'].includes(current.type) ? <><Text>{p.scenario || p.prompt}</Text>{button('Nghe câu', () => speak(p.target || p.text || ''))}<TextInput style={styles.input} value={answer} onChangeText={setAnswer} placeholder="Nhập câu tiếng Anh"/>{button('Kiểm tra', () => void submit({ text: answer }))}</> : ['MULTIPLE_CHOICE', 'LISTEN_CHOOSE'].includes(current.type) ? <><Text>{p.prompt}</Text>{p.text && button('Nghe', () => speak(p.text))}{(p.options || []).map((option: any) => <View key={option.id}>{button(`${answer === option.id ? '● ' : ''}${option.text}`, () => setAnswer(option.id))}</View>)}{button('Kiểm tra', () => void submit({ optionId: answer }))}</> : <Text>Hoạt động này chưa được chuyển sang Android trong bản đang phát triển.</Text>}
    {current.type === 'MATCHING' && <>{(p.pairs || []).map((pair: any) => <View key={pair.left} style={styles.card}><Text style={styles.title}>{pair.left}</Text>{[...(p.pairs || [])].reverse().map((choice: any) => <View key={choice.right}>{button(`${matches[pair.left] === choice.right ? '● ' : ''}${choice.right}`, () => setMatches({ ...matches, [pair.left]: choice.right }))}</View>)}</View>)}{button('Kiểm tra ghép từ', () => void submit({ pairs: Object.entries(matches).map(([left, right]) => ({ left, right })) }))}</>}
    {button('Tiếp theo →', () => { void Speech.stop(); setReveal(false); setAnswer(''); setMatches({}); if (index + 1 < activities.length) setIndex(index + 1); else setUnit(null); })}</View> : <Text>Chưa có hoạt động.</Text>}</>}
    {busy && <Text>Đang xử lý…</Text>}
  </ScrollView></SafeAreaView></SafeAreaProvider>;
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: '700', color: '#14543e', marginVertical: 14 },
  card: { backgroundColor: 'white', padding: 18, borderRadius: 16, marginVertical: 10 },
  button: { padding: 16, backgroundColor: '#087f68', borderRadius: 12, marginVertical: 6 },
  input: { padding: 14, borderWidth: 1, borderColor: '#aec8bb', borderRadius: 12, marginVertical: 10 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
