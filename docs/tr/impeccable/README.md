# impeccable

Orijinal skill: [Paul Bakaus](https://www.paulbakaus.com) ([GitHub](https://github.com/pbakaus/impeccable), [impeccable.style](https://impeccable.style), Apache-2.0)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, impeccable'ın Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'in kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## impeccable nedir?

impeccable, yapay zeka kodlama araçlarına arayüz tasarımı konusunda rehberlik eden bir skill. Tek bir skill ve onun altında 24 komut var. Amaç, yapay zekanın her projede aynı kalıplara düşmesini engellemek: her yerde Inter fontu, mordan maviye geçen gradyanlar, iç içe kartlar, renkli zemin üstünde gri yazı gibi. Skill bunlardan kaçınmak için açık kurallar içeriyor. Ayrıca yapay zeka gerektirmeden çalışan 61 kurallık bir tespit aracı (`npx impeccable detect`) da geliyor.

Komutlar yeni bir ekranı planlamaktan, var olan arayüzü denetlemeye, sadeleştirmeye, renk ve tipografi düzeltmeye, yayın öncesi son kontrole kadar tasarımın farklı aşamalarını kapsıyor.

## PRODUCT.md ve DESIGN.md

impeccable iki dosya üzerine kurulu:

- `PRODUCT.md`: ürünün değişmeyen gerçekleri. Kullanıcılar kim, ürün ne işe yarıyor, hangi kısıtlar var, marka nasıl konuşuyor.
- `DESIGN.md`: görsel sistem. Renkler, tipografi, boşluklar, bileşen kalıpları.

Diğer komutlar iş yapmadan önce bu dosyaları okur. Bu yüzden yeni bir projede ilk adım şudur:

```
/impeccable init
```

`init` projeyi inceler, eksik bilgiler için sana sorular sorar ve `PRODUCT.md` dosyasını yazar. Projede kod varsa `DESIGN.md` oluşturmayı da önerir. Proje başına bir kez çalıştırman yeterli.

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install impeccable@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

impeccable'ı zaten Paul Bakaus'un kendi marketplace'inden (`/plugin marketplace add pbakaus/impeccable`) kurduysan bu girişe ihtiyacın yok. Türkçe rehberler o kurulum için de geçerli.

## Kullanım

Komutlar `/impeccable <komut> <hedef>` şeklinde çalışır:

```
/impeccable polish
/impeccable audit blog
/impeccable critique ana sayfa
```

## Komutlar

| Komut | Ne yapar |
|-------|----------|
| [craft](./craft.md) | Eski kısayol; normal bir yeni iş isteğiyle aynı. |
| [init](./init.md) | Projeyi hazırlar, `PRODUCT.md` yazar, gerekirse `DESIGN.md` önerir. |
| [document](./document.md) | Mevcut koddan renk, tipografi ve bileşenleri çıkarıp `DESIGN.md` üretir. |
| [extract](./extract.md) | Tekrar eden bileşen ve token'ları tasarım sistemine toplar. |
| [live](./live.md) | Tarayıcıda eleman seçip yapay zekanın ürettiği varyantları canlı denemeni sağlar. |
| [generate](./generate.md) | Adını verdiğin eleman için istediğin yönde varyantları canlı modda üretir. |
| [adapt](./adapt.md) | Tasarımı farklı ekran boyutlarına ve cihazlara uyarlar. |
| [animate](./animate.md) | Amacı olan animasyon ve mikro etkileşimler ekler. |
| [audit](./audit.md) | Erişilebilirlik, performans ve responsive açısından puanlı teknik denetim yapar. |
| [bolder](./bolder.md) | Fazla güvenli ve sıradan duran tasarımı daha etkili hale getirir. |
| [clarify](./clarify.md) | Anlaşılmayan arayüz metinlerini, etiketleri ve hata mesajlarını düzeltir. |
| [colorize](./colorize.md) | Tek düze kalan arayüze bilinçli şekilde renk ekler. |
| [critique](./critique.md) | Hiyerarşi, netlik ve bilişsel yük açısından puanlı UX değerlendirmesi yapar. |
| [delight](./delight.md) | Arayüze akılda kalan küçük, keyifli dokunuşlar ekler. |
| [distill](./distill.md) | Gereksiz karmaşayı atıp tasarımı özüne indirir. |
| [harden](./harden.md) | Hata durumları, i18n, taşan metin ve uç durumlarla arayüzü yayına hazırlar. |
| [onboard](./onboard.md) | İlk kullanım akışları ve boş durum ekranları tasarlar. |
| [layout](./layout.md) | Yerleşimi, boşlukları ve görsel ritmi düzeltir. |
| [optimize](./optimize.md) | Yükleme, render, görsel ve paket boyutu kaynaklı performans sorunlarını giderir. |
| [overdrive](./overdrive.md) | Shader, yay fiziği, scroll efektleri gibi teknik olarak iddialı uygulamalar yapar. |
| [polish](./polish.md) | Yayından önce hizalama, boşluk ve tutarlılık için son kontrolü yapar. |
| [quieter](./quieter.md) | Fazla bağıran tasarımı kaliteden ödün vermeden sakinleştirir. |
| [shape](./shape.md) | Kod yazmadan önce soru-cevapla UX/UI planı ve tasarım özeti çıkarır. |
| [typeset](./typeset.md) | Font seçimi, hiyerarşi, boyut ve okunabilirliği düzeltir. |

## Hata ve öneriler

- Skill'in kendisiyle ilgili hata ya da özellik istekleri: [pbakaus/impeccable issues](https://github.com/pbakaus/impeccable/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)
