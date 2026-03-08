import { useState } from "react";

const ACCENT = "#2563EB";
const AL = "#EFF6FF";
const AM = "#DBEAFE";

// ▼ 設定項目 — 実際のURLに差し替えてください
const MAKE_WEBHOOK = "https://hook.us2.make.com/1tjy4p8nafmgg5evcmq89f369a59lrbu";
const LIFF_URL = "https://liff.line.me/2009318162-SODj4Xe8";

// 業種マッピング: フロント表示名 → Notionセレクト値
const INDUSTRY_TO_NOTION = {
  coaching:    "コンサル",
  beauty:      "美容",
  ec:          "EC・物販",
  food:        "飲食",
  education:   "教育",
  realestate:  "不動産",
  freelance:   "その他",
  other:       "その他",
};

const INDUSTRIES = [
  { id:"coaching", label:"コーチング・コンサル", icon:"💼" },
  { id:"beauty",   label:"美容・エステ・サロン", icon:"✨" },
  { id:"ec",       label:"物販・EC・ハンドメイド", icon:"🛍️" },
  { id:"food",     label:"飲食・カフェ・フード", icon:"☕" },
  { id:"education",label:"教育・スクール・講座", icon:"📚" },
  { id:"realestate",label:"不動産・建築・リフォーム", icon:"🏠" },
  { id:"freelance",label:"フリーランス・クリエイター", icon:"🎨" },
  { id:"other",    label:"その他・サービス業", icon:"⚙️" },
];

const IND = {
  coaching:   { label:"コーチング・コンサル",    icon:"💼", tips:"「変化の証明」×「HOW TO」が最短ルート。Before/After・成功事例を積み重ね、無料相談への自然な導線を作りましょう。", cvGoal:"無料相談・体験セッション申込", tags:["#コーチング","#ビジネスコーチ","#起業","#コンサル","#マインドセット"], indSearch:["コーチング インスタ 発信 参考","ビジネスコーチ リール 事例"] },
  beauty:     { label:"美容・エステ・サロン",     icon:"✨", tips:"施術Before/Afterと制作過程が最も拡散されやすい業種。顧客の変化を映像で証明することがCV最短ルートです。スタッフの人柄を見せる顔出し投稿も高効果。", cvGoal:"初回体験・ご予約への誘導", tags:["#エステ","#サロン","#美容","#スキンケア","#脱毛"], indSearch:["サロン 美容師 インスタ 発信 参考","エステ ビフォーアフター リール 事例"] },
  ec:         { label:"物販・EC・ハンドメイド",   icon:"🛍️", tips:"商品の世界観・制作過程・開封動画が鉄板。「なぜこの商品か」のストーリーと視覚的訴求を組み合わせ、衝動購買を引き出しましょう。", cvGoal:"商品ページ・ECサイトへの誘導", tags:["#ハンドメイド","#物販","#購入品紹介","#おすすめ商品"], indSearch:["ハンドメイド 作家 インスタ 発信 参考","物販 EC リール 事例"] },
  food:       { label:"飲食・カフェ・フード",     icon:"☕", tips:"「映えるビジュアル」と「体験の追体験」が鍵。料理の制作過程・お店の空気感・スタッフのこだわりで来店したくなる雰囲気を醸成しましょう。", cvGoal:"来店・テイクアウト・予約への誘導", tags:["#カフェ","#グルメ","#飲食店","#食べ歩き"], indSearch:["カフェ 飲食店 インスタ リール 参考","料理 制作過程 リール 事例"] },
  education:  { label:"教育・スクール・講座",     icon:"📚", tips:"「受講前→受講後の変化」と「ひとつ学べる知識」の組み合わせが強力。無料で価値提供して信頼を積み上げ、有料講座への自然な導線を作りましょう。", cvGoal:"無料体験・説明会・講座申込への誘導", tags:["#スクール","#オンライン講座","#学び","#資格","#スキルアップ"], indSearch:["スクール 講師 インスタ 発信 参考","オンライン講座 リール 事例"] },
  realestate: { label:"不動産・建築・リフォーム", icon:"🏠", tips:"「物件紹介」と「リフォームBefore/After」が最も反応が高い。専門知識を噛み砕いたHOW TOで信頼を積み、問い合わせへの流れを設計しましょう。", cvGoal:"物件問い合わせ・無料見積りへの誘導", tags:["#不動産","#リフォーム","#マイホーム","#インテリア","#注文住宅"], indSearch:["不動産 インスタ 発信 参考","リフォーム 工務店 リール 事例"] },
  freelance:  { label:"フリーランス・クリエイター",icon:"🎨", tips:"「制作過程の公開」と「実績・ポートフォリオ紹介」が最強。スキルと世界観を同時に見せることで、仕事依頼への信頼ハードルを下げられます。", cvGoal:"仕事依頼・ポートフォリオ閲覧への誘導", tags:["#フリーランス","#副業","#クリエイター","#在宅ワーク"], indSearch:["フリーランス クリエイター インスタ 参考","デザイナー リール 事例"] },
  other:      { label:"その他・サービス業",       icon:"⚙️", tips:"まずは「お客様の変化・声」と「サービスの裏側」を見せることから始めましょう。継続投稿で信頼を積み上げることが最優先です。", cvGoal:"問い合わせ・サービス申込への誘導", tags:["#サービス業","#起業","#ビジネス","#SNS運用"], indSearch:["起業家 インスタ 発信 参考","サービス業 リール 事例"] },
};

const REEL_SEARCH = {
  T01:"顔出し セルフブランディング リール インスタ 参考",
  T02:"アフレコ ナレーション リール インスタ 参考",
  T03:"テキスト動画 情報発信 インスタ リール 参考",
  T04:"対比 テキスト 情報 リール インスタ 参考",
  T05:"体験談 ストーリー リール インスタ 参考",
  T06:"ビフォーアフター リール インスタ 参考",
  T07:"メイキング 制作過程 リール インスタ 参考",
  T08:"まとめ ランキング リール インスタ 参考",
  T09:"HOW TO チュートリアル リール インスタ 参考",
  T10:"検証 リアクション リール インスタ 参考",
  T11:"ルーティン モーニング リール インスタ 参考",
  T12:"Q&A コメント返し リール インスタ 参考",
  T13:"ブランドストーリー 世界観 リール インスタ 参考",
  T14:"比較 VS リール インスタ 参考",
  T15:"POV 世界観 没入 リール インスタ 参考",
};

const QUESTIONS = [
  { axis:0, text:"自分の顔や声を出して発信することに抵抗がない", rev:false },
  { axis:0, text:"商品やサービスの品質より、「この人だから買う」と思われたい", rev:false },
  { axis:0, text:"匿名でも情報の質さえ良ければ十分勝負できると思う", rev:true },
  { axis:0, text:"自分の個性やキャラクターは、事業の最大の武器だと思う", rev:false },
  { axis:0, text:"「中の人」が見えないアカウントの方が、自分には合っている", rev:true },
  { axis:1, text:"数字やデータより、ストーリーで人の心を動かしたい", rev:false },
  { axis:1, text:"「共感しました」という反応が、「参考になりました」より嬉しい", rev:false },
  { axis:1, text:"客観的な比較やエビデンスの方が、結局は信頼されると思う", rev:true },
  { axis:1, text:"自分の失敗談や挫折経験を発信することに大きな価値がある", rev:false },
  { axis:1, text:"感情に訴えるより、論理的に正しい情報を届けるべきだ", rev:true },
  { axis:2, text:"美しい映像やビジュアルへのこだわりは絶対に妥協したくない", rev:false },
  { axis:2, text:"文字で説明するより、映像で「空気感」を伝えたい", rev:false },
  { axis:2, text:"動画の撮影や映像制作の過程を心から楽しめる", rev:false },
  { axis:2, text:"効率的に情報を伝えるなら、テキストの方が圧倒的に優れている", rev:true },
  { axis:2, text:"ブランドの世界観は、言葉よりビジュアルで表現すべきだ", rev:false },
  { axis:3, text:"短期の売上数字より、長期的なブランド価値の方が重要だ", rev:false },
  { axis:3, text:"フォロワー数より、ブランドの世界観を守ることを優先したい", rev:false },
  { axis:3, text:"「すぐ買って」より「この世界観が好き」と思われたい", rev:false },
  { axis:3, text:"投稿の成功は、最終的には売上やコンバージョンで判断すべきだ", rev:true },
  { axis:3, text:"すぐ結果に繋がらなくても、ブランドイメージ向上は十分な成果だ", rev:false },
];

const AXIS_META = [
  { left:"匿名型", right:"顔出し型", label:"表現スタイル" },
  { left:"論理型", right:"共感型",   label:"訴求アプローチ" },
  { left:"テキスト型", right:"映像型", label:"制作スタイル" },
  { left:"CV型",  right:"ブランド型",  label:"目的志向" },
];

