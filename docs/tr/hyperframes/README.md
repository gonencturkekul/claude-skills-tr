---
tagline: HTML, CSS ve animasyonlardan her seferinde birebir aynı çıkan MP4 videolar üretmek için yedi skill.
---
# hyperframes

Orijinal skill: [HeyGen](https://github.com/heygen-com) ([GitHub](https://github.com/heygen-com/hyperframes), [hyperframes.heygen.com](https://hyperframes.heygen.com), Apache-2.0)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, hyperframes'in Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'lerin kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## hyperframes nedir?

HyperFrames, HTML, CSS, medya ve zamana göre ileri geri sarılabilen animasyonları MP4 videoya çeviren açık kaynak bir framework. Video, duraklatılmış bir zaman çizelgesi kare kare ilerletilerek çekiliyor, bu yüzden aynı proje her render'da aynı sonucu veriyor. Tanıtım filmi, açıklayıcı video, müzik videosu, grafik ve harita animasyonu, dikey sosyal medya klibi, altyazı ve ekran üstü kartlar bu kapsama giriyor.

Plugin yedi skill'den oluşuyor. Ana skill `hyperframes` render kurallarını ve çalışma döngüsünü taşıyor, diğerleri CLI, hazır bileşen kataloğu, medya, Figma, sunum ve başka araçlardan taşıma gibi işlere odaklanıyor. Komutlar `npx hyperframes` üzerinden çalışıyor ve Node.js 22+ ile FFmpeg istiyor. Projeyi canlı önizlemede ya da HyperFrames masaüstü uygulamasında düzenlemeye devam edebiliyorsun.

Telemetri notu: CLI varsayılan olarak anonim kullanım sayaçları gönderiyor ve skill'ler de buna katkı veriyor. `figma` skill'i işe başlarken ve bitirirken bir kullanım olayı yolluyor. `hyperframes-cli` ise doğrulanmış her render'dan sonra Claude'a `feedback` komutuyla bir puan göndertiyor, yapılamayan bir istek olduğunda da kısa bir not. Geri bildirimler herkese açık bir kanala gittiği için skill, içlerine dosya yolu ya da kişisel bilgi konmamasını şart koşuyor. Kapatmak için `npx hyperframes telemetry disable` komutunu çalıştır ya da `HYPERFRAMES_NO_TELEMETRY=1` veya `DO_NOT_TRACK=1` ortam değişkenini ayarla. Durumu `npx hyperframes telemetry status` gösterir. Telemetri kapalıyken ne kullanım olayları ne de geri bildirimler gönderilir.

## Claude bunu ne zaman kullanır?

Bir video yapmak, düzenlemek, animasyon eklemek ya da render almak istediğinde Claude önce `hyperframes` skill'ini okur, gerekirse diğerlerine geçer. "Ürünüm için 10 saniyelik bir tanıtım videosu yap" demen yeter. İstersen bir skill'i elle de çağırabilirsin:

```
/hyperframes:hyperframes
```

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install hyperframes@skills-tr
```

Windows kullanıyorsan: hyperframes deposunda çok uzun dosya yolları var ve git'in uzun yol desteği kapalıysa kurulum "Filename too long" hatasıyla durur. Kurmadan önce bir kez `git config --global core.longpaths true` çalıştır.

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

HeyGen'in kendi marketplace'i de var (`/plugin marketplace add heygen-com/hyperframes`). hyperframes'i zaten oradan kurduysan bu girişe ihtiyacın yok. Türkçe rehberler o kurulum için de geçerli.

## Skill'ler

Her skill'in Türkçe özeti:

| Skill | Ne yapar |
|-------|----------|
| [figma](./figma.md) | Figma tasarımlarını, token'larını ve storyboard'larını videoya taşır. |
| [hyperframes](./hyperframes.md) | Ana skill: render kuralları, çalışma döngüsü ve video türlerine göre rehberler. |
| [hyperframes-cli](./hyperframes-cli.md) | CLI komutlarını işe göre düzenler, hata durumlarında ne yapılacağını söyler. |
| [hyperframes-registry](./hyperframes-registry.md) | Yaklaşık 450 hazır geçiş, başlık, grafik ve efekti projeye ekler. |
| [media-use](./media-use.md) | Müzik, ses efekti, görsel, seslendirme ve avatar gibi medyayı bulur ya da üretir. |
| [remotion-to-hyperframes](./remotion-to-hyperframes.md) | Remotion ve başka araçlarla yapılmış işleri taşır, kare kare karşılaştırır. |
| [slideshow](./slideshow.md) | Canlı sunulan, sunucu notlu ve dallanan slayt sunumları kurar. |

## Hata ve öneriler

- Skill'lerin kendisiyle ilgili hata ya da özellik istekleri: [heygen-com/hyperframes issues](https://github.com/heygen-com/hyperframes/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

hyperframes, HeyGen tarafından Apache-2.0 lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
