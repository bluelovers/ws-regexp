import { _greedyTableCacheRegexp } from './table/re';

export { _greedyTableCacheRegexp };

export const _greedyTableCacheTest = /[噁悪惡恶繋繫係系糊鬍葫衚楜煳胡儅噹當当復複覆复囌蘇甦苏採彩睬踩埰綵䌽采囉啰羅㑩儸罗浏瀏劉刘劵卷巻捲蜷券划劃畫画鬥闘鬭鬪斗乾亁乹幹干図图圖暦曆歴歷历麪麵麺面讃讚賛贊赞發髪髮发侭儘盡尽優忧憂俱倶具之的得の與与と她他牠祂佗它支隻枝只炮砲炰泡仲㊥中原元迴廻回避闢辟滷鹵卤鲁魯檯臺颱儓台宻祕秘密謎谜迷砂莎紗纱沙編篇编冶治炼煉錬鍊𫔀練练亞亚婭娅椏桠亜塞賽赛腾騰籐籘藤妳祢禰你喰飠⻞飧蝕蚀食瑪馬玛马餸餚裸果凱凯鎧铠帖贴貼甚什聯联連连像象藉借蕾雷訂订釘钉定嚮向糸糹丝絲筒桶兹玆滋茲呐訥讷吶穀糓谷两兩倆俩両帳賬账帐版闆板待呆熔鎔镕融螎溶匯汇彙彿仏佛阿啊家傢爆暴䋄䋞冈刚剛堈岗岡崗綱網纲缸鋼钢网註注灌贯潅貫倒到儭秤称稱衬襯平勛勲勳勋麗丽莉利已巳己嗬呵哊哟唷唹喲呦婕杰洁潔絜傑嘻嬉痲痳麻嘛狗犬拂亙恆恒亘附副付伽枷珈迦加褔福捱挨拼拚飄飘飃漂佔沾占気氣汽滊炁气撩遼辽做作搜捜蒐叟傁謝谢榭形型雇頋顧顾僱廬芦蘆庐耽躭眈傹竟競竸誩𥪰𧡟𧫘𧫙𧮣𨐼竞殖植佬姥老倖幸㠪炬矩鉅钜巨鏈链䃛𧹯刴剁剐剮劏㓥枏楠南璐𡽘𨱴路侂拓杔託讬拖拕托悕睎稀希帼幗国國囯返反扬揚旸暘杨楊炀烊煬阳陽佯来莱萊來葆堡褓緥保渡度剳札箚紮扎媞提湜禔緹缇隄堤臘蜡蠟腊鬱𨚼𨟝郁擀杆桿扞脼郞𥇑郎芭巴涅湼捏择擇沢泽澤択幵開开珮佩喩籲龥吁喻值値臓臟贓赃髒脏㊤上㊦下唿呼詳详祥妮泥尼剋尅克撥播拨挿揷插汀丁那娜菈拉玲琳鈴铃淋林銘铭名齣出欸誒诶唉哞呣㖿吔耶魅媚扉斐緋绯翡菲蜚誹诽霏非匪衩釵钗叉淇琪祺其壇談譚谈谭坛材柴才唸念趾指仕士嬢孃娘哑唖瘂痖啞动働仂動查査察鉄銕鐡鐵铁𨫓鉃归歸皈帰瘡疮創创拷烤考込入伦侖倫仑仔子彎湾灣弯荧萤蛍螢熒挣掙爭争漲胀脹涨無冇沒没无噸訰吨鈎鉤钩勾沉沈畳疊迭叠繮缰韁僵疆殭背揹団團糰团榚糕須须鬚需紆紓纡纾抒洲州厰場廠场厂筿篠筱跟根曝㬅嫚曼熳蔓漫昇陞升獃煙腌菸醃烟錄録陆陸录擄虏虜掳翹跷蹺翘腳角脚直词辞辭詞意義义梗哏咫尺呎怜憐伶荽萎委岺嶺阾領领岭決絕絶绝訣诀决嶽𡶦岳授受線线缐腺綫壱壹一荒慌廷庭喧暄諠宣略畧掠牋笺签箋簽籖籤䇳幺庅麼麽么芒茫杧跃躍趯弥彌瀰㳽袜襪抹囪囱窓窗窻䆫凾涵函耸聳悚落洛標鏢鑣镳镖标恠怪併倂并幷竝𠀤並鶫鸫𪂝鶇鐳镭靁鉑铂白弔吊誡诫𢌵戒]/u;

