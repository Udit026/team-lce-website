/**
 * Har section ka naam + simple validation.
 * Admin panel se galat data save na ho, isliye yahan check hota hai.
 */
const isNum = (v) => typeof v === 'number' && Number.isFinite(v) && v >= 0
const isStr = (v) => typeof v === 'string' && v.trim().length > 0
const arrOf = (check) => (d) => {
  if (!Array.isArray(d)) return 'Must be a list.'
  for (const [i, x] of d.entries()) { const e = check(x); if (e) return `Row ${i + 1}: ${e}` }
  return null
}

const idName = (x) => (!isStr(x.id) ? 'id is required' : null)

const RULES = {
  baseFee: (d) => (isNum(d) ? null : 'Must be a number.'),
  langPct: (d) => (isNum(d) && d <= 1 ? null : 'Must be between 0 and 1 (0.25 = 25%).'),
  adFee: (d) => (isNum(d) && d <= 1 ? null : 'Must be between 0 and 1 (0.10 = 10%).'),
  perMonth: (d) => (d && isNum(d.day) && isNum(d.week) ? null : 'Needs day and week numbers.'),
  platforms: arrOf((x) => idName(x) || (!isStr(x.name) ? 'name required' : !isNum(x.rate) ? 'rate must be a number' : null)),
  content: arrOf((x) => idName(x) || (!isStr(x.label) ? 'label required' : !isNum(x.rate) ? 'rate must be a number'
    : !Array.isArray(x.plats) ? 'plats must be a list' : !['day', 'week'].includes(x.per) ? 'per must be day or week' : !isNum(x.max) ? 'max must be a number' : null)),
  cameras: arrOf((x) => (!isNum(x.n) ? 'n required' : !isStr(x.name) ? 'name required' : !isNum(x.rate) ? 'rate must be a number' : null)),
  fieldItems: arrOf((x) => idName(x) || (!isStr(x.label) ? 'label required' : null)),
  liveDestinations: arrOf((x) => idName(x) || (!isStr(x.name) ? 'name required' : null)),
  liveRates: (d) => (d && isNum(d.rate) && isNum(d.extraDest) ? null : 'Needs rate and extraDest numbers.'),
  equipment: arrOf((x) => idName(x) || (!isStr(x.label) ? 'label required' : !isNum(x.rate) ? 'rate must be a number' : null)),
  presets: arrOf((x) => idName(x) || (!isStr(x.name) ? 'name required' : null)),
  compareTable: arrOf((x) => (Array.isArray(x) && x.length === 4 ? null : 'each row needs 4 columns')),
  waPacks: arrOf((x) => idName(x) || (!isStr(x.name) ? 'name required' : !isNum(x.price) ? 'price must be a number' : !Array.isArray(x.features) ? 'features must be a list' : null)),
  addons: arrOf((x) => idName(x) || (!isStr(x.name) ? 'name required' : !isNum(x.price) ? 'price must be a number' : null)),
  contact: (d) => (d && isStr(d.email) && isStr(d.phone) ? null : 'Needs email and phone.'),
}

export const SECTION_KEYS = Object.keys(RULES)
export const validateSection = (key, data) => (data === undefined ? 'data is required.' : RULES[key](data))