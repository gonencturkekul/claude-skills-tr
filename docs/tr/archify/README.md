---
tagline: Mimari, akış ve süreç anlatımlarını kontrolden geçmiş, etkileşimli tek dosyalık HTML diyagramlara çevirir.
---
# archify

Orijinal skill: [tt-a1i](https://github.com/tt-a1i) ([GitHub](https://github.com/tt-a1i/archify), [archify.si](https://archify.si), MIT)
Türkçe rehber: Gönenç Türkekul

Bu sayfa, archify skill'inin Türkçe rehberidir. Rehber her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'in kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metin sadece insanlar için yazıldı.

## archify nedir?

archify, bir sistemi, süreci ya da planı anlattığında bunu tek başına açılan, etkileşimli bir HTML diyagrama dönüştüren bir skill. Claude önce diyagramı yapılandırılmış bir JSON olarak yazıyor, sonra skill'in kendi aracı bu dosyayı kurallara göre doğrulayıp çiziyor ve sonucu gerçek bir tarayıcıda ölçüyor. Kontrollerden geçemeyen diyagram teslim edilmiyor, Claude hatayı düzeltip yeniden deniyor.

On diyagram türü var: mimari, iş akışı, sıralama (sequence), veri akışı, durum geçişleri (lifecycle), veritabanı şeması (ERD), sınıf, ağaç, zaman çizelgesi ve süre dağılımı (waterfall). Sadece teknik konular için değil: bir tatil planı, bir başvuru süreci ya da bir siparişin hangi aşamada olduğu da çizilebiliyor. Hazır bir Mermaid diyagramı yapıştırırsan anlamını okuyup baştan archify diyagramı olarak kuruyor. Gerçek bir kod tabanını çizdirirsen kaynak dosyalara bağlı kanıtlar ekleyebiliyor. Bir soruya cevabı tek sayfalık bir anlatım (explainer) olarak da isteyebilirsin: önce sonuç, ardından tablolar, adımlar ve diyagramlar.

Çıktı tek bir HTML dosyası. Koyu ve açık tema, hareketli akış gösterimi, düğüm arama, yukarı ve aşağı akış izleme, sunum modu ve görsel ya da video olarak dışa aktarma içinde geliyor. Dosyayı açmak için archify kurulu olması gerekmiyor.

## Gereksinimler

Orijinal repoya göre skill paketinin içinde ayrıca bir şey kurmak gerekmiyor, ama araç Node.js 18 ya da üstüyle çalışıyor. Son tarayıcı kontrolü bilgisayarındaki Chrome, Chromium ya da Microsoft Edge'i kullanıyor. Skill, teslim sırasında yeni bir sürüm olup olmadığını sabit bir adresten kontrol edip sadece hatırlatma gösteriyor, kendi kendine güncelleme kurmuyor. Bunu `ARCHIFY_UPDATE_CHECK_DISABLED=1` ortam değişkeniyle kapatabilirsin. Anlatım sayfalarını her cevapta kendiliğinden üretmesini kabul edersen skill, global kurallar dosyana (örneğin `~/.claude/CLAUDE.md`) bunu açan bir satır ekliyor. Satırı silmek modu kapatıyor.

## Claude bunu ne zaman kullanır?

Bir mimariyi, akışı, API çağrılarını, veri hattını ya da durum geçişlerini görselleştirmek istediğinde, ya da bir Mermaid diyagramını güzelleştirmek istediğinde Claude skill'i kendiliğinden devreye alır. Sayısal grafikler ve dashboard'lar için değil. Elle çağırmak için:

```
/archify:archify
```

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install archify@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

Skill'i zaten yazarın kendi yöntemiyle (`npx skills add tt-a1i/archify -g`) kurduysan bu girişe ihtiyacın yok. Türkçe rehber o kurulum için de geçerli.

## Hata ve öneriler

- Skill'in kendisiyle ilgili hata ya da özellik istekleri: [tt-a1i/archify issues](https://github.com/tt-a1i/archify/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

archify, tt-a1i tarafından MIT lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
