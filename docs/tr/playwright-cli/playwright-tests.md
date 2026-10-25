---
topic: playwright-tests
title: Playwright testlerini çalıştırmak ve ayıklamak
source: references/playwright-tests.md
upstreamCommit: b1a5903c5b633b8c9f843ad7b629c2a78437040c
---
## Ne anlatır
Projedeki Playwright testlerinin nasıl çalıştırılacağını ve başarısız bir testte nasıl hata ayıklanacağını anlatır. Testler `npx playwright test` ya da projenin kendi npm script'iyle çalıştırılır. Etkileşimli HTML raporunun kendiliğinden açılmaması için `PLAYWRIGHT_HTML_OPEN=never` ortam değişkeni eklenir.

Hata ayıklama için test `--debug=cli` seçeneğiyle arka planda başlatılır. Test en başta duraklar ve bir oturum adı içeren talimatlar yazdırır. Claude bu çıktıyı bekler, sonra `playwright-cli attach` ile o oturuma bağlanıp duraklatılmış sayfayı keşfeder. Sorunun olabileceği yere kadar adım adım ilerler. Yaptığı her işlem karşılık gelen Playwright TypeScript kodunu ürettiği için düzeltilmiş satırı doğrudan teste kopyalayabilir. Çoğu zaman değişmesi gereken bir locator ya da beklentidir ama sorun uygulamanın kendisinde de olabilir. Düzeltmeden sonra arka plandaki test durdurulur ve test geçene kadar yeniden çalıştırılır.

## Ne zaman işine yarar
- Test paketini rapor penceresi açılmadan çalıştırmak istediğinde
- Bir test kırıldığında nedenini canlı sayfada görmek istediğinde
- Kırılan bir locator'ı ya da beklentiyi güncellemen gerektiğinde

## Örnek
```
checkout.spec.ts testi kırıldı, debug modunda açıp neden geçmediğini bul ve düzelt
```

## İlgili konular
- `test-generation`: Aynı debug ve attach yöntemiyle yeni test yazmayı ve kırılanları onarmayı anlatır.
- `tracing`: Bir hatanın tüm adımlarını sonradan incelemek için iz kaydı.
- `session-management`: `attach` ile bağlanılan oturumların nasıl yönetildiği.