export const _greedyTableCacheMap = new Map<string, readonly string[]>([
	["噁", ["噁","悪","惡","恶"]],
	["悪", ["噁","悪","惡","恶"]],
	["惡", ["噁","悪","惡","恶"]],
	["恶", ["噁","悪","惡","恶"]],
	["繋", ["繋","繫","係","系"]],
	["繫", ["繋","繫","係","系"]],
	["係", ["繋","繫","係","系"]],
	["系", ["繋","繫","係","系"]],
	["糊", ["糊","鬍","葫","衚","楜","煳","胡"]],
	["鬍", ["糊","鬍","葫","衚","楜","煳","胡"]],
	["葫", ["糊","鬍","葫","衚","楜","煳","胡"]],
	["衚", ["糊","鬍","葫","衚","楜","煳","胡"]],
	["楜", ["糊","鬍","葫","衚","楜","煳","胡"]],
	["煳", ["糊","鬍","葫","衚","楜","煳","胡"]],
	["胡", ["糊","鬍","葫","衚","楜","煳","胡"]],
	["儅", ["儅","噹","當","当"]],
	["噹", ["儅","噹","當","当"]],
	["當", ["儅","噹","當","当"]],
	["当", ["儅","噹","當","当"]],
	["復", ["復","複","覆","复"]],
	["複", ["復","複","覆","复"]],
	["覆", ["復","複","覆","复"]],
	["复", ["復","複","覆","复"]],
	["囌", ["囌","蘇","甦","苏"]],
	["蘇", ["囌","蘇","甦","苏"]],
	["甦", ["囌","蘇","甦","苏"]],
	["苏", ["囌","蘇","甦","苏"]],
	["採", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["彩", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["睬", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["踩", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["埰", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["綵", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["䌽", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["采", ["採","彩","睬","踩","埰","綵","䌽","采"]],
	["囉", ["囉","啰","羅","㑩","儸","罗"]],
	["啰", ["囉","啰","羅","㑩","儸","罗"]],
	["羅", ["囉","啰","羅","㑩","儸","罗"]],
	["㑩", ["囉","啰","羅","㑩","儸","罗"]],
	["儸", ["囉","啰","羅","㑩","儸","罗"]],
	["罗", ["囉","啰","羅","㑩","儸","罗"]],
	["浏", ["浏","瀏","劉","刘"]],
	["瀏", ["浏","瀏","劉","刘"]],
	["劉", ["浏","瀏","劉","刘"]],
	["刘", ["浏","瀏","劉","刘"]],
	["劵", ["劵","卷","巻","捲","蜷","券"]],
	["卷", ["劵","卷","巻","捲","蜷","券"]],
	["巻", ["劵","卷","巻","捲","蜷","券"]],
	["捲", ["劵","卷","巻","捲","蜷","券"]],
	["蜷", ["劵","卷","巻","捲","蜷","券"]],
	["券", ["劵","卷","巻","捲","蜷","券"]],
	["划", ["划","劃","畫","画"]],
	["劃", ["划","劃","畫","画"]],
	["畫", ["划","劃","畫","画"]],
	["画", ["划","劃","畫","画"]],
	["鬥", ["鬥","闘","鬭","鬪","斗"]],
	["闘", ["鬥","闘","鬭","鬪","斗"]],
	["鬭", ["鬥","闘","鬭","鬪","斗"]],
	["鬪", ["鬥","闘","鬭","鬪","斗"]],
	["斗", ["鬥","闘","鬭","鬪","斗"]],
	["乾", ["乾","亁","乹","幹","干"]],
	["亁", ["乾","亁","乹","幹","干"]],
	["乹", ["乾","亁","乹","幹","干"]],
	["幹", ["乾","亁","乹","幹","干"]],
	["干", ["乾","亁","乹","幹","干"]],
	["図", ["図","图","圖"]],
	["图", ["図","图","圖"]],
	["圖", ["図","图","圖"]],
	["暦", ["暦","曆","歴","歷","历"]],
	["曆", ["暦","曆","歴","歷","历"]],
	["歴", ["暦","曆","歴","歷","历"]],
	["歷", ["暦","曆","歴","歷","历"]],
	["历", ["暦","曆","歴","歷","历"]],
	["麪", ["麪","麵","麺","面"]],
	["麵", ["麪","麵","麺","面"]],
	["麺", ["麪","麵","麺","面"]],
	["面", ["麪","麵","麺","面"]],
	["讃", ["讃","讚","賛","贊","赞","赞"]],
	["讚", ["讃","讚","賛","贊","赞","赞"]],
	["賛", ["讃","讚","賛","贊","赞","赞"]],
	["贊", ["讃","讚","賛","贊","赞","赞"]],
	["赞", ["讃","讚","賛","贊","赞","赞"]],
	["發", ["發","髪","髮","发"]],
	["髪", ["發","髪","髮","发"]],
	["髮", ["發","髪","髮","发"]],
	["发", ["發","髪","髮","发"]],
	["侭", ["侭","儘","盡","尽"]],
	["儘", ["侭","儘","盡","尽"]],
	["盡", ["侭","儘","盡","尽"]],
	["尽", ["侭","儘","盡","尽"]],
	["優", ["優","忧","憂","忧"]],
	["忧", ["優","忧","憂","忧"]],
	["憂", ["優","忧","憂","忧"]],
	["俱", ["俱","倶","具"]],
	["倶", ["俱","倶","具"]],
	["具", ["俱","倶","具"]],
	["之", ["之","的","得","の"]],
	["的", ["之","的","得","の"]],
	["得", ["之","的","得","の"]],
	["の", ["之","的","得","の"]],
	["與", ["與","与","と"]],
	["与", ["與","与","と"]],
	["と", ["與","与","と"]],
	["她", ["她","他","牠","祂","佗","它"]],
	["他", ["她","他","牠","祂","佗","它"]],
	["牠", ["她","他","牠","祂","佗","它"]],
	["祂", ["她","他","牠","祂","佗","它"]],
	["佗", ["她","他","牠","祂","佗","它"]],
	["它", ["她","他","牠","祂","佗","它"]],
	["支", ["支","隻","枝","只"]],
	["隻", ["支","隻","枝","只"]],
	["枝", ["支","隻","枝","只"]],
	["只", ["支","隻","枝","只"]],
	["炮", ["炮","砲","炰","泡"]],
	["砲", ["炮","砲","炰","泡"]],
	["炰", ["炮","砲","炰","泡"]],
	["泡", ["炮","砲","炰","泡"]],
	["仲", ["仲","㊥","中"]],
	["㊥", ["仲","㊥","中"]],
	["中", ["仲","㊥","中"]],
	["原", ["原","元"]],
	["元", ["原","元"]],
	["迴", ["迴","廻","回"]],
	["廻", ["迴","廻","回"]],
	["回", ["迴","廻","回"]],
	["避", ["避","闢","辟"]],
	["闢", ["避","闢","辟"]],
	["辟", ["避","闢","辟"]],
	["滷", ["滷","鹵","卤","鲁","魯"]],
	["鹵", ["滷","鹵","卤","鲁","魯"]],
	["卤", ["滷","鹵","卤","鲁","魯"]],
	["鲁", ["滷","鹵","卤","鲁","魯"]],
	["魯", ["滷","鹵","卤","鲁","魯"]],
	["檯", ["檯","臺","颱","儓","台"]],
	["臺", ["檯","臺","颱","儓","台"]],
	["颱", ["檯","臺","颱","儓","台"]],
	["儓", ["檯","臺","颱","儓","台"]],
	["台", ["檯","臺","颱","儓","台"]],
	["宻", ["宻","祕","秘","密"]],
	["祕", ["宻","祕","秘","密"]],
	["秘", ["宻","祕","秘","密"]],
	["密", ["宻","祕","秘","密"]],
	["謎", ["謎","谜","迷"]],
	["谜", ["謎","谜","迷"]],
	["迷", ["謎","谜","迷"]],
	["砂", ["砂","莎","紗","纱","沙"]],
	["莎", ["砂","莎","紗","纱","沙"]],
	["紗", ["砂","莎","紗","纱","沙"]],
	["纱", ["砂","莎","紗","纱","沙"]],
	["沙", ["砂","莎","紗","纱","沙"]],
	["編", ["編","篇","编","篇"]],
	["篇", ["編","篇","编","篇"]],
	["编", ["編","篇","编","篇"]],
	["冶", ["冶","治"]],
	["治", ["冶","治"]],
	["炼", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["煉", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["錬", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["鍊", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["𫔀", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["練", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["练", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["亞", ["亞","亚","婭","娅","椏","桠","亜","亚"]],
	["亚", ["亞","亚","婭","娅","椏","桠","亜","亚"]],
	["婭", ["亞","亚","婭","娅","椏","桠","亜","亚"]],
	["娅", ["亞","亚","婭","娅","椏","桠","亜","亚"]],
	["椏", ["亞","亚","婭","娅","椏","桠","亜","亚"]],
	["桠", ["亞","亚","婭","娅","椏","桠","亜","亚"]],
	["亜", ["亞","亚","婭","娅","椏","桠","亜","亚"]],
	["塞", ["塞","賽","赛"]],
	["賽", ["塞","賽","赛"]],
	["赛", ["塞","賽","赛"]],
	["腾", ["腾","騰","籐","籘","藤"]],
	["騰", ["腾","騰","籐","籘","藤"]],
	["籐", ["腾","騰","籐","籘","藤"]],
	["籘", ["腾","騰","籐","籘","藤"]],
	["藤", ["腾","騰","籐","籘","藤"]],
	["妳", ["妳","祢","禰","你"]],
	["祢", ["妳","祢","禰","你"]],
	["禰", ["妳","祢","禰","你"]],
	["你", ["妳","祢","禰","你"]],
	["喰", ["喰","飠","⻞","飧","蝕","蚀","食"]],
	["飠", ["喰","飠","⻞","飧","蝕","蚀","食"]],
	["⻞", ["喰","飠","⻞","飧","蝕","蚀","食"]],
	["飧", ["喰","飠","⻞","飧","蝕","蚀","食"]],
	["蝕", ["喰","飠","⻞","飧","蝕","蚀","食"]],
	["蚀", ["喰","飠","⻞","飧","蝕","蚀","食"]],
	["食", ["喰","飠","⻞","飧","蝕","蚀","食"]],
	["瑪", ["瑪","馬","玛","马","马"]],
	["馬", ["瑪","馬","玛","马","马"]],
	["玛", ["瑪","馬","玛","马","马"]],
	["马", ["瑪","馬","玛","马","马"]],
	["餸", ["餸","餚","餚"]],
	["餚", ["餸","餚","餚"]],
	["裸", ["裸","果"]],
	["果", ["裸","果"]],
	["凱", ["凱","凯","鎧","铠","凱"]],
	["凯", ["凱","凯","鎧","铠","凱"]],
	["鎧", ["凱","凯","鎧","铠","凱"]],
	["铠", ["凱","凯","鎧","铠","凱"]],
	["帖", ["帖","贴","貼"]],
	["贴", ["帖","贴","貼"]],
	["貼", ["帖","贴","貼"]],
	["甚", ["甚","什"]],
	["什", ["甚","什"]],
	["聯", ["聯","联","連","连","連"]],
	["联", ["聯","联","連","连","連"]],
	["連", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["连", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["像", ["像","象"]],
	["象", ["像","象"]],
	["藉", ["藉","借"]],
	["借", ["藉","借"]],
	["蕾", ["蕾","雷"]],
	["雷", ["鐳","镭","靁","雷"]],
	["訂", ["訂","订","釘","钉","定"]],
	["订", ["訂","订","釘","钉","定"]],
	["釘", ["訂","订","釘","钉","定"]],
	["钉", ["訂","订","釘","钉","定"]],
	["定", ["訂","订","釘","钉","定"]],
	["嚮", ["嚮","向"]],
	["向", ["嚮","向"]],
	["糸", ["糸","糹","丝","絲"]],
	["糹", ["糸","糹","丝","絲"]],
	["丝", ["糸","糹","丝","絲"]],
	["絲", ["糸","糹","丝","絲"]],
	["筒", ["筒","桶"]],
	["桶", ["筒","桶"]],
	["兹", ["兹","玆","滋","茲"]],
	["玆", ["兹","玆","滋","茲"]],
	["滋", ["兹","玆","滋","茲"]],
	["茲", ["兹","玆","滋","茲"]],
	["呐", ["呐","訥","讷","吶"]],
	["訥", ["呐","訥","讷","吶"]],
	["讷", ["呐","訥","讷","吶"]],
	["吶", ["呐","訥","讷","吶"]],
	["穀", ["穀","糓","谷"]],
	["糓", ["穀","糓","谷"]],
	["谷", ["穀","糓","谷"]],
	["两", ["两","兩","倆","俩","両"]],
	["兩", ["两","兩","倆","俩","両"]],
	["倆", ["两","兩","倆","俩","両"]],
	["俩", ["两","兩","倆","俩","両"]],
	["両", ["两","兩","倆","俩","両"]],
	["帳", ["帳","賬","账","帐"]],
	["賬", ["帳","賬","账","帐"]],
	["账", ["帳","賬","账","帐"]],
	["帐", ["帳","賬","账","帐"]],
	["版", ["版","闆","板"]],
	["闆", ["版","闆","板"]],
	["板", ["版","闆","板"]],
	["待", ["待","獃","呆"]],
	["呆", ["待","獃","呆"]],
	["熔", ["熔","鎔","镕","融","螎","溶"]],
	["鎔", ["熔","鎔","镕","融","螎","溶"]],
	["镕", ["熔","鎔","镕","融","螎","溶"]],
	["融", ["熔","鎔","镕","融","螎","溶"]],
	["螎", ["熔","鎔","镕","融","螎","溶"]],
	["溶", ["熔","鎔","镕","融","螎","溶"]],
	["匯", ["匯","汇","彙"]],
	["汇", ["匯","汇","彙"]],
	["彙", ["匯","汇","彙"]],
	["彿", ["彿","拂","佛"]],
	["仏", ["彿","仏","佛"]],
	["佛", ["彿","拂","佛"]],
	["阿", ["阿","啊"]],
	["啊", ["阿","啊"]],
	["家", ["家","傢"]],
	["傢", ["家","傢"]],
	["爆", ["曝","爆","暴"]],
	["暴", ["曝","爆","暴"]],
	["䋄", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["䋞", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["冈", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["刚", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["剛", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["堈", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["岗", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["岡", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["崗", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["綱", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["網", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["纲", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["缸", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["鋼", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["钢", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["网", ["䋄","䋞","冈","刚","剛","堈","岗","岡","崗","綱","網","纲","缸","鋼","钢","网"]],
	["註", ["註","注"]],
	["注", ["註","注"]],
	["灌", ["灌","贯","潅","貫"]],
	["贯", ["灌","贯","潅","貫"]],
	["潅", ["灌","贯","潅","貫"]],
	["貫", ["灌","贯","潅","貫"]],
	["倒", ["倒","到"]],
	["到", ["倒","到"]],
	["儭", ["儭","秤","称","稱","衬","襯","平"]],
	["秤", ["儭","秤","称","稱","衬","襯","平"]],
	["称", ["儭","秤","称","稱","衬","襯","平"]],
	["稱", ["儭","秤","称","稱","衬","襯","平"]],
	["衬", ["儭","秤","称","稱","衬","襯","平"]],
	["襯", ["儭","秤","称","稱","衬","襯","平"]],
	["平", ["儭","秤","称","稱","衬","襯","平"]],
	["勛", ["勛","勲","勳","勋"]],
	["勲", ["勛","勲","勳","勋"]],
	["勳", ["勛","勲","勳","勋"]],
	["勋", ["勛","勲","勳","勋"]],
	["麗", ["麗","丽","莉","利"]],
	["丽", ["麗","丽","莉","利"]],
	["莉", ["麗","丽","莉","利"]],
	["利", ["麗","丽","莉","利"]],
	["已", ["已","巳","己"]],
	["巳", ["已","巳","己"]],
	["己", ["已","巳","己"]],
	["嗬", ["嗬","呵"]],
	["呵", ["嗬","呵"]],
	["哊", ["哊","哟","唷","唹","喲","呦"]],
	["哟", ["哊","哟","唷","唹","喲","呦"]],
	["唷", ["哊","哟","唷","唹","喲","呦"]],
	["唹", ["哊","哟","唷","唹","喲","呦"]],
	["喲", ["哊","哟","唷","唹","喲","呦"]],
	["呦", ["哊","哟","唷","唹","喲","呦"]],
	["婕", ["婕","杰","洁","潔","絜","傑"]],
	["杰", ["婕","杰","洁","潔","絜","傑"]],
	["洁", ["婕","杰","洁","潔","絜","傑"]],
	["潔", ["婕","杰","洁","潔","絜","傑"]],
	["絜", ["婕","杰","洁","潔","絜","傑"]],
	["傑", ["婕","杰","洁","潔","絜","傑"]],
	["嘻", ["嘻","嬉"]],
	["嬉", ["嘻","嬉"]],
	["痲", ["痲","痳","麻","嘛"]],
	["痳", ["痲","痳","麻","嘛"]],
	["麻", ["痲","痳","麻","嘛"]],
	["嘛", ["痲","痳","麻","嘛"]],
	["狗", ["狗","犬"]],
	["犬", ["狗","犬"]],
	["拂", ["彿","拂","佛"]],
	["亙", ["亙","恆","恒","亘"]],
	["恆", ["亙","恆","恒","亘"]],
	["恒", ["亙","恆","恒","亘"]],
	["亘", ["亙","恆","恒","亘"]],
	["附", ["附","副","付"]],
	["副", ["附","副","付"]],
	["付", ["附","副","付"]],
	["伽", ["伽","枷","珈","迦","加"]],
	["枷", ["伽","枷","珈","迦","加"]],
	["珈", ["伽","枷","珈","迦","加"]],
	["迦", ["伽","枷","珈","迦","加"]],
	["加", ["伽","枷","珈","迦","加"]],
	["褔", ["褔","福"]],
	["福", ["褔","福"]],
	["捱", ["捱","挨"]],
	["挨", ["捱","挨"]],
	["拼", ["拼","拚"]],
	["拚", ["拼","拚"]],
	["飄", ["飄","飘","飃","漂"]],
	["飘", ["飄","飘","飃","漂"]],
	["飃", ["飄","飘","飃","漂"]],
	["漂", ["飄","飘","飃","漂"]],
	["佔", ["佔","沾","占"]],
	["沾", ["佔","沾","占"]],
	["占", ["佔","沾","占"]],
	["気", ["気","氣","汽","滊","炁","气"]],
	["氣", ["気","氣","汽","滊","炁","气"]],
	["汽", ["気","氣","汽","滊","炁","气"]],
	["滊", ["気","氣","汽","滊","炁","气"]],
	["炁", ["気","氣","汽","滊","炁","气"]],
	["气", ["気","氣","汽","滊","炁","气"]],
	["撩", ["撩","遼","辽"]],
	["遼", ["撩","遼","辽"]],
	["辽", ["撩","遼","辽"]],
	["做", ["做","作"]],
	["作", ["做","作"]],
	["搜", ["搜","捜","蒐"]],
	["捜", ["搜","捜","蒐"]],
	["蒐", ["搜","捜","蒐"]],
	["叟", ["叟","傁","叟"]],
	["傁", ["叟","傁","叟"]],
	["謝", ["謝","谢","榭"]],
	["谢", ["謝","谢","榭"]],
	["榭", ["謝","谢","榭"]],
	["形", ["形","型"]],
	["型", ["形","型"]],
	["雇", ["雇","頋","顧","顾","僱"]],
	["頋", ["雇","頋","顧","顾","僱"]],
	["顧", ["雇","頋","顧","顾","僱"]],
	["顾", ["雇","頋","顧","顾","僱"]],
	["僱", ["雇","頋","顧","顾","僱"]],
	["廬", ["廬","芦","蘆","庐"]],
	["芦", ["廬","芦","蘆","庐"]],
	["蘆", ["廬","芦","蘆","庐"]],
	["庐", ["廬","芦","蘆","庐"]],
	["耽", ["耽","躭","眈"]],
	["躭", ["耽","躭","眈"]],
	["眈", ["耽","躭","眈"]],
	["傹", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["竟", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["競", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["竸", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["誩", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["𥪰", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["𧡟", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["𧫘", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["𧫙", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["𧮣", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["𨐼", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["竞", ["傹","竟","競","竸","誩","𥪰","𧡟","𧫘","𧫙","𧮣","𨐼","竞"]],
	["殖", ["殖","植"]],
	["植", ["殖","植"]],
	["佬", ["佬","姥","老"]],
	["姥", ["佬","姥","老"]],
	["老", ["佬","姥","老"]],
	["倖", ["倖","幸"]],
	["幸", ["倖","幸"]],
	["㠪", ["㠪","炬","矩","鉅","钜","巨"]],
	["炬", ["㠪","炬","矩","鉅","钜","巨"]],
	["矩", ["㠪","炬","矩","鉅","钜","巨"]],
	["鉅", ["㠪","炬","矩","鉅","钜","巨"]],
	["钜", ["㠪","炬","矩","鉅","钜","巨"]],
	["巨", ["㠪","炬","矩","鉅","钜","巨"]],
	["鏈", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["链", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["䃛", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["𧹯", ["鏈","链","炼","錬","鍊","𫔀","䃛","𧹯","練","练","連","连","煉"]],
	["刴", ["刴","剁","剐","剮","劏","㓥"]],
	["剁", ["刴","剁","剐","剮","劏","㓥"]],
	["剐", ["刴","剁","剐","剮","劏","㓥"]],
	["剮", ["刴","剁","剐","剮","劏","㓥"]],
	["劏", ["刴","剁","剐","剮","劏","㓥"]],
	["㓥", ["刴","剁","剐","剮","劏","㓥"]],
	["枏", ["枏","楠","南"]],
	["楠", ["枏","楠","南"]],
	["南", ["枏","楠","南"]],
	["璐", ["璐","𡽘","𨱴","路"]],
	["𡽘", ["璐","𡽘","𨱴","路"]],
	["𨱴", ["璐","𡽘","𨱴","路"]],
	["路", ["璐","𡽘","𨱴","路"]],
	["侂", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["拓", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["杔", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["託", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["讬", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["拖", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["拕", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["托", ["侂","拓","杔","託","讬","拖","拕","托"]],
	["悕", ["悕","睎","稀","希"]],
	["睎", ["悕","睎","稀","希"]],
	["稀", ["悕","睎","稀","希"]],
	["希", ["悕","睎","稀","希"]],
	["帼", ["帼","幗","国","國","囯"]],
	["幗", ["帼","幗","国","國","囯"]],
	["国", ["帼","幗","国","國","囯"]],
	["國", ["帼","幗","国","國","囯"]],
	["囯", ["帼","幗","国","國","囯"]],
	["返", ["返","反"]],
	["反", ["返","反"]],
	["扬", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["揚", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["旸", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["暘", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["杨", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["楊", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["炀", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["烊", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["煬", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["阳", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["陽", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["佯", ["扬","揚","旸","暘","杨","楊","炀","烊","煬","阳","陽","佯"]],
	["来", ["来","莱","萊","來"]],
	["莱", ["来","莱","萊","來"]],
	["萊", ["来","莱","萊","來"]],
	["來", ["来","莱","萊","來"]],
	["葆", ["葆","堡","褓","緥","保"]],
	["堡", ["葆","堡","褓","緥","保"]],
	["褓", ["葆","堡","褓","緥","保"]],
	["緥", ["葆","堡","褓","緥","保"]],
	["保", ["葆","堡","褓","緥","保"]],
	["渡", ["渡","度"]],
	["度", ["渡","度"]],
	["剳", ["剳","札","箚","紮","扎"]],
	["札", ["剳","札","箚","紮","扎"]],
	["箚", ["剳","札","箚","紮","扎"]],
	["紮", ["剳","札","箚","紮","扎"]],
	["扎", ["剳","札","箚","紮","扎"]],
	["媞", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["提", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["湜", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["禔", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["緹", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["缇", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["隄", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["堤", ["媞","提","湜","禔","緹","缇","隄","堤"]],
	["臘", ["臘","蜡","蠟","腊"]],
	["蜡", ["臘","蜡","蠟","腊"]],
	["蠟", ["臘","蜡","蠟","腊"]],
	["腊", ["臘","蜡","蠟","腊"]],
	["鬱", ["鬱","𨚼","𨟝","郁"]],
	["𨚼", ["鬱","𨚼","𨟝","郁"]],
	["𨟝", ["鬱","𨚼","𨟝","郁"]],
	["郁", ["鬱","𨚼","𨟝","郁"]],
	["擀", ["擀","杆","桿","扞"]],
	["杆", ["擀","杆","桿","扞"]],
	["桿", ["擀","杆","桿","扞"]],
	["扞", ["擀","杆","桿","扞"]],
	["脼", ["脼","郞","𥇑","郎"]],
	["郞", ["脼","郞","𥇑","郎"]],
	["𥇑", ["脼","郞","𥇑","郎"]],
	["郎", ["脼","郞","𥇑","郎"]],
	["芭", ["芭","巴"]],
	["巴", ["芭","巴"]],
	["涅", ["涅","湼","捏"]],
	["湼", ["涅","湼","捏"]],
	["捏", ["涅","湼","捏"]],
	["择", ["择","擇","沢","泽","澤","択"]],
	["擇", ["择","擇","沢","泽","澤","択"]],
	["沢", ["择","擇","沢","泽","澤","択"]],
	["泽", ["择","擇","沢","泽","澤","択"]],
	["澤", ["择","擇","沢","泽","澤","択"]],
	["択", ["择","擇","沢","泽","澤","択"]],
	["幵", ["幵","開","开"]],
	["開", ["幵","開","开"]],
	["开", ["幵","開","开"]],
	["珮", ["珮","佩"]],
	["佩", ["珮","佩"]],
	["喩", ["喩","籲","龥","吁","喻"]],
	["籲", ["喩","籲","龥","吁","喻"]],
	["龥", ["喩","籲","龥","吁","喻"]],
	["吁", ["喩","籲","龥","吁","喻"]],
	["喻", ["喩","籲","龥","吁","喻"]],
	["值", ["值","直","値"]],
	["値", ["值","直","値"]],
	["臓", ["臓","臟","贓","赃","髒","脏"]],
	["臟", ["臓","臟","贓","赃","髒","脏"]],
	["贓", ["臓","臟","贓","赃","髒","脏"]],
	["赃", ["臓","臟","贓","赃","髒","脏"]],
	["髒", ["臓","臟","贓","赃","髒","脏"]],
	["脏", ["臓","臟","贓","赃","髒","脏"]],
	["㊤", ["㊤","上"]],
	["上", ["㊤","上"]],
	["㊦", ["㊦","下"]],
	["下", ["㊦","下"]],
	["唿", ["唿","呼"]],
	["呼", ["唿","呼"]],
	["詳", ["詳","详","祥"]],
	["详", ["詳","详","祥"]],
	["祥", ["詳","详","祥"]],
	["妮", ["妮","泥","尼"]],
	["泥", ["妮","泥","尼"]],
	["尼", ["妮","泥","尼"]],
	["剋", ["剋","尅","克"]],
	["尅", ["剋","尅","克"]],
	["克", ["剋","尅","克"]],
	["撥", ["撥","播","拨"]],
	["播", ["撥","播","拨"]],
	["拨", ["撥","播","拨"]],
	["挿", ["挿","揷","插"]],
	["揷", ["挿","揷","插"]],
	["插", ["挿","揷","插"]],
	["汀", ["汀","丁"]],
	["丁", ["汀","丁"]],
	["那", ["那","娜"]],
	["娜", ["那","娜"]],
	["菈", ["菈","拉"]],
	["拉", ["菈","拉"]],
	["玲", ["玲","琳","鈴","铃","淋","林"]],
	["琳", ["玲","琳","鈴","铃","淋","林"]],
	["鈴", ["玲","琳","鈴","铃","淋","林"]],
	["铃", ["玲","琳","鈴","铃","淋","林"]],
	["淋", ["玲","琳","鈴","铃","淋","林"]],
	["林", ["玲","琳","鈴","铃","淋","林"]],
	["銘", ["銘","铭","名"]],
	["铭", ["銘","铭","名"]],
	["名", ["銘","铭","名"]],
	["齣", ["齣","出"]],
	["出", ["齣","出"]],
	["欸", ["欸","誒","诶","唉"]],
	["誒", ["欸","誒","诶","唉"]],
	["诶", ["欸","誒","诶","唉"]],
	["唉", ["欸","誒","诶","唉"]],
	["哞", ["哞","呣"]],
	["呣", ["哞","呣"]],
	["㖿", ["㖿","吔","耶"]],
	["吔", ["㖿","吔","耶"]],
	["耶", ["㖿","吔","耶"]],
	["魅", ["魅","媚"]],
	["媚", ["魅","媚"]],
	["扉", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["斐", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["緋", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["绯", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["翡", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["菲", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["蜚", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["誹", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["诽", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["霏", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["非", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["匪", ["扉","斐","緋","绯","翡","菲","蜚","誹","诽","霏","非","匪"]],
	["衩", ["衩","釵","钗","叉"]],
	["釵", ["衩","釵","钗","叉"]],
	["钗", ["衩","釵","钗","叉"]],
	["叉", ["衩","釵","钗","叉"]],
	["淇", ["淇","琪","祺","其"]],
	["琪", ["淇","琪","祺","其"]],
	["祺", ["淇","琪","祺","其"]],
	["其", ["淇","琪","祺","其"]],
	["壇", ["壇","談","譚","谈","谭","坛"]],
	["談", ["壇","談","譚","谈","谭","坛"]],
	["譚", ["壇","談","譚","谈","谭","坛"]],
	["谈", ["壇","談","譚","谈","谭","坛"]],
	["谭", ["壇","談","譚","谈","谭","坛"]],
	["坛", ["壇","談","譚","谈","谭","坛"]],
	["材", ["材","柴","才"]],
	["柴", ["材","柴","才"]],
	["才", ["材","柴","才"]],
	["唸", ["唸","念"]],
	["念", ["唸","念"]],
	["趾", ["趾","指"]],
	["指", ["趾","指"]],
	["仕", ["仕","士"]],
	["士", ["仕","士"]],
	["嬢", ["嬢","孃","娘"]],
	["孃", ["嬢","孃","娘"]],
	["娘", ["嬢","孃","娘"]],
	["哑", ["哑","唖","瘂","痖","啞"]],
	["唖", ["哑","唖","瘂","痖","啞"]],
	["瘂", ["哑","唖","瘂","痖","啞"]],
	["痖", ["哑","唖","瘂","痖","啞"]],
	["啞", ["哑","唖","瘂","痖","啞"]],
	["动", ["动","働","仂","動"]],
	["働", ["动","働","仂","動"]],
	["仂", ["动","働","仂","動"]],
	["動", ["动","働","仂","動"]],
	["查", ["查","査","察"]],
	["査", ["查","査","察"]],
	["察", ["查","査","察"]],
	["鉄", ["鉄","銕","鐡","鐵","铁","𨫓","鉃"]],
	["銕", ["鉄","銕","鐡","鐵","铁","𨫓","鉃"]],
	["鐡", ["鉄","銕","鐡","鐵","铁","𨫓","鉃"]],
	["鐵", ["鉄","銕","鐡","鐵","铁","𨫓","鉃"]],
	["铁", ["鉄","銕","鐡","鐵","铁","𨫓","鉃"]],
	["𨫓", ["鉄","銕","鐡","鐵","铁","𨫓","鉃"]],
	["鉃", ["鉄","銕","鐡","鐵","铁","𨫓","鉃"]],
	["归", ["归","歸","皈","帰"]],
	["歸", ["归","歸","皈","帰"]],
	["皈", ["归","歸","皈","帰"]],
	["帰", ["归","歸","皈","帰"]],
	["瘡", ["瘡","疮","創","创"]],
	["疮", ["瘡","疮","創","创"]],
	["創", ["瘡","疮","創","创"]],
	["创", ["瘡","疮","創","创"]],
	["拷", ["拷","烤","考"]],
	["烤", ["拷","烤","考"]],
	["考", ["拷","烤","考"]],
	["込", ["込","入"]],
	["入", ["込","入"]],
	["伦", ["伦","侖","倫","仑"]],
	["侖", ["伦","侖","倫","仑"]],
	["倫", ["伦","侖","倫","仑"]],
	["仑", ["伦","侖","倫","仑"]],
	["仔", ["仔","子"]],
	["子", ["仔","子"]],
	["彎", ["彎","湾","灣","弯"]],
	["湾", ["彎","湾","灣","弯"]],
	["灣", ["彎","湾","灣","弯"]],
	["弯", ["彎","湾","灣","弯"]],
	["荧", ["荧","萤","蛍","螢","熒"]],
	["萤", ["荧","萤","蛍","螢","熒"]],
	["蛍", ["荧","萤","蛍","螢","熒"]],
	["螢", ["荧","萤","蛍","螢","熒"]],
	["熒", ["荧","萤","蛍","螢","熒"]],
	["挣", ["挣","掙","爭","争"]],
	["掙", ["挣","掙","爭","争"]],
	["爭", ["挣","掙","爭","争"]],
	["争", ["挣","掙","爭","争"]],
	["漲", ["漲","胀","脹","涨"]],
	["胀", ["漲","胀","脹","涨"]],
	["脹", ["漲","胀","脹","涨"]],
	["涨", ["漲","胀","脹","涨"]],
	["無", ["無","冇","沒","没","无"]],
	["冇", ["無","冇","沒","没","无"]],
	["沒", ["無","冇","沒","没","无"]],
	["没", ["無","冇","沒","没","无"]],
	["无", ["無","冇","沒","没","无"]],
	["噸", ["噸","訰","吨"]],
	["訰", ["噸","訰","吨"]],
	["吨", ["噸","訰","吨"]],
	["鈎", ["鈎","鉤","钩","勾"]],
	["鉤", ["鈎","鉤","钩","勾"]],
	["钩", ["鈎","鉤","钩","勾"]],
	["勾", ["鈎","鉤","钩","勾"]],
	["沉", ["沉","沈"]],
	["沈", ["沉","沈"]],
	["畳", ["畳","疊","迭","叠"]],
	["疊", ["畳","疊","迭","叠"]],
	["迭", ["畳","疊","迭","叠"]],
	["叠", ["畳","疊","迭","叠"]],
	["繮", ["繮","缰","韁","僵","疆","殭"]],
	["缰", ["繮","缰","韁","僵","疆","殭"]],
	["韁", ["繮","缰","韁","僵","疆","殭"]],
	["僵", ["繮","缰","韁","僵","疆","殭"]],
	["疆", ["繮","缰","韁","僵","疆","殭"]],
	["殭", ["繮","缰","韁","僵","疆","殭"]],
	["背", ["背","揹"]],
	["揹", ["背","揹"]],
	["団", ["団","團","糰","团"]],
	["團", ["団","團","糰","团"]],
	["糰", ["団","團","糰","团"]],
	["团", ["団","團","糰","团"]],
	["榚", ["榚","糕"]],
	["糕", ["榚","糕"]],
	["須", ["須","须","鬚","需"]],
	["须", ["須","须","鬚","需"]],
	["鬚", ["須","须","鬚","需"]],
	["需", ["須","须","鬚","需"]],
	["紆", ["紆","紓","纡","纾","抒"]],
	["紓", ["紆","紓","纡","纾","抒"]],
	["纡", ["紆","紓","纡","纾","抒"]],
	["纾", ["紆","紓","纡","纾","抒"]],
	["抒", ["紆","紓","纡","纾","抒"]],
	["洲", ["洲","州"]],
	["州", ["洲","州"]],
	["厰", ["厰","場","廠","场","厂"]],
	["場", ["厰","場","廠","场","厂"]],
	["廠", ["厰","場","廠","场","厂"]],
	["场", ["厰","場","廠","场","厂"]],
	["厂", ["厰","場","廠","场","厂"]],
	["筿", ["筿","篠","筱"]],
	["篠", ["筿","篠","筱"]],
	["筱", ["筿","篠","筱"]],
	["跟", ["跟","根"]],
	["根", ["跟","根"]],
	["曝", ["曝","爆","暴"]],
	["㬅", ["㬅","嫚","曼","熳","蔓","漫"]],
	["嫚", ["㬅","嫚","曼","熳","蔓","漫"]],
	["曼", ["㬅","嫚","曼","熳","蔓","漫"]],
	["熳", ["㬅","嫚","曼","熳","蔓","漫"]],
	["蔓", ["㬅","嫚","曼","熳","蔓","漫"]],
	["漫", ["㬅","嫚","曼","熳","蔓","漫"]],
	["昇", ["昇","陞","升"]],
	["陞", ["昇","陞","升"]],
	["升", ["昇","陞","升"]],
	["獃", ["待","獃","呆"]],
	["煙", ["煙","腌","菸","醃","烟"]],
	["腌", ["煙","腌","菸","醃","烟"]],
	["菸", ["煙","腌","菸","醃","烟"]],
	["醃", ["煙","腌","菸","醃","烟"]],
	["烟", ["煙","腌","菸","醃","烟"]],
	["錄", ["錄","録","陆","陸","录"]],
	["録", ["錄","録","陆","陸","录"]],
	["陆", ["錄","録","陆","陸","录"]],
	["陸", ["錄","録","陆","陸","录"]],
	["录", ["錄","録","陆","陸","录"]],
	["擄", ["擄","虏","虜","掳"]],
	["虏", ["擄","虏","虜","掳"]],
	["虜", ["擄","虏","虜","掳"]],
	["掳", ["擄","虏","虜","掳"]],
	["翹", ["翹","跷","蹺","翘"]],
	["跷", ["翹","跷","蹺","翘"]],
	["蹺", ["翹","跷","蹺","翘"]],
	["翘", ["翹","跷","蹺","翘"]],
	["腳", ["腳","角","脚"]],
	["角", ["腳","角","脚"]],
	["脚", ["腳","角","脚"]],
	["直", ["值","直","値"]],
	["词", ["词","辞","辭","詞"]],
	["辞", ["词","辞","辭","詞"]],
	["辭", ["词","辞","辭","詞"]],
	["詞", ["词","辞","辭","詞"]],
	["意", ["意","義","义"]],
	["義", ["意","義","义"]],
	["义", ["意","義","义"]],
	["梗", ["梗","哏"]],
	["哏", ["梗","哏"]],
	["咫", ["咫","尺","呎"]],
	["尺", ["咫","尺","呎"]],
	["呎", ["咫","尺","呎"]],
	["怜", ["怜","憐","伶"]],
	["憐", ["怜","憐","伶"]],
	["伶", ["怜","憐","伶"]],
	["荽", ["荽","萎","委"]],
	["萎", ["荽","萎","委"]],
	["委", ["荽","萎","委"]],
	["岺", ["岺","嶺","阾","領","领","岭"]],
	["嶺", ["岺","嶺","阾","領","领","岭"]],
	["阾", ["岺","嶺","阾","領","领","岭"]],
	["領", ["岺","嶺","阾","領","领","岭"]],
	["领", ["岺","嶺","阾","領","领","岭"]],
	["岭", ["岺","嶺","阾","領","领","岭"]],
	["決", ["決","絕","絶","绝","訣","诀","决"]],
	["絕", ["決","絕","絶","绝","訣","诀","决"]],
	["絶", ["決","絕","絶","绝","訣","诀","决"]],
	["绝", ["決","絕","絶","绝","訣","诀","决"]],
	["訣", ["決","絕","絶","绝","訣","诀","决"]],
	["诀", ["決","絕","絶","绝","訣","诀","决"]],
	["决", ["決","絕","絶","绝","訣","诀","决"]],
	["嶽", ["嶽","𡶦","岳"]],
	["𡶦", ["嶽","𡶦","岳"]],
	["岳", ["嶽","𡶦","岳"]],
	["授", ["授","受"]],
	["受", ["授","受"]],
	["線", ["線","线","缐","腺","綫"]],
	["线", ["線","线","缐","腺","綫"]],
	["缐", ["線","线","缐","腺","綫"]],
	["腺", ["線","线","缐","腺","綫"]],
	["綫", ["線","线","缐","腺","綫"]],
	["壱", ["壱","壹","一"]],
	["壹", ["壱","壹","一"]],
	["一", ["壱","壹","一"]],
	["荒", ["荒","慌"]],
	["慌", ["荒","慌"]],
	["廷", ["廷","庭"]],
	["庭", ["廷","庭"]],
	["喧", ["喧","暄","諠","宣"]],
	["暄", ["喧","暄","諠","宣"]],
	["諠", ["喧","暄","諠","宣"]],
	["宣", ["喧","暄","諠","宣"]],
	["略", ["略","畧","掠"]],
	["畧", ["略","畧","掠"]],
	["掠", ["略","畧","掠"]],
	["牋", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["笺", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["签", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["箋", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["簽", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["籖", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["籤", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["䇳", ["牋","笺","签","箋","簽","籖","籤","䇳"]],
	["幺", ["幺","庅","麼","麽","么"]],
	["庅", ["幺","庅","麼","麽","么"]],
	["麼", ["幺","庅","麼","麽","么"]],
	["麽", ["幺","庅","麼","麽","么"]],
	["么", ["幺","庅","麼","麽","么"]],
	["芒", ["芒","茫","杧"]],
	["茫", ["芒","茫","杧"]],
	["杧", ["芒","茫","杧"]],
	["跃", ["跃","躍","趯"]],
	["躍", ["跃","躍","趯"]],
	["趯", ["跃","躍","趯"]],
	["弥", ["弥","彌","瀰","㳽"]],
	["彌", ["弥","彌","瀰","㳽"]],
	["瀰", ["弥","彌","瀰","㳽"]],
	["㳽", ["弥","彌","瀰","㳽"]],
	["袜", ["袜","襪","抹"]],
	["襪", ["袜","襪","抹"]],
	["抹", ["袜","襪","抹"]],
	["囪", ["囪","囱","窓","窗","窻","䆫"]],
	["囱", ["囪","囱","窓","窗","窻","䆫"]],
	["窓", ["囪","囱","窓","窗","窻","䆫"]],
	["窗", ["囪","囱","窓","窗","窻","䆫"]],
	["窻", ["囪","囱","窓","窗","窻","䆫"]],
	["䆫", ["囪","囱","窓","窗","窻","䆫"]],
	["凾", ["凾","涵","函"]],
	["涵", ["凾","涵","函"]],
	["函", ["凾","涵","函"]],
	["耸", ["耸","聳","悚"]],
	["聳", ["耸","聳","悚"]],
	["悚", ["耸","聳","悚"]],
	["落", ["落","洛"]],
	["洛", ["落","洛"]],
	["標", ["標","鏢","鑣","镳","镖","标"]],
	["鏢", ["標","鏢","鑣","镳","镖","标"]],
	["鑣", ["標","鏢","鑣","镳","镖","标"]],
	["镳", ["標","鏢","鑣","镳","镖","标"]],
	["镖", ["標","鏢","鑣","镳","镖","标"]],
	["标", ["標","鏢","鑣","镳","镖","标"]],
	["恠", ["恠","怪"]],
	["怪", ["恠","怪"]],
	["併", ["併","倂","并","幷","竝","𠀤","並"]],
	["倂", ["併","倂","并","幷","竝","𠀤","並"]],
	["并", ["併","倂","并","幷","竝","𠀤","並"]],
	["幷", ["併","倂","并","幷","竝","𠀤","並"]],
	["竝", ["併","倂","并","幷","竝","𠀤","並"]],
	["𠀤", ["併","倂","并","幷","竝","𠀤","並"]],
	["並", ["併","倂","并","幷","竝","𠀤","並"]],
	["鶫", ["鶫","鸫","𪂝","鶇"]],
	["鸫", ["鶫","鸫","𪂝","鶇"]],
	["𪂝", ["鶫","鸫","𪂝","鶇"]],
	["鶇", ["鶫","鸫","𪂝","鶇"]],
	["鐳", ["鐳","镭","靁","雷"]],
	["镭", ["鐳","镭","靁","雷"]],
	["靁", ["鐳","镭","靁","雷"]],
	["鉑", ["鉑","铂","白"]],
	["铂", ["鉑","铂","白"]],
	["白", ["鉑","铂","白"]],
	["弔", ["弔","吊"]],
	["吊", ["弔","吊"]],
	["誡", ["誡","诫","𢌵","戒"]],
	["诫", ["誡","诫","𢌵","戒"]],
	["𢌵", ["誡","诫","𢌵","戒"]],
	["戒", ["誡","诫","𢌵","戒"]],
]);

