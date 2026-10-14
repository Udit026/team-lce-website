/* =========================================================
   RATE CARD â€” one price list for every client.
   Edit prices / items here. The whole site updates.
   ========================================================= */

export let BASE_FEE = 25000 // foundation, dashboard, approvals, media library, reporting

export let PLATFORMS = [
  { id: 'fb', name: 'Facebook', sub: 'Official page', rate: 5000 },
  { id: 'ig', name: 'Instagram', sub: 'Professional account', rate: 5000 },
  { id: 'x', name: 'X', sub: 'Official candidate profile', rate: 4000 },
  { id: 'yt', name: 'YouTube', sub: 'Candidate channel', rate: 6000 },
  { id: 'wa', name: 'WhatsApp', sub: 'Channel & broadcast workflow', rate: 4000 },
  { id: 'web', name: 'Website', sub: 'Landing page, kept updated', rate: 8000 },
  { id: 'hub', name: 'Livestream hub', sub: 'All streams on one page', rate: 5000 },
]

export let CONTENT = [
  { id: 'fb_posts', label: 'Facebook posts', desc: 'Event updates, graphics and announcements', plats: ['fb'], per: 'day', rate: 250, max: 10 },
  { id: 'ig_posts', label: 'Instagram posts & stories', desc: 'Feed posts and stories', plats: ['ig'], per: 'day', rate: 200, max: 10 },
  { id: 'reels', label: 'Reels & Shorts', desc: 'One edit published to Instagram, Facebook and YouTube Shorts', plats: ['ig', 'fb', 'yt'], per: 'day', rate: 1000, max: 6 },
  { id: 'x_posts', label: 'X posts', desc: 'Updates, photos and video clips', plats: ['x'], per: 'day', rate: 150, max: 10 },
  { id: 'yt_videos', label: 'YouTube videos', desc: 'Speeches, event films and explainers', plats: ['yt'], per: 'week', rate: 2500, max: 7 },
  { id: 'wa_updates', label: 'WhatsApp channel updates', desc: 'Official updates and approved media links', plats: ['wa'], per: 'day', rate: 100, max: 6 },
]

export let LANG_PCT = 0.25 // second language version, % of content cost
export let PER = { day: 30, week: 4 }

export let CAMS = [
  { n: 1, name: '1 camera', desc: 'Meetings, interviews, press interactions', rate: 9000 },
  { n: 2, name: '2 cameras', desc: 'Wide shot + speaker close-up', rate: 18000 },
  { n: 3, name: '3 cameras', desc: 'Wide + candidate + audience', rate: 27000 },
  { n: 5, name: '5 cameras', desc: 'Rallies, roadshows, major events', rate: 48000 },
]

export let FIELD = [
  { id: 'photo', label: 'Photographer', desc: 'Event photography', rate: 6000 },
  { id: 'video', label: 'Video coverage', desc: 'Camera crew with operators; choose setup below', cams: true },
  { id: 'rtreels', label: 'Real-time reel desk', desc: 'Editor on site cuts 20â€“60 sec clips during the event', rate: 10000 },
  { id: 'rtphoto', label: 'Real-time photo distribution', desc: 'Photos upload live and go to your team and approved journalists', rate: 5000, needs: 'photo' },
]

export let LIVE_DEST = [
  { id: 'fbl', name: 'Facebook Live' },
  { id: 'ytl', name: 'YouTube Live' },
  { id: 'igl', name: 'Instagram Live' },
  { id: 'oth', name: 'Other approved channel' },
]
export let LIVE_RATE = 15000
export let LIVE_EXTRA_DEST = 5000

export let EQUIP = [
  { id: 'drone', label: 'Drone coverage', desc: 'Subject to permissions and local restrictions', rate: 12000 },
  { id: 'gimbal', label: 'Gimbal camera', desc: 'Walk-throughs, stage entry and exit', rate: 3000 },
  { id: 'audio', label: 'Wireless audio / lapel mics', desc: 'Clean speech for interviews and addresses', rate: 2500 },
  { id: 'light', label: 'Portable lighting', desc: 'Evening events and indoor recordings', rate: 4000 },
  { id: 'prompt', label: 'Teleprompter', desc: 'Recorded addresses', rate: 3500 },
  { id: 'crew', label: 'Extra crew member', desc: 'Additional hands for large events', rate: 4000 },
]

export let AD_FEE = 0.1

