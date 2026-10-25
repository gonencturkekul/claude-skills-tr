---
tagline: Arayüz kodunu Vercel'in Web Interface Guidelines kurallarına göre denetler, bulguları dosya ve satırla verir.
---
# web-design-guidelines

Orijinal skill: [Vercel](https://github.com/vercel-labs) ([GitHub](https://github.com/vercel-labs/agent-skills), MIT)
Türkçe rehber: Gönenç Türkekul

Bu sayfa, web-design-guidelines skill'inin Türkçe rehberidir. Rehber her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'in kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metin sadece insanlar için yazıldı.

## web-design-guidelines nedir?

web-design-guidelines, arayüz kodunu Vercel'in Web Interface Guidelines adlı kural setine göre gözden geçiren bir denetim skill'i. Bir şeyi yeniden tasarlamaz, kod da yazmaz: verdiğin dosyaları okur, kurallara uymayan yerleri bulur ve her bulguyu `dosya:satır` biçiminde kısa bir satır olarak listeler.

Orijinal repoya göre kural seti 100'den fazla kural içeriyor ve şu alanları kapsıyor: erişilebilirlik (aria etiketleri, anlamlı HTML, klavye kullanımı), görünür odak durumları, formlar (otomatik doldurma, doğrulama, hata mesajları), animasyon (azaltılmış hareket tercihi, performanslı dönüşümler), tipografi, görseller (boyutlar, tembel yükleme, alternatif metin), performans, URL'nin sayfa durumunu yansıtması, koyu tema, dokunmatik etkileşim ve yerelleştirme (tarih ve sayı biçimleri).

## Kurallar her seferinde güncel çekilir

Skill'in en önemli özelliği şu: kurallar skill dosyasının içinde durmuyor. Claude her denetimden önce kural setinin en son halini Vercel'in GitHub'daki `web-interface-guidelines` reposundan internet üzerinden indiriyor. İndirilen metin hem kuralların tamamını hem de çıktının nasıl biçimlendirileceğini içeriyor. Bu yüzden Vercel kuralları güncellediğinde skill'i güncellemen gerekmez, bir sonraki denetim yeni kurallarla yapılır. Claude indirme için WebFetch aracını kullanır, yani denetim sırasında internet erişimi gerekir.

## Claude bunu ne zaman kullanır?

"Arayüzümü incele", "erişilebilirliği kontrol et", "tasarımı denetle", "UX'e bak" ya da "sitemi iyi uygulamalara göre kontrol et" dediğinde Claude skill'i kendiliğinden devreye alır. Elle çağırırken denetlenecek dosyayı ya da bir dosya kalıbını argüman olarak verebilirsin:

```
/web-design-guidelines:web-design-guidelines src/components/**/*.tsx
```

Argüman vermezsen Claude hangi dosyaları denetlemesi gerektiğini sana sorar. Akış her seferinde aynı: kuralları indir, dosyaları oku, tüm kuralları uygula, bulguları kural setinin istediği biçimde yaz.

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install web-design-guidelines@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

Skill'i zaten Vercel'in kendi yöntemiyle (`npx skills add vercel-labs/agent-skills`) kurduysan bu girişe ihtiyacın yok. Türkçe rehber o kurulum için de geçerli.

## Hata ve öneriler

- Skill'in kendisiyle ilgili hata ya da özellik istekleri: [vercel-labs/agent-skills issues](https://github.com/vercel-labs/agent-skills/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

web-design-guidelines, Vercel tarafından MIT lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