const getTypeCode = s => (s[0]>=0?"F":"A")+(s[1]>=0?"E":"L")+(s[2]>=0?"V":"T")+(s[3]>=0?"B":"C");

// guide helper
const G = (baseSearch, checkPoints, tiers) => ({ baseSearch, checkPoints, tiers });

const TYPE_DATA = {
  FEVB:{ kanji:"華", name:"カリスマ・クリエイター", en:"Charisma Creator", desc:"自分自身の魅力とビジュアルセンスでブランドの世界観を体現するタイプ。顔出しに抵抗がなく、感情を込めた映像で人を惹きつけます。長期的なファンコミュニティを築く力があります。", strengths:["圧倒的なファン化力","世界観で差別化","高単価商品と好相性"],
    influencerGuide: G(
      ["顔出し ライフスタイル インスタ 世界観","カリスマ クリエイター リール 参考事例","パーソナルブランディング インスタ 成功例"],
      ["全投稿でテーマカラー・フォント・トーンが統一されている","プロフィールだけで「この人は何者か」が1秒でわかる","ストーリーズ・ハイライトがフィードと連動しブランドを形成している","コメント欄にファンとの自然な双方向交流がある","エンゲージメント率（いいね数÷フォロワー数）が3%以上","フォロワーが増えても投稿のトーンや世界観がぶれていない"],
      [{label:"🟢 マイクロ（〜1万）",hint:"世界観の統一感・投稿フォーマットの型を最優先で参考に。成長過程が見えて真似しやすい"},{label:"🔵 中型（3〜5万）",hint:"ブランディングの完成形・ハイライト構成・CTA設計を参考に"}]
    ),
    types:[{id:"T01",name:"セルフブランディング型",pct:95,reason:"顔出しで専門性と世界観を同時に伝えられ、最もポテンシャルを引き出します。"},{id:"T11",name:"ルーティン・日常型",pct:82,reason:"ライフスタイルへの憧れを生む動画は、映像美へのこだわりが最も活きる形式です。"},{id:"T05",name:"体験・ストーリー型",pct:75,reason:"自分の体験を映像ストーリーとして紡ぐ力があります。共感と世界観の両方を満たせます。"}]},

  FEVC:{ kanji:"炎", name:"パッション・セラー", en:"Passion Seller", desc:"情熱的な語り口と親しみやすいキャラクターで「この人から買いたい」と思わせる力を持つタイプ。共感を軸にしながらも、しっかり成果に繋げる実行力があります。", strengths:["成約率が高い","共感→行動の導線が得意","リピーターを生みやすい"],
    influencerGuide: G(
      ["顔出し 販売 インスタ 共感 参考","パッション 熱量 ビジネス リール 事例","顔出し 商品紹介 インスタ CV 参考"],
      ["語り口が熱量高く最後まで見てしまう引力がある","投稿の最後に明確なCTA（行動喚起）がある","商品紹介が押しつけがましくなく自然に組み込まれている","フォロワーの購入報告・感謝コメントが多い","ストーリーズでの日常発信と商品告知のバランスが取れている","リール→プロフィール→ハイライト→LPの導線が明確"],
      [{label:"🟢 マイクロ（〜1万）",hint:"導線設計の型・CTAの書き方を参考に。成長中で親近感があり学びやすい"},{label:"🔵 中型（3〜5万）",hint:"熱量の維持方法・コンテンツサイクルの回し方を参考に"}]
    ),
    types:[{id:"T01",name:"セルフブランディング型",pct:90,reason:"あなたの人柄と熱量が最大の武器。顔出しで信頼を獲得し、CVへの自然な流れを作れます。"},{id:"T10",name:"リアクション・検証型",pct:85,reason:"「本当に良いの？」を自分で試す姿が正直さと情熱を伝えます。"},{id:"T12",name:"コミュニティ参加型",pct:72,reason:"フォロワーとの対話を通じて信頼を深め、購買行動に繋げる双方向型です。"}]},

  FETB:{ kanji:"語", name:"ストーリーテラー", en:"Storyteller", desc:"自分の体験や想いを言葉で紡ぎ、深い共感を生むタイプ。映像美より「何を語るか」に価値があり、ブランドの背景にあるストーリーで人の心を動かします。", strengths:["深い共感を獲得","テキストで世界観を構築","長期的なファン化"],
    influencerGuide: G(
      ["顔出し 語り ストーリー インスタ 参考","テキスト ブランディング 顔出し リール 事例","体験談 発信 インスタ 共感 参考"],
      ["キャプションが長くても最後まで読ませる文章力がある","失敗談・葛藤を正直に発信しており共感コメントが多い","ブランドの「なぜ始めたか」ストーリーが明確に伝わる","テキストオーバーレイの言葉が刺さり保存されやすい","顔出しだが過度な編集なく「素の人柄」が伝わる","投稿のテーマに一貫性があり「この人の物語」として成立している"],
      [{label:"🟢 マイクロ（〜1万）",hint:"ストーリーの構成・言葉の選び方を参考に。等身大で真似しやすい"},{label:"🔵 中型（3〜5万）",hint:"どのテーマが響いたか・シリーズ化の手法を参考に"}]
    ),
    types:[{id:"T05",name:"体験・ストーリー型",pct:95,reason:"あなたの体験と言葉の力が最大限に活きる型です。"},{id:"T01",name:"セルフブランディング型",pct:78,reason:"顔出し×語りの組み合わせで、テキストだけでは伝わらない温度感を届けられます。"},{id:"T12",name:"コミュニティ参加型",pct:70,reason:"フォロワーの悩みに寄り添い言葉で応える。共感型のあなたに最適です。"}]},

  FETC:{ kanji:"導", name:"メンター・ガイド", en:"Mentor Guide", desc:"顔出しで信頼を獲得し、共感を軸にしたテキストコンテンツで行動変容を促すタイプ。「この人に教わりたい」と思わせる力があります。", strengths:["教育コンテンツに強い","信頼→購入の導線が自然","リスト獲得力が高い"],
    influencerGuide: G(
      ["顔出し 教育 メンター インスタ 参考","HOW TO 顔出し リール 専門家 事例","コーチ 先生 インスタ 発信 参考"],
      ["投稿を見ると「ひとつ学べた」という実感がある","「この人に相談したい」と思わせるプロフィール設計","顔出しで話しながらテキストが補足される構成","フォロワーから「質問」「相談」コメントが多い","無料発信→有料サービスへの自然な導線がある","定期的なシリーズ投稿でフォロワーを習慣的に来させている"],
      [{label:"🟢 マイクロ（〜1万）",hint:"教育コンテンツの構成・専門性の見せ方を参考に"},{label:"🔵 中型（3〜5万）",hint:"無料→有料の導線設計・ハイライト活用法を参考に"}]
    ),
    types:[{id:"T04",name:"対比構造型",pct:92,reason:"教育的かつ共感を生む対比構造が、CVにも直結しやすい形です。"},{id:"T09",name:"チュートリアル・HOW TO型",pct:85,reason:"ステップバイステップで教える形式は、あなたのメンター気質にぴったりです。"},{id:"T01",name:"セルフブランディング型",pct:73,reason:"「この人に相談したい」を生むには顔出しでの信頼構築が不可欠です。"}]},

  FLVB:{ kanji:"匠", name:"クラフト・アーティスト", en:"Craft Artist", desc:"映像美と論理的な構成力を併せ持つクリエイタータイプ。制作過程そのものがコンテンツになり、プロフェッショナルとしてのブランド価値を高めます。", strengths:["映像クオリティで圧倒","プロ感でブランディング","ASMR需要も取れる"],
    influencerGuide: G(
      ["職人 制作過程 インスタ 映像美 参考","クラフト メイキング リール 参考事例","ものづくり プロセス インスタ 世界観"],
      ["制作過程の映像が美しく「見ているだけで満足」できる質","手作業や技術が伝わる細部へのこだわりが見える","BGMと映像のテンポが絶妙にマッチしている","「完成品」より「過程」に多くの再生・保存が集まっている","コメント欄に「どうやって作るの？」など技術への問い合わせが多い","映像のカラーグレーディングに一貫性がある"],
      [{label:"🟢 マイクロ（〜1万）",hint:"映像の切り取り方・テンポ感・BGM選びを参考に"},{label:"🔵 中型（3〜5万）",hint:"完成度の高い映像とブランドポジションの作り方を参考に"}]
    ),
    types:[{id:"T07",name:"プロセス・メイキング型",pct:95,reason:"あなたの技術と映像美が最も輝く型です。"},{id:"T06",name:"Before/After型",pct:82,reason:"論理的な「変化の証明」をビジュアルで見せ、技術力を証明できます。"},{id:"T13",name:"ブランドストーリー型",pct:75,reason:"映像美でブランドの世界観を構築。長期的なブランド価値向上に最適です。"}]},

  FLVC:{ kanji:"鏡", name:"レビュー・マスター", en:"Review Master", desc:"客観的な分析力と映像力で「信頼できるレビュアー」のポジションを確立するタイプ。データに基づく比較コンテンツで購買意欲を合理的に喚起します。", strengths:["信頼性が高い","比較コンテンツでCV獲得","アフィリエイトと好相性"],
    influencerGuide: G(
      ["比較検証 映像 インスタ 参考","レビュー 顔出し 商品 リール 事例","客観的 レビュアー インスタ 発信 参考"],
      ["レビューの基準・評価軸が明確で論理的","「良い点」だけでなく「悪い点」も正直に発信している","複数商品の比較を映像でわかりやすく構成している","リンクへの誘導が自然で押しつけがましくない","「この人のレビューは信頼できる」コメントが多い","ジャンルに一貫性があり「◯◯といえばこのアカウント」のポジション"],
      [{label:"🟢 マイクロ（〜1万）",hint:"評価軸の決め方・比較構成の組み方を参考に"},{label:"🔵 中型（3〜5万）",hint:"アフィリエイト導線設計・ハイライトのジャンル分けを参考に"}]
    ),
    types:[{id:"T10",name:"リアクション・検証型",pct:92,reason:"客観的な検証+映像美で視聴者の疑問に答える。論理性が説得力を生みます。"},{id:"T14",name:"比較・VS型",pct:88,reason:"A vs Bの比較を論理的かつビジュアルに。最も活きる形式です。"},{id:"T06",name:"Before/After型",pct:75,reason:"変化を映像で「証明」する。論理×ビジュアルが最大限に機能します。"}]},

  FLTB:{ kanji:"賢", name:"エキスパート・ティーチャー", en:"Expert Teacher", desc:"専門知識を顔出しで伝え「この分野ならこの人」というポジションを確立するタイプ。論理的で信頼性の高いコンテンツで長期的な権威を築きます。", strengths:["権威性の構築","教育系で圧倒的信頼","高単価サービスと相性◎"],
    influencerGuide: G(
      ["専門家 顔出し 解説 インスタ 参考","士業 先生 発信 リール 事例","教育系 インスタ 権威 ブランディング 参考"],
      ["話す内容の専門性が高く「学べた」という実感がある","資格・実績・経歴がプロフィールに明確に記載されている","難しい内容をわかりやすく解説する能力が高い","「教わりたい」より「尊敬している」コメントが多い","一つのテーマを深掘りしたシリーズ投稿がある","メディア掲載・登壇など外部権威が紹介されている"],
      [{label:"🟢 マイクロ（〜1万）",hint:"専門性の見せ方・解説動画の構成を参考に"},{label:"🔵 中型（3〜5万）",hint:"権威性の積み上げ方・プロフィール設計を参考に"}]
    ),
    types:[{id:"T04",name:"対比構造型",pct:93,reason:"「素人の誤解 vs プロの正解」の構造が専門性を最もインパクトある形で伝えます。"},{id:"T01",name:"セルフブランディング型",pct:80,reason:"顔出し×専門知識で「この分野の第一人者」ブランドを確立できます。"},{id:"T09",name:"チュートリアル・HOW TO型",pct:75,reason:"体系的に教える力があるあなたに最適です。"}]},

  FLTC:{ kanji:"剣", name:"クロージング・プロ", en:"Closing Pro", desc:"論理的な説得力と顔出しの信頼感で、最短距離でCVに導くタイプ。無駄を削ぎ落としたコンテンツで効率的に成果を出します。", strengths:["CV率が高い","説得力のある構成","効率的な運用が可能"],
    influencerGuide: G(
      ["顔出し マーケティング インスタ CV 参考","ビジネス 論理的 リール 発信 事例","起業家 顔出し 成果 インスタ 参考"],
      ["投稿の構成が明確（問題提起→原因→解決策→CTA）","無駄な情報がなく「短く・鋭く・刺さる」内容","リール→プロフィール→LPの導線が一本化されている","毎回の投稿に「次のアクション」が明確に設定されている","数字・事例・比較を使って論理的に説得している","CTAが毎回テストされており多様なパターンがある"],
      [{label:"🟢 マイクロ（〜1万）",hint:"CTA設計・導線の組み方・投稿フォーマットを参考に"},{label:"🔵 中型（3〜5万）",hint:"論理的構成の完成形・LP連携の仕方を参考に"}]
    ),
    types:[{id:"T04",name:"対比構造型",pct:90,reason:"「間違った選択 vs 正しい選択」の構造で視聴者を行動に導きます。"},{id:"T09",name:"チュートリアル・HOW TO型",pct:82,reason:"実践的なHOW TOで「今すぐやりたい」を引き出し、自然な導線を作れます。"},{id:"T14",name:"比較・VS型",pct:72,reason:"論理的な比較で「こっちが正解」を明確に示し、購買決定を後押しします。"}]},

  AEVB:{ kanji:"風", name:"ナラティブ・ポエト", en:"Narrative Poet", desc:"顔出しなしで映像美と感情的なナレーションで世界観を構築するタイプ。匿名でありながら深い感動を与え、ブランドのファンを生み出します。", strengths:["匿名で世界観構築","映像+声で没入感","ブランド価値が高い"],
    influencerGuide: G(
      ["アフレコ ナレーション 世界観 インスタ 参考","匿名 ライフスタイル 映像 リール 事例","vlog 雰囲気 インスタ 世界観 参考"],
      ["顔が映らなくても「このアカウントの雰囲気が好き」と感じさせる","ナレーションと映像がひとつの作品として完結している","BGMの選び方が世界観を大きく強化している","コメントに「癒される」「また見たい」など感情的な反応が多い","映像の切り取り方・明るさ・色調に一貫したこだわりがある","保存率が高く「繰り返し見たくなる」コンテンツ設計"],
      [{label:"🟢 マイクロ（〜1万）",hint:"映像の雰囲気・BGM選び・ナレーションのトーンを参考に"},{label:"🔵 中型（3〜5万）",hint:"世界観の完成形・シリーズ化の手法・ブランド設計を参考に"}]
    ),
    types:[{id:"T02",name:"アフレコ・ナレーション型",pct:95,reason:"声と映像で世界観を構築し、匿名でもファンを獲得できます。"},{id:"T15",name:"POV・世界観型",pct:85,reason:"一人称視点の没入感ある映像で、視聴者をあなたの世界に引き込む最適解。"},{id:"T07",name:"プロセス・メイキング型",pct:72,reason:"制作過程を映像美+ナレーションで見せ、匿名でもプロな印象を与えられます。"}]},

  AEVC:{ kanji:"泉", name:"エモーショナル・キュレーター", en:"Emotional Curator", desc:"匿名で映像美と共感力を活かし「心に響くまとめ」を提供するタイプ。感情に訴えるキュレーションで保存・シェアを量産します。", strengths:["保存率が高い","シェアされやすい","匿名で成果を出せる"],
    influencerGuide: G(
      ["匿名 映像 まとめ インスタ 参考","キュレーション リール 感情 保存率 事例","共感 映像 インスタ 保存 参考"],
      ["見た後に「保存しておきたい」と思わせるコンテンツ設計","映像のクオリティより「選球眼（何を見せるか）」が優れている","コメントに「共感」「泣けた」「また見る」が多い","まとめ系でも感情に訴える言葉・演出がある","「◯◯系まとめ」のポジションがアカウント全体で確立している","シェアされやすいサムネイル設計になっている"],
      [{label:"🟢 マイクロ（〜1万）",hint:"コンテンツの選び方・サムネイル設計・ハッシュタグ戦略を参考に"},{label:"🔵 中型（3〜5万）",hint:"まとめテーマの選定・アカウントポジション設計を参考に"}]
    ),
    types:[{id:"T02",name:"アフレコ・ナレーション型",pct:90,reason:"感情を込めたナレーション+美しい映像で、匿名でも強いファンを生み出せます。"},{id:"T08",name:"ランキング・まとめ型",pct:82,reason:"情報を美しくまとめる力で、保存率の高いコンテンツを量産できます。"},{id:"T11",name:"ルーティン・日常型",pct:70,reason:"顔出しなしのライフスタイル動画で憧れの世界観を提供できます。"}]},

  AETB:{ kanji:"灯", name:"エッセイスト", en:"Essayist", desc:"匿名でテキストと感情を軸に発信するタイプ。深い共感を生む文章力で顔出しなしでもフォロワーの心を掴みます。最も「量産しやすい」タイプの一つ。", strengths:["完全匿名で運用可能","テキストで深い共感","量産しやすい"],
    influencerGuide: G(
      ["テキスト動画 共感 インスタ 参考","匿名 エッセイ 体験談 リール 事例","言葉 刺さる インスタ テキスト 参考"],
      ["テキストだけで最後まで見てしまう「言葉の引力」がある","文体・フォント・背景色に一貫したスタイルがある","「わかる」「まさにこれ」という共感コメントが多い","体験談や日常の気づきが普遍的なメッセージに昇華されている","顔が一切出なくてもアカウントの「人格」が伝わる","保存率が高く「後で読み返したい」コンテンツ設計になっている"],
      [{label:"🟢 マイクロ（〜1万）",hint:"テキストの言葉選び・フォーマット・色使いを参考に"},{label:"🔵 中型（3〜5万）",hint:"テーマの絞り方・継続投稿の仕組み化を参考に"}]
    ),
    types:[{id:"T03",name:"テキスト情報型",pct:92,reason:"感情に響くテキスト動画で、保存率の高い投稿を量産できます。"},{id:"T05",name:"体験・ストーリー型",pct:80,reason:"自分の体験をテキストベースで発信。匿名でも「もっと読みたい」を生めます。"},{id:"T11",name:"ルーティン・日常型",pct:68,reason:"テキスト+BGMの構成で、共感要素を加えた匿名ルーティン動画を作れます。"}]},

  AETC:{ kanji:"絆", name:"コミュニティ・ビルダー", en:"Community Builder", desc:"匿名でありながらテキストの共感力で人を集め、コンバージョンに繋げるタイプ。「まとめ」と「共感」の掛け算で効率的に成果を出します。", strengths:["匿名でCV獲得","まとめ系で集客","アフィリエイト適性◎"],
    influencerGuide: G(
      ["匿名 まとめ アフィリエイト インスタ 参考","テキスト 情報発信 CV 匿名 リール 事例","節約 お得 まとめ インスタ 参考"],
      ["まとめコンテンツの中に自然にリンク・商品誘導が組み込まれている","テキストで共感を引き出しつつ最後に行動を促すCTAがある","ジャンルが明確で「◯◯のことならこのアカウント」のポジション","保存されやすく「後で試したい」という気持ちを引き出す設計","匿名でもコメント欄で交流・質問対応をしている","アフィリエイトリンク・ECサイトへの自然な誘導がある"],
      [{label:"🟢 マイクロ（〜1万）",hint:"まとめテーマの選定・CTA文の書き方・導線設計を参考に"},{label:"🔵 中型（3〜5万）",hint:"アフィリエイト収益化の仕組み・ジャンル特化の深め方を参考に"}]
    ),
    types:[{id:"T03",name:"テキスト情報型",pct:90,reason:"テキストベースで共感を込めた情報発信。CV導線を自然に組み込めます。"},{id:"T08",name:"ランキング・まとめ型",pct:85,reason:"まとめコンテンツで集客し、EC誘導に繋げやすい。"},{id:"T14",name:"比較・VS型",pct:72,reason:"比較コンテンツで購買決定を後押しします。"}]},

  ALVB:{ kanji:"美", name:"ビジュアル・アーキテクト", en:"Visual Architect", desc:"匿名で映像美と論理的な構成力を武器に、圧倒的なビジュアルブランドを構築するタイプ。「見るだけで価値がある」コンテンツを生み出します。", strengths:["映像美で圧倒","ブランド価値が高い","差別化しやすい"],
    influencerGuide: G(
      ["映像美 インスタ 匿名 世界観 参考","vlog 映像クオリティ リール 事例","ビジュアル ブランド インスタ 参考"],
      ["映像のクオリティ（解像度・カラー・構図）がひと目で他と違う","フィード全体を見たときにひとつの「作品集」のように見える","カットの繋ぎ方・音楽との同期が計算されている","顔が出なくても「このアカウントの映像が好き」とわかる世界観","撮影機材・ロケ地・編集スキルが全投稿で一定水準以上","コメントに「どうやって撮ったの？」「機材は？」が多い"],
      [{label:"🟢 マイクロ（〜1万）",hint:"映像の構図・色調・カット編集の手法を最優先で参考に"},{label:"🔵 中型（3〜5万）",hint:"ブランドとしての世界観設計・音楽選定の考え方を参考に"}]
    ),
    types:[{id:"T13",name:"ブランドストーリー型",pct:95,reason:"映像美×論理的構成でブランドの世界観を完璧に表現できます。"},{id:"T07",name:"プロセス・メイキング型",pct:85,reason:"美しい映像で制作過程を見せ、匿名でも強いブランド力を持てます。"},{id:"T15",name:"POV・世界観型",pct:78,reason:"一人称視点の映像体験で、視聴者を世界観に没入させます。"}]},

  ALVC:{ kanji:"刃", name:"データ・ストラテジスト", en:"Data Strategist", desc:"匿名で映像と論理性を掛け合わせ、データに基づく比較・検証で成果を出すタイプ。「客観的に信頼できる」ポジションを確立します。", strengths:["客観性で信頼獲得","比較コンテンツに強い","CV直結型"],
    influencerGuide: G(
      ["データ 比較 映像 インスタ 参考","検証 客観 リール 匿名 事例","成分 比較 インスタ 発信 参考"],
      ["比較・検証の条件・基準が明確で「フェア」な印象を与える","グラフ・数値・表などのデータビジュアルを使っている","「この人の比較は信頼できる」という評判コメントがある","感情より「事実と根拠」でコンテンツが構成されている","ジャンルに特化し「◯◯比較といえばこのアカウント」のポジション","CVリンクへの誘導が押しつけがましくなく自然"],
      [{label:"🟢 マイクロ（〜1万）",hint:"比較軸の設定方法・データの見せ方・判定基準の作り方を参考に"},{label:"🔵 中型（3〜5万）",hint:"ジャンルポジションの確立・アフィリエイト収益化設計を参考に"}]
    ),
    types:[{id:"T06",name:"Before/After型",pct:90,reason:"ビジュアルで変化を客観的に証明。説得力が最大化されます。"},{id:"T14",name:"比較・VS型",pct:88,reason:"論理的な比較をビジュアルで見せる。匿名でも信頼を生めます。"},{id:"T08",name:"ランキング・まとめ型",pct:75,reason:"データに裏付けられたランキングで、CV率の高いコンテンツを作れます。"}]},

  ALTB:{ kanji:"智", name:"ナレッジ・キュレーター", en:"Knowledge Curator", desc:"匿名でテキスト主体の情報発信を行い「知識の宝庫」としてのポジションを確立するタイプ。最も効率的に運用でき、量産にも向いています。", strengths:["最も量産しやすい","完全匿名","保存率が非常に高い"],
    influencerGuide: G(
      ["テキスト 知識 まとめ インスタ 参考","ビジネス 情報 発信 匿名 リール 事例","読書まとめ 勉強 インスタ 参考"],
      ["「知らなかった・学べた」という実感を毎回与えるコンテンツ","テキストの構成が明快で情報が整理されて伝わる","1投稿で「ひとつのことが深く学べる」設計","保存数が多くコメントに「保存しました」が頻出する","フォントや背景色などのフォーマットに一貫性がある","シリーズ化・定期投稿でフォロワーが習慣的に来る設計"],
      [{label:"🟢 マイクロ（〜1万）",hint:"テキストのフォーマット・情報量の加減・テーマ選定を参考に"},{label:"🔵 中型（3〜5万）",hint:"シリーズ化の設計・フォロワーとのコミュニケーション方法を参考に"}]
    ),
    types:[{id:"T03",name:"テキスト情報型",pct:95,reason:"情報密度の高い投稿で保存率を最大化できます。"},{id:"T04",name:"対比構造型",pct:80,reason:"論理的な対比構造でテキストベースに効率よく制作できます。"},{id:"T08",name:"ランキング・まとめ型",pct:75,reason:"体系的な知識をまとめ形式で提供し、保存→フォローの導線を作れます。"}]},

  ALTC:{ kanji:"盾", name:"グロース・エンジニア", en:"Growth Engineer", desc:"匿名でテキストベースのコンテンツを論理的に構成し、最短距離で成果を出すタイプ。データ思考で仮説検証を繰り返し、着実にアカウントを成長させます。", strengths:["最も効率的な運用","データドリブン","スケールしやすい"],
    influencerGuide: G(
      ["SNS運用 攻略 インスタ 参考","副業 収益化 テキスト リール 事例","匿名 データ 投稿 成長 インスタ 参考"],
      ["投稿頻度が高く仮説検証を繰り返している痕跡がある","コンテンツが「再現性の高い情報」を提供している","フォーマットが標準化・テンプレ化されており量産されている","CVへの導線が毎回テストされておりCTAが多様","「この投稿で◯件成約した」等の成果報告が定期的にある","SNS運用に関するノウハウも発信しており透明性が高い"],
      [{label:"🟢 マイクロ（〜1万）",hint:"投稿テンプレート・CTA設計・量産の仕組みを参考に"},{label:"🔵 中型（3〜5万）",hint:"データ分析の活用法・収益化の多様化を参考に"}]
    ),
    types:[{id:"T03",name:"テキスト情報型",pct:92,reason:"テキスト量産×データ分析で最適化。最短ルートです。"},{id:"T08",name:"ランキング・まとめ型",pct:85,reason:"CV直結のまとめコンテンツを効率量産できます。"},{id:"T09",name:"チュートリアル・HOW TO型",pct:70,reason:"実用的なHOW TOでニーズを掴み、CV導線を設計できます。"}]},
};

