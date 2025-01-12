import { formatNumber } from "./formatNumber.js";

const currencyUnits = {
    "aed": { "symbol": "aed", "code": "aed", "decimal_digits": 2, },
    "afn": { "symbol": "af", "code": "afn","decimal_digits": 0, },
    "all": { "symbol": "all", "code": "all","decimal_digits": 0, },
    "amd": { "symbol": "amd", "code": "amd","decimal_digits": 0, },
    "ars": { "symbol": "ar$", "code": "ars","decimal_digits": 2, },
    "aud": { "symbol": "au$", "code": "aud","decimal_digits": 2, },
    "azn": { "symbol": "man.", "code": "azn","decimal_digits": 2, },
    "bam": { "symbol": "km", "code": "bam","decimal_digits": 2, },
    "bdt": { "symbol": "tk", "code": "bdt","decimal_digits": 2, },
    "bgn": { "symbol": "bgn", "code": "bgn","decimal_digits": 2, },
    "bhd": { "symbol": "bd", "code": "bhd","decimal_digits": 3, },
    "bif": { "symbol": "fbu", "code": "bif","decimal_digits": 0, },
    "bnd": { "symbol": "bn$", "code": "bnd","decimal_digits": 2, },
    "bob": { "symbol": "bs", "code": "bob","decimal_digits": 2, },
    "brl": { "symbol": "r$", "code": "brl","decimal_digits": 2, },
    "bwp": { "symbol": "bwp", "code": "bwp","decimal_digits": 2, },
    "byn": { "symbol": "br", "code": "byn","decimal_digits": 2, },
    "bzd": { "symbol": "bz$", "code": "bzd","decimal_digits": 2, },
    "cad": { "symbol": "ca$", "code": "cad","decimal_digits": 2, },
    "cdf": { "symbol": "cdf", "code": "cdf","decimal_digits": 2, },
    "chf": { "symbol": "chf", "code": "chf","decimal_digits": 0, },
    "clp": { "symbol": "cl$", "code": "clp","decimal_digits": 2, },
    "cny": { "symbol": "cn¥", "code": "cny","decimal_digits": 0, },
    "cop": { "symbol": "co$", "code": "cop","decimal_digits": 0, },
    "crc": { "symbol": "₡", "code": "crc","decimal_digits": 2, },
    "cve": { "symbol": "cv$", "code": "cve","decimal_digits": 2, },
    "czk": { "symbol": "kč", "code": "czk","decimal_digits": 0, },
    "djf": { "symbol": "fdj", "code": "djf","decimal_digits": 2, },
    "dkk": { "symbol": "dkr", "code": "dkk","decimal_digits": 2, },
    "dop": { "symbol": "rd$", "code": "dop","decimal_digits": 2, },
    "dzd": { "symbol": "da", "code": "dzd","decimal_digits": 2, },
    "eek": { "symbol": "ekr", "code": "eek","decimal_digits": 2, },
    "egp": { "symbol": "egp", "code": "egp","decimal_digits": 2, },
    "ern": { "symbol": "nfk", "code": "ern","decimal_digits": 2, },
    "etb": { "symbol": "br", "code": "etb","decimal_digits": 2, },
    "eur": { "symbol": "€", "code": "eur","decimal_digits": 2, },
    "gbp": { "symbol": "£", "code": "gbp","decimal_digits": 2, },
    "gel": { "symbol": "gel", "code": "gel","decimal_digits": 0, },
    "ghs": { "symbol": "gh₵", "code": "ghs","decimal_digits": 2, },
    "gnf": { "symbol": "fg", "code": "gnf","decimal_digits": 2, },
    "gtq": { "symbol": "gtq", "code": "gtq","decimal_digits": 2, },
    "hkd": { "symbol": "hk$", "code": "hkd","decimal_digits": 2, },
    "hnl": { "symbol": "hnl", "code": "hnl","decimal_digits": 0, },
    "hrk": { "symbol": "kn", "code": "hrk","decimal_digits": 0, },
    "huf": { "symbol": "ft", "code": "huf","decimal_digits": 2, },
    "idr": { "symbol": "rp", "code": "idr","decimal_digits": 2, },
    "inr": { "symbol": "rs", "code": "inr","decimal_digits": 0, },
    "iqd": { "symbol": "iqd", "code": "iqd","decimal_digits": 0, },
    "irr": { "symbol": "irr", "code": "irr","decimal_digits": 0, },
    "isk": { "symbol": "ikr", "code": "isk","decimal_digits": 2, },
    "jmd": { "symbol": "j$", "code": "jmd","decimal_digits": 3, },
    "jod": { "symbol": "jd", "code": "jod","decimal_digits": 0, },
    "jpy": { "symbol": "¥", "code": "jpy","decimal_digits": 2, },
    "kes": { "symbol": "ksh", "code": "kes","decimal_digits": 2, },
    "khr": { "symbol": "khr", "code": "khr","decimal_digits": 0, },
    "kmf": { "symbol": "cf", "code": "kmf","decimal_digits": 0, },
    "krw": { "symbol": "₩", "code": "krw","decimal_digits": 3, },
    "kwd": { "symbol": "kd", "code": "kwd","decimal_digits": 2, },
    "kzt": { "symbol": "kzt", "code": "kzt","decimal_digits": 0, },
    "lbp": { "symbol": "l.l.", "code": "lbp","decimal_digits": 2, },
    "lkr": { "symbol": "slrs", "code": "lkr","decimal_digits": 2, },
    "ltl": { "symbol": "lt", "code": "ltl","decimal_digits": 2, },
    "lvl": { "symbol": "ls", "code": "lvl","decimal_digits": 3, },
    "lyd": { "symbol": "ld", "code": "lyd","decimal_digits": 2, },
    "mad": { "symbol": "mad", "code": "mad","decimal_digits": 2, },
    "mdl": { "symbol": "mdl", "code": "mdl","decimal_digits": 0, },
    "mga": { "symbol": "mga", "code": "mga","decimal_digits": 2, },
    "mkd": { "symbol": "mkd", "code": "mkd","decimal_digits": 0, },
    "mmk": { "symbol": "mmk", "code": "mmk","decimal_digits": 2, },
    "mop": { "symbol": "mop$", "code": "mop","decimal_digits": 0, },
    "mur": { "symbol": "murs", "code": "mur","decimal_digits": 2, },
    "mxn": { "symbol": "mx$", "code": "mxn","decimal_digits": 2, },
    "myr": { "symbol": "rm", "code": "myr","decimal_digits": 2, },
    "mzn": { "symbol": "mtn", "code": "mzn","decimal_digits": 2, },
    "nad": { "symbol": "n$", "code": "nad","decimal_digits": 2, },
    "ngn": { "symbol": "₦", "code": "ngn","decimal_digits": 2, },
    "nio": { "symbol": "c$", "code": "nio","decimal_digits": 2, },
    "nok": { "symbol": "nkr", "code": "nok","decimal_digits": 2, },
    "npr": { "symbol": "nprs", "code": "npr","decimal_digits": 2, },
    "nzd": { "symbol": "nz$", "code": "nzd","decimal_digits": 3, },
    "omr": { "symbol": "omr", "code": "omr","decimal_digits": 2, },
    "pab": { "symbol": "b/.", "code": "pab","decimal_digits": 2, },
    "pen": { "symbol": "s/.", "code": "pen","decimal_digits": 2, },
    "php": { "symbol": "₱", "code": "php","decimal_digits": 0, },
    "pkr": { "symbol": "pkrs", "code": "pkr","decimal_digits": 2, },
    "pln": { "symbol": "zł", "code": "pln","decimal_digits": 0, },
    "pyg": { "symbol": "₲", "code": "pyg","decimal_digits": 2, },
    "qar": { "symbol": "qr", "code": "qar","decimal_digits": 2, },
    "ron": { "symbol": "ron", "code": "ron","decimal_digits": 0, },
    "rsd": { "symbol": "din.", "code": "rsd","decimal_digits": 2, },
    "rub": { "symbol": "rub", "code": "rub","decimal_digits": 0, },
    "rwf": { "symbol": "rwf", "code": "rwf","decimal_digits": 2, },
    "sar": { "symbol": "sr", "code": "sar","decimal_digits": 2, },
    "sdg": { "symbol": "sdg", "code": "sdg","decimal_digits": 2, },
    "sek": { "symbol": "skr", "code": "sek","decimal_digits": 2, },
    "sgd": { "symbol": "s$", "code": "sgd","decimal_digits": 0, },
    "sos": { "symbol": "ssh", "code": "sos","decimal_digits": 0, },
    "syp": { "symbol": "sy£", "code": "syp","decimal_digits": 2, },
    "thb": { "symbol": "฿", "code": "thb","decimal_digits": 3, },
    "tnd": { "symbol": "dt", "code": "tnd","decimal_digits": 2, },
    "top": { "symbol": "t$", "code": "top","decimal_digits": 2, },
    "try": { "symbol": "tl", "code": "try","decimal_digits": 2, },
    "ttd": { "symbol": "tt$", "code": "ttd","decimal_digits": 2, },
    "twd": { "symbol": "nt$", "code": "twd","decimal_digits": 0, },
    "tzs": { "symbol": "tsh", "code": "tzs","decimal_digits": 2, },
    "uah": { "symbol": "₴", "code": "uah","decimal_digits": 0, },
    "ugx": { "symbol": "ush", "code": "ugx","decimal_digits": 2, },
    "usd": { "symbol": "$", "code": "usd","decimal_digits": 0, },
    "uyu": { "symbol": "$u", "code": "uyu","decimal_digits": 2, },
    "uzs": { "symbol": "uzs", "code": "uzs","decimal_digits": 0, },
    "vef": { "symbol": "bs.f.", "code": "vef","decimal_digits": 0, },
    "vnd": { "symbol": "₫", "code": "vnd","decimal_digits": 0, },
    "xaf": { "symbol": "fcfa", "code": "xaf","decimal_digits": 0, },
    "xof": { "symbol": "cfa", "code": "xof","decimal_digits": 2, },
    "yer": { "symbol": "yr", "code": "yer","decimal_digits": 0, },
    "zar": { "symbol": "r", "code": "zar","decimal_digits": 0, },
    "zmk": { "symbol": "zk", "code": "zmk","decimal_digits": 2, },
    "zwl": { "symbol": "zwl$", "code": "zwl","decimal_digits": 2, }
}

