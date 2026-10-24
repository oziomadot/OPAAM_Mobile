import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, Share, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { get, post } from '../../utils/http';

type Pack = { property_id: number; caption: string; media_type: 'video'|'image'; media_url: string; listing_url: string; manual_only: boolean };
type ApiResult<T> = { data: T };
const platforms = ['tiktok','facebook','instagram','x','whatsapp','threads','linkedin','other'] as const;
type Platform = typeof platforms[number];

export default function PropertySocialShareScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pack, setPack] = useState<Pack|null>(null);
  const [caption, setCaption] = useState('');
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [postUrl, setPostUrl] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    if (!id || !/^\d+$/.test(id)) return;
    setBusy(true);
    get<ApiResult<Pack>>(`/properties/${id}/social-share/prepare`)
      .then((response) => {
        const result = response as unknown as ApiResult<Pack>;
        if (active) { setPack(result.data); setCaption(result.data.caption); }
      })
      .catch((error) => { if (active) Alert.alert('Sharing unavailable', error?.message || 'Could not prepare this property.'); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [id]);

  async function record(event: 'opened'|'reported', url?: string) {
    if (!id) return;
    await post(`/properties/${id}/social-share/activity`, { platform, event, ...(url ? {post_url: url} : {}) });
  }

  async function share() {
    if (!pack) return;
    setBusy(true);
    try {
      await Share.share({ message: `${caption}\n\nMedia: ${pack.media_url}`, title: 'Share OHLAM property' });
      // A share-sheet selection is not proof of publication.
      await record('opened');
      Alert.alert('Next step', 'Open the social app to create and publish the post yourself. Use the media link to download the photo or video.');
    } catch (error: any) { Alert.alert('Share failed', error?.message || 'Try again.'); }
    finally { setBusy(false); }
  }

  async function report() {
    const value = postUrl.trim();
    if (!/^https:\/\//i.test(value)) { Alert.alert('Invalid link', 'Enter the HTTPS link to your published post.'); return; }
    setBusy(true);
    try { await record('reported', value); setPostUrl(''); Alert.alert('Saved', 'The submitted link is recorded for review, not independently verified.'); }
    catch (error: any) { Alert.alert('Could not save', error?.message || 'Try again.'); }
    finally { setBusy(false); }
  }

  return <ScrollView contentContainerStyle={styles.page}>
    <Text style={styles.heading}>Share your OHLAM property</Text>
    <Text style={styles.note}>Only approved public listings can be shared. Nothing is automatically published.</Text>
    {busy && <ActivityIndicator />}
    {pack && <>
      <Text style={styles.label}>Choose a social platform</Text>
      <View style={styles.choices}>{platforms.map((item) =>
        <TouchableOpacity key={item} style={[styles.chip,platform===item && styles.selected]} onPress={()=>setPlatform(item)}>
          <Text style={styles.chipText}>{item.toUpperCase()}</Text>
        </TouchableOpacity>
      )}</View>
      <Text style={styles.label}>Review and edit your caption</Text>
      <TextInput multiline style={styles.input} value={caption} onChangeText={setCaption} />
      <Text style={styles.note}>Available media: {pack.media_type}. Save it to your device before creating a TikTok post.</Text>
      <TouchableOpacity style={styles.button} onPress={()=>Linking.openURL(pack.media_url).catch(()=>Alert.alert('Error','Could not open media URL.'))}><Text style={styles.buttonText}>Open property media</Text></TouchableOpacity>
      <TouchableOpacity disabled={busy} style={styles.button} onPress={share}><Text style={styles.buttonText}>Open sharing options</Text></TouchableOpacity>
      <Text style={styles.label}>After publishing (optional)</Text>
      <TextInput autoCapitalize="none" style={styles.input} value={postUrl} onChangeText={setPostUrl} placeholder="Paste the published post HTTPS URL" />
      <TouchableOpacity disabled={busy} style={styles.button} onPress={report}><Text style={styles.buttonText}>Record published post URL</Text></TouchableOpacity>
    </>}
  </ScrollView>;
}

const styles=StyleSheet.create({
  page:{padding:20,gap:12},heading:{fontSize:22,fontWeight:'700'},note:{color:'#555',lineHeight:21},
  label:{fontWeight:'600',marginTop:8},choices:{flexDirection:'row',flexWrap:'wrap',gap:8},
  chip:{padding:10,borderWidth:1,borderColor:'#aaa',borderRadius:8},selected:{backgroundColor:'#c9eadb'},
  chipText:{fontSize:12,color:'#222'},input:{borderColor:'#aaa',borderWidth:1,borderRadius:8,padding:12,minHeight:50,textAlignVertical:'top'},
  button:{backgroundColor:'#086f4c',padding:14,borderRadius:8,alignItems:'center'},buttonText:{color:'#fff',fontWeight:'600'}
});