export default function EditScoreDiagnostic() {
  const [screen, setScreen] = useState("intro");
  const [industry, setIndustry] = useState(null);
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [result, setResult] = useState(null);
  const [fade, setFade] = useState(true);
  const [analyzeStep, setAnalyzeStep] = useState(0);
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regBiz, setRegBiz] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");
  const [regDone, setRegDone] = useState(false);

  const go = fn => { setFade(false); setTimeout(() => { fn(); setFade(true); }, 250); };

  const handleAnswer = val => {
    const a = [...answers]; a[qi] = val; setAnswers(a);
    if (qi < 19) { go(() => setQi(qi + 1)); }
    else {
      go(() => { setScreen("analyzing"); setAnalyzeStep(0); });
      [600,1400,2200].forEach((t,i) => setTimeout(() => setAnalyzeStep(i+1), t));
      setTimeout(() => {
        const scores = [0,0,0,0];
        a.forEach((v,i) => { const q=QUESTIONS[i]; scores[q.axis] += q.rev?-v:v; });
        const code = getTypeCode(scores);
        const pcts = scores.map(s => Math.max(8, Math.min(92, Math.round((s/15)*50+50))));
        setResult({ code, data: TYPE_DATA[code], pcts });
        go(() => setScreen("register"));
      }, 3200);
    }
  };

  const restart = () => { setAnswers(Array(20).fill(null)); setQi(0); setResult(null); setAnalyzeStep(0); setIndustry(null); go(() => setScreen("intro")); };

  const base = { fontFamily:"'Noto Sans JP','Inter',-apple-system,sans-serif", background:"#F8FAFC", color:"#1E293B", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 16px", transition:"opacity 0.25s ease", opacity:fade?1:0 };
  const card = { background:"#fff", border:"1px solid #E2E8F0", borderRadius:"12px", padding:"32px", maxWidth:"600px", width:"100%", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" };
  const btn = { background:ACCENT, color:"#fff", border:"none", borderRadius:"8px", padding:"14px 40px", fontSize:"15px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit", letterSpacing:"0.02em", transition:"background 0.2s" };

  // ── INTRO ──
  if (screen==="intro") return (
    <div style={base}>
      <div style={{ maxWidth:"560px", width:"100%" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"32px" }}>
          <div style={{ width:"32px", height:"32px", background:ACCENT, borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" fill="white"/><rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity=".6"/><rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity=".6"/><rect x="9" y="9" width="5" height="5" rx="1" fill="white"/></svg>
          </div>
          <span style={{ fontSize:"14px", fontWeight:"700", color:ACCENT, letterSpacing:"0.05em" }}>EditScore</span>
        </div>
        <div style={{ ...card, padding:"48px 40px", textAlign:"center", marginBottom:"20px" }}>
          <div style={{ display:"inline-block", background:AL, color:ACCENT, fontSize:"11px", fontWeight:"600", letterSpacing:"0.1em", padding:"5px 14px", borderRadius:"50px", marginBottom:"24px", textTransform:"uppercase" }}>Brand Diagnostic</div>
          <h1 style={{ fontSize:"clamp(22px,4vw,30px)", fontWeight:"700", lineHeight:"1.5", color:"#0F172A", marginBottom:"14px" }}>あなたの事業に最適な<br/>発信パーソナリティを診断</h1>
          <p style={{ fontSize:"14px", lineHeight:"1.9", color:"#64748B", marginBottom:"36px" }}>業種と発信スタイルを組み合わせて診断。Instagramリールに最適な「型」と<br/>参考インフルエンサーの探し方をご提案します。</p>
          <button style={btn} onClick={() => go(() => setScreen("industry"))} onMouseOver={e=>e.currentTarget.style.background="#1D4ED8"} onMouseOut={e=>e.currentTarget.style.background=ACCENT}>診断をはじめる</button>
          <p style={{ fontSize:"12px", color:"#94A3B8", marginTop:"14px" }}>所要時間 約3分 ・ 無料 ・ 登録不要</p>
        </div>
        <div style={{ ...card, padding:"24px 32px" }}>
          <p style={{ fontSize:"12px", fontWeight:"600", color:"#64748B", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"16px" }}>診断でわかること</p>
          {["業種に合わせた発信パーソナリティタイプ（全16タイプ）","相性の良いリールの型 TOP 3（参考リール検索ワード付き）","参考インフルエンサーの探し方ガイド（チェックポイント付き）"].map((t,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 0", borderBottom:i<2?"1px solid #F1F5F9":"none" }}>
              <div style={{ width:"20px", height:"20px", background:AL, borderRadius:"4px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize:"13px", color:"#374151" }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── INDUSTRY ──
  if (screen==="industry") return (
    <div style={base}>
      <div style={{ maxWidth:"600px", width:"100%" }}>
        <div style={{ marginBottom:"28px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px" }}>
            <div style={{ display:"flex", gap:"4px" }}>
              <div style={{ width:"20px", height:"4px", background:ACCENT, borderRadius:"2px" }}/>
              <div style={{ width:"20px", height:"4px", background:"#E2E8F0", borderRadius:"2px" }}/>
            </div>
            <span style={{ fontSize:"11px", color:"#94A3B8" }}>Step 1 / 2</span>
          </div>
          <h2 style={{ fontSize:"clamp(18px,3vw,24px)", fontWeight:"700", color:"#0F172A", marginBottom:"6px" }}>あなたの業種を教えてください</h2>
          <p style={{ fontSize:"13px", color:"#64748B" }}>業種に合わせた発信戦略と参考アカウントの探し方をご提案します</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"24px" }}>
          {INDUSTRIES.map(ind => (
            <button key={ind.id} onClick={() => setIndustry(ind.id)}
              style={{ background:industry===ind.id?AL:"#fff", border:`2px solid ${industry===ind.id?ACCENT:"#E2E8F0"}`, borderRadius:"10px", padding:"18px 16px", cursor:"pointer", textAlign:"left", transition:"all 0.2s", fontFamily:"inherit" }}
              onMouseOver={e=>{ if(industry!==ind.id) e.currentTarget.style.borderColor="#93C5FD"; }}
              onMouseOut={e=>{ if(industry!==ind.id) e.currentTarget.style.borderColor="#E2E8F0"; }}>
              <div style={{ fontSize:"22px", marginBottom:"8px" }}>{ind.icon}</div>
              <div style={{ fontSize:"13px", fontWeight:"600", color:industry===ind.id?ACCENT:"#374151", lineHeight:"1.4" }}>{ind.label}</div>
            </button>
          ))}
        </div>
        <button style={{ ...btn, width:"100%", opacity:industry?1:0.4, cursor:industry?"pointer":"default" }} disabled={!industry}
          onClick={() => { if(industry) go(() => setScreen("questions")); }}
          onMouseOver={e=>{ if(industry) e.currentTarget.style.background="#1D4ED8"; }}
          onMouseOut={e=>e.currentTarget.style.background=ACCENT}>
          次へ：発信スタイルを診断する →
        </button>
      </div>
    </div>
  );

  // ── QUESTIONS ──
  if (screen==="questions") {
    const q = QUESTIONS[qi];
    const prog = ((qi+1)/20)*100;
    const axLabels = ["表現スタイル","訴求アプローチ","制作スタイル","目的志向"];
    const scaleVals = [-3,-2,-1,0,1,2,3];
    return (
      <div style={base}>
        <div style={{ maxWidth:"600px", width:"100%" }}>
          <div style={{ marginBottom:"28px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
              <span style={{ fontSize:"12px", color:"#64748B" }}>{axLabels[q.axis]}</span>
              <span style={{ fontSize:"12px", fontWeight:"600", color:ACCENT }}>{qi+1} / 20</span>
            </div>
            <div style={{ height:"4px", background:"#E2E8F0", borderRadius:"4px", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${prog}%`, background:ACCENT, borderRadius:"4px", transition:"width 0.4s ease" }}/>
            </div>
          </div>
          <div style={{ ...card, textAlign:"center", padding:"48px 40px", marginBottom:"16px" }}>
            <div style={{ fontSize:"12px", fontWeight:"600", color:"#94A3B8", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"20px" }}>Q{qi+1}</div>
            <p style={{ fontSize:"clamp(16px,2.5vw,20px)", fontWeight:"500", lineHeight:"1.8", color:"#0F172A", marginBottom:"48px" }}>{q.text}</p>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"12px" }}>
              <span style={{ fontSize:"11px", color:"#94A3B8" }}>そう思わない</span>
              <span style={{ fontSize:"11px", color:"#94A3B8" }}>そう思う</span>
            </div>
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"8px" }}>
              {scaleVals.map((val,i) => {
                const active = answers[qi]===val;
                const isPos = val>0;
                const size = [36,32,28,26,28,32,36][i];
                return (
                  <button key={i} onClick={() => handleAnswer(val)}
                    style={{ width:`${size}px`, height:`${size}px`, borderRadius:"50%", cursor:"pointer", outline:"none",
                      border:active?"none":`2px solid ${isPos?"#BFDBFE":"#E2E8F0"}`,
                      background:active?(isPos?ACCENT:val===0?"#94A3B8":"#64748B"):(isPos?AL:"#F8FAFC"),
                      transition:"all 0.2s", boxShadow:active?`0 0 0 3px ${isPos?AM:"#CBD5E1"}`:"none" }}
                    onMouseOver={e=>{ if(!active) e.currentTarget.style.borderColor=isPos?"#93C5FD":"#94A3B8"; }}
                    onMouseOut={e=>{ if(!active) e.currentTarget.style.borderColor=isPos?"#BFDBFE":"#E2E8F0"; }}
                  />
                );
              })}
            </div>
          </div>
          {qi>0 && <button onClick={() => go(() => setQi(qi-1))} style={{ background:"none", border:"none", color:"#94A3B8", cursor:"pointer", fontSize:"13px", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"6px", padding:"8px 0" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7L9 3" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            前の質問に戻る
          </button>}
        </div>
      </div>
    );
  }

  // ── ANALYZING ──
  if (screen==="analyzing") {
    const steps = ["回答データを分析中...","発信パーソナリティを特定中...","最適なリール型を照合中...","診断完了"];
    return (
      <div style={base}>
        <div style={{ textAlign:"center", maxWidth:"360px" }}>
          <div style={{ width:"48px", height:"48px", margin:"0 auto 36px", border:`3px solid ${AM}`, borderTopColor:ACCENT, borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
          <div style={{ ...card, padding:"32px", textAlign:"left" }}>
            {steps.map((s,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 0", borderBottom:i<3?"1px solid #F1F5F9":"none", opacity:i<=analyzeStep?1:0.25, transition:"all 0.4s ease" }}>
                <div style={{ width:"20px", height:"20px", borderRadius:"50%", flexShrink:0, background:i<analyzeStep?ACCENT:i===analyzeStep?AM:"#E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.4s" }}>
                  {i<analyzeStep && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5.5L3.5 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ fontSize:"13px", color:i===analyzeStep?ACCENT:i<analyzeStep?"#374151":"#94A3B8", fontWeight:i===analyzeStep?"600":"400" }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // ── REGISTER ──
  if (screen === "register" && result) {
    const { code, data } = result;
    const ind = IND[industry] || IND.other;

    const handleSubmit = async () => {
      if (!regName.trim() || !regEmail.trim()) { setRegError("お名前とメールアドレスは必須です"); return; }
      if (!/\S+@\S+\.\S+/.test(regEmail)) { setRegError("有効なメールアドレスを入力してください"); return; }
      setRegError(""); setRegLoading(true);
      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;
      const payload = {
        顧客名:         regName,
        メールアドレス:   regEmail,
        "事業名・屋号":   regBiz,
        診断タイプコード:  code,
        診断タイプ名:    data.name,
        診断タイプ漢字:  data.kanji,
        業種:           INDUSTRY_TO_NOTION[industry || "other"] || "その他",
        強み:           data.strengths.join(" / "),
        最適リール型:    data.types[0].name,
        申込日時:        dateStr,
      };
      try { await fetch(MAKE_WEBHOOK, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) }); }
      catch(e) { /* Notion保存失敗でも体験継続 */ }
      setRegLoading(false); setRegDone(true);
      go(() => setScreen("result"));
    };

    return (
      <div style={base}>
        <div style={{ maxWidth:"520px", width:"100%" }}>
          {/* 診断結果サマリー */}
          <div style={{ ...card, padding:"20px 24px", marginBottom:"16px", display:"flex", alignItems:"center", gap:"16px", borderLeft:`4px solid ${ACCENT}` }}>
            <div style={{ fontSize:"40px", fontWeight:"800", color:ACCENT, lineHeight:1 }}>{data.kanji}</div>
            <div>
              <p style={{ fontSize:"11px", color:"#94A3B8", margin:"0 0 2px", letterSpacing:"0.06em", textTransform:"uppercase" }}>あなたの診断タイプ</p>
              <p style={{ fontSize:"15px", fontWeight:"700", color:"#0F172A", margin:"0 0 2px" }}>{data.name}</p>
              <p style={{ fontSize:"12px", color:"#64748B", margin:0 }}>{ind.icon} {ind.label}</p>
            </div>
          </div>

          {/* フォームカード */}
          <div style={{ ...card, padding:"36px 32px" }}>
            <div style={{ textAlign:"center", marginBottom:"28px" }}>
              <div style={{ display:"inline-block", background:"#DCFCE7", color:"#166534", fontSize:"11px", fontWeight:"600", padding:"4px 14px", borderRadius:"50px", marginBottom:"14px", letterSpacing:"0.06em" }}>📄 あと少しで完了</div>
              <h2 style={{ fontSize:"clamp(18px,3vw,22px)", fontWeight:"700", color:"#0F172A", lineHeight:"1.5", marginBottom:"8px" }}>お名前とメールアドレスを<br/>入力して診断結果を確認</h2>
              <p style={{ fontSize:"13px", color:"#64748B", lineHeight:"1.8" }}>完全版レポートとタイプ別アドバイスを<br/>LINEでお届けするために使用します。</p>
            </div>

            {/* フォーム */}
            <div style={{ display:"flex", flexDirection:"column", gap:"16px", marginBottom:"20px" }}>
              {[
                { label:"お名前", placeholder:"山田 太郎", value:regName, setter:setRegName, required:true },
                { label:"メールアドレス", placeholder:"example@email.com", value:regEmail, setter:setRegEmail, required:true, type:"email" },
                { label:"事業名・屋号", placeholder:"例）EditScore株式会社（任意）", value:regBiz, setter:setRegBiz, required:false },
              ].map((f,i) => (
                <div key={i}>
                  <label style={{ fontSize:"12px", fontWeight:"600", color:"#374151", display:"block", marginBottom:"6px" }}>
                    {f.label} {f.required && <span style={{ color:"#EF4444", fontSize:"10px" }}>必須</span>}
                  </label>
                  <input type={f.type||"text"} placeholder={f.placeholder} value={f.value}
                    onChange={e => f.setter(e.target.value)}
                    style={{ width:"100%", padding:"11px 14px", border:`1px solid ${regError&&f.required&&!f.value.trim()?"#FCA5A5":"#E2E8F0"}`, borderRadius:"8px", fontSize:"14px", fontFamily:"inherit", color:"#0F172A", background:"#fff", boxSizing:"border-box", outline:"none", transition:"border-color 0.2s" }}
                    onFocus={e=>e.target.style.borderColor=ACCENT}
                    onBlur={e=>e.target.style.borderColor="#E2E8F0"}
                  />
                </div>
              ))}
            </div>

            {regError && <p style={{ fontSize:"12px", color:"#EF4444", marginBottom:"14px", background:"#FEF2F2", padding:"10px 14px", borderRadius:"6px" }}>⚠ {regError}</p>}

            <button onClick={handleSubmit} disabled={regLoading}
              style={{ ...btn, width:"100%", padding:"16px", fontSize:"15px", opacity:regLoading?0.7:1, cursor:regLoading?"wait":"pointer" }}
              onMouseOver={e=>{ if(!regLoading) e.currentTarget.style.background="#1D4ED8"; }}
              onMouseOut={e=>e.currentTarget.style.background=ACCENT}>
              {regLoading ? "送信中..." : "診断結果を見る →"}
            </button>

            <div style={{ display:"flex", alignItems:"center", gap:"8px", justifyContent:"center", marginTop:"16px" }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 2.5v3l2 1" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <p style={{ fontSize:"11px", color:"#94A3B8", margin:0 }}>入力情報は安全に管理され、診断レポート配信にのみ使用します</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── RESULT ──
  if (screen==="result" && result) {
    const { code, data, pcts } = result;
    const ind = IND[industry] || IND.other;
    const guide = data.influencerGuide;
    const shareText = `【私のリール発信タイプは「${data.name}」でした】\nあなたの事業に最適なInstagramリールの型がわかる無料診断✨\n#EditScore診断 #Instagram運用`;

    const lockedStyle = { filter:"blur(6px)", pointerEvents:"none", userSelect:"none" };
    return (
      <div style={{ ...base, justifyContent:"flex-start", paddingTop:"40px", paddingBottom:"80px" }}>
        <div style={{ maxWidth:"600px", width:"100%" }}>

          {/* ═══ FREE: Type Header ═══ */}
          <div style={{ ...card, padding:"40px", textAlign:"center", marginBottom:"16px", borderTop:`4px solid ${ACCENT}` }}>
            <div style={{ display:"flex", justifyContent:"center", gap:"8px", marginBottom:"20px", flexWrap:"wrap" }}>
              <div style={{ display:"inline-block", background:AL, color:ACCENT, fontSize:"11px", fontWeight:"600", letterSpacing:"0.1em", padding:"5px 14px", borderRadius:"50px", textTransform:"uppercase" }}>Type {code}</div>
              <div style={{ display:"inline-block", background:"#F0FDF4", color:"#166534", fontSize:"11px", fontWeight:"600", padding:"5px 14px", borderRadius:"50px" }}>{ind.icon} {ind.label}</div>
            </div>
            <div style={{ fontSize:"clamp(52px,12vw,80px)", fontWeight:"800", color:ACCENT, lineHeight:"1", marginBottom:"8px" }}>{data.kanji}</div>
            <h2 style={{ fontSize:"clamp(18px,3.5vw,24px)", fontWeight:"700", color:"#0F172A", marginBottom:"4px" }}>{data.name}</h2>
            <p style={{ fontSize:"13px", color:"#94A3B8", marginBottom:"24px", letterSpacing:"0.08em" }}>{data.en}</p>
            <p style={{ fontSize:"14px", lineHeight:"1.9", color:"#475569", maxWidth:"460px", margin:"0 auto" }}>{data.desc}</p>
          </div>

          {/* ═══ FREE: Strengths ═══ */}
          <div style={{ ...card, padding:"24px 32px", marginBottom:"16px" }}>
            <p style={{ fontSize:"12px", fontWeight:"600", color:"#64748B", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"14px" }}>強み</p>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
              {data.strengths.map((s,i) => <span key={i} style={{ background:AL, color:ACCENT, fontSize:"13px", fontWeight:"500", padding:"6px 14px", borderRadius:"6px" }}>{s}</span>)}
            </div>
          </div>

          {/* ═══ FREE: Axis Breakdown ═══ */}
          <div style={{ ...card, padding:"28px 32px", marginBottom:"16px" }}>
            <p style={{ fontSize:"12px", fontWeight:"600", color:"#64748B", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"20px" }}>パーソナリティ内訳</p>
            {AXIS_META.map((ax,i) => (
              <div key={i} style={{ marginBottom:i<3?"20px":0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <span style={{ fontSize:"12px", color:pcts[i]<50?"#374151":"#94A3B8", fontWeight:pcts[i]<50?"600":"400" }}>{ax.left}</span>
                  <span style={{ fontSize:"11px", color:"#CBD5E1" }}>{ax.label}</span>
                  <span style={{ fontSize:"12px", color:pcts[i]>=50?"#374151":"#94A3B8", fontWeight:pcts[i]>=50?"600":"400" }}>{ax.right}</span>
                </div>
                <div style={{ height:"6px", background:"#F1F5F9", borderRadius:"4px", position:"relative", overflow:"hidden" }}>
                  <div style={{ position:"absolute", left:0, top:0, height:"100%", width:`${pcts[i]}%`, background:ACCENT, borderRadius:"4px", opacity:"0.85" }}/>
                  <div style={{ position:"absolute", left:"50%", top:0, width:"1px", height:"100%", background:"#E2E8F0" }}/>
                </div>
                <div style={{ textAlign:pcts[i]>=50?"right":"left", fontSize:"11px", color:"#94A3B8", marginTop:"3px" }}>{pcts[i]}%</div>
              </div>
            ))}
          </div>

          {/* ═══ LINE CTA (between free & locked) ═══ */}
          <div style={{ ...card, padding:"36px 28px", textAlign:"center", marginBottom:"16px", borderTop:"4px solid #06C755", background:"linear-gradient(135deg,#F0FDF4,#fff)" }}>
            <div style={{ display:"inline-block", background:"#DCFCE7", color:"#166534", fontSize:"11px", fontWeight:"600", padding:"4px 14px", borderRadius:"50px", marginBottom:"16px", letterSpacing:"0.06em" }}>LINE登録で全セクション解放</div>
            <h3 style={{ fontSize:"clamp(18px,3vw,22px)", fontWeight:"700", color:"#0F172A", lineHeight:"1.5", marginBottom:"10px" }}>詳細レポートを<br/>LINEで受け取る</h3>
            <p style={{ fontSize:"13px", lineHeight:"1.9", color:"#64748B", marginBottom:"20px" }}>
              業種別アドバイス・リールTOP3・<br/>
              インフルエンサーガイドを含む<br/>
              完全版レポートを無料でお届けします。
            </p>
            <div style={{ display:"flex", gap:"8px", justifyContent:"center", flexWrap:"wrap", marginBottom:"20px" }}>
              {["業種別戦略","リールTOP3","検索ワード","戦略PDF"].map((t,i) => (
                <span key={i} style={{ fontSize:"12px", fontWeight:"600", color:"#166534", background:"#DCFCE7", padding:"5px 14px", borderRadius:"50px" }}>&#10003; {t}</span>
              ))}
            </div>
            <button style={{ width:"100%", maxWidth:"380px", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", background:"#06C755", color:"#fff", fontFamily:"'Noto Sans JP',sans-serif", fontSize:"15px", fontWeight:"700", letterSpacing:"0.02em", border:"none", borderRadius:"12px", padding:"16px 24px", cursor:"pointer", transition:"background 0.2s, transform 0.15s, box-shadow 0.2s", boxShadow:"0 2px 8px rgba(6,199,85,0.25)", margin:"0 auto" }}
              onClick={() => {
                const params = new URLSearchParams({
                  type: data.kanji,
                  source: 'diagnosis',
                  name: regName,
                  email: regEmail,
                  biz: regBiz
                });
                window.open(LIFF_URL + '?' + params.toString(), '_blank');
              }}
              onMouseOver={e=>{e.currentTarget.style.background="#05B34C";e.currentTarget.style.transform="translateY(-1px)";}}
              onMouseOut={e=>{e.currentTarget.style.background="#06C755";e.currentTarget.style.transform="translateY(0)";}}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" style={{width:"20px",height:"20px",flexShrink:0}}>
                <path d="M12 2C6.48 2 2 6.05 2 11.07c0 4.46 3.61 8.19 8.49 8.87.33.07.78.22.89.5.1.26.07.66.03.93l-.14.87c-.04.26-.2 1.03.9.56 1.11-.47 5.96-3.5 8.13-6 1.5-1.64 2.22-3.31 2.22-5.13C22.52 6.05 18.04 2 12 2z"/>
              </svg>
              LINEで無料受け取る
            </button>
            <p style={{ fontSize:"11px", color:"#94A3B8", marginTop:"12px" }}>LINE公式アカウントに連携して配信します</p>
          </div>

          {/* ═══ LOCKED: Industry Advice ═══ */}
          <div style={{ position:"relative", marginBottom:"16px" }}>
            <div style={lockedStyle}>
              <div style={{ ...card, padding:"28px 32px", borderLeft:"4px solid #10B981" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                  <span style={{ fontSize:"18px" }}>{ind.icon}</span>
                  <p style={{ fontSize:"12px", fontWeight:"600", color:"#064E3B", letterSpacing:"0.08em", textTransform:"uppercase", margin:0 }}>業種別アドバイス — {ind.label}</p>
                </div>
                <p style={{ fontSize:"13px", lineHeight:"1.9", color:"#374151", marginBottom:"14px" }}>{ind.tips}</p>
                <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"14px", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"11px", fontWeight:"600", color:"#064E3B", whiteSpace:"nowrap" }}>目標CV:</span>
                  <span style={{ fontSize:"12px", color:"#374151", background:"#F0FDF4", padding:"3px 10px", borderRadius:"4px", fontWeight:"500" }}>{ind.cvGoal}</span>
                </div>
                <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                  {ind.tags.map((t,i) => <span key={i} style={{ fontSize:"11px", color:"#047857", background:"#ECFDF5", padding:"3px 10px", borderRadius:"50px" }}>{t}</span>)}
                </div>
              </div>
            </div>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.5)", borderRadius:"12px" }}>
              <div style={{ textAlign:"center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ margin:"0 auto 8px" }}><rect x="3" y="11" width="18" height="11" rx="2" stroke="#06C755" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#06C755" strokeWidth="2" strokeLinecap="round"/></svg>
                <p style={{ fontSize:"13px", fontWeight:"600", color:"#0F172A", margin:"0 0 2px" }}>業種別アドバイス</p>
                <p style={{ fontSize:"11px", color:"#64748B" }}>LINE登録で閲覧可能</p>
              </div>
            </div>
          </div>

          {/* ═══ LOCKED: Top 3 Reel Types ═══ */}
          <div style={{ position:"relative", marginBottom:"16px" }}>
            <div style={lockedStyle}>
              <div style={{ ...card, padding:"28px 32px" }}>
                <p style={{ fontSize:"12px", fontWeight:"600", color:"#64748B", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"20px" }}>相性の良いリールの型 TOP 3</p>
                {data.types.map((t,i) => (
                  <div key={i} style={{ background:i===0?AL:"#FAFAFA", border:`1px solid ${i===0?AM:"#E2E8F0"}`, borderRadius:"8px", padding:"20px", marginBottom:i<2?"12px":0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"10px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                        {i===0 && <span style={{ background:ACCENT, color:"#fff", fontSize:"10px", fontWeight:"700", padding:"2px 10px", borderRadius:"4px", letterSpacing:"0.05em" }}>BEST</span>}
                        <div>
                          <span style={{ fontSize:"10px", color:"#94A3B8" }}>{t.id}</span>
                          <h3 style={{ fontSize:"15px", fontWeight:"600", color:"#0F172A", margin:"2px 0 0" }}>{t.name}</h3>
                        </div>
                      </div>
                      <span style={{ fontSize:"22px", fontWeight:"700", color:i===0?ACCENT:"#94A3B8" }}>{t.pct}<span style={{ fontSize:"11px" }}>%</span></span>
                    </div>
                    <div style={{ height:"4px", background:"#E2E8F0", borderRadius:"4px", marginBottom:"12px", overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${t.pct}%`, background:i===0?ACCENT:"#94A3B8", borderRadius:"4px" }}/>
                    </div>
                    <p style={{ fontSize:"13px", lineHeight:"1.8", color:"#475569", margin:"0 0 12px" }}>{t.reason}</p>
                    <div style={{ background:"#F8FAFC", border:"1px solid #E2E8F0", borderRadius:"6px", padding:"10px 14px", display:"flex", alignItems:"flex-start", gap:"10px" }}>
                      <span style={{ fontSize:"13px", flexShrink:0 }}>🔍</span>
                      <div>
                        <p style={{ fontSize:"10px", fontWeight:"600", color:"#64748B", letterSpacing:"0.06em", textTransform:"uppercase", margin:"0 0 3px" }}>参考リールの探し方</p>
                        <p style={{ fontSize:"12px", color:"#374151", margin:0 }}>Instagram / TikTok で <span style={{ fontWeight:"700", color:ACCENT }}>「{REEL_SEARCH[t.id]}」</span> と検索</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.5)", borderRadius:"12px" }}>
              <div style={{ textAlign:"center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ margin:"0 auto 8px" }}><rect x="3" y="11" width="18" height="11" rx="2" stroke="#06C755" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#06C755" strokeWidth="2" strokeLinecap="round"/></svg>
                <p style={{ fontSize:"13px", fontWeight:"600", color:"#0F172A", margin:"0 0 2px" }}>相性の良いリールの型 TOP 3</p>
                <p style={{ fontSize:"11px", color:"#64748B" }}>LINE登録で閲覧可能</p>
              </div>
            </div>
          </div>

          {/* ═══ LOCKED: Influencer Search Guide ═══ */}
          <div style={{ position:"relative", marginBottom:"16px" }}>
            <div style={lockedStyle}>
              <div style={{ ...card, padding:"28px 32px" }}>
                <p style={{ fontSize:"12px", fontWeight:"600", color:"#64748B", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"4px" }}>参考インフルエンサーの探し方</p>
                <p style={{ fontSize:"12px", color:"#94A3B8", marginBottom:"20px" }}>あなたのタイプ × {ind.label}に合ったアカウントを自分で見つけるためのガイド</p>
                <div style={{ background:"#F8FAFC", border:"1px solid #E2E8F0", borderRadius:"8px", padding:"16px 18px", marginBottom:"16px" }}>
                  <p style={{ fontSize:"11px", fontWeight:"600", color:"#374151", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"14px" }}>🔍 Instagram 検索ワード</p>
                  <p style={{ fontSize:"11px", color:"#94A3B8", marginBottom:"8px" }}>あなたのタイプ別（発信スタイルで絞る）</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"6px", marginBottom:"16px" }}>
                    {guide.baseSearch.map((kw,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        <span style={{ fontSize:"10px", color:ACCENT, fontWeight:"700" }}>→</span>
                        <span style={{ fontSize:"12px", color:"#374151", background:AL, padding:"4px 10px", borderRadius:"4px", fontWeight:"500" }}>「{kw}」</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize:"11px", color:"#94A3B8", marginBottom:"8px" }}>業種（{ind.label}）でさらに絞る</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                    {ind.indSearch.map((kw,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                        <span style={{ fontSize:"10px", color:"#10B981", fontWeight:"700" }}>→</span>
                        <span style={{ fontSize:"12px", color:"#374151", background:"#F0FDF4", padding:"4px 10px", borderRadius:"4px", fontWeight:"500" }}>「{kw}」</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom:"16px" }}>
                  <p style={{ fontSize:"11px", fontWeight:"600", color:"#374151", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"12px" }}>✅ 良いアカウントの見分け方</p>
                  {guide.checkPoints.map((pt,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"10px", padding:"9px 0", borderBottom:i<guide.checkPoints.length-1?"1px solid #F1F5F9":"none" }}>
                      <div style={{ width:"18px", height:"18px", background:AL, borderRadius:"4px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1 4.5L3 6.5L8 1.5" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span style={{ fontSize:"13px", color:"#374151", lineHeight:"1.6" }}>{pt}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ fontSize:"11px", fontWeight:"600", color:"#374151", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:"10px" }}>📊 参考にすべきフォロワー規模</p>
                  {guide.tiers.map((t,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"12px", padding:"12px 14px", background:"#FAFAFA", borderRadius:"6px", marginBottom:i<guide.tiers.length-1?"8px":0, border:"1px solid #F1F5F9" }}>
                      <span style={{ fontSize:"12px", fontWeight:"700", color:"#0F172A", whiteSpace:"nowrap", paddingTop:"1px" }}>{t.label}</span>
                      <span style={{ fontSize:"12px", color:"#64748B", lineHeight:"1.6" }}>{t.hint}</span>
                    </div>
                  ))}
                  <p style={{ fontSize:"11px", color:"#94A3B8", marginTop:"10px" }}>※ マイクロ×1〜2名 ＋ 中型×1名を参考にするのがおすすめです</p>
                </div>
              </div>
            </div>
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.5)", borderRadius:"12px" }}>
              <div style={{ textAlign:"center" }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ margin:"0 auto 8px" }}><rect x="3" y="11" width="18" height="11" rx="2" stroke="#06C755" strokeWidth="2"/><path d="M7 11V7a5 5 0 0110 0v4" stroke="#06C755" strokeWidth="2" strokeLinecap="round"/></svg>
                <p style={{ fontSize:"13px", fontWeight:"600", color:"#0F172A", margin:"0 0 2px" }}>インフルエンサーガイド</p>
                <p style={{ fontSize:"11px", color:"#64748B" }}>LINE登録で閲覧可能</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", justifyContent:"center" }}>
            {[["📤 結果をシェア",()=>{ if(navigator.share) navigator.share({text:shareText}); else navigator.clipboard.writeText(shareText); }],["📋 テキストをコピー",()=>navigator.clipboard.writeText(shareText)],["もう一度診断する",restart]].map(([label,action],i) => (
              <button key={i} onClick={action} style={{ background:"#fff", border:"1px solid #E2E8F0", borderRadius:"8px", padding:"10px 22px", color:i<2?"#374151":"#94A3B8", fontSize:"13px", fontWeight:"500", cursor:"pointer", fontFamily:"inherit", transition:"border-color 0.2s" }} onMouseOver={e=>e.currentTarget.style.borderColor="#94A3B8"} onMouseOut={e=>e.currentTarget.style.borderColor="#E2E8F0"}>
                {label}
              </button>
            ))}
          </div>
          <p style={{ textAlign:"center", marginTop:"40px", fontSize:"11px", color:"#CBD5E1" }}>© EditScore — バズる動画の楽譜を、AIが書く。</p>
        </div>
      </div>
    );
  }
  return null;
}
