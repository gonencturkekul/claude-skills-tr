---
tagline: Claude'a terminalden gerçek bir tarayıcı sürdürür, sayfaları test ettirir ve Playwright testleri yazdırır.
---
# playwright-cli

Orijinal skill: [Microsoft](https://github.com/microsoft) ([GitHub](https://github.com/microsoft/playwright-cli), Apache-2.0)
Türkçe özetler: Gönenç Türkekul

Bu sayfa, playwright-cli skill'inin Türkçe özetidir. Özetler her gün otomatik olarak orijinal repodaki son sürümle karşılaştırılıp güncel tutulur. Skill'in kendisi ve Claude'un okuduğu talimatlar orijinal İngilizce haliyle kalır. Buradaki metinler sadece insanlar için yazıldı.

## playwright-cli nedir?

playwright-cli, Playwright'ı kısa terminal komutlarıyla kullanmanı sağlayan bir komut satırı aracı, bu skill de Claude'a o aracı nasıl kullanacağını öğretiyor. Claude bir tarayıcı açıyor, sayfaya gidiyor, tıklıyor, form dolduruyor, ekran görüntüsü alıyor ve her komuttan sonra sayfanın erişilebilirlik ağacından çıkarılmış bir anlık görüntüsünü (snapshot) okuyor. Öğelere bu görüntüdeki `e15` gibi kısa referanslarla, CSS seçicileriyle ya da Playwright locator'larıyla ulaşıyor.

Yazarlara göre aracın asıl farkı token verimliliği: büyük araç şemalarını ve uzun sayfa ağaçlarını modele yüklemek yerine Claude amaca yönelik kısa komutlarla çalışıyor. Sekmeler, çerezler ve localStorage, ağ isteklerini taklit etme, konsol ve istek kayıtları, trace ve video kaydı, renk şeması gibi emülasyonlar da komut setinde var. Tarayıcı varsayılan olarak görünmez (headless) çalışıyor, görmek istersen `--headed` ile açılıyor.

## Gereksinimler

Skill, bilgisayarında `playwright-cli` komutunun olmasını bekliyor. Orijinal repo Node.js 18 ya da üstünü istiyor ve aracı şöyle kurmanı öneriyor:

```
npm install -g @playwright/cli@latest
```

Global komut yoksa Claude önce projede yerel bir Playwright olup olmadığına bakıyor, varsa komutları `npx playwright cli` üzerinden çalıştırıyor. Paket kurmak için ayrıca senden onay isteyebilir.

## Claude bunu ne zaman kullanır?

Alt komutu yok. Bir sayfayı tarayıcıda denemek, bir akışı test etmek, ekran görüntüsü almak ya da Playwright testleriyle çalışmak istediğinde Claude skill'i kendiliğinden devreye alır. İstersen elle de çağırabilirsin:

```
/playwright-cli:playwright-cli
```

## Kurulum

Claude Code içinde:

```
/plugin marketplace add gonencturkekul/claude-skills-tr
/plugin install playwright-cli@skills-tr
```

Üçüncü taraf marketplace'lerde otomatik güncelleme varsayılan olarak kapalıdır. Açmak için `/plugin` → Marketplaces → skills-tr → Enable auto-update yolunu izle. İstersen elle de güncelleyebilirsin:

```
/plugin marketplace update skills-tr
```

Skill'i zaten aracın kendi komutuyla (`playwright-cli install --skills`) kurduysan bu girişe ihtiyacın yok. Türkçe rehberler o kurulum için de geçerli.

## Konular

Skill, ayrıntıları `references/` klasöründeki konu dosyalarında tutar ve gerektiğinde okur. Her birinin Türkçe özeti:

| Konu | Ne anlatır |
|------|------------|
| [element-attributes](./element-attributes.md) | Snapshot'ta görünmeyen id, class ve diğer öznitelikleri okumak. |
| [playwright-tests](./playwright-tests.md) | Playwright testlerini çalıştırmak ve duraklatılmış bir testte hata ayıklamak. |
| [pr-attachments](./pr-attachments.md) | Ekran görüntüsü ve videoları pull request'lere eklemek. |
| [request-mocking](./request-mocking.md) | Ağ isteklerini yakalamak, taklit etmek ve engellemek. |
| [running-code](./running-code.md) | Komutların yetmediği yerde doğrudan Playwright kodu çalıştırmak. |
| [session-management](./session-management.md) | Birbirinden yalıtılmış birden çok tarayıcı oturumunu yönetmek. |
| [storage-state](./storage-state.md) | Çerezleri, localStorage'ı ve oturum durumunu kaydedip geri yüklemek. |
| [test-generation](./test-generation.md) | Planla, üret, onar akışıyla test yazmak ve bakımını yapmak. |
| [tracing](./tracing.md) | Hata ayıklamak için ayrıntılı çalışma izi kaydetmek. |
| [video-recording](./video-recording.md) | Tarayıcı oturumunu açıklamalı bir video olarak kaydetmek. |

## Hata ve öneriler

- Skill'in kendisiyle ilgili hata ya da özellik istekleri: [microsoft/playwright-cli issues](https://github.com/microsoft/playwright-cli/issues)
- Türkçe metinlerle ilgili düzeltmeler: [gonencturkekul/claude-skills-tr issues](https://github.com/gonencturkekul/claude-skills-tr/issues)

playwright-cli, Microsoft tarafından Apache-2.0 lisansıyla yayınlanıyor. Emeği ve paylaştığı için teşekkürler.