const coinBaseAPICurrencies = [
    "00", "1inch", "aave", "abt", "ach", "acs", "acx", "ada", "aed", "aergo", "aero",
    "afn", "agld", "aioz", "akt", "alcx", "aleo", "aleph", "algo", "alice", "all", "amd",
    "amp", "ang", "ankr", "ant", "aoa", "ape", "api3", "apt", "arb", "arkm", "arpa",
    "ars", "arsmep", "asm", "ast", "ata", "atom", "auction", "aud", "audio", "aurora", "avax",
    "avt", "awg", "axl", "axs", "azn", "badger", "bal", "bam", "band", "bat", "bbd",
    "bch", "bdt", "bgn", "bhd", "bico", "bif", "bigtime", "bit", "blast", "blur", "blz",
    "bmd", "bnd", "bnt", "bob", "boba", "bond", "bonk", "brl", "bsd", "bsv", "btc",
    "btn", "btrst", "busd", "bwp", "byn", "byr", "bzd", "c98", "cad", "cbeth", "cdf",
    "celr", "cgld", "chf", "chz", "clf", "clp", "clv", "cnh", "cny", "comp", "cop",
    "corechain", "coti", "coval", "cow", "crc", "cro", "crpt", "crv", "ctsi", "ctx", "cuc",
    "cup", "cvc", "cve", "cvx", "czk", "dai", "dar", "dash", "ddx", "degen", "deso",
    "dext", "dia", "dimo", "djf", "dkk", "dnt", "doge", "dop", "dot", "drep", "drift",
    "dyp", "dzd", "eek", "egld", "egp", "eigen", "ela", "enj", "ens", "eos", "ern",
    "etb", "etc", "eth", "eth2", "eur", "eurc", "farm", "fet", "fida", "fil", "fis",
    "fjd", "fkp", "floki", "flow", "flr", "fort", "forth", "fox", "ftm", "fx", "g",
    "gal", "gala", "gbp", "gel", "gfi", "ggp", "ghs", "ghst", "gip", "glm", "gmd",
    "gmt", "gnf", "gno", "gnt", "gods", "grt", "gst", "gtc", "gtq", "gusd", "gyd",
    "gyen", "hbar", "hft", "high", "hkd", "hnl", "hnt", "honey", "hopr", "hrk", "htg",
    "huf", "icp", "idex", "idr", "ils", "ilv", "imp", "imx", "index", "inj", "inr",
    "inv", "io", "iotx", "iqd", "irr", "isk", "jasmy", "jep", "jmd", "jod", "jpy",
    "jto", "jup", "karrat", "kava", "keep", "kes", "kgs", "khr", "kmf", "knc", "kpw",
    "krl", "krw", "ksm", "kwd", "kyd", "kzt", "lak", "lbp", "lcx", "ldo", "link",
    "lit", "lkr", "loka", "loom", "lpt", "lqty", "lrc", "lrd", "lrds", "lseth", "lsl",
    "ltc", "ltl", "lvl", "lyd", "mad", "magic", "mana", "mask", "math", "matic", "mco2",
    "mdl", "mdt", "media", "metis", "mga", "mina", "mir", "mkd", "mkr", "mln", "mmk",
    "mnde", "mnt", "mobile", "mog", "mona", "moodeng", "mop", "move", "mpl", "mro", "mru",
    "msol", "mtl", "multi", "mur", "muse", "mvr", "mwk", "mxc", "mxn", "myr", "mzn",
    "nad", "nct", "near", "neon", "nest", "ngn", "nio", "nkn", "nmr", "nok", "npr",
    "nu", "nzd", "ocean", "ogn", "omg", "omr", "ondo", "ooki", "op", "orca", "orn",
    "osmo", "oxt", "pab", "pax", "pen", "pepe", "perp", "pgk", "php", "pkr", "pla",
    "pln", "plu", "png", "pol", "pols", "poly", "pond", "powr", "prime", "pro", "prq",
    "pundix", "pyg", "pyr", "pyusd", "qar", "qi", "qnt", "quick", "rad", "rai", "rare",
    "rari", "rbn", "ren", "render", "rep", "repv2", "req", "rgt", "rlc", "rly", "rndr",
    "ron", "ronin", "rose", "rpl", "rsd", "rub", "rune", "rwf", "safe", "sand", "sar",
    "sbd", "scr", "sd", "sdg", "seam", "sei", "sek", "sgd", "shdw", "shib", "shp",
    "shping", "skk", "skl", "sll", "snt", "snx", "sol", "sos", "spa", "spell", "srd",
    "ssp", "std", "stg", "storj", "strk", "stx", "sui", "suku", "super", "sushi", "svc",
    "swell", "swftc", "sylo", "syn", "syp", "szl", "t", "thb", "theta", "tia", "time",
    "tjs", "tmm", "tmt", "tnd", "tnsr", "tone", "top", "trac", "trb", "tribe", "tru",
    "try", "ttd", "tvk", "twd", "tzs", "uah", "ugx", "uma", "unfi", "uni", "upi",
    "usd", "usdc", "usdt", "ust", "uyu", "uzs", "vara", "vef", "velo", "ves", "vet",
    "vgx", "vnd", "voxel", "vtho", "vuv", "wampl", "waxl", "wbtc", "wcfg", "well", "wif",
    "wluna", "wst", "xaf", "xag", "xau", "xbc", "xcd", "xcn", "xdr", "xlm", "xmon",
    "xof", "xpd", "xpf", "xpt", "xrp", "xtz", "xyo", "yer", "yfi", "yfii", "zar",
    "zec", "zen", "zeta", "zetachain", "zk", "zmk", "zmw", "zro", "zrx", "zwd"
]