export let PRESETS = [
  {
    id: 'digital', name: 'Digital', desc: 'All major channels, graphics and reels. No field crew.',
    cfg: { plats: ['fb', 'ig', 'x', 'yt', 'wa'], content: { fb_posts: 2, ig_posts: 2, reels: 1, x_posts: 2, yt_videos: 1, wa_updates: 1 }, days: 0, ads: 50000 },
  },
  {
    id: 'field', name: 'Digital + Field', desc: 'Adds photo and 2-camera video crew for 8 event days.',
    cfg: { plats: ['fb', 'ig', 'x', 'yt', 'wa'], content: { fb_posts: 3, ig_posts: 2, reels: 1, x_posts: 2, yt_videos: 2, wa_updates: 1 }, days: 8, field: ['photo', 'video', 'rtphoto'], cam: 1, ads: 100000 },
  },
  {
    id: 'command', name: 'Command Centre', desc: 'Everything: 15 event days, live streaming and real-time desk.',
    cfg: { plats: ['fb', 'ig', 'x', 'yt', 'wa', 'web', 'hub'], content: { fb_posts: 4, ig_posts: 3, reels: 2, x_posts: 2, yt_videos: 3, wa_updates: 2 }, lang: true, days: 15, field: ['photo', 'video', 'rtreels', 'rtphoto'], cam: 2, live: 6, dest: ['fbl', 'ytl'], equip: ['gimbal', 'audio'], ads: 300000 },
  },
  { id: 'blank', name: 'Start from scratch', desc: 'Nothing selected. Build it item by item.', cfg: {} },
]

export let COMPARE = [
  ['Facebook, Instagram, X, YouTube', 'âœ“', 'âœ“', 'âœ“'],
  ['WhatsApp workflow', 'âœ“', 'âœ“', 'âœ“'],
  ['Graphics & reels', 'âœ“', 'âœ“', 'âœ“'],
  ['Dashboard & media archive', 'âœ“', 'âœ“', 'âœ“'],
  ['Photographer', 'â€”', 'âœ“', 'âœ“'],
  ['Videographer', 'â€”', 'âœ“', 'âœ“'],
  ['Real-time photo distribution', 'â€”', 'âœ“', 'âœ“'],
  ['Real-time editing', 'â€”', 'Optional', 'âœ“'],
  ['Live streaming', 'â€”', 'Optional', 'âœ“'],
  ['Multi-camera', 'â€”', 'Optional', 'âœ“'],
  ['Event production desk', 'â€”', 'Optional', 'âœ“'],
]

export let WA_PACKS = [
  { id: 'wa1', kicker: 'STARTER', name: '1 Lakh Messages', vol: '1,00,000', price: 20000, features: ['Text + image broadcasts', 'Opt-in list upload & cleaning', 'Delivery reports', 'Up to 4 campaigns'] },
  { id: 'wa2', kicker: 'GROWTH', name: '5 Lakh Messages', vol: '5,00,000', price: 85000, badge: 'BEST VALUE', features: ['Video, PDF & button messages', 'Ward-wise segmentation', 'Delivery & read reports', 'Reply inbox for 30 days'] },
  { id: 'wa3', kicker: 'SCALE', name: '10 Lakh Messages', vol: '10,00,000', price: 150000, features: ['Everything in Growth', 'Grievance & FAQ chatbot', 'Event RSVP & reminders', 'Dedicated account manager'] },
]

export let ADDONS = [
  { id: 'brand', name: 'Candidate photo shoot & brand kit', desc: 'Portraits, cover images and full template set', price: 30000 },
  { id: 'film', name: 'Profile / manifesto film', desc: '3â€“5 minute scripted film', price: 60000 },
  { id: 'survey', name: 'Constituency survey', desc: 'Ground + digital survey with booth-wise report', price: 60000 },
  { id: 'ivr', name: 'Voice calls (1 lakh)', desc: 'Recorded message calls to opt-in numbers', price: 25000 },
  { id: 'sms', name: 'Bulk SMS (1 lakh)', desc: 'DLT-registered templates', price: 15000 },
  { id: 'listening', name: 'Social listening', desc: 'Sentiment, trends and opposition tracking for a month', price: 20000 },
  { id: 'crisis', name: 'Reputation & crisis desk', desc: 'Rapid response team on standby for 30 days', price: 50000 },
  { id: 'warroom', name: 'Election war room', desc: 'On-site team for the final 30 days', price: 150000 },
]

/* Contact details (used in footer + mailto) */
export let CONTACT = { email: 'info@teamlce.in', phone: '+91 99103 60003' }




/**
 * Backend (GET /api/ratecard) ka data in constants mein bhar deta hai.
 * Jo section DB mein nahi hai, uska default value hi rehta hai.
 */
export function applyRateCard(d = {}) {
  if (d.baseFee !== undefined) BASE_FEE = d.baseFee
  if (d.langPct !== undefined) LANG_PCT = d.langPct
  if (d.adFee !== undefined) AD_FEE = d.adFee
  if (d.perMonth) PER = d.perMonth
  if (d.platforms) PLATFORMS = d.platforms
  if (d.content) CONTENT = d.content
  if (d.cameras) CAMS = d.cameras
  if (d.fieldItems) FIELD = d.fieldItems
  if (d.liveDestinations) LIVE_DEST = d.liveDestinations
  if (d.liveRates) { LIVE_RATE = d.liveRates.rate; LIVE_EXTRA_DEST = d.liveRates.extraDest }
  if (d.equipment) EQUIP = d.equipment
  if (d.presets) PRESETS = d.presets
  if (d.compareTable) COMPARE = d.compareTable
  if (d.waPacks) WA_PACKS = d.waPacks
  if (d.addons) ADDONS = d.addons
  if (d.contact) CONTACT = d.contact
}
