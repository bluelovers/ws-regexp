const [
  SIMPLE,
  PLOSIVE,
  PLACE_NAME,
  ASSIMILATION,
  NASALIZATION,
  ㄹ,
  ASPIRATION,
  PALATALIZATION
] = [
  "simple",
  "plosive",
  "place-name",
  "assimilation",
  "nasalization",
  "ㄹ",
  "aspiration",
  "palatalization"
];

const words = {
  // ㄱ
  가: { RR: "ga", tags: [SIMPLE] },
  가곡: { RRT: "gagog" },
  값: { RRT: "gabs" },
  같이: { p: "가치", RR: "gachi", tags: [PALATALIZATION] },
  곧이: { p: "고지", tags: [PALATALIZATION] },
  구미: { RR: "Gumi", tags: [PLOSIVE, PLACE_NAME] },
  구리: { RR: "Guri", tags: [PLACE_NAME] },
  김치: { RR: "gimchi", MR: "kimch'i", Yale: "kimchi", SKATS: "LUM CU LE" },
  국어의: { RR: "gugeoui", tags: [SIMPLE] },
  글자: {
    // letter
    IPA: "kɯl.t͈ɕa",
    RR: "geulja",
    RRT: "geulja",
    MR: "kŭlcha",
    yale: "kulqca",
    SKATS: "ldv pe",
    ck: "кыльчча",
    ckr: "kyl'chcha"
  },
  굳히다: { p: "구치다", RR: "guchida", tags: [PALATALIZATION] },
  // 굳이: { RRT: "gud-i"},
  꽃망울: { p: "꼰망울" },
  // ㄴ
  나: { RR: "na", tags: [SIMPLE] },
  // ㄷ
  다: { RR: "da", tags: [SIMPLE] },
  닦는다: { p: "당는다" },
  단련: { p: "달련" },
  닫히다: { p: "다치다", tags: [PALATALIZATION] },
  대관령: { p: "대괄령", RR: "Daegwallyeong", tags: [PLACE_NAME] },
  독립: { RR: "dongnip", MR: "tongnip", RRT: "doglib", tags: [NASALIZATION] },
  동무: { RR: "dongmu", tags: [SIMPLE] },
  // ㄹ
  로마자: { RR: "romaja", tags: [SIMPLE] },
  // ㅁ
  만남: { RR: "mannam", tags: [SIMPLE] },
  먹는: { RRT: "meogneun" },
  맏누이: { p: "만누이" },
  문리: { default: "mulli", tags: [ASSIMILATION] },
  // 물엿: "mul-yeos",
  // ㅂ
  밖: {
    // outside (uninflected)
    IPA: "pak̚",
    RR: "bak",
    RRT: "bakk",
    MR: "pak",
    yale: "pakk",
    SKATS: "well",
    ck: "пак",
    ckr: "pak"
  },
  밖에: {
    // outside
    IPA: "pa.k͈e̞",
    RR: "bakke",
    // RRT: "bakk-e",
    MR: "pakke",
    yale: "pakk ey",
    SKATS: "well ktu",
    ck: "пёге",
    ckr: "pyoge"
  },
  밭머리: { p: "반머리" },
  백마: {
    RR: "Baengma",
    p: "뱅마",
    tags: [PLACE_NAME, ASSIMILATION]
  },
  백암: { RR: "Baegam", tags: [PLOSIVE, PLACE_NAME] },
  법령: { p: "범령" },
  법무: { p: "범무", tags: [NASALIZATION] },
  별내: {
    RR: "Byeollae",
    p: "별래",
    tags: [PLACE_NAME, ASSIMILATION]
  },
  벚꽃: { RR: "beotkkot", p: "벋꼳", tags: [PLOSIVE] },
  벽: {
    // wall
    IPA: "pjʌk̚",
    RR: "byeok",
    RRT: "byeog",
    MR: "pyŏk",
    yale: "pyek",
    SKATS: "wsl",
    ck: "пёк",
    ckr: "pyok"
  },
  벽에: {
    // on the wall
    IPA: "pjʌ.ɡe̞",
    RR: "byeoge",
    // RRT: "byeog-e",
    MR: "pyŏge",
    yale: "pyek ey",
    SKATS: "wsl ktu",
    ck: "пёге",
    ckr: "pyoge"
  },
  봄바람: { p: "봄빠람" },
  부엌: {
    //kitchen
    IPA: "pu.ʌk̚",
    RR: "bueok",
    RRT: "bueok",
    MR: "puŏk",
    yale: "puekh",
    SKATS: "wh ktx",
    ck: "пуок",
    ckr: "puok"
  },
  부엌문: { p: "부엉문" },
  부엌에: {
    // to the kitchen/in the kitchen
    IPA: "pu.ʌ.kʰe̞",
    RR: "bueoke",
    // RRT: "bueok-e",
    MR: "puŏk'e",
    yale: "puekh ey",
    SKATS: "wh ktx ktu",
    ck: "пуокхе",
    ckr: "puokhe"
  },
  북한: { p: "부칸", tags: [ASPIRATION] },
  붓꽃: { RRT: "buskkoch" },
  // ㅅ
  설악: { RR: "Seorak", tags: [PLACE_NAME] },
  신문로: {
    // RR: "Sinmunno", // TODO
    p: "신문노",
    tags: [PLACE_NAME, ASSIMILATION, ㄹ]
  },
  신라: {
    RR: "Silla",
    p: "실라",
    tags: [PLACE_NAME, ASSIMILATION, ㄹ]
  },
  실내: { p: "실래", tags: [ㄹ, ASSIMILATION] },
  설날: { p: "설랄" },
  쉬운: {
    // (an) easy (+ noun)
    IPA: "ɕɥi.un",
    RR: "swiun",
    RRT: "swiun",
    MR: "shwiun",
    yale: "swīwun",
    SKATS: "ghu khf",
    ck: "свиун",
    ckr: "sviun"
  },
  // ㅇ
  // 없었습니다: "eobs-eoss-seubnida"
  왕십리: {
    RR: "Wangsimni",
    p: "왕심니",
    tags: [PLACE_NAME, ASSIMILATION]
  },
  월곶: { RR: "Wolgot", p: "월곧", tags: [PLACE_NAME] },
  영동: { RR: "Yeongdong", tags: [PLOSIVE, PLACE_NAME] },
  옥천: { RR: "Okcheon", tags: [PLOSIVE, PLACE_NAME] },
  임실: { RR: "Imsil", tags: [PLACE_NAME] },
  울릉: { RR: "Ulleung", tags: [PLACE_NAME] },
  있느냐: { p: "인느냐" },
  앞문: { p: "암문" },
  알약: { p: "알락", RR: "allyak" },
  위키백과: {
    // Wikipedia
    IPA: "ɥi.cʰi.bɛ̝k̚.k͈wa",
    RR: "wikibaekgwa",
    RRT: "wikibaeggwa",
    MR: "wikibaekkwa",
    yale: "wikhi payk.kwa",
    SKATS: "khu xu weul lae",
    ck: "викхибэкква",
    ckr: "vikhibèkkva"
  },
  // ㅈ
  잣나무: { p: "잔나무" },
  젖먹이: { p: "전먹이" },
  조랑말: { RRT: "jolangmal" },
  조선민주주의인민공화국: {
    RR: "Joseon Minjujuui Inmin Gonghwaguk",
    // RRT: "Jo-seon Min-ju-ju-ui In-min Gong-hwa-gug",
    ck: "Чосон Минчучуыи Инмин Конъхвакук",
    ckr: "Choson Minchuchu'i Inmin Kon'hvakuk"
  },
  종로: { RR: "Jongno", p: "종노", tags: [ASSIMILATION] },
  좋다: { p: "조타", RRT: "johda", tags: [ASPIRATION] },
  집: { RRT: "jib", tags: [SIMPLE] },
  짚: { RRT: "jip" },
  // ㅊ
  친구: { RR: "chingu", tags: [SIMPLE] },
  칠곡: { RR: "Chilgok", tags: [PLACE_NAME] },

  // ㅋ
  // ㅌ
  // ㅍ
  표기법: { RR: "pyogibeop", tags: [SIMPLE] },
  하: { RR: "ha" },
  학여울: { p: "항녀울", RR: "Hangnyeoul" },
  한결같이: { p: "한결가치" },
  한국말: { p: "한궁말", RR: "han-gungmal", tags: [NASALIZATION] },
  한글: {
    // Hangul
    IPA: "han.ɡɯl",
    RR: ["hangeul", "han-geul"],
    RRT: "hangeul",
    MR: "han'gŭl",
    yale: "hānkul",
    SKATS: "jef ldv",
    ck: "хангыль",
    ckr: "hangyl'"
  },
  한밭: { RR: "Hanbat", p: "한받", tags: [PLOSIVE] },
  한자: {
    RR: "hanja",
    // RRT: "han-ja",
    ck: "ханчча",
    ckr: "hanchcha"
  },
  합덕: { RR: "Hapdeok", tags: [PLOSIVE, PLACE_NAME] },
  해돋이: { p: "해돚이", RR: "haedoji", tags: [PALATALIZATION] },
  호법: { RR: "Hobeop", tags: [PLOSIVE] },
  훈민정음: {
    RR: "Hunminjeong'eum"
    // RRT: "Hun-min-jeong-eum"
  }
};