const keys = Object.keys(currencyUnits);
keys.forEach(key => currencyUnits[currencyUnits[key]['symbol']] = currencyUnits[key]);
Object.freeze(currencyUnits);

async function convertCurrency(value, fromCurrency, toCurrency) {
    fromCurrency = fromCurrency.toLowerCase();
    toCurrency = toCurrency.toLowerCase();
    const fromCode = currencyUnits[fromCurrency]?.code.toLowerCase() ?? fromCurrency;
    const toCode = currencyUnits[toCurrency]?.code.toLowerCase() ?? toCurrency;
    const decimal = currencyUnits[toCode]['decimal_digits'] ?? 0
    if (coinBaseAPICurrencies.includes(fromCode) && coinBaseAPICurrencies.includes(toCode)) {
        const response = await fetchCoinbaseData(fromCode);
        const convertRate = response.data.rates[toCode.toUpperCase()];

        if (!convertRate) {
            throw new Error(`the currency of code ${toCurrency.toUpperCase()} not found in the coinbase api response`);
        }

        return formatNumber(convertRate * value, decimal);
    }
}

const cache = {}
async function fetchCoinbaseData(from) {
    const url = 'https://api.coinbase.com/v2/exchange-rates?currency=' + from.toUpperCase()
    if (cache[url] !== undefined) {
        return cache[url]
    }
    try {
        const res = await fetch(url);
        const json = await res.json();
        cache[url] = json
        return json;
    } catch (error) {
        throw new Error("Failed to call or parse Coinbase response");
    }
}

function isCurrencyUnit(unit) {
    const lowerCaseUnit = unit.toLowerCase();
    return coinBaseAPICurrencies.includes(lowerCaseUnit) || lowerCaseUnit in currencyUnits;
}

export {
    currencyUnits,
    convertCurrency,
    isCurrencyUnit,
}