const sentences = {
  "한국은 네 계절이 뚜렷하다": {
    // Korea has four distinct seasons
    ipa: "han.ɡu.ɡɯn ne̞ cje̞.dʑʌ.ɾi t͈u.ɾjʌ.tʰa.da",
    rr: "Hangugeun ne gyejeori tturyeotada",
    // rrt: "Hangug-eun ne gyejeol-i ttulyeoshada",
    mr: "Hangugŭn ne kyejŏri tturyŏthada",
    yale: "Hānkuk un nēy kyēycel i ttwulyes hata",
    SKATS: "jef lhl kdf ftu lsu ptv ku bbh vsg je be"
  },
  "사계절이 뚜렷하다": {
    // Four seasons are distinct
    rr: "Sagyejeori tturyeotada",
    // rrt: "Sa-gye-jeol-i ttu-lyeos-ha-da",
    ck: "Сагеджори ттурётхада",
    ckr: "Sagedzhori tturyothada"
  },
  "원하시는 선 색깔과 굵기에 체크하시면 됩니다": {
    // Just check the line color and width you want
    ipa:
      "wʌn.ɦa.ɕi.nɯn sʌn sɛ̝k̚.k͈al.ɡwa kul.c͈i.e̞ tɕʰe̞.kʰɯ.ɦa.ɕi.mjʌn twe̞m.ɲi.da",
    rr: "Wonhasineun seon saekkkalgwa gulkkie chekeuhasimyeon doemnida",
    rrt: "Wonhasineun seon saegkkalgwa gulggie chekeuhasimyeon doebnida",
    mr: "Wŏnhasinŭn sŏn saekkalgwa kulkie ch'ek'ŭhasimyŏn toemnida",
    yale: "Wēn hasinun sen sayk.kkal kwa kwulk.ki ey cheykhu hasimyen toypnita",
    SKATS:
      "khtf je gu fdf gtf geul llev lae lhvl lu ktu ctu xd je gu msf bauw fu be",
    ck: "Вонхасинын сон сэкккальгва куккие чхекхыхасимён твемнида",
    ckr: "Vonhasinyn son sèkkal'gva kukkie chhekhyhasimyon tvemnida"
  },
  "김치가 맛있다": {
    RR: "Kimchiga masitta",
    SKATS: "LUM CU LE  MEG KUGG BE"
  }
};

module.exports = {
  words,
  sentences
};
